"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
} from "./session";

function safeLocale(v: FormDataEntryValue | null): string {
  const l = (v ?? "en").toString();
  return ["en", "de", "es"].includes(l) ? l : "en";
}

export async function login(formData: FormData) {
  const email = (formData.get("email") ?? "").toString().trim().toLowerCase();
  const password = (formData.get("password") ?? "").toString();
  const locale = safeLocale(formData.get("locale"));

  const okEmail = email === (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const okPassword = password === (process.env.ADMIN_PASSWORD ?? "");

  if (!okEmail || !okPassword) {
    redirect(`/${locale}/login?error=1`);
  }

  const token = await createSessionToken(email);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect(`/${locale}/admin`);
}

export async function logout(formData: FormData) {
  const locale = safeLocale(formData.get("locale"));
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect(`/${locale}/login`);
}
