import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";

export function FeatureBanner() {
  const t = useTranslations("Feature");
  const s = useTranslations("Stats");

  const stats = [
    { value: s("s1Value"), label: s("s1Label") },
    { value: s("s2Value"), label: s("s2Label") },
    { value: s("s3Value"), label: s("s3Label") },
    { value: s("s4Value"), label: s("s4Label") },
  ];

  return (
    <section className="w-full py-8 sm:py-12">
      <Container>
        <div
          data-reveal="zoom"
          className="relative overflow-hidden rounded-[2rem] bg-surface-dark px-6 py-12 text-surface-dark-foreground sm:rounded-[2.5rem] sm:px-12 sm:py-16"
        >
          {/* Glow accents */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl" data-reveal="left">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
                {t("eyebrow")}
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-base text-surface-dark-foreground/70">{t("subtitle")}</p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:gap-x-12">
              {stats.map((st, i) => (
                <div
                  key={st.label}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
                >
                  <p className="text-3xl font-bold sm:text-4xl">{st.value}</p>
                  <p className="mt-1 text-sm text-surface-dark-foreground/60">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
