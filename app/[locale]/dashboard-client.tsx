"use client";

import { useState, useEffect, useCallback } from "react";
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
import { Timeline } from "@/components/dashboard/timeline";
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

export function DashboardClient() {
  const [openModal, setOpenModal] = useState<ModalSlug | null>(null);

  const open = (slug: ModalSlug) => () => setOpenModal(slug);
  const close = () => {
    setOpenModal(null);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  const checkHash = useCallback(() => {
    const hash = window.location.hash.slice(1);
    const slug = HASH_MODAL_MAP[hash];
    if (slug) setOpenModal(slug);
  }, []);

  useEffect(() => {
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [checkHash]);

  const DetailComponent = openModal ? MODAL_CONTENT[openModal] : null;

  return (
    <>
      {/* Dashboard grid */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TaxBrackets onOpenDetail={open("income-tax")} />
          <CorporateTax onOpenDetail={open("corporate-tax")} />
          <FlatTax onOpenDetail={open("flat-tax")} />
          <TVA onOpenDetail={open("vat")} />

          <div className="md:col-span-2">
            <SalaryCost onOpenDetail={open("salary-contributions")} />
          </div>

          <FuelTax onOpenDetail={open("fuel-tax")} />
          <BehavioralTax onOpenDetail={open("behavioral-tax")} />
          <WelfareSystem onOpenDetail={open("welfare-system")} />
          <MacroIndicators onOpenDetail={open("indicators")} />

          <PropertyTax onOpenDetail={open("property-tax")} />
          <RentalTax onOpenDetail={open("rental-tax")} />
          <InheritanceTax onOpenDetail={open("inheritance-tax")} />
          <CapitalGains onOpenDetail={open("capital-gains")} />
          <HighwayTolls onOpenDetail={open("highway-tolls")} />
          <RailwayTolls onOpenDetail={open("railway-tolls")} />

          <div className="md:col-span-2">
            <OECDComparison onOpenDetail={open("comparison")} />
          </div>

          <div className="md:col-span-2">
            <Timeline />
          </div>

          <div className="md:col-span-2">
            <DonateCta onOpenDetail={open("donate")} />
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <DetailModal open={openModal !== null} onClose={close}>
        {DetailComponent && <DetailComponent />}
      </DetailModal>
    </>
  );
}
