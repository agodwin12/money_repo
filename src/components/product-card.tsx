"use client";

import { useTranslations } from "next-intl";
import { Plus, Star } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ProductArt } from "@/components/product-art";
import { useCart } from "@/components/cart/cart-context";
import { formatMoney } from "@/lib/money";
import type { ProductKind } from "@/lib/products";
import type { ProductVM } from "@/db/queries";
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

export function ProductCard({ product }: { product: ProductVM }) {
  const t = useTranslations("Products");
  const { addItem } = useCart();
  const tint = product.category.tint;
  const href = `/products/${product.slug}`;

  const add = () =>
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceCents: Math.round(product.price * 100),
      image: product.image,
      kind: product.category.kind,
      tint: product.category.tint,
    });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_18px_36px_-18px_rgba(0,0,0,0.22)]">
      {/* Media */}
      <div className={cn("relative aspect-[4/3] overflow-hidden", TINT_BG[tint] ?? "bg-muted")}>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.5),transparent_62%)]" />

        {product.badge && (
          <span className="absolute left-2.5 top-2.5 z-10 inline-flex items-center rounded-full bg-card/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground shadow-sm ring-1 ring-black/5">
            {t(`badge.${product.badge}`)}
          </span>
        )}

        <Link href={href} aria-label={product.name} className="relative block h-full w-full">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-5">
              <ProductArt
                kind={product.category.kind as ProductKind}
                className={cn(
                  "h-24 w-24 transition-transform duration-[600ms] ease-out group-hover:scale-[1.08]",
                  ART_COLOR[tint] ?? "text-primary"
                )}
              />
            </div>
          )}
        </Link>

        {/* Quick add — slides in on hover */}
        <button
          type="button"
          aria-label={t("addToCart")}
          onClick={add}
          className="absolute bottom-2.5 right-2.5 z-10 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category.name}
          </p>
          <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          </span>
        </div>

        <h3 className="mt-1 truncate text-sm font-semibold text-foreground">
          <Link href={href} className="transition-colors group-hover:text-primary">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="text-base font-bold tracking-tight text-foreground">
            {formatMoney(product.price)}
          </span>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            {t("addToCart")}
          </button>
        </div>
      </div>
    </article>
  );
}
