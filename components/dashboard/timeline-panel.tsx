"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";
import { TimelineGanttModal } from "./timeline-gantt-modal";

export function TimelinePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("timeline");

  const calculateBarWidth = (year: number): number => {
    const yearsSince1914 = year - 1914;
    const totalYears = 2026 - 1914;
    return (yearsSince1914 / totalYears) * 100;
  };

  return (
    <>
      <div
        className="rounded border-2 border-blanc bg-panel p-5 cursor-pointer hover:border-blanc/80 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <h2 className="font-display text-base font-bold uppercase tracking-widest text-blanc mb-4">
          CHRONOLOGIE FISCALE
        </h2>

        {/* Mini Gantt preview */}
        <div className="space-y-3">
          {/* Timeline axis */}
          <div className="flex justify-between px-4 font-mono text-[10px] font-bold text-blanc/60">
            <span>1900</span>
            <span>1950</span>
            <span>2000</span>
          </div>

          {/* Gantt bars with full info */}
          {TIMELINE_EVENTS.slice(0, 5).map((event) => (
            <div key={event.key} className="flex items-center gap-2 px-4">
              {/* Label */}
              <div className="w-20 flex-shrink-0">
                <div
                  className="font-mono text-xs font-bold"
                  style={{ color: event.color }}
                >
                  {event.year}
                </div>
                <div className="font-mono text-[10px] text-blanc/60">
                  {t(event.key as "ir1914")}
                </div>
              </div>

              {/* Bar */}
              <div className="flex-1 relative h-1.5 bg-slate-900 rounded">
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: `${calculateBarWidth(event.year)}%`,
                    backgroundColor: event.color,
                    boxShadow: `0 0 3px ${event.color}50`,
                  }}
                />
              </div>

              {/* Value */}
              <div className="w-16 flex-shrink-0 text-right">
                <div
                  className="font-mono text-[10px] font-bold"
                  style={{ color: event.color }}
                >
                  {event.displayValue}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-right font-display text-sm font-bold text-warning">
          {t("details")}
        </p>
      </div>

      <TimelineGanttModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
