"use client";

import { useState } from "react";
import { TimelineGanttModal } from "./timeline-gantt-modal";

export function TimelinePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="rounded border-2 border-blanc bg-panel p-5 cursor-pointer hover:border-blanc/80 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        <h2 className="font-display text-base font-bold uppercase tracking-widest text-blanc">
          CHRONOLOGIE FISCALE
        </h2>
        <p className="mt-2 font-mono text-xs text-muted">
          Cliquez pour voir la chronologie complète
        </p>
      </div>

      <TimelineGanttModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
