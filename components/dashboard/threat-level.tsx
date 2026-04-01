"use client";

import { useTranslations } from "next-intl";
import { IconWarning } from "@/components/ui/panel-icons";

const LEVELS = [
  { key: "level1", color: "bg-blue-500" },
  { key: "level2", color: "bg-blue-300" },
  { key: "level3", color: "bg-blanc" },
  { key: "level4", color: "bg-danger" },
  { key: "level5", color: "bg-red-900" },
] as const;

const ACTIVE_INDEX = 3; // SEVERE (0-indexed)

export function ThreatLevel() {
  const t = useTranslations("threatLevel");

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded border-2 border-blanc bg-panel p-5 animate-pulse-border">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-widest text-blanc">
            <IconWarning className="shrink-0" />
            {t("title")}
          </h2>
          <span className="font-mono text-xs font-light text-blanc">
            {t("source")}
          </span>
        </div>

        {/* Level bar */}
        <div className="flex gap-1">
          {LEVELS.map((level, i) => (
            <div key={level.key} className="flex-1">
              <div
                className={`h-8 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-mono uppercase tracking-wide transition-all ${
                  level.color
                } ${
                  i <= ACTIVE_INDEX
                    ? "opacity-100"
                    : "opacity-20"
                } ${
                  i === ACTIVE_INDEX
                    ? "ring-2 ring-white/50 scale-y-110 font-semibold"
                    : "font-semibold"
                } text-black`}
              >
                {t(level.key)}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 font-mono text-sm font-medium text-danger">
          ▶ {t("active")} — {t("description")}
        </p>
      </div>
    </div>
  );
}
