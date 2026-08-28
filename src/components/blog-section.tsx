import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { ProductArt } from "@/components/product-art";
import type { ProductKind } from "@/lib/products";
import { getPublishedPosts } from "@/db/queries";
import { cn } from "@/lib/utils";

// Fallback illustration styling when a guide has no cover image.
const FALLBACKS: { kind: ProductKind; tint: string; art: string }[] = [
  { kind: "counter", tint: "bg-tint-blue", art: "text-primary" },
  { kind: "detector", tint: "bg-tint-lavender", art: "text-[#2f9e6b]" },
  { kind: "scale", tint: "bg-tint-peach", art: "text-[#b8860b]" },
];
const REVEALS = ["up-left", "up", "up-right"];

export async function BlogSection() {
  const t = await getTranslations("Blog");
  const posts = await getPublishedPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-12">
      <Container>
        <div className="max-w-2xl" data-reveal="left">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t("eyebrow")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post, i) => {
            const fb = FALLBACKS[i % FALLBACKS.length];
            return (
              <Link
                key={post.id}
                href={`/guides/${post.slug}`}
                data-reveal={REVEALS[i % REVEALS.length]}
                style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
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
                    <ProductArt kind={fb.kind} className={cn("h-28 w-28", fb.art)} />
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
      </Container>
    </section>
  );
}
