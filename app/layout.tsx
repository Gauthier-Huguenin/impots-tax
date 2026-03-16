import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return children;
}

export default RootLayout;
