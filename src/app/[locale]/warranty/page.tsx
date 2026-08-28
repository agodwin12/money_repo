import { setRequestLocale, getTranslations } from "next-intl/server";
import { ShieldCheck, Ban, Headphones, Wrench, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/page-hero";

export default async function WarrantyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Warranty");

  const cards = [
    { icon: ShieldCheck, title: t("c1Title"), text: t("c1Text") },
    { icon: Ban, title: t("c2Title"), text: t("c2Text") },
    { icon: Headphones, title: t("c3Title"), text: t("c3Text") },
    { icon: Wrench, title: t("c4Title"), text: t("c4Text") },
  ];
  const steps = [t("s1"), t("s2"), t("s3"), t("s4")];

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Container className="pt-16">
          <p className="max-w-3xl text-lg leading-relaxed text-foreground" data-reveal="up">
            {t("lead")}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <div
                key={c.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>

        {/* Steps */}
        <Container className="pt-16">
          <div
            data-reveal="zoom"
            className="rounded-[2rem] bg-surface-dark px-6 py-12 text-surface-dark-foreground sm:px-12"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("stepsTitle")}</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={i} className="flex flex-col gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm text-surface-dark-foreground/80">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>

        <Container className="pt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
