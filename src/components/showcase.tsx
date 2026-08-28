import { useTranslations } from "next-intl";
import { ArrowRight, Zap, ShieldCheck, Globe2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";

export function Showcase() {
  const t = useTranslations("Showcase");

  const specs = [
    { icon: Zap, label: t("spec1") },
    { icon: ShieldCheck, label: t("spec2") },
    { icon: Globe2, label: t("spec3") },
  ];

  return (
    <section className="w-full py-8 sm:py-12">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-surface-dark text-surface-dark-foreground sm:rounded-[2.5rem] lg:grid-cols-2">
          {/* Visual — real product photo (swap for your own at public/images/vaultmaster-5000.jpg) */}
          <div data-reveal="left" className="relative min-h-[18rem] overflow-hidden lg:min-h-[26rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/vaultmaster-5000.jpg"
              alt={t("title")}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/50 via-transparent to-transparent" />
          </div>

          {/* Copy */}
          <div data-reveal="right" className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/70">
              {t("eyebrow")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
            <p className="mt-4 max-w-md text-base text-surface-dark-foreground/70">{t("subtitle")}</p>

            <ul className="mt-8 space-y-3">
              {specs.map((sp) => (
                <li key={sp.label} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary-foreground">
                    <sp.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium">{sp.label}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/products/vaultmaster-5000"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:-translate-y-0.5"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
