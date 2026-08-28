import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/container";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");

  return (
    <>
      <SiteHeader />
      <main className="w-full pb-24 pt-10">
        <Container>
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <CheckoutClient />
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
