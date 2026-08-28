import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts } from "@/db/queries";

export async function ProductGrid() {
  const t = await getTranslations("Products");
  const products = await getFeaturedProducts(8);

  return (
    <section id="products" className="w-full py-8 sm:py-12">
      <Container>
        {/* Heading */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl" data-reveal="left">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t("subtitle")}</p>
          </div>
          <Link
            href="/products"
            data-reveal="right"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No products yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <div
                key={product.id}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 4) * 90}ms` } as React.CSSProperties}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
