"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

export function SectionNav({ sections }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-[57px] z-40 border-b border-gray-800 bg-background/90 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`shrink-0 rounded px-3 py-1.5 font-mono text-xs transition-colors ${
                activeId === section.id
                  ? "bg-danger/15 text-danger"
                  : "text-blanc hover:bg-panel hover:text-blanc"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
