'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
  const t = useTranslations('interactiveCalculators.shareButton');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCopyToClipboard = async () => {
    try {
      const shareUrl = url || window.location.href;
      const text = `${title}${description ? ` — ${description}` : ''}\n\n${shareUrl}`;

      await navigator.clipboard.writeText(text);
      setFeedback(t('copyToClipboard'));
      onShare?.();

      // Clear feedback after 2 seconds
      setTimeout(() => setFeedback(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
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
      // User cancelled share or error occurred
      console.error('Share failed:', error);
    }
  };


  return (
    <div className="flex items-center gap-2">
      {/* Clipboard copy button */}
      <button
        onClick={handleCopyToClipboard}
        className="px-3 py-2 text-sm font-semibold bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white rounded transition-colors"
        title={t('label')}
        aria-label={t('label')}
      >
        {feedback || t('label')}
      </button>

      {/* Native share button (mobile) */}
      {'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="px-3 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded transition-colors"
          title={t('label')}
          aria-label={t('label')}
        >
          {t('label')}
        </button>
      )}

      {/* OG image generation (disabled for now) */}
      {/* <button
        onClick={handleGenerateImage}
        className="px-3 py-2 text-sm font-semibold bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white rounded transition-colors"
        title={t('shareOgImage')}
        aria-label={t('shareOgImage')}
      >
        {t('shareOgImage')}
      </button> */}
    </div>
  );
}
