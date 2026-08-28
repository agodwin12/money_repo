import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, Tags, Newspaper, ShoppingCart, Inbox, Store, LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";
import { Logo } from "@/components/logo";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Defense in depth (middleware already guards these routes).
  const session = await getSession();
  if (!session) redirect(`/${locale}/login`);

  const nav = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: Tags },
    { href: "/admin/posts", label: "Guides", icon: Newspaper },
    { href: "/admin/messages", label: "Messages", icon: Inbox },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card p-4 md:flex">
        <Link href="/admin" aria-label="Money Store" className="mb-6 flex items-center gap-2 px-2">
          <Logo className="h-10 w-10" />
          <span className="text-sm font-semibold text-muted-foreground">Admin</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <n.icon className="h-[18px] w-[18px]" />
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Store className="h-[18px] w-[18px]" />
            View store
          </Link>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-muted px-3 py-2">
            <span className="truncate text-xs text-muted-foreground" title={session.email}>
              {session.email}
            </span>
            <form action={logout}>
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                aria-label="Sign out"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-foreground transition-colors hover:text-primary"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center gap-4 border-b border-border bg-card px-4 py-3 md:hidden">
          <Link href="/admin" aria-label="Money Store" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold">Admin</span>
          </Link>
          <nav className="flex gap-3 text-sm text-muted-foreground">
            <Link href="/admin/orders">Orders</Link>
            <Link href="/admin/products">Products</Link>
            <Link href="/admin/categories">Categories</Link>
            <Link href="/admin/posts">Guides</Link>
            <Link href="/">Store</Link>
          </nav>
        </div>
        <main className="mx-auto w-full max-w-6xl p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
