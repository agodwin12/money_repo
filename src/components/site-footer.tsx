import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { NewsletterForm } from "@/components/newsletter-form";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const n = useTranslations("Newsletter");
  const tc = useTranslations("Common");
  const year = new Date().getFullYear();

  const columns = [
    {
      title: t("shop"),
      links: [
        { label: t("shopLinks.counters"), href: "/products?category=bill-counters" },
        { label: t("shopLinks.detectors"), href: "/products?category=counterfeit-detectors" },
        { label: t("shopLinks.coin"), href: "/products?category=coin-sorters" },
        { label: t("shopLinks.scales"), href: "/products?category=counting-scales" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("companyLinks.about"), href: "/about" },
        { label: t("companyLinks.reviews"), href: "/reviews" },
        { label: t("companyLinks.blog"), href: "/guides" },
        { label: t("companyLinks.contact"), href: "/contact" },
      ],
    },
    {
      title: t("support"),
      links: [
        { label: t("supportLinks.shipping"), href: "/shipping" },
        { label: t("supportLinks.warranty"), href: "/warranty" },
        { label: t("supportLinks.faq"), href: "/contact" },
        { label: t("supportLinks.help"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="w-full pt-8">
      {/* Newsletter */}
      <Container>
        <div
          data-reveal="zoom"
          className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-muted px-6 py-10 sm:flex-row sm:items-center sm:px-12"
        >
          <div className="max-w-md">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{n("title")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{n("subtitle")}</p>
          </div>
          <NewsletterForm />
        </div>
      </Container>

      {/* Footer body */}
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" aria-label={tc("brand")} className="inline-flex">
              <Logo className="h-16 w-16" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t("tagline")}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          © {year} {tc("brand")}. {t("rights")}
        </div>
      </Container>
    </footer>
  );
}
