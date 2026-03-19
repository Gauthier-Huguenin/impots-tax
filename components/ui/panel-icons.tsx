interface IconProps {
  className?: string;
}

const defaults = {
  width: 20,
  height: 20,
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconEuro({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M15 4C13.5 2.8 11.8 2 10 2C6.5 2 3.5 5.4 3.5 10s3 8 6.5 8c1.8 0 3.5-.8 5-2" />
      <line x1="2" y1="8" x2="11" y2="8" />
      <line x1="2" y1="12" x2="11" y2="12" />
    </svg>
  );
}

export function IconWarning({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M10 2L1.5 17h17L10 2z" />
      <line x1="10" y1="8" x2="10" y2="12" />
      <circle cx="10" cy="14.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBarChart({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="2" y="12" width="3" height="6" rx="0.5" />
      <rect x="7" y="8" width="3" height="10" rx="0.5" />
      <rect x="12" y="4" width="3" height="14" rx="0.5" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="3" y="3" width="14" height="15" rx="1" />
      <line x1="7" y1="7" x2="7" y2="7.01" />
      <line x1="10" y1="7" x2="10" y2="7.01" />
      <line x1="13" y1="7" x2="13" y2="7.01" />
      <line x1="7" y1="11" x2="7" y2="11.01" />
      <line x1="10" y1="11" x2="10" y2="11.01" />
      <line x1="13" y1="11" x2="13" y2="11.01" />
      <rect x="8" y="14" width="4" height="4" />
    </svg>
  );
}

export function IconTrendUp({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <polyline points="3 15 8 9 12 12 17 5" />
      <polyline points="13 5 17 5 17 9" />
    </svg>
  );
}

export function IconCart({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M3 3h2l2.5 10h8L18 6H7" />
      <circle cx="8.5" cy="16" r="1.5" />
      <circle cx="14.5" cy="16" r="1.5" />
    </svg>
  );
}

export function IconFuel({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="3" y="4" width="9" height="14" rx="1" />
      <rect x="5" y="6" width="5" height="4" rx="0.5" />
      <path d="M12 8l3-3 2 1v8c0 1-1 2-2 2s-2-1-2-2V9" />
    </svg>
  );
}

export function IconCigarette({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="1" y="12" width="14" height="3" rx="0.5" />
      <rect x="11" y="12" width="4" height="3" rx="0" fill="currentColor" opacity="0.3" />
      <path d="M17 12V8c0-2-2-2-2-4s2-2 2-4" />
      <path d="M19 12V9c0-1.5-1.5-1.5-1.5-3s1.5-1.5 1.5-3" />
    </svg>
  );
}

export function IconBriefcase({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="2" y="7" width="16" height="11" rx="1.5" />
      <path d="M7 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
      <line x1="2" y1="12" x2="18" y2="12" />
    </svg>
  );
}

export function IconHandshake({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M2 10l4-4 3 2 3-3 4 4" />
      <path d="M6 12l2 2 4-4 3 3" />
      <path d="M1 8l3 3" />
      <path d="M19 8l-3 3" />
    </svg>
  );
}

export function IconGlobe({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <circle cx="10" cy="10" r="8" />
      <ellipse cx="10" cy="10" rx="3.5" ry="8" />
      <line x1="2" y1="10" x2="18" y2="10" />
    </svg>
  );
}

export function IconGauge({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M10 18A8 8 0 1110 2a8 8 0 010 16z" />
      <path d="M10 6v4l3 2" />
      <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconHouse({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M3 10l7-7 7 7" />
      <rect x="5" y="10" width="10" height="8" rx="0.5" />
      <rect x="8" y="13" width="4" height="5" />
    </svg>
  );
}

export function IconKey({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <circle cx="7" cy="7" r="4" />
      <line x1="10" y1="10" x2="18" y2="18" />
      <line x1="15" y1="18" x2="18" y2="15" />
      <line x1="13" y1="16" x2="16" y2="13" />
    </svg>
  );
}

export function IconScroll({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M5 2h10a2 2 0 012 2v12a2 2 0 01-2 2H5" />
      <path d="M5 2a2 2 0 00-2 2v1a2 2 0 002 2h0" />
      <path d="M5 18a2 2 0 01-2-2v-1a2 2 0 012-2h12" />
      <line x1="8" y1="7" x2="14" y2="7" />
      <line x1="8" y1="10" x2="14" y2="10" />
    </svg>
  );
}

export function IconStock({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <polyline points="2 16 6 10 10 13 14 6 18 4" />
      <polyline points="14 4 18 4 18 8" />
      <line x1="2" y1="18" x2="18" y2="18" />
    </svg>
  );
}

export function IconRoad({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <path d="M4 18L8 2" />
      <path d="M16 18L12 2" />
      <line x1="10" y1="5" x2="10" y2="7" />
      <line x1="10" y1="10" x2="10" y2="12" />
      <line x1="10" y1="15" x2="10" y2="17" />
    </svg>
  );
}

export function IconTrain({ className }: IconProps) {
  return (
    <svg {...defaults} className={className}>
      <rect x="4" y="2" width="12" height="14" rx="2" />
      <line x1="4" y1="10" x2="16" y2="10" />
      <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="13" r="1" fill="currentColor" stroke="none" />
      <line x1="6" y1="16" x2="4" y2="19" />
      <line x1="14" y1="16" x2="16" y2="19" />
    </svg>
  );
}
