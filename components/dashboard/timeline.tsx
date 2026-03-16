"use client";

import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";

export function Timeline() {
  const t = useTranslations("timeline");

  return (
    <div className="rounded border border-gray-800 bg-panel p-4">
      <h2 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
        {t("title")}
      </h2>

      {/* Vertical timeline (mobile + desktop) */}
      <div className="mt-4 space-y-0">
        {TIMELINE_EVENTS.map((event, i) => {
          const isLast = i === TIMELINE_EVENTS.length - 1;
          return (
            <div key={event.key} className="flex gap-3">
              {/* Timeline rail */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-3 w-3 shrink-0 rounded-full border-2 ${
                    isLast
                      ? "border-danger bg-danger animate-pulse-dot"
                      : "border-info/60 bg-info/20"
                  }`}
                />
                {!isLast && (
                  <div className="w-px flex-1 bg-gray-800" />
                )}
              </div>

              {/* Content */}
              <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
                <span
                  className={`font-mono text-xs font-bold ${
                    isLast ? "text-danger" : "text-info"
                  }`}
                >
                  {event.year}
                </span>
                <p className="mt-0.5 font-mono text-[10px] leading-relaxed text-gray-400 sm:text-xs">
                  {t(event.key as "ir1914")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
