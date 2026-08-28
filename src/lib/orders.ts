"use server";

import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { sendOrderNotification } from "./email";

export type CheckoutState = {
  status: "idle" | "ok" | "invalid" | "error";
  orderNumber?: string;
  name?: string;
  method?: string;
};

const METHODS = ["bitcoin", "bank", "taptap", "remitly", "applegift"];

function str(v: FormDataEntryValue | null): string {
  return (v ?? "").toString().trim();
}

type IncomingItem = { id: number; name: string; priceCents: number; qty: number };

export async function placeOrder(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const name = str(formData.get("name"));
  const email = str(formData.get("email"));
  const phone = str(formData.get("phone"));
  const address = str(formData.get("address"));
  const method = str(formData.get("paymentMethod"));

  let items: IncomingItem[] = [];
  try {
    const parsed = JSON.parse(str(formData.get("items")) || "[]");
    if (Array.isArray(parsed)) items = parsed;
  } catch {
    /* ignore */
  }

  if (!name || !email || !METHODS.includes(method) || items.length === 0) {
    return { status: "invalid" };
  }

  const subtotalCents = items.reduce(
    (n, i) => n + Math.round(i.priceCents) * Math.round(i.qty),
    0
  );
  const orderNumber = "MN-" + randomBytes(4).toString("hex").toUpperCase();

  try {
    const [order] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName: name,
        customerEmail: email,
        customerPhone: phone || null,
        shippingAddress: address || null,
        paymentMethod: method,
        subtotalCents,
      })
      .returning();

    const insertedItems = await db
      .insert(orderItems)
      .values(
        items.map((i) => ({
          orderId: order.id,
          productId: Number.isInteger(i.id) ? i.id : null,
          name: i.name,
          priceCents: Math.round(i.priceCents),
          qty: Math.round(i.qty),
        }))
      )
      .returning();

    // Notify the store owner by email — never let a mail failure break the order.
    try {
      await sendOrderNotification(order, insertedItems);
    } catch (err) {
      console.error("[email] order notification failed", err);
    }

    revalidatePath("/admin/orders");
    return { status: "ok", orderNumber, name, method };
  } catch {
    return { status: "error" };
  }
}

export async function updateOrderStatus(id: number, formData: FormData) {
  const status = str(formData.get("status"));
  if (["pending", "paid", "shipped", "cancelled"].includes(status)) {
    await db.update(orders).set({ status }).where(eq(orders.id, id));
    revalidatePath("/admin/orders");
  }
}
