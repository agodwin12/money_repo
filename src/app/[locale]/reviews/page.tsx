import { setRequestLocale, getTranslations } from "next-intl/server";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { ReviewsMarquee } from "@/components/reviews-marquee";

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Reviews");

  const reviews = [1, 2, 3, 4].map((n) => ({
    quote: t(`r${n}Quote`),
    name: t(`r${n}Name`),
    role: t(`r${n}Role`),
  }));

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Container className="pt-16">
          <div className="grid gap-6 md:grid-cols-2">
            {reviews.map((r, i) => (
              <figure
                key={r.name}
                data-reveal={i % 2 === 0 ? "left" : "right"}
                style={{ "--reveal-delay": `${Math.floor(i / 2) * 90}ms` } as React.CSSProperties}
                className="flex flex-col rounded-3xl border border-border bg-card p-7"
              >
                <Quote className="h-8 w-8 text-primary/30" />
                <blockquote className="mt-3 flex-1 text-lg font-medium leading-relaxed text-foreground">
                  “{r.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <div>
                    <figcaption className="text-sm font-semibold text-foreground">{r.name}</figcaption>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </Container>

        {/* Animated wall of 100+ reviews drifting across the screen */}
        <section className="w-full overflow-hidden pt-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center" data-reveal="up">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("wallTitle")}
              </h2>
              <p className="mt-3 text-base text-muted-foreground">{t("wallSubtitle")}</p>
            </div>
          </Container>

          <div className="relative mt-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-28" />
            <ReviewsMarquee />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
