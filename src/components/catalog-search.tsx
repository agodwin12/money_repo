"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

/**
 * Server-friendly GET search. Submits to the current URL, preserving the
 * active category via a hidden field. Works without JS.
 */
export function CatalogSearch({
  defaultValue,
  category,
}: {
  defaultValue?: string;
  category?: string;
}) {
  const t = useTranslations("Catalog");

  return (
    <form className="flex w-full max-w-md items-center gap-2">
      {category && category !== "all" && (
        <input type="hidden" name="category" value={category} />
      )}
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
          className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-12 shrink-0 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        {t("search")}
      </button>
    </form>
  );
}
