import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, LayoutGrid, Star, X, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
import {
  getStoreProducts,
  getCategories,
  getFeaturedProducts,
  getProductCountByCategory,
  type SortKey,
} from "@/db/queries";
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

const PRICE_RANGES: Record<string, { min?: number; max?: number }> = {
  "1": { max: 200 },
  "2": { min: 200, max: 500 },
  "3": { min: 500, max: 1000 },
  "4": { min: 1000 },
};

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    category?: string;
    q?: string;
    price?: string;
    sort?: string;
    inStock?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const category = sp.category ?? "all";
  const q = sp.q ?? "";
  const price = sp.price ?? "";
  const sort = (sp.sort as SortKey) ?? "featured";
  const inStock = sp.inStock === "on";

  const t = await getTranslations("Catalog");
  const range = PRICE_RANGES[price] ?? {};
  const [products, categories, featured, counts] = await Promise.all([
    getStoreProducts({ categorySlug: category, q, min: range.min, max: range.max, sort, inStock }),
    getCategories(),
    getFeaturedProducts(3),
    getProductCountByCategory(),
  ]);

  const activeCat = category !== "all" ? categories.find((c) => c.slug === category) ?? null : null;
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  // Build an href for the category circles, preserving other active filters.
  const circleHref = (slug: string) => {
    const p = new URLSearchParams();
    if (slug !== "all") p.set("category", slug);
    if (q) p.set("q", q);
    if (price) p.set("price", price);
    if (sort !== "featured") p.set("sort", sort);
    if (inStock) p.set("inStock", "on");
    return `/products${p.toString() ? `?${p.toString()}` : ""}`;
  };

  const sortOptions: { value: SortKey; label: string }[] = [
    { value: "featured", label: t("sortFeatured") },
    { value: "price-asc", label: t("sortPriceAsc") },
    { value: "price-desc", label: t("sortPriceDesc") },
    { value: "rating", label: t("sortRating") },
  ];
  const priceOptions = [
    { value: "", label: t("any") },
    { value: "1", label: t("price1") },
    { value: "2", label: t("price2") },
    { value: "3", label: t("price3") },
    { value: "4", label: t("price4") },
  ];

  const radioRow =
    "flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted";

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        {/* ---------- Hero ---------- */}
        <Container className="pt-8">
          {activeCat ? (
            <div
              data-reveal="up"
              className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-dark sm:rounded-[2.5rem]"
            >
              {activeCat.image && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeCat.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
                </>
              )}
              <div className="relative flex min-h-[15rem] flex-col justify-center px-6 py-12 text-surface-dark-foreground sm:px-12">
                <Link
                  href="/products"
                  className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-surface-dark-foreground backdrop-blur transition-colors hover:bg-white/20"
                >
                  <X className="h-3.5 w-3.5" />
                  {t("all")}
                </Link>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{activeCat.name}</h1>
                <p className="mt-2 text-sm text-surface-dark-foreground/75">
                  {t("shopCategory", { count: counts[activeCat.id] ?? 0 })}
                </p>
              </div>
            </div>
          ) : (
            <div
              data-reveal="up"
              className="grid overflow-hidden rounded-[2rem] border border-border bg-surface-dark sm:rounded-[2.5rem] lg:grid-cols-2"
            >
              <div className="flex flex-col justify-center px-6 py-12 sm:px-12 sm:py-16">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t("title")}</p>
                <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-surface-dark-foreground sm:text-5xl">
                  {t("heroTitle")}
                </h1>
                <p className="mt-4 max-w-md text-base text-surface-dark-foreground/70">{t("heroSubtitle")}</p>
              </div>
              <div className="relative hidden items-center justify-center p-8 lg:flex">
                <div className="grid w-full max-w-md grid-cols-2 gap-4">
                  {featured.map((p, i) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className={cn(
                        "group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all hover:-translate-y-1 hover:border-white/25",
                        i === 0 && "col-span-2"
                      )}
                    >
                      <div
                        className={cn(
                          "relative flex items-center justify-center overflow-hidden bg-white/5",
                          i === 0 ? "aspect-[2/1]" : "aspect-square"
                        )}
                      >
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        ) : (
                          <ProductArt
                            kind={p.category.kind as ProductKind}
                            className="h-20 w-20 text-primary"
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 p-3">
                        <span className="truncate text-sm font-semibold text-surface-dark-foreground">
                          {p.name}
                        </span>
                        <span className="shrink-0 text-sm font-bold text-primary">
                          {formatMoney(p.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>

        {/* ---------- Category circles ---------- */}
        <Container className="pt-14">
          <h2 className="text-lg font-semibold text-foreground">{t("browse")}</h2>
          <div className="mt-6 flex gap-7 overflow-x-auto pb-2">
            <Link href={circleHref("all")} className="group flex shrink-0 flex-col items-center gap-2.5">
              <span
                className={cn(
                  "flex h-20 w-20 items-center justify-center rounded-full ring-2 transition-all group-hover:ring-primary",
                  category === "all" ? "bg-primary/10 ring-primary" : "bg-muted ring-transparent"
                )}
              >
                <LayoutGrid className="h-7 w-7 text-primary" />
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  category === "all" ? "text-primary" : "text-foreground"
                )}
              >
                {t("all")}
              </span>
            </Link>

            {categories.map((c) => (
              <Link key={c.id} href={circleHref(c.slug)} className="group flex shrink-0 flex-col items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-20 w-20 items-center justify-center overflow-hidden rounded-full ring-2 transition-all group-hover:ring-primary",
                    TINT_BG[c.tint] ?? "bg-muted",
                    category === c.slug ? "ring-primary" : "ring-transparent"
                  )}
                >
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <ProductArt
                      kind={c.kind as ProductKind}
                      className={cn("h-10 w-10", ART_COLOR[c.tint] ?? "text-primary")}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "max-w-[6rem] truncate text-sm font-medium",
                    category === c.slug ? "text-primary" : "text-foreground"
                  )}
                >
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </Container>

        {/* ---------- Sidebar + grid ---------- */}
        <Container className="pt-12">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar filters */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <form className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 pb-4">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">{t("filters")}</h3>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    name="q"
                    defaultValue={q}
                    placeholder={t("searchPlaceholder")}
                    className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                  />
                </div>

                {/* Category */}
                <fieldset className="mt-5 border-t border-border pt-4">
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("category")}
                  </legend>
                  <label className={radioRow}>
                    <input type="radio" name="category" value="all" defaultChecked={category === "all"} className="accent-[var(--primary)]" />
                    <span className="flex-1">{t("all")}</span>
                  </label>
                  {categories.map((c) => (
                    <label key={c.id} className={radioRow}>
                      <input type="radio" name="category" value={c.slug} defaultChecked={category === c.slug} className="accent-[var(--primary)]" />
                      <span className="flex-1">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{counts[c.id] ?? 0}</span>
                    </label>
                  ))}
                </fieldset>

                {/* Price */}
                <fieldset className="mt-5 border-t border-border pt-4">
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("priceRange")}
                  </legend>
                  {priceOptions.map((o) => (
                    <label key={o.value || "any"} className={radioRow}>
                      <input type="radio" name="price" value={o.value} defaultChecked={price === o.value} className="accent-[var(--primary)]" />
                      <span className="flex-1">{o.label}</span>
                    </label>
                  ))}
                </fieldset>

                {/* Sort */}
                <fieldset className="mt-5 border-t border-border pt-4">
                  <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("sortBy")}
                  </legend>
                  {sortOptions.map((o) => (
                    <label key={o.value} className={radioRow}>
                      <input type="radio" name="sort" value={o.value} defaultChecked={sort === o.value} className="accent-[var(--primary)]" />
                      <span className="flex-1">{o.label}</span>
                    </label>
                  ))}
                </fieldset>

                {/* In stock */}
                <label className="mt-5 flex cursor-pointer items-center gap-2.5 border-t border-border pt-4 text-sm">
                  <input type="checkbox" name="inStock" defaultChecked={inStock} className="h-4 w-4 rounded border-border accent-[var(--primary)]" />
                  {t("inStockOnly")}
                </label>

                <div className="mt-5 flex items-center gap-2">
                  <button
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    {t("apply")}
                  </button>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    {t("clear")}
                  </Link>
                </div>
              </form>
            </aside>

            {/* Grid */}
            <div>
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  {activeCat ? activeCat.name : t("title")}
                </h2>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {t("results", { count: products.length })}
                </span>
              </div>

              {products.length === 0 ? (
                <div className="mt-10 rounded-3xl border border-dashed border-border p-16 text-center">
                  <p className="text-muted-foreground">{t("empty")}</p>
                  <Link
                    href="/products"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    {t("clear")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-4">
                  {products.map((product, i) => (
                    <div
                      key={product.id}
                      data-reveal="up"
                      style={{ "--reveal-delay": `${(i % 3) * 70}ms` } as React.CSSProperties}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
