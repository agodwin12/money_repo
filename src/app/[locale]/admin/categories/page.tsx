import { setRequestLocale } from "next-intl/server";
import { Pencil } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCategories, getProductCountByCategory } from "@/db/queries";
import { createCategory, deleteCategory } from "@/lib/actions";
import { CategoryForm } from "@/components/admin/category-form";
import { DeleteButton } from "@/components/admin/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminCategories({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [categories, counts] = await Promise.all([
    getCategories(),
    getProductCountByCategory(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Categories</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Products on the storefront are grouped and filtered by these.
      </p>

      {/* Create */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Add category</h2>
        <CategoryForm action={createCategory} submitLabel="Add category" compact />
      </div>

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Illustration</th>
                <th className="px-4 py-3 font-medium">Tint</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => {
                const count = counts[c.id] ?? 0;
                return (
                  <tr key={c.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {c.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.image} alt="" className="h-10 w-14 rounded-lg object-cover" />
                        ) : (
                          <span className="flex h-10 w-14 items-center justify-center rounded-lg bg-muted text-[10px] text-muted-foreground">
                            {c.tint}
                          </span>
                        )}
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">/{c.slug}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.kind}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.tint}</td>
                    <td className="px-4 py-3 text-muted-foreground">{count}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/${c.id}/edit`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteCategory.bind(null, c.id)}
                          confirmText={
                            count > 0
                              ? `Delete "${c.name}"? This will also permanently delete its ${count} product(s). This cannot be undone.`
                              : `Delete category "${c.name}"?`
                          }
                          iconOnly
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
