declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, string | number>) => void;
    };
  }
}

function track(event: string, data?: Record<string, string | number>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}

export function trackPanelClick(panel: string) {
  track("panel-click", { panel });
}

export function trackDonateOpen(source: string) {
  track("donate-open", { source });
}

export function trackStripeClick() {
  track("stripe-click");
}

export function trackReportOpen() {
  track("report-open");
}

export function trackReportSubmit(type: string) {
  track("report-submit", { type });
}

export function trackScrollDepth(depth: number) {
  track("scroll-depth", { percent: depth });
}

export function trackTimeOnPage(seconds: number) {
  track("time-on-page", { seconds });
}

export function umamiTrack(event: string, data?: Record<string, string | number>) {
  track(event, data);
}
