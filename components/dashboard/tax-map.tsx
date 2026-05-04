"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useCallback, type MutableRefObject } from "react";
import { useLocale } from "next-intl";
import type { Map as LeafletMap, Marker } from "leaflet";
import type { TaxMapCategory } from "@/lib/tax-map-data";
import { TAX_MAP_DATA } from "@/lib/tax-map-data";
import { umamiTrack } from "@/lib/analytics";

export const DEFAULT_CENTER: [number, number] = [46.6, 2.8];
export const DEFAULT_ZOOM = 6;

export const CATEGORY_COLORS: Record<TaxMapCategory, string> = {
  "rate-record": "#ef4444",
  "brutal-hike": "#f87171",
  "quirky-tax": "#93c5fd",
  "secondary-home": "#3b82f6",
  "where-it-goes": "#ffffff",
};

const MAP_STYLES = `
  .tax-marker {
    position: relative;
    width: 14px;
    height: 14px;
  }
  .tax-marker-dot {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    opacity: 0.9;
  }
  .tax-marker-pulse {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    animation: tax-pulse 2s ease-out infinite;
    opacity: 0;
  }
  @keyframes tax-pulse {
    0% { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(2.0); opacity: 0; }
  }
  .leaflet-popup-content-wrapper {
    background: #0a0f1a !important;
    border-radius: 4px !important;
    padding: 0 !important;
    box-shadow: 0 4px 24px rgba(0,0,0,0.7) !important;
  }
  .leaflet-popup-tip {
    background: #0a0f1a !important;
  }
  .leaflet-popup-content {
    margin: 0 !important;
    width: auto !important;
  }
  .leaflet-popup-close-button {
    color: #8b95a5 !important;
    font-size: 18px !important;
    top: 8px !important;
    right: 8px !important;
    width: 24px !important;
    height: 24px !important;
    line-height: 24px !important;
  }
  .leaflet-popup-close-button:hover {
    color: #fff !important;
    background: transparent !important;
  }
  .leaflet-control-attribution {
    background: rgba(10,15,26,0.8) !important;
    color: #8b95a5 !important;
    font-size: 10px !important;
  }
  .leaflet-control-attribution a {
    color: #8b95a5 !important;
  }
  .leaflet-control-zoom a {
    background: #0f1218 !important;
    color: #e2e8f0 !important;
    border-color: #1e2a3a !important;
  }
  .leaflet-control-zoom a:hover {
    background: #1e2a3a !important;
  }
`;

// Global flag, styles are shared across all instances.
let mapStylesInjected = false;

interface TaxMapLeafletProps {
  height: string;
  interactive?: boolean;
  activeCategories: Set<TaxMapCategory>;
  resetViewRef?: MutableRefObject<(() => void) | null>;
}

export function TaxMapLeaflet({ height, interactive = true, activeCategories, resetViewRef }: TaxMapLeafletProps) {
  const locale = useLocale();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  // Stable ref for activeCategories so initMap reads the current value at add-time.
  const activeCategoriesRef = useRef(activeCategories);
  useEffect(() => {
    activeCategoriesRef.current = activeCategories;
  }, [activeCategories]);

  const buildPopup = useCallback((point: (typeof TAX_MAP_DATA)[0]) => {
    const color = CATEGORY_COLORS[point.category];
    const content = locale === "en" ? point.en : point.fr;
    return `
      <div style="
        font-family: 'Inter', system-ui, sans-serif;
        padding: 14px 16px;
        min-width: 260px;
        max-width: 320px;
        border-left: 3px solid ${color};
      ">
        <div style="color:${color};font-size:10px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">
          ${point.city} · ${point.department}
        </div>
        <div style="color:#f1f5f9;font-size:14px;font-weight:700;line-height:1.4;margin-bottom:8px;">
          ${content.title}
        </div>
        <div style="color:#94a3b8;font-size:12px;font-weight:400;line-height:1.6;margin-bottom:10px;">
          ${content.description}
        </div>
        <div style="
          background:rgba(255,255,255,0.05);
          border-radius:3px;
          padding:6px 10px;
          margin-bottom:8px;
        ">
          <span style="color:${color};font-size:14px;font-weight:700;">${content.keyFigure}</span>
        </div>
        <div style="color:#4b5563;font-size:11px;font-weight:400;">
          ${content.source}
        </div>
      </div>
    `;
  }, [locale]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    let cancelled = false;
    let frameId: number | null = null;
    const markers = markersRef.current;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      if (!mapStylesInjected) {
        mapStylesInjected = true;
        const styleEl = document.createElement("style");
        styleEl.textContent = MAP_STYLES;
        document.head.appendChild(styleEl);
      }

      const map = L.map(mapRef.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: interactive,
        attributionControl: true,
        dragging: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        touchZoom: interactive,
        keyboard: interactive,
      });

      mapInstanceRef.current = map;

      if (resetViewRef) {
        resetViewRef.current = () => map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      }

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: "© OpenStreetMap contributors © CARTO",
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      // Read current activeCategories at init time via ref (avoids stale closure)
      const currentCategories = activeCategoriesRef.current;

      TAX_MAP_DATA.forEach((point) => {
        const color = CATEGORY_COLORS[point.category];

        const icon = L.divIcon({
          html: `
            <div class="tax-marker">
              <div class="tax-marker-pulse" style="background:${color};"></div>
              <div class="tax-marker-dot" style="background:${color};"></div>
            </div>
          `,
          className: "",
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          popupAnchor: [0, -10],
        });

        const marker = L.marker([point.lat, point.lng], { icon });
        if (interactive) {
          marker.bindPopup(buildPopup(point), { maxWidth: 340, minWidth: 280 });
          marker.on("click", () => {
            umamiTrack("map-marker-click", { city: point.city, category: point.category });
          });
        }

        markers.set(point.id, marker);
        if (currentCategories.has(point.category)) {
          marker.addTo(map);
        }
      });
    };

    void initMap().then(() => {
      if (cancelled) return;
      frameId = requestAnimationFrame(() => {
        mapInstanceRef.current?.invalidateSize();
      });
    });

    return () => {
      cancelled = true;
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      const map = mapInstanceRef.current;
      mapInstanceRef.current = null;
      markers.clear();
      map?.remove();
      if (resetViewRef) {
        resetViewRef.current = null;
      }
    };
  }, [buildPopup, interactive, resetViewRef]);

  // Update marker visibility when activeCategories changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    TAX_MAP_DATA.forEach((point) => {
      const marker = markersRef.current.get(point.id);
      if (!marker) return;
      if (activeCategories.has(point.category)) {
        marker.addTo(map);
      } else {
        marker.remove();
      }
    });
  }, [activeCategories]);

  return (
    <div
      ref={mapRef}
      className="w-full"
      style={{ height }}
    />
  );
}
