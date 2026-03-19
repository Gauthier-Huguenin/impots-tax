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
  track("panel_click", { panel });
}

export function trackDonateOpen(source: string) {
  track("donate_open", { source });
}

export function trackStripeClick() {
  track("stripe_click");
}

export function trackReportOpen() {
  track("report_open");
}

export function trackReportSubmit(type: string) {
  track("report_submit", { type });
}

export function trackScrollDepth(depth: number) {
  track("scroll_depth", { percent: depth });
}

export function trackTimeOnPage(seconds: number) {
  track("time_on_page", { seconds });
}
