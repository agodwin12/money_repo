import { setRequestLocale, getTranslations } from "next-intl/server";
import { Mail, Phone, MapPin, Check, Plus } from "lucide-react";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { PhoneField } from "@/components/phone-field";
import { sendContact } from "@/lib/contact";
import { PHONE_NUMBER, whatsappHref } from "@/lib/contact-info";
import { cn } from "@/lib/utils";
import GB from "country-flag-icons/react/3x2/GB";
import IT from "country-flag-icons/react/3x2/IT";
import CH from "country-flag-icons/react/3x2/CH";
import DE from "country-flag-icons/react/3x2/DE";

export const dynamic = "force-dynamic";

const labelCls = "block text-sm font-medium text-foreground";
const inputCls =
  "mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30";

const BRANDS = ["NorthBank", "QuickMart", "CityCash", "RetailCo", "Vaultly", "PayPoint"];

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sent?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { sent } = await searchParams;
  const t = await getTranslations("Contact");

  const contacts = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("emailLabel"),
      value: t("email"),
      href: `mailto:${t("email")}`,
      accent: "bg-primary/10 text-primary",
    },
    {
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: t("whatsappLabel"),
      value: t("whatsapp"),
      href: whatsappHref(),
      external: true,
      accent: "bg-[#25D366]/15 text-[#128C3E]",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("phoneLabel"),
      value: t("phone"),
      href: `tel:${PHONE_NUMBER}`,
      accent: "bg-primary/10 text-primary",
    },
  ];
  const countries = [
    { Flag: GB, name: t("countryUk") },
    { Flag: IT, name: t("countryItaly") },
    { Flag: CH, name: t("countrySwitzerland") },
    { Flag: DE, name: t("countryGermany") },
  ];
  const faqs = [1, 2, 3, 4].map((n) => ({
    q: t(`faq${n}q` as "faq1q"),
    a: t(`faq${n}a` as "faq1a"),
  }));

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24 pt-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — heading + contact details */}
            <div data-reveal="left" className="lg:pt-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground">
                <Mail className="h-3.5 w-3.5 text-primary" />
                {t("eyebrow")}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-md text-base text-muted-foreground">{t("subtitle")}</p>

              <div className="mt-9 flex flex-col gap-5">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4"
                  >
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                        c.accent
                      )}
                    >
                      {c.icon}
                    </span>
                    <div>
                      <p className="text-sm text-muted-foreground">{c.label}</p>
                      <p className="text-base font-semibold text-foreground group-hover:text-primary">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Locations */}
              <div className="mt-8">
                <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {t("locationLabel")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {countries.map((c) => {
                    const F = c.Flag;
                    return (
                      <span
                        key={c.name}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
                      >
                        <span className="inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
                          <F className="block h-full w-full" />
                        </span>
                        {c.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right — form card */}
            <div
              data-reveal="right"
              className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.28)] sm:p-8"
            >
              {sent ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-7 w-7" />
                  </span>
                  <p className="mt-4 max-w-xs text-base font-medium text-foreground">{t("success")}</p>
                </div>
              ) : (
                <form action={sendContact} className="grid gap-5">
                  <input type="hidden" name="locale" value={locale} />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelCls}>
                        {t("firstName")} *
                      </label>
                      <input id="firstName" name="firstName" required className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelCls}>
                        {t("lastName")}
                      </label>
                      <input id="lastName" name="lastName" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelCls}>
                      {t("workEmail")} *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t("emailPlaceholder")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>{t("phoneField")}</label>
                    <PhoneField placeholder={t("phonePlaceholder")} />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelCls}>
                      {t("formMessage")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder={t("messagePlaceholder")}
                      className={inputCls}
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-fit items-center justify-center rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    {t("submit")}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Trusted by */}
          <div className="mt-20 border-t border-border pt-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">{t("trustedBy")}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {BRANDS.map((b) => (
                <span key={b} className="text-lg font-bold tracking-tight text-foreground/35">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("faqTitle")}
            </h2>
            <div className="mt-8 flex flex-col gap-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  data-reveal="up"
                  style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                  className="group rounded-2xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-foreground">
                    {f.q}
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-transform group-open:rotate-45">
                      <Plus className="h-4 w-4" />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
