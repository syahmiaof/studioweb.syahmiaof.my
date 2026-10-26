import { msTranslations } from "./ms";
import { enTranslations } from "./en";
import { zhTranslations } from "./zh";
import { Locale } from "../lib/types";

export type Translations = typeof msTranslations | typeof enTranslations | typeof zhTranslations;

export function getTranslations(locale: Locale): Translations {
  return locale === "zh-Hans" ? zhTranslations : locale === "en" ? enTranslations : msTranslations;
}

export const SUPPORTED_LOCALES: Locale[] = ["ms", "en", "zh-Hans"];
export const DEFAULT_LOCALE: Locale = "ms";
