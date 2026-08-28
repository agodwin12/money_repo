import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { FeatureBanner } from "@/components/feature-banner";
import { BlogSection } from "@/components/blog-section";
import { Showcase } from "@/components/showcase";
import { SiteFooter } from "@/components/site-footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-col">
        <Hero />
        <ProductGrid />
        <FeatureBanner />
        <Showcase />
        <BlogSection />
      </main>
      <SiteFooter />
    </>
  );
}
