import { redirect } from "next/navigation";
import type { Locale } from "@/lib/types";

export type LegacySearchParams = Record<
  string,
  string | string[] | undefined
>;
export type LegacySectionPageProps = { searchParams?: LegacySearchParams };

export function redirectLegacySection(
  locale: Locale,
  section: string,
  searchParams: LegacySearchParams = {},
): never {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    else if (value !== undefined) query.set(key, value);
  }
  const prefix = locale === "en" ? "/en" : "/";
  const search = query.toString();
  redirect(`${prefix}${search ? `?${search}` : ""}#${section}`);
}
