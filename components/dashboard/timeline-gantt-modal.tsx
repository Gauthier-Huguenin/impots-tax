"use client";

import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";

interface TimelineGanttModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimelineGanttModal({ isOpen, onClose }: TimelineGanttModalProps) {
  const t = useTranslations("timeline");

  if (!isOpen) return null;

  // Calculate bar width percentage (years since 1914 / 112 years * 100)
  const calculateBarWidth = (year: number): number => {
    const yearsSince1914 = year - 1914;
    const totalYears = 2026 - 1914;
    return (yearsSince1914 / totalYears) * 100;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl rounded border-2 border-blanc bg-panel p-6 m-4">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b border-blanc/20 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold uppercase tracking-widest text-blanc">
              {t("title")}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              1914 → 2026 • Les jalons qui ont façonné l'extraction
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xl text-muted hover:text-blanc transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Gantt Chart */}
        <div className="mb-4">
          {/* Timeline axis */}
          <div className="mb-3 flex justify-between px-10 font-mono text-xs font-bold text-muted">
            <span>1900</span>
            <span>1920</span>
            <span>1940</span>
            <span>1960</span>
            <span>1980</span>
            <span>2000</span>
            <span>2020</span>
          </div>

          {/* Gantt bars */}
          <div className="space-y-2.5 px-10">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.key} className="flex items-center gap-3">
                {/* Label */}
                <div className="w-24 flex-shrink-0">
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: event.color }}
                  >
                    {event.year} {event.key.split(/(?=[A-Z])/).slice(0, -1).join("").toUpperCase()}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-muted">
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
                      boxShadow: `0 0 6px ${event.color}40`,
                    }}
                  />
                </div>

                {/* Value */}
                <div className="w-20 flex-shrink-0 text-right">
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: event.color }}
                  >
                    {event.displayValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
