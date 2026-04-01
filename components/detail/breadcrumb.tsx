import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { localePath } from "@/lib/url";
import type { Locale } from "@/lib/i18n/config";

interface BreadcrumbProps {
  locale: Locale;
  moduleTitle: string;
}

export async function Breadcrumb({ locale, moduleTitle }: BreadcrumbProps) {
  const t = await getTranslations({ locale, namespace: "detail" });

  return (
    <nav className="mb-8 font-mono text-xs" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            href={localePath("/", locale)}
            className="text-blanc transition-colors hover:text-blanc"
          >
            {t("breadcrumbHome")}
          </Link>
        </li>
        <li className="text-blanc" aria-hidden="true">&gt;</li>
        <li className="text-blanc">{moduleTitle}</li>
      </ol>
    </nav>
  );
}
