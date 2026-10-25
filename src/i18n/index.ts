import { msTranslations } from "./ms";
import { enTranslations } from "./en";
import { Locale } from "../lib/types";

export type Translations = typeof msTranslations;

export function getTranslations(locale: Locale): Translations {
  return locale === "en" ? enTranslations : msTranslations;
}

export const SUPPORTED_LOCALES: Locale[] = ["ms", "en"];
export const DEFAULT_LOCALE: Locale = "ms";
