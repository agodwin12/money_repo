import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ProductArt } from "@/components/product-art";
import type { ProductKind } from "@/lib/products";
import { getPublishedPosts } from "@/db/queries";
import { cn } from "@/lib/utils";

const FALLBACKS: { kind: ProductKind; tint: string; art: string }[] = [
  { kind: "counter", tint: "bg-tint-blue", art: "text-primary" },
  { kind: "detector", tint: "bg-tint-lavender", art: "text-[#2f9e6b]" },
  { kind: "scale", tint: "bg-tint-peach", art: "text-[#b8860b]" },
  { kind: "coin", tint: "bg-tint-mint", art: "text-[#15803d]" },
];

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guides");
  const posts = await getPublishedPosts(50);

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        <PageHero title={t("title")} subtitle={t("subtitle")} />

        <Container className="pt-16">
          {posts.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-border p-16 text-center text-muted-foreground">
              {t("empty")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => {
                const fb = FALLBACKS[i % FALLBACKS.length];
                return (
                  <Link
                    key={post.id}
                    href={`/guides/${post.slug}`}
                    data-reveal="up"
                    style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
                  >
                    {post.image ? (
                      <div className="aspect-[16/10] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className={cn("flex aspect-[16/10] items-center justify-center", fb.tint)}>
                        <ProductArt kind={fb.kind} className={cn("h-24 w-24", fb.art)} />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                        {post.tag}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {t("readMore")}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
