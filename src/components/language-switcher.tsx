"use client";

import { useState, useRef, useEffect, type ComponentType } from "react";
import { useLocale } from "next-intl";
import { Check, ChevronDown } from "lucide-react";
import GB from "country-flag-icons/react/3x2/GB";
import DE from "country-flag-icons/react/3x2/DE";
import ES from "country-flag-icons/react/3x2/ES";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
};
const FLAGS: Record<string, ComponentType<{ className?: string; title?: string }>> = {
  en: GB,
  de: DE,
  es: ES,
};

function Flag({ locale, className }: { locale: string; className?: string }) {
  const F = FLAGS[locale] ?? GB;
  return (
    <span className={cn("inline-block shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10", className)}>
      <F className="block h-full w-full" />
    </span>
  );
}

export function LanguageSwitcher({ inline = false }: { inline?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: string) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  // Inline variant — used inside the mobile menu, where an absolute dropdown
  // would be clipped by the drawer's overflow. Shows all languages as a row.
  if (inline) {
    return (
      <div className="flex flex-wrap gap-2">
        {routing.locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              l === locale
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Flag locale={l} className="h-4 w-6" />
            {LABELS[l]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
      >
        <Flag locale={locale} className="h-4 w-6" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card p-1 shadow-lg shadow-black/5">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted",
                l === locale ? "font-semibold text-foreground" : "text-muted-foreground"
              )}
            >
              <Flag locale={l} className="h-4 w-6" />
              <span className="flex-1 text-left">{LABELS[l]}</span>
              {l === locale && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
