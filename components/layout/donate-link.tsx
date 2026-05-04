"use client";

import type { MouseEvent, ReactNode } from "react";
import { Link } from "@/lib/navigation";
import { trackDonateOpen } from "@/lib/analytics";

interface DonateLinkProps {
  children: ReactNode;
  className?: string;
  source: "footer" | "header";
}

export function DonateLink({ children, className, source }: DonateLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    trackDonateOpen(source);

    const path = window.location.pathname;
    const isHome = path === "/" || path === "/en" || path === "/en/";
    if (!isHome) return;

    event.preventDefault();
    if (window.location.hash !== "#donate") {
      window.location.hash = "donate";
    }
    window.dispatchEvent(new Event("hashchange"));
  }

  return (
    <Link href="/#donate" onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
