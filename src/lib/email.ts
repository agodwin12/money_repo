import nodemailer, { type Transporter } from "nodemailer";
import type { Order, OrderItem } from "@/db/schema";
import { formatMoneyCents as money } from "./money";

const PAYMENT_LABEL: Record<string, string> = {
  bitcoin: "Bitcoin",
  bank: "Bank Transfer",
  taptap: "TapTap Send",
  remitly: "Remitly",
  applegift: "Apple Gift Card",
};

let cached: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (cached !== undefined) return cached;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    cached = null;
    return null;
  }
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE != null
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return cached;
}

function fromAddress(): string {
  const email =
    process.env.MAIL_FROM || process.env.ORDER_EMAIL_FROM || process.env.SMTP_USER || "";
  const name = process.env.MAIL_FROM_NAME?.replace(/^"|"$/g, "").trim();
  return name ? `"${name}" <${email}>` : email;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildHtml(order: Order, items: OrderItem[]): string {
  const rows = items
    .map(
      (i) => `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(i.name)} <span style="color:#888">× ${i.qty}</span></td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${money(i.priceCents * i.qty)}</td>
      </tr>`
    )
    .join("");

  const payment = PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod;

  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:auto;color:#111">
    <h2 style="margin:0 0 4px">🛒 New order — ${esc(order.orderNumber)}</h2>
    <p style="color:#666;margin:0 0 16px">${new Date(order.createdAt).toLocaleString()}</p>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">${rows}
      <tr>
        <td style="padding:12px 0;font-weight:bold">Subtotal</td>
        <td style="padding:12px 0;text-align:right;font-weight:bold;font-size:18px">${money(order.subtotalCents)}</td>
      </tr>
    </table>

    <div style="background:#f5f7f6;border-radius:12px;padding:16px;margin-bottom:16px">
      <p style="margin:0 0 6px"><strong>Payment method:</strong> ${esc(payment)}
        <span style="color:#888">(customer pays off-platform)</span></p>
      <p style="margin:0"><strong>Status:</strong> ${esc(order.status)}</p>
    </div>

    <h3 style="margin:0 0 8px">Customer</h3>
    <p style="margin:0 0 4px"><strong>${esc(order.customerName)}</strong></p>
    <p style="margin:0 0 4px">✉️ ${esc(order.customerEmail)}</p>
    ${order.customerPhone ? `<p style="margin:0 0 4px">📞 ${esc(order.customerPhone)}</p>` : ""}
    ${order.shippingAddress ? `<p style="margin:0 0 4px">📍 ${esc(order.shippingAddress)}</p>` : ""}

    <p style="color:#999;font-size:12px;margin-top:24px">Prop Money — automated order notification.</p>
  </div>`;
}

function buildText(order: Order, items: OrderItem[]): string {
  const lines = items.map((i) => `- ${i.name} x${i.qty}  ${money(i.priceCents * i.qty)}`).join("\n");
  const payment = PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod;
  return [
    `New order ${order.orderNumber}`,
    new Date(order.createdAt).toLocaleString(),
    "",
    lines,
    `Subtotal: ${money(order.subtotalCents)}`,
    "",
    `Payment: ${payment} (off-platform)`,
    `Status: ${order.status}`,
    "",
    `Customer: ${order.customerName}`,
    `Email: ${order.customerEmail}`,
    order.customerPhone ? `Phone: ${order.customerPhone}` : "",
    order.shippingAddress ? `Address: ${order.shippingAddress}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/** Emails the store owner the full details of a new order. No-op if SMTP isn't configured. */
export async function sendOrderNotification(order: Order, items: OrderItem[]): Promise<void> {
  const to = process.env.ORDER_EMAIL_TO;
  const transporter = getTransporter();
  if (!transporter || !to) {
    console.warn("[email] SMTP not configured (SMTP_HOST/USER/PASS + ORDER_EMAIL_TO) — skipping order email");
    return;
  }
  await transporter.sendMail({
    from: fromAddress(),
    to,
    subject: `🛒 New order ${order.orderNumber} — ${money(order.subtotalCents)}`,
    text: buildText(order, items),
    html: buildHtml(order, items),
  });
}
