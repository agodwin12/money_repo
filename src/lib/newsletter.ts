"use server";

import { db } from "@/db";
import { subscribers } from "@/db/schema";

export type SubscribeState = { status: "idle" | "ok" | "invalid" | "error" };

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/** Store a newsletter subscriber. Deduplicates on email. */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const email = (formData.get("email") ?? "").toString().trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { status: "invalid" };

  try {
    await db.insert(subscribers).values({ email }).onConflictDoNothing();
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
}
