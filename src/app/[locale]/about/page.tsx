import { setRequestLocale, getTranslations } from "next-intl/server";
import { Target, ShieldCheck, Headphones, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";
import { cn } from "@/lib/utils";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const s = await getTranslations("Stats");
  const tc = await getTranslations("Common");

  const rows = [
    {
      img: "/images/about/dollars.jpg",
      alt: "US dollar banknotes",
      icon: Target,
      title: t("v1Title"),
      text: t("v1Text"),
      reverse: false,
    },
    {
      img: "/images/about/euro.jpg",
      alt: "Euro banknotes",
      icon: ShieldCheck,
      title: t("v2Title"),
      text: t("v2Text"),
      reverse: true,
    },
    {
      img: "/images/about/world.jpg",
      alt: "Currencies from around the world",
      icon: Headphones,
      title: t("v3Title"),
      text: t("v3Text"),
      reverse: false,
    },
  ];

  const stats = [
    { value: s("s1Value"), label: s("s1Label") },
    { value: s("s2Value"), label: s("s2Label") },
    { value: s("s3Value"), label: s("s3Label") },
    { value: s("s4Value"), label: s("s4Label") },
  ];

  const gallery = [
    { src: "/images/about/dollars.jpg", alt: "US dollars" },
    { src: "/images/about/euro.jpg", alt: "Euro" },
    { src: "/images/about/mixed.jpg", alt: "Mixed world currencies" },
    { src: "/images/about/rates.jpg", alt: "Currency exchange rates" },
  ];

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((st, i) => (
              <div
                key={st.label}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
              >
                <p className="text-2xl font-bold text-surface-dark-foreground sm:text-3xl">{st.value}</p>
                <p className="mt-1 text-xs text-surface-dark-foreground/60 sm:text-sm">{st.label}</p>
              </div>
            ))}
          </div>
        </PageHero>

        {/* Intro — lead + image */}
        <Container className="pt-14">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal="left" className="border-l-4 border-primary pl-6">
              <p className="text-xl font-medium leading-snug text-foreground sm:text-2xl">{t("lead")}</p>
            </div>

            <div data-reveal="right" className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl shadow-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/mixed.jpg"
                  alt="Currencies from around the world"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden w-44 overflow-hidden rounded-2xl border-4 border-background shadow-xl sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/rates.jpg"
                  alt="Currency exchange rates"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>

        {/* Alternating value rows */}
        <Container className="pt-28">
          <div className="flex flex-col gap-16 lg:gap-24">
            {rows.map((r, i) => (
              <div key={i} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div
                  data-reveal={r.reverse ? "right" : "left"}
                  className={cn(
                    "overflow-hidden rounded-[2rem] border border-border shadow-lg shadow-black/5",
                    r.reverse && "lg:order-2"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.alt} className="aspect-[4/3] w-full object-cover" />
                </div>
                <div
                  data-reveal={r.reverse ? "left" : "right"}
                  className={cn(r.reverse && "lg:order-1")}
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {r.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* Currency gallery */}
        <Container className="pt-28">
          <div className="mx-auto max-w-2xl text-center" data-reveal="up">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("galleryTitle")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t("gallerySubtitle")}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <div
                key={g.src}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="group overflow-hidden rounded-2xl border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.src}
                  alt={g.alt}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Container>

        {/* Mission + CTA */}
        <Container className="pt-28">
          <div className="max-w-2xl" data-reveal="up">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {t("missionTitle")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground">{t("missionText")}</p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {tc("shopNow")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
