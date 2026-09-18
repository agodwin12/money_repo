import { setRequestLocale, getTranslations } from "next-intl/server";
import {
  Clock,
  Globe2,
  PackageSearch,
  AlertTriangle,
  PackageX,
  ShieldCheck,
  RefreshCw,
  RotateCcw,
  AlertCircle,
  Check,
  X,
  Mail,
  ArrowRight,
  Truck,
  Zap,
  Rocket,
  Plane,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ShippingArt } from "@/components/shipping-art";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/contact-info";

export default async function ShippingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Shipping");
  const tc = await getTranslations("Contact");

  const shippingCards = [
    { icon: Clock, title: t("processTitle"), text: t("processText") },
    { icon: Globe2, title: t("destTitle"), text: t("destText") },
    { icon: PackageSearch, title: t("trackTitle"), text: t("trackText") },
    { icon: AlertTriangle, title: t("lostTitle"), text: t("lostText") },
    { icon: PackageX, title: t("damagedTitle"), text: t("damagedText") },
  ];
  const methods = [
    { icon: Truck, label: t("method1") },
    { icon: Zap, label: t("method2") },
    { icon: Rocket, label: t("method3") },
    { icon: Plane, label: t("method4") },
  ];
  const windowList = [t("windowList1"), t("windowList2"), t("windowList3"), t("windowList4")];
  const nonReturn = [
    t("nonReturn1"),
    t("nonReturn2"),
    t("nonReturn3"),
    t("nonReturn4"),
    t("nonReturn5"),
  ];
  const returnSteps = [t("s1"), t("s2"), t("s3"), t("s4")];
  const returnCards = [
    { icon: RefreshCw, title: t("costTitle"), text: t("costText") },
    { icon: RotateCcw, title: t("refundTitle"), text: t("refundText") },
    { icon: RotateCcw, title: t("exchangeTitle"), text: t("exchangeText") },
    { icon: AlertCircle, title: t("incorrectTitle"), text: t("incorrectText") },
  ];

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24">
        {/* Hero */}
        <Container className="pt-8">
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] border border-border bg-surface-dark px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-2">
            <div data-reveal="left">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {t("eyebrow")}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-surface-dark-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-md text-base text-surface-dark-foreground/70">{t("subtitle")}</p>
              <p className="mt-4 text-xs font-medium text-surface-dark-foreground/50">{t("effective")}</p>
            </div>
            <div data-reveal="right" className="flex justify-center lg:justify-end">
              <ShippingArt kind="delivery" className="h-56 w-full max-w-sm sm:h-72" />
            </div>
          </div>
        </Container>

        {/* Intro */}
        <Container className="pt-14">
          <p className="max-w-3xl text-lg leading-relaxed text-foreground" data-reveal="up">
            {t("intro")}
          </p>
        </Container>

        {/* Shipping policy */}
        <Container className="pt-16">
          <div className="max-w-2xl" data-reveal="left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("shippingHeading")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">{t("shippingLead")}</p>
          </div>

          {/* Methods panel */}
          <div
            data-reveal="up"
            className="mt-8 overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t("methodsTitle")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t("methodsText")}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {methods.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-2.5 rounded-2xl border border-border bg-muted/50 px-4 py-3"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <m.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping cards */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shippingCards.map((c, i) => (
              <div
                key={c.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>

        {/* Returns intro split */}
        <Container className="pt-20">
          <div className="grid items-center gap-8 rounded-[2.5rem] border border-border bg-surface-dark px-6 py-12 sm:px-12 lg:grid-cols-2">
            <div data-reveal="left">
              <h2 className="text-3xl font-bold tracking-tight text-surface-dark-foreground sm:text-4xl">
                {t("returnsHeading")}
              </h2>
              <p className="mt-3 max-w-md text-base text-surface-dark-foreground/70">{t("returnsLead")}</p>
            </div>
            <div data-reveal="right" className="flex justify-center lg:justify-end">
              <ShippingArt kind="returns" className="h-48 w-full max-w-xs sm:h-60" />
            </div>
          </div>
        </Container>

        {/* Eligibility + non-returnable */}
        <Container className="pt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div data-reveal="left" className="rounded-3xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">{t("windowTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("windowText")}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {windowList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div data-reveal="right" className="rounded-3xl border border-border bg-card p-7">
              <h3 className="text-lg font-semibold text-foreground">{t("nonReturnTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("nonReturnText")}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {nonReturn.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>

        {/* Quality guarantee banner */}
        <Container className="pt-6">
          <div
            data-reveal="up"
            className="flex flex-col items-start gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-7 sm:flex-row sm:items-center"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{t("guaranteeTitle")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("guaranteeText")}</p>
            </div>
            <Link
              href="/warranty"
              className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:ml-auto"
            >
              {t("guaranteeTitle")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>

        {/* How to request a return — stepper */}
        <Container className="pt-16">
          <div
            data-reveal="zoom"
            className="rounded-[2rem] bg-surface-dark px-6 py-12 text-surface-dark-foreground sm:px-12"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("stepsTitle")}</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {returnSteps.map((s, i) => (
                <li key={i} className="relative flex flex-col gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-sm text-surface-dark-foreground/80">{s}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-xs text-surface-dark-foreground/50">{t("stepsNote")}</p>
          </div>
        </Container>

        {/* Return detail cards */}
        <Container className="pt-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {returnCards.map((c, i) => (
              <div
                key={c.title}
                data-reveal="up"
                style={{ "--reveal-delay": `${(i % 2) * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        </Container>

        {/* Contact block */}
        <Container className="pt-16">
          <div
            data-reveal="up"
            className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-card p-8 sm:flex-row sm:items-center sm:p-10"
          >
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {t("contactHeading")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("contactText")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={`mailto:${tc("email")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <Mail className="h-4 w-4 text-primary" />
                {tc("email")}
              </a>
            </div>
          </div>
        </Container>

        <Container className="pt-10">
          <Link
            href="/products"
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
