import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/lib/i18n/routing";
import type { Locale } from "@/lib/i18n/config";
import "@/styles/globals.css";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale}>
      <body className="bg-[#0a0c10] text-gray-100 antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
