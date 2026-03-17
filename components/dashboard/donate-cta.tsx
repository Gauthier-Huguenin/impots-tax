import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { localePath } from "@/lib/url";
import type { Locale } from "@/lib/i18n/config";

export async function DonateCta() {
  const t = await getTranslations("dashboardDonate");
  const locale = await getLocale() as Locale;

  return (
    <div className="rounded border border-favorable/20 bg-panel p-5 sm:p-6 scanlines">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-favorable">
            {t("title")}
          </h3>
          <p className="mt-1 font-mono text-xs text-gray-500">
            {t("desc")}
          </p>
        </div>
        <Link
          href={localePath("/donate", locale)}
          className="shrink-0 rounded border border-favorable/30 bg-favorable/5 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-favorable transition-all hover:bg-favorable/15 hover:border-favorable/50"
        >
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}
