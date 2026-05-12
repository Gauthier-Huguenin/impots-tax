import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import { siteConfig } from "@/lib/config";
import { ReportButton } from "@/components/report/report-modal";
import { DonateLink } from "@/components/layout/donate-link";
import { getLocale } from "next-intl/server";
import { localePath } from "@/lib/url";
import type { Locale } from "@/lib/i18n/config";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = (await getLocale()) as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-panel px-4 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-xs text-blanc sm:flex-row sm:justify-between">
        <p className="text-center">{t("disclaimer")}</p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-umami-event="outbound-click"
            data-umami-event-url={siteConfig.social.github}
            className="flex items-center gap-1.5 text-blanc transition-colors hover:text-blanc"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </a>

          <NextLink
            href={localePath("/blog", locale)}
            className="font-mono text-slate-300 transition-colors hover:text-blanc"
          >
            {t("blog")}
          </NextLink>

          <ReportButton />

          <DonateLink
            source="footer"
            className="font-mono text-favorable/60 transition-colors hover:text-favorable"
          >
            {t("donate")}
          </DonateLink>

          <span>{t("copyright", { year })}</span>
        </div>
      </div>
    </footer>
  );
}
