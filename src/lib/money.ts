/**
 * Single source of truth for currency formatting.
 * The locale is pinned so the server and client always render the same string
 * (an unpinned locale can differ between them and cause hydration mismatches).
 */
const LOCALE = "en-US";
const SYMBOL = "€";

/** Format an amount given in major units (euros). */
export function formatMoney(amount: number): string {
  return `${SYMBOL}${amount.toLocaleString(LOCALE, {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format an amount given in cents. */
export function formatMoneyCents(cents: number): string {
  return formatMoney(cents / 100);
}
