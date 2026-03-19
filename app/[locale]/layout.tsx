import type { ReactNode } from "react";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { JetBrains_Mono, Oswald } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { locales, type Locale } from "@/lib/i18n/config";
import { buildSeoMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import "@/styles/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

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

  return buildSeoMetadata({
    title: t("title"),
    description: t("description"),
    locale: locale as Locale,
    path: "/",
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    <html
      lang={typedLocale}
      className={`${jetbrainsMono.variable} ${oswald.variable}`}
    >
      <body className="bg-background text-gray-100 font-mono antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "impots.tax",
                  url: siteConfig.url,
                  inLanguage: typedLocale === "fr" ? "fr-FR" : "en-US",
                  description:
                    typedLocale === "fr"
                      ? "Centre de commandement fiscal — données réelles sur les impôts en France"
                      : "French Tax Threat Monitor — real data on taxes in France",
                },
                {
                  "@type": "Organization",
                  name: "impots.tax",
                  url: siteConfig.url,
                  logo: `${siteConfig.url}/logo.svg`,
                  sameAs: [siteConfig.social.x, siteConfig.social.github],
                },
              ],
            }),
          }}
        />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
