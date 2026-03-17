import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { ThreatLevel } from "@/components/dashboard/threat-level";
import { JourneyOf100 } from "@/components/dashboard/journey-of-100";
import { TaxBrackets } from "@/components/dashboard/tax-brackets";
import { CorporateTax } from "@/components/dashboard/corporate-tax";
import { FlatTax } from "@/components/dashboard/flat-tax";
import { TVA } from "@/components/dashboard/tva";
import { SalaryCost } from "@/components/dashboard/salary-cost";
import { FuelTax } from "@/components/dashboard/fuel-tax";
import { BehavioralTax } from "@/components/dashboard/behavioral-tax";
import { WelfareSystem } from "@/components/dashboard/welfare-system";
import { OECDComparison } from "@/components/dashboard/oecd-comparison";
import { MacroIndicators } from "@/components/dashboard/macro-indicators";
import { PropertyTax } from "@/components/dashboard/property-tax";
import { RentalTax } from "@/components/dashboard/rental-tax";
import { InheritanceTax } from "@/components/dashboard/inheritance-tax";
import { CapitalGains } from "@/components/dashboard/capital-gains";
import { HighwayTolls } from "@/components/dashboard/highway-tolls";
import { RailwayTolls } from "@/components/dashboard/railway-tolls";
import { Timeline } from "@/components/dashboard/timeline";
import { DonateCta } from "@/components/dashboard/donate-cta";
import { Ticker } from "@/components/dashboard/ticker";
import { Footer } from "@/components/layout/footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "header" });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Tricolore stripe — top */}
      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        <h1 className="sr-only">{t("title")}</h1>
        <ThreatLevel />
        <JourneyOf100 />

        {/* Dashboard grid */}
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TaxBrackets />
            <CorporateTax />
            <FlatTax />
            <TVA />

            <div className="md:col-span-2">
              <SalaryCost />
            </div>

            <FuelTax />
            <BehavioralTax />
            <WelfareSystem />
            <MacroIndicators />

            <PropertyTax />
            <RentalTax />
            <InheritanceTax />
            <CapitalGains />
            <HighwayTolls />
            <RailwayTolls />

            <div className="md:col-span-2">
              <OECDComparison />
            </div>

            <div className="md:col-span-2">
              <Timeline />
            </div>

            <div className="md:col-span-2">
              <DonateCta />
            </div>
          </div>
        </div>
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
