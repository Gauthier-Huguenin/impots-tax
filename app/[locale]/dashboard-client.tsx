"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionNav } from "@/components/dashboard/section-nav";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { TaxBrackets } from "@/components/dashboard/tax-brackets";
import { CorporateTax } from "@/components/dashboard/corporate-tax";
import { FlatTax } from "@/components/dashboard/flat-tax";
import { TVA } from "@/components/dashboard/tva";
import { SalaryCost } from "@/components/dashboard/salary-cost";
import { FuelTax } from "@/components/dashboard/fuel-tax";
import { BehavioralTax } from "@/components/dashboard/behavioral-tax";
import { WelfareSystem } from "@/components/dashboard/welfare-system";
import { MacroIndicators } from "@/components/dashboard/macro-indicators";
import { PropertyTax } from "@/components/dashboard/property-tax";
import { RentalTax } from "@/components/dashboard/rental-tax";
import { InheritanceTax } from "@/components/dashboard/inheritance-tax";
import { CapitalGains } from "@/components/dashboard/capital-gains";
import { HighwayTolls } from "@/components/dashboard/highway-tolls";
import { RailwayTolls } from "@/components/dashboard/railway-tolls";
import { OECDComparison } from "@/components/dashboard/oecd-comparison";
import { TimelinePanel } from "@/components/dashboard/timeline-panel";
import { DetailModal } from "@/components/ui/detail-modal";
import { IncomeTaxDetail } from "@/components/detail/income-tax-detail";
import { CorporateTaxDetail } from "@/components/detail/corporate-tax-detail";
import { FlatTaxDetail } from "@/components/detail/flat-tax-detail";
import { VatDetail } from "@/components/detail/vat-detail";
import { SalaryContributionsDetail } from "@/components/detail/salary-contributions-detail";
import { FuelTaxDetail } from "@/components/detail/fuel-tax-detail";
import { BehavioralTaxDetail } from "@/components/detail/behavioral-tax-detail";
import { WelfareSystemDetail } from "@/components/detail/welfare-system-detail";
import { IndicatorsDetail } from "@/components/detail/indicators-detail";
import { PropertyTaxDetail } from "@/components/detail/property-tax-detail";
import { RentalTaxDetail } from "@/components/detail/rental-tax-detail";
import { InheritanceTaxDetail } from "@/components/detail/inheritance-tax-detail";
import { CapitalGainsDetail } from "@/components/detail/capital-gains-detail";
import { HighwayTollsDetail } from "@/components/detail/highway-tolls-detail";
import { RailwayTollsDetail } from "@/components/detail/railway-tolls-detail";
import { ComparisonDetail } from "@/components/detail/comparison-detail";
import { DonateDetail } from "@/components/detail/donate-detail";
import { DonateCta } from "@/components/dashboard/donate-cta";
import { DonateHook } from "@/components/dashboard/donate-hook";
import {
  trackPanelClick,
  trackDonateOpen,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/lib/analytics";

type ModalSlug =
  | "income-tax"
  | "corporate-tax"
  | "flat-tax"
  | "vat"
  | "salary-contributions"
  | "fuel-tax"
  | "behavioral-tax"
  | "welfare-system"
  | "indicators"
  | "property-tax"
  | "rental-tax"
  | "inheritance-tax"
  | "capital-gains"
  | "highway-tolls"
  | "railway-tolls"
  | "comparison"
  | "donate";

const MODAL_CONTENT: Record<ModalSlug, React.ComponentType> = {
  "income-tax": IncomeTaxDetail,
  "corporate-tax": CorporateTaxDetail,
  "flat-tax": FlatTaxDetail,
  "vat": VatDetail,
  "salary-contributions": SalaryContributionsDetail,
  "fuel-tax": FuelTaxDetail,
  "behavioral-tax": BehavioralTaxDetail,
  "welfare-system": WelfareSystemDetail,
  "indicators": IndicatorsDetail,
  "property-tax": PropertyTaxDetail,
  "rental-tax": RentalTaxDetail,
  "inheritance-tax": InheritanceTaxDetail,
  "capital-gains": CapitalGainsDetail,
  "highway-tolls": HighwayTollsDetail,
  "railway-tolls": RailwayTollsDetail,
  "comparison": ComparisonDetail,
  "donate": DonateDetail,
};

const HASH_MODAL_MAP: Record<string, ModalSlug> = { donate: "donate" };

let hashInitialized = false;

export function DashboardClient() {
  const [openModal, setOpenModal] = useState<ModalSlug | null>(null);
  const scrollFired = useRef(new Set<number>());
  const timeFired = useRef(new Set<number>());

  const open = (slug: ModalSlug) => () => {
    trackPanelClick(slug);
    if (slug === "donate") trackDonateOpen("panel");
    setOpenModal(slug);
  };

  const close = () => {
    setOpenModal(null);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  const checkHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    const slug = HASH_MODAL_MAP[hash];
    if (slug) {
      if (slug === "donate") trackDonateOpen("hash");
      setOpenModal(slug);
    }
  }, []);

  // Initialize from hash on page load (only on first render)
  useEffect(() => {
    if (!hashInitialized) {
      hashInitialized = true;
      checkHash();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen to hash changes
  useEffect(() => {
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [checkHash]);

  // P0: Scroll depth tracking (25/50/75/100%)
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);
      for (const threshold of [25, 50, 75, 100]) {
        if (percent >= threshold && !scrollFired.current.has(threshold)) {
          scrollFired.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // P0: Time on page tracking (30s, 60s, 120s)
  useEffect(() => {
    const timers = [30, 60, 120].map((seconds) =>
      setTimeout(() => {
        if (!timeFired.current.has(seconds)) {
          timeFired.current.add(seconds);
          trackTimeOnPage(seconds);
        }
      }, seconds * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const DetailComponent = openModal ? MODAL_CONTENT[openModal] : null;

  const t = useTranslations("sectionNav");

  const sections = [
    { id: "direct-taxes", label: t("directTaxes") },
    { id: "indirect-taxes", label: t("indirectTaxes") },
    { id: "income-welfare", label: t("incomeWelfare") },
    { id: "real-estate", label: t("realEstate") },
    { id: "wealth-transfer", label: t("wealthTransfer") },
    { id: "infrastructure", label: t("infrastructure") },
  ];

  return (
    <>
      {/* P1: Donate CTA right after hero */}
      <DonateHook onOpenDetail={open("donate")} />

      {/* Section navigation */}
      <SectionNav sections={sections} />

      {/* Dashboard grid */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Direct Taxes */}
        <section id="direct-taxes" className="scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-danger" />
            {t("directTaxes")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TaxBrackets onOpenDetail={open("income-tax")} />
            <OECDComparison onOpenDetail={open("comparison")} />
            <CorporateTax onOpenDetail={open("corporate-tax")} />
            <FlatTax onOpenDetail={open("flat-tax")} />
          </div>
        </section>

        {/* Indirect Taxes */}
        <section id="indirect-taxes" className="mt-8 scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-warning" />
            {t("indirectTaxes")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <TVA onOpenDetail={open("vat")} />
            </div>
            <FuelTax onOpenDetail={open("fuel-tax")} />
            <BehavioralTax onOpenDetail={open("behavioral-tax")} />
          </div>
        </section>

        {/* Income & Welfare */}
        <section id="income-welfare" className="mt-8 scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-favorable" />
            {t("incomeWelfare")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <SalaryCost onOpenDetail={open("salary-contributions")} />
            </div>
            <WelfareSystem onOpenDetail={open("welfare-system")} />
            <MacroIndicators onOpenDetail={open("indicators")} />
          </div>
        </section>

        {/* Real Estate */}
        <section id="real-estate" className="mt-8 scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-blanc" />
            {t("realEstate")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <PropertyTax onOpenDetail={open("property-tax")} />
            <RentalTax onOpenDetail={open("rental-tax")} />
          </div>
        </section>

        {/* Wealth Transfer */}
        <section id="wealth-transfer" className="mt-8 scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-danger" />
            {t("wealthTransfer")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <InheritanceTax onOpenDetail={open("inheritance-tax")} />
            <CapitalGains onOpenDetail={open("capital-gains")} />
          </div>
        </section>

        {/* Infrastructure */}
        <section id="infrastructure" className="mt-8 scroll-mt-28">
          <h3 className="mb-6 flex items-center gap-3 font-display text-sm font-black uppercase tracking-wider text-blanc sm:text-base">
            <span className="inline-block h-4 w-1 bg-muted" />
            {t("infrastructure")}
          </h3>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <HighwayTolls onOpenDetail={open("highway-tolls")} />
            <RailwayTolls onOpenDetail={open("railway-tolls")} />
          </div>
        </section>

        {/* Timeline & CTA */}
        <div className="mt-8 grid grid-cols-1 gap-5">
          <TimelinePanel />
          <DonateCta onOpenDetail={open("donate")} />
        </div>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop label={t("backToTop")} />

      {/* Detail modal */}
      <DetailModal open={openModal !== null} onClose={close}>
        {DetailComponent && <DetailComponent />}
      </DetailModal>
    </>
  );
}
