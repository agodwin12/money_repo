import { setRequestLocale } from "next-intl/server";
import { Package, Tags, Star, EyeOff, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getAllProducts, getCategories } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const featured = products.filter((p) => p.featured).length;
  const drafts = products.filter((p) => p.status === "draft").length;

  const stats = [
    { label: "Products", value: products.length, icon: Package },
    { label: "Categories", value: categories.length, icon: Tags },
    { label: "Featured", value: featured, icon: Star },
    { label: "Drafts", value: drafts, icon: EyeOff },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your store content.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
          New product
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <s.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Manage products
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Manage categories
        </Link>
      </div>

    </div>
  );
}
