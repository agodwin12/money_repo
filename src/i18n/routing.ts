import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales: English, German, Spanish
  locales: ["en", "de", "es"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
