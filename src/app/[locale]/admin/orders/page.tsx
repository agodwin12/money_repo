import { setRequestLocale } from "next-intl/server";
import { Mail, Phone, MapPin } from "lucide-react";
import { getAllOrders } from "@/db/queries";
import { updateOrderStatus } from "@/lib/orders";
import { formatMoneyCents as money } from "@/lib/money";

export const dynamic = "force-dynamic";

const PAYMENT_LABEL: Record<string, string> = {
  bitcoin: "Bitcoin",
  bank: "Bank Transfer",
  taptap: "TapTap Send",
  remitly: "Remitly",
  applegift: "Apple Gift Card",
};
const STATUSES = ["pending", "paid", "shipped", "cancelled"];
const STATUS_STYLE: Record<string, string> = {
  pending: "bg-accent/15 text-[#8a6d00]",
  paid: "bg-primary/10 text-primary",
  shipped: "bg-blue-500/10 text-blue-600",
  cancelled: "bg-muted text-muted-foreground",
};


export default async function AdminOrders({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {orders.length} total — payment is arranged off-platform; update status as you settle each order.
      </p>

      {orders.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No orders yet.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-foreground">{o.orderNumber}</span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_STYLE[o.status] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{money(o.subtotalCents)}</p>
                  <p className="text-xs font-medium text-primary">
                    {PAYMENT_LABEL[o.paymentMethod] ?? o.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {/* Customer */}
                <div className="text-sm">
                  <p className="font-semibold text-foreground">{o.customerName}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" /> {o.customerEmail}
                  </p>
                  {o.customerPhone && (
                    <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" /> {o.customerPhone}
                    </p>
                  )}
                  {o.shippingAddress && (
                    <p className="mt-1 flex items-start gap-1.5 text-muted-foreground">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {o.shippingAddress}
                    </p>
                  )}
                </div>

                {/* Items */}
                <div>
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {o.items.map((it) => (
                      <li key={it.id} className="flex justify-between gap-3">
                        <span className="text-foreground">
                          {it.name} <span className="text-muted-foreground">× {it.qty}</span>
                        </span>
                        <span className="font-medium text-foreground">{money(it.priceCents * it.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status update */}
              <form
                action={updateOrderStatus.bind(null, o.id)}
                className="mt-4 flex items-center gap-2 border-t border-border pt-4"
              >
                <label className="text-xs font-medium text-muted-foreground">Set status</label>
                <select
                  name="status"
                  defaultValue={o.status}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
                >
                  Update
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
