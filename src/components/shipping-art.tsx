import { cn } from "@/lib/utils";

type Kind = "delivery" | "tracking" | "returns";

/** On-brand SVG illustrations for the Shipping & Returns page. */
export function ShippingArt({ kind, className }: { kind: Kind; className?: string }) {
  const common = {
    className: cn("text-primary", className),
    viewBox: "0 0 240 200",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  if (kind === "delivery") {
    return (
      <svg {...common} aria-hidden="true">
        <ellipse cx="120" cy="176" rx="92" ry="12" fill="currentColor" opacity="0.08" />
        {/* road dashes */}
        <path d="M20 168 H70 M92 168 H132 M154 168 H210" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        {/* van body */}
        <rect x="34" y="86" width="96" height="66" rx="10" fill="currentColor" opacity="0.9" />
        {/* cab */}
        <path d="M130 104 h34 l30 26 v22 a6 6 0 0 1-6 6 h-58 z" fill="currentColor" />
        <rect x="150" y="112" width="30" height="20" rx="4" fill="#fff" opacity="0.85" />
        {/* box on side */}
        <rect x="54" y="104" width="40" height="34" rx="5" fill="#fff" opacity="0.85" />
        <path d="M74 104 V138 M54 121 H94" stroke="currentColor" strokeWidth="3" opacity="0.5" />
        {/* wheels */}
        <circle cx="72" cy="156" r="16" fill="#0b0c0e" opacity="0.85" />
        <circle cx="72" cy="156" r="6" fill="#fff" opacity="0.9" />
        <circle cx="170" cy="156" r="16" fill="#0b0c0e" opacity="0.85" />
        <circle cx="170" cy="156" r="6" fill="#fff" opacity="0.9" />
        {/* motion lines */}
        <path d="M18 108 H44 M10 124 H38 M22 140 H40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      </svg>
    );
  }

  if (kind === "tracking") {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="30" y="34" width="180" height="132" rx="16" fill="currentColor" opacity="0.08" />
        {/* dotted route */}
        <path
          d="M64 138 C 64 96, 120 128, 120 92 S 176 70, 176 54"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="2 12"
          opacity="0.7"
        />
        {/* start dot */}
        <circle cx="64" cy="138" r="9" fill="currentColor" opacity="0.35" />
        <circle cx="64" cy="138" r="4" fill="currentColor" />
        {/* mid box */}
        <rect x="106" y="78" width="28" height="26" rx="5" fill="#fff" stroke="currentColor" strokeWidth="3" transform="rotate(-6 120 92)" />
        {/* destination pin */}
        <path d="M176 26 a18 18 0 0 1 18 18 c0 13-18 30-18 30 s-18-17-18-30 a18 18 0 0 1 18-18z" fill="currentColor" />
        <circle cx="176" cy="44" r="7" fill="#fff" />
      </svg>
    );
  }

  // returns
  return (
    <svg {...common} aria-hidden="true">
      <ellipse cx="120" cy="172" rx="80" ry="11" fill="currentColor" opacity="0.08" />
      {/* box */}
      <path d="M120 62 l60 30 v52 l-60 30 -60-30 v-52 z" fill="currentColor" opacity="0.9" />
      <path d="M60 92 l60 30 60-30 M120 122 v82" stroke="#fff" strokeWidth="3" opacity="0.55" />
      <path d="M120 62 l60 30 -60 30 -60-30 z" fill="currentColor" />
      <path d="M90 77 l60 30" stroke="#fff" strokeWidth="3" opacity="0.5" />
      {/* return arrow */}
      <path
        d="M120 30 a34 34 0 1 1-30 18"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M78 34 l12 14 -18 6 z" fill="currentColor" />
    </svg>
  );
}
