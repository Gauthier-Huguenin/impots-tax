"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
  onShare?: () => void;
}

export function ShareButton({
  title,
  description,
  url,
  onShare,
}: ShareButtonProps) {
  const t = useTranslations("interactiveCalculators.shareButton");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
    });
    return () => {
      cancelAnimationFrame(frame);
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const handleCopyToClipboard = async () => {
    try {
      const shareUrl = url || window.location.href;
      const text = `${title}${description ? `, ${description}` : ""}\n\n${shareUrl}`;

      await navigator.clipboard.writeText(text);
      setFeedback(t("copyToClipboard"));
      onShare?.();

      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
      feedbackTimerRef.current = setTimeout(() => setFeedback(null), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleNativeShare = async () => {
    try {
      const shareUrl = url || window.location.href;

      await navigator.share({
        title,
        text: description,
        url: shareUrl,
      });
      onShare?.();
    } catch (error) {
      console.error("Share failed:", error);
    }
  };


  return (
    <div className="flex items-center gap-2">
      {/* Clipboard copy button */}
      <button
        onClick={handleCopyToClipboard}
        className="px-3 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded transition-colors"
        title={t("label")}
        aria-label={t("label")}
      >
        {feedback || t("label")}
      </button>

      {/* Native share button (mobile) */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="px-3 py-2 text-sm font-semibold bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white rounded transition-colors"
          title={t("label")}
          aria-label={t("label")}
        >
          {t("label")}
        </button>
      )}

      {/* OG image generation (disabled for now) */}
      {/* <button
        onClick={handleGenerateImage}
        className="px-3 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded transition-colors"
        title={t("shareOgImage")}
        aria-label={t("shareOgImage")}
      >
        {t("shareOgImage")}
      </button> */}
    </div>
  );
}
