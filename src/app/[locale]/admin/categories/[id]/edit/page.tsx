import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategoryById } from "@/db/queries";
import { updateCategory } from "@/lib/actions";
import { CategoryForm, type CategoryInitial } from "@/components/admin/category-form";

export const dynamic = "force-dynamic";

export default async function EditCategory({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const categoryId = Number(id);
  if (!Number.isInteger(categoryId)) notFound();

  const category = await getCategoryById(categoryId);
  if (!category) notFound();

  const initial: CategoryInitial = {
    name: category.name,
    slug: category.slug,
    kind: category.kind,
    tint: category.tint,
    image: category.image ?? "",
    sortOrder: category.sortOrder,
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to categories
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
        Edit: {category.name}
      </h1>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <CategoryForm
          action={updateCategory.bind(null, categoryId)}
          initial={initial}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
