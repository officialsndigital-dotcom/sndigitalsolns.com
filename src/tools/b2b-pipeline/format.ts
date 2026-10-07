export const CURRENCIES = [
  { code: "USD", locale: "en-US" },
  { code: "INR", locale: "en-IN" },
  { code: "AED", locale: "en-AE" },
  { code: "GBP", locale: "en-GB" },
  { code: "EUR", locale: "en-IE" },
  { code: "CAD", locale: "en-CA" },
  { code: "AUD", locale: "en-AU" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];

export function money(n: number, currency: CurrencyCode) {
  const locale = CURRENCIES.find((c) => c.code === currency)?.locale ?? "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(Math.round(n));
}

/** Whole numbers stay whole; expected (fractional) counts show one decimal. */
export function count(n: number) {
  return Number.isInteger(n) ? n.toLocaleString("en-US") : n.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export const pct = (f: number) => `${(f * 100).toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
