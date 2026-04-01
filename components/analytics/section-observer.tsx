"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { umamiTrack } from "@/lib/analytics";

interface SectionObserverProps {
  section: string;
  children: ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * Wraps a dashboard section and fires a single `section-visible` Umami event
 * when the section first enters the viewport (IntersectionObserver, fires once).
 */
export function SectionObserver({ section, children, className, threshold = 0.2 }: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            umamiTrack("section-visible", { section });
            observer.disconnect();
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [section, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
