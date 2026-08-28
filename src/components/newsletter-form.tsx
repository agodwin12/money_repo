"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { subscribe, type SubscribeState } from "@/lib/newsletter";

export function NewsletterForm() {
  const t = useTranslations("Newsletter");
  const [state, action, pending] = useActionState<SubscribeState, FormData>(
    subscribe,
    { status: "idle" }
  );

  if (state.status === "ok") {
    return (
      <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-medium text-primary">
        <Check className="h-4 w-4" />
        {t("thanks")}
      </div>
    );
  }

  return (
    <form action={action} className="w-full max-w-md">
      <div className="flex items-center gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="h-12 w-full rounded-full border border-border bg-card px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? t("sending") : t("cta")}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {(state.status === "invalid" || state.status === "error") && (
        <p className="mt-2 px-2 text-xs text-red-600">
          {state.status === "invalid" ? t("invalid") : t("error")}
        </p>
      )}
    </form>
  );
}
