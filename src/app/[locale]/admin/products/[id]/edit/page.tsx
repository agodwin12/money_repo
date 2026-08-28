import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategories, getProductById } from "@/db/queries";
import { updateProduct } from "@/lib/actions";
import { ProductForm, type ProductInitial } from "@/components/admin/product-form";

export const dynamic = "force-dynamic";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();

  const [product, categories] = await Promise.all([
    getProductById(productId),
    getCategories(),
  ]);
  if (!product) notFound();

  const initial: ProductInitial = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.priceCents / 100,
    categoryId: product.categoryId,
    image: product.image ?? "",
    rating: product.ratingTenths / 10,
    reviews: product.reviews,
    badge: product.badge ?? "",
    stock: product.stock,
    featured: product.featured,
    status: product.status,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        Edit: {product.name}
      </h1>

      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, productId)}
          categories={categories}
          initial={initial}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
