import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { ThreatLevel } from "@/components/dashboard/threat-level";
import { JourneyOf100 } from "@/components/dashboard/journey-of-100";
import { Ticker } from "@/components/dashboard/ticker";
import { Footer } from "@/components/layout/footer";
import { DashboardClient } from "@/app/[locale]/dashboard-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "header" });

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-panel focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-blanc focus:outline focus:outline-2 focus:outline-danger"
      >
        Skip to content
      </a>
      {/* Sticky tricolore + header */}
      <div className="sticky top-0 z-50">
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        <h1 className="sr-only">{t("title")}</h1>
        <ThreatLevel />
        <JourneyOf100 />
        <DashboardClient />
      </main>

      {/* Ticker */}
      <Ticker />

      {/* Footer */}
      <Footer />

      {/* Tricolore stripe — bottom */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
