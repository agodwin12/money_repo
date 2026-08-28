"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCart, type CartItem } from "@/components/cart/cart-context";

/** Quantity stepper + add-to-cart on the product detail page. */
export function ProductPurchase({
  item,
  stock,
}: {
  item: Omit<CartItem, "qty">;
  stock: number;
}) {
  const t = useTranslations("Product");
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const soldOut = stock <= 0;
  const max = Math.max(1, stock);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <div className="inline-flex items-center rounded-full border border-border bg-card">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={soldOut}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-sm font-semibold text-foreground">{qty}</span>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          disabled={soldOut}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        disabled={soldOut}
        onClick={() => addItem(item, qty)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {soldOut ? (
          t("outOfStock")
        ) : (
          <>
            <ShoppingBag className="h-4 w-4" />
            {t("addToCart")}
          </>
        )}
      </button>
    </div>
  );
}
