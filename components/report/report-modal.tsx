"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { DetailModal } from "@/components/ui/detail-modal";
import { ReportForm } from "@/components/report/report-form";
import { trackReportOpen } from "@/lib/analytics";

export function ReportButton() {
  const t = useTranslations("report");
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    trackReportOpen();
  }, []);

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-1.5 font-mono text-xs text-blanc transition-colors hover:text-warning"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span>{t("button")}</span>
      </button>

      <DetailModal open={open} onClose={() => setOpen(false)}>
        <ReportForm onClose={() => setOpen(false)} />
      </DetailModal>
    </>
  );
}
