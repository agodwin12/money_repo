"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useCart } from "@/components/cart/cart-context";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  const [open, setOpen] = useState(false);
  const { count, open: openCart, ready } = useCart();

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
    { href: "/shipping", label: t("shipping") },
    { href: "/reviews", label: t("reviews") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Brand */}
          <Link href="/" aria-label={tc("brand")} className="flex items-center">
            <Logo className="h-11 w-11" />
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={tc("search")}
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <button
              type="button"
              aria-label={tc("cart")}
              onClick={openCart}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {ready && count > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
            {/* Mobile menu button */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground/80 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[34rem]" : "max-h-0 border-t-0"
        )}
      >
        <Container className="py-4">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-border px-1 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tc("language")}
            </p>
            <LanguageSwitcher inline />
          </div>
        </Container>
      </div>
    </header>
  );
}
