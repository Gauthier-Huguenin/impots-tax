"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import type { TaxMapCategory } from "@/lib/tax-map-data";
import { TAX_MAP_DATA } from "@/lib/tax-map-data";
import { CATEGORY_COLORS } from "@/components/dashboard/tax-map";

const CATEGORY_KEYS: TaxMapCategory[] = [
  "rate-record",
  "brutal-hike",
  "quirky-tax",
  "secondary-home",
];

const TaxMapLeaflet = dynamic(
  () => import("@/components/dashboard/tax-map").then((m) => ({ default: m.TaxMapLeaflet })),
  { ssr: false, loading: () => <MapPlaceholder /> }
);

function MapPlaceholder() {
  return (
    <div className="w-full animate-pulse bg-[#0d1117]" style={{ height: "clamp(400px, 50vw, 580px)" }} />
  );
}

function IconReset() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M7 4H4v16h3" />
      <path d="M17 4h3v16h-3" />
    </svg>
  );
}

interface LegendProps {
  legendOpen: boolean;
  onToggle: () => void;
  activeCategories: Set<TaxMapCategory>;
  onToggleCategory: (cat: TaxMapCategory) => void;
  legendLabel: string;
  getCatLabel: (cat: TaxMapCategory) => string;
}

function Legend({ legendOpen, onToggle, activeCategories, onToggleCategory, legendLabel, getCatLabel }: LegendProps) {
  return (
    <div className="absolute bottom-4 right-4 z-[1000]">
      <div className="rounded border border-[#1e2a3a] bg-[rgba(10,15,26,0.92)] shadow-lg backdrop-blur-sm">
        <button
          className="flex w-full items-center justify-between gap-6 px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-300 transition-colors hover:text-blanc"
          onClick={onToggle}
          aria-expanded={legendOpen}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span>{legendLabel}</span>
          <span className="text-muted text-[8px]">{legendOpen ? "▲" : "▼"}</span>
        </button>
        {legendOpen && (
          <div className="border-t border-[#1e2a3a] px-3 pb-3 pt-2 space-y-1.5">
            {CATEGORY_KEYS.map((cat) => {
              const color = CATEGORY_COLORS[cat];
              const active = activeCategories.has(cat);
              const count = TAX_MAP_DATA.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => onToggleCategory(cat)}
                  className={`flex w-full items-center gap-2 rounded px-1 py-0.5 text-[11px] transition-opacity ${active ? "opacity-100" : "opacity-40"} hover:opacity-90`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: color }} />
                  <span className="text-left text-slate-300 font-medium">{getCatLabel(cat)}</span>
                  <span className="ml-auto text-muted font-normal">{count}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface ResetButtonProps {
  onReset: () => void;
  label: string;
}

function ResetButton({ onReset, label }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      aria-label={label}
      title={label}
      className="absolute left-[10px] top-[84px] z-[1000] flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-[#555] bg-[#0f1218] text-[#e2e8f0] shadow-[0_1px_5px_rgba(0,0,0,0.65)] transition-colors hover:bg-[#1e2a3a]"
    >
      <IconReset />
    </button>
  );
}

export function TaxMapClient() {
  const t = useTranslations("taxMap");
  const [fullscreen, setFullscreen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<Set<TaxMapCategory>>(
    new Set(CATEGORY_KEYS)
  );
  const [legendOpen, setLegendOpen] = useState(true);

  const previewResetRef = useRef<(() => void) | null>(null);
  const fullscreenResetRef = useRef<(() => void) | null>(null);

  const totalVisible = TAX_MAP_DATA.filter((p) => activeCategories.has(p.category)).length;

  const toggleCategory = useCallback((cat: TaxMapCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  }, []);

  const toggleLegend = useCallback(() => setLegendOpen((v) => !v), []);
  const getCatLabel = useCallback((cat: TaxMapCategory) => t(`cat_${cat}` as Parameters<typeof t>[0]), [t]);

  const openFullscreen = useCallback(() => setFullscreen(true), []);
  const closeFullscreen = useCallback(() => setFullscreen(false), []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeFullscreen(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, closeFullscreen]);

  const sharedLegendProps = {
    legendOpen,
    onToggle: toggleLegend,
    activeCategories,
    onToggleCategory: toggleCategory,
    legendLabel: t("legend"),
    getCatLabel,
  };

  return (
    <>
      {/* ── Preview panel ── */}
      <div className="rounded border-2 border-blanc bg-panel overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-3">
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-widest text-blanc" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("title")}
            </h2>
            <p className="mt-0.5 text-[11px] font-normal text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("subtitle")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[11px] text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
            <span className="font-medium">{totalVisible}</span>
            <span className="font-normal">{t("pointsLabel")}</span>
          </div>
        </div>

        {/* Map hidden (not unmounted) when fullscreen is open — avoids z-index bleed */}
        <div className={`relative ${fullscreen ? "invisible" : ""}`}>
          <TaxMapLeaflet
            height="clamp(400px, 50vw, 580px)"
            interactive={true}
            activeCategories={activeCategories}
            resetViewRef={previewResetRef}
          />
          <Legend {...sharedLegendProps} />
          <ResetButton onReset={() => previewResetRef.current?.()} label={t("resetLabel")} />
          <button
            onClick={openFullscreen}
            aria-label={t("expandLabel")}
            className="absolute right-3 top-3 z-[1000] flex items-center gap-1.5 rounded border border-[#1e2a3a] bg-[rgba(10,15,26,0.85)] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted backdrop-blur-sm transition-colors hover:border-blanc/30 hover:text-blanc"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            {t("expandLabel")}
          </button>
        </div>

        <div className="border-t border-[#1e2a3a] px-5 py-2">
          <p className="text-[10px] font-normal text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
            {t("source")}
          </p>
        </div>
      </div>

      {/* ── Fullscreen modal ── */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={t("title")}
        >
          <div className="flex items-center justify-between border-b border-[#1e2a3a] px-5 py-3 shrink-0">
            <div>
              <h2 className="text-[13px] font-bold uppercase tracking-widest text-blanc" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("title")}
              </h2>
              <p className="mt-0.5 text-[11px] font-normal text-slate-300" style={{ fontFamily: "Inter, sans-serif" }}>
                {t("subtitle")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[11px] text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-danger" />
                <span className="font-medium">{totalVisible}</span>
                <span className="font-normal">{t("pointsLabel")}</span>
              </div>
              <button
                onClick={closeFullscreen}
                aria-label="Fermer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1e2a3a] text-muted transition-colors hover:border-blanc/30 hover:text-blanc"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0">
            <TaxMapLeaflet
              key="fullscreen"
              height="100%"
              interactive={true}
              activeCategories={activeCategories}
              resetViewRef={fullscreenResetRef}
            />
            <Legend {...sharedLegendProps} />
            <ResetButton onReset={() => fullscreenResetRef.current?.()} label={t("resetLabel")} />
          </div>

          <div className="border-t border-[#1e2a3a] px-5 py-2 shrink-0">
            <p className="text-[10px] font-normal text-muted" style={{ fontFamily: "Inter, sans-serif" }}>
              {t("source")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
