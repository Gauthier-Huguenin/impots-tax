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
            className="text-muted transition-colors hover:text-slate-300"
          >
            {t("breadcrumbHome")}
          </Link>
        </li>
        <li className="text-muted" aria-hidden="true">&gt;</li>
        <li className="text-slate-300">{moduleTitle}</li>
      </ol>
    </nav>
  );
}
