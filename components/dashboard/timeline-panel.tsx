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
        <div className="space-y-2">
          {TIMELINE_EVENTS.slice(0, 4).map((event) => (
            <div key={event.key} className="flex items-center gap-2">
              <div className="w-16 flex-shrink-0">
                <div className="font-mono text-xs font-bold text-blanc">
                  {event.year}
                </div>
              </div>
              <div className="flex-1 relative h-1 bg-slate-900 rounded">
                <div
                  className="h-full rounded transition-all"
                  style={{
                    width: `${calculateBarWidth(event.year)}%`,
                    backgroundColor: event.color,
                    boxShadow: `0 0 4px ${event.color}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-xs text-blanc/70">
          Cliquez pour voir tous les 8 événements
        </p>
      </div>

      <TimelineGanttModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
