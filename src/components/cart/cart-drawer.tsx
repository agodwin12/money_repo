"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductArt } from "@/components/product-art";
import type { ProductKind } from "@/lib/products";
import { useCart } from "./cart-context";
import { formatMoneyCents as money } from "@/lib/money";
import { cn } from "@/lib/utils";

const TINT_BG: Record<string, string> = {
  blue: "bg-tint-blue",
  lavender: "bg-tint-lavender",
  mint: "bg-tint-mint",
  peach: "bg-tint-peach",
};
const ART_COLOR: Record<string, string> = {
  blue: "text-primary",
  lavender: "text-[#2f9e6b]",
  mint: "text-[#15803d]",
  peach: "text-[#b8860b]",
};

export function CartDrawer() {
  const t = useTranslations("Cart");
  const { items, isOpen, close, subtotalCents, count, setQty, removeItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label={t("title")}
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <ShoppingBag className="h-5 w-5 text-primary" />
            {t("title")}
            {count > 0 && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label={t("close")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <p className="text-muted-foreground">{t("empty")}</p>
            <button
              type="button"
              onClick={close}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {t("continue")}
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div
                      className={cn(
                        "flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl",
                        TINT_BG[item.tint] ?? "bg-muted"
                      )}
                    >
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <ProductArt
                          kind={item.kind as ProductKind}
                          className={cn("h-12 w-12", ART_COLOR[item.tint] ?? "text-primary")}
                        />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={close}
                          className="text-sm font-semibold text-foreground hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={t("remove")}
                          className="text-muted-foreground transition-colors hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">{money(item.priceCents)}</p>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            aria-label="Decrease"
                            onClick={() => setQty(item.id, item.qty - 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-muted"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-foreground">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase"
                            onClick={() => setQty(item.id, item.qty + 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-muted"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {money(item.priceCents * item.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium text-muted-foreground">{t("subtotal")}</span>
                <span className="text-xl font-bold text-foreground">{money(subtotalCents)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t("shippingNote")}</p>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {t("checkout")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-2 w-full rounded-full px-6 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("continue")}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
