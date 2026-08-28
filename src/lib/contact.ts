"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

function safeLocale(v: FormDataEntryValue | null): string {
  const l = (v ?? "en").toString();
  return ["en", "de", "es"].includes(l) ? l : "en";
}
function str(v: FormDataEntryValue | null): string {
  return (v ?? "").toString().trim();
}

/** Store a contact submission in the database (visible in the admin inbox). */
export async function sendContact(formData: FormData) {
  const locale = safeLocale(formData.get("locale"));
  const firstName = str(formData.get("firstName"));
  const lastName = str(formData.get("lastName"));
  const email = str(formData.get("email"));
  const phone = str(formData.get("phone"));
  const message = str(formData.get("message"));

  if (firstName && email && message) {
    try {
      await db.insert(contactMessages).values({
        firstName,
        lastName: lastName || null,
        email,
        phone: phone || null,
        message,
      });
      revalidatePath("/admin/messages");
    } catch {
      /* ignore — still confirm to the user */
    }
  }

  redirect(`/${locale}/contact?sent=1`);
}
