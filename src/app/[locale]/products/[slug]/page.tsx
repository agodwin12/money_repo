import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, Star, Truck, ShieldCheck, Headphones, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import { ProductPurchase } from "@/components/product-purchase";
import { getProductBySlug, getRelatedProducts } from "@/db/queries";
import type { ProductKind } from "@/lib/products";
import { formatMoney } from "@/lib/money";
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

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const t = await getTranslations("Product");
  const related = await getRelatedProducts(product.category.id, product.id, 4);
  const tint = product.category.tint;

  const stockLabel =
    product.stock <= 0
      ? t("outOfStock")
      : product.stock <= 10
        ? t("lowStock", { count: product.stock })
        : t("inStock");

  const benefits = [
    { icon: Truck, label: t("benefit1") },
    { icon: ShieldCheck, label: t("benefit2") },
    { icon: Headphones, label: t("benefit3") },
  ];

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24 pt-8">
        <Container>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            {/* Media */}
            <div
              data-reveal="left"
              className={cn(
                "flex aspect-square items-center justify-center overflow-hidden rounded-[2rem] border border-border sm:rounded-[2.5rem]",
                TINT_BG[tint] ?? "bg-muted"
              )}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              ) : (
                <ProductArt
                  kind={product.category.kind as ProductKind}
                  className={cn("h-64 w-64", ART_COLOR[tint] ?? "text-primary")}
                />
              )}
            </div>

            {/* Info */}
            <div data-reveal="right" className="flex flex-col">
              <Link
                href={`/products?category=${product.category.slug}`}
                className="text-sm font-semibold uppercase tracking-wide text-primary hover:underline"
              >
                {product.category.name}
              </Link>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                </span>
                <span className="text-muted-foreground">
                  · {t("reviewsCount", { count: product.reviews })}
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold text-foreground">
                {formatMoney(product.price)}
              </p>

              <p
                className={cn(
                  "mt-2 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
                  product.stock <= 0
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Check className="h-3.5 w-3.5" />
                {stockLabel}
              </p>

              {product.description && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold text-foreground">{t("description")}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}

              <ProductPurchase
                stock={product.stock}
                item={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  priceCents: Math.round(product.price * 100),
                  image: product.image,
                  kind: product.category.kind,
                  tint: product.category.tint,
                }}
              />

              {/* Benefits */}
              <ul className="mt-8 grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
                {benefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary">
                      <b.icon className="h-4 w-4" />
                    </span>
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold tracking-tight text-foreground" data-reveal="left">
                {t("related")}
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p, i) => (
                  <div
                    key={p.id}
                    data-reveal="up"
                    style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
