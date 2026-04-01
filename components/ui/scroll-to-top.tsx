"use client";

import { useEffect, useState } from "react";

interface ScrollToTopProps {
  label: string;
}

export function ScrollToTop({ label }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 rounded-full border border-gray-800 bg-panel p-3 text-blanc shadow-lg transition-colors hover:border-blanc/30 hover:text-blanc"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 16V4M4 10l6-6 6 6" />
      </svg>
    </button>
  );
}
