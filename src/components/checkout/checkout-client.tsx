"use client";

import { useActionState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Bitcoin, Landmark, Send, Repeat, Gift, Check, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/components/cart/cart-context";
import { placeOrder, type CheckoutState } from "@/lib/orders";
import { formatMoneyCents as money } from "@/lib/money";


const labelCls = "block text-sm font-medium text-foreground";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function CheckoutClient() {
  const t = useTranslations("Checkout");
  const { items, subtotalCents, clear, ready } = useCart();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(placeOrder, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "ok") clear();
  }, [state.status, clear]);

  const methods = [
    { value: "bitcoin", label: t("bitcoin"), icon: Bitcoin },
    { value: "bank", label: t("bank"), icon: Landmark },
    { value: "taptap", label: t("taptap"), icon: Send },
    { value: "remitly", label: t("remitly"), icon: Repeat },
    { value: "applegift", label: t("applegift"), icon: Gift },
  ];

  // Success
  if (state.status === "ok") {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-10 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-foreground">{t("successTitle")}</h1>
        <p className="mt-3 text-muted-foreground">
          {t("successBody", {
            name: state.name ?? "",
            number: state.orderNumber ?? "",
            method: t(
              state.method as "bitcoin" | "bank" | "taptap" | "remitly" | "applegift"
            ),
          })}
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t("backToShop")}
        </Link>
      </div>
    );
  }

  // Empty
  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-border p-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <p className="mt-4 text-muted-foreground">{t("empty")}</p>
        <Link
          href="/products"
          className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          {t("browse")}
        </Link>
      </div>
    );
  }

  const itemsPayload = items.map((i) => ({
    id: i.id,
    name: i.name,
    priceCents: i.priceCents,
    qty: i.qty,
  }));

  return (
    <form action={action} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <input type="hidden" name="items" value={JSON.stringify(itemsPayload)} />

      {/* Details */}
      <div className="flex flex-col gap-8">
        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">{t("contactHeading")}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelCls}>{t("name")} *</label>
              <input id="name" name="name" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="email" className={labelCls}>{t("email")} *</label>
              <input id="email" name="email" type="email" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="phone" className={labelCls}>{t("phone")}</label>
              <input id="phone" name="phone" className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className={labelCls}>{t("address")}</label>
              <textarea id="address" name="address" rows={2} className={inputCls} />
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">{t("paymentHeading")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {methods.map((m, i) => (
              <label
                key={m.value}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3.5 text-sm font-medium transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input type="radio" name="paymentMethod" value={m.value} defaultChecked={i === 0} className="accent-[var(--primary)]" />
                <m.icon className="h-5 w-5 text-primary" />
                {m.label}
              </label>
            ))}
          </div>
          <p className="mt-4 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
            {t("paymentNote")}
          </p>
          {(state.status === "invalid" || state.status === "error") && (
            <p className="mt-3 text-sm text-red-600">{t("invalid")}</p>
          )}
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-border bg-card p-6">
          <h2 className="text-lg font-bold text-foreground">{t("summary")}</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="flex-1 text-foreground">
                  {i.name} <span className="text-muted-foreground">× {i.qty}</span>
                </span>
                <span className="font-semibold text-foreground">{money(i.priceCents * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-medium text-muted-foreground">{t("subtotal")}</span>
            <span className="text-xl font-bold text-foreground">{money(subtotalCents)}</span>
          </div>
          <button
            type="submit"
            disabled={pending || items.length === 0}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {pending ? t("placing") : t("placeOrder")}
          </button>
        </div>
      </aside>
    </form>
  );
}
