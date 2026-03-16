import { defaultLocale, type Locale } from "@/lib/i18n/config";

export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}
