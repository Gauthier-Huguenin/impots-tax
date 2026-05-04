"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";

interface DetailModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function DetailModal({ open, onClose, children }: DetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const frame = requestAnimationFrame(() => contentRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1100] flex items-end justify-center sm:items-center"
    >
      {/* Backdrop, clicking it closes the modal */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-modal-backdrop"
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={contentRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-h-[100dvh] sm:max-h-[85vh] sm:max-w-3xl overflow-y-auto rounded-t-lg sm:rounded-lg border-2 border-blanc bg-panel shadow-2xl outline-none animate-modal-slide-up sm:animate-modal-fade-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="sticky top-0 z-10 float-right m-4 flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 bg-background/90 text-blanc backdrop-blur-sm transition-colors hover:border-blanc/30 hover:text-blanc"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Detail content */}
        <div className="clear-both px-5 pb-8 pt-2 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
