"use client";

import { useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";

interface TimelineGanttModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TimelineGanttModal({ isOpen, onClose }: TimelineGanttModalProps) {
  const t = useTranslations("timeline");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const frame = requestAnimationFrame(() => contentRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const calculateBarWidth = (year: number): number => {
    const yearsSince1914 = year - 1914;
    const totalYears = 2026 - 1914;
    return (yearsSince1914 / totalYears) * 100;
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-gantt-title"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded border-2 border-blanc bg-panel p-4 outline-none sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between border-b border-blanc/20 pb-4">
          <div>
            <h2 id="timeline-gantt-title" className="font-display text-lg font-bold uppercase tracking-widest text-blanc">
              {t("title")}
            </h2>
            <p className="mt-1 font-mono text-xs text-muted">
              {t("subtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-gray-800 text-muted transition-colors hover:border-blanc/30 hover:text-blanc"
            aria-label={t("closeLabel")}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Gantt Chart */}
        <div className="mb-4 overflow-x-auto">
          <div className="min-w-[720px]">
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
                  <div className="w-28 flex-shrink-0">
                    <div
                      className="font-mono text-xs font-bold"
                      style={{ color: event.color }}
                    >
                      {event.year}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-slate-300">
                      {t(event.key as "ir1914")}
                    </div>
                  </div>

                  {/* Bar */}
                  <div className="flex-1 relative h-1.5 rounded bg-slate-900">
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
    </div>
  );
}
