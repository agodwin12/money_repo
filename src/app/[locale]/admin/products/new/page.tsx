import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/db/queries";
import { createProduct } from "@/lib/actions";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function NewProduct({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">New product</h1>

      {categories.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          Create a category first before adding products.{" "}
          <Link href="/admin/categories" className="font-semibold text-primary">
            Go to categories
          </Link>
        </p>
      ) : (
        <div className="mt-6">
          <ProductForm action={createProduct} categories={categories} submitLabel="Create product" />
        </div>
      )}
    </div>
  );
}
