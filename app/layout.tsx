import type { ReactNode } from "react";
import type { Viewport } from "next";

interface RootLayoutProps {
  children: ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c10",
};

export function RootLayout({ children }: RootLayoutProps) {
  return children;
}

export default RootLayout;
