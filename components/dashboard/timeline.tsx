"use client";

import { useTranslations } from "next-intl";
import { TIMELINE_EVENTS } from "@/lib/tax-data";

export function Timeline() {
  const t = useTranslations("timeline");

  return (
    <div className="rounded border border-gray-800 bg-panel p-5">
      <h2 className="font-display text-base font-bold uppercase tracking-widest text-slate-300">
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
                      : "border-favorable/60 bg-favorable/20"
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
                    isLast ? "text-danger" : "text-favorable"
                  }`}
                >
                  {event.year}
                </span>
                <p className="mt-0.5 font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
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
