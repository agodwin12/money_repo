import type { ProductKind } from "@/lib/products";

/**
 * Lightweight SVG illustrations for each product type.
 * Rendered until a real photo is provided via a product's `image` field.
 */
export function ProductArt({
  kind,
  className,
}: {
  kind: ProductKind;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 200 200",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  switch (kind) {
    case "counter":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="38" y="70" width="124" height="78" rx="14" fill="currentColor" opacity="0.9" />
          <rect x="38" y="70" width="124" height="26" rx="13" fill="currentColor" />
          <rect x="70" y="46" width="60" height="34" rx="6" fill="#ffffff" opacity="0.85" />
          <rect x="78" y="40" width="44" height="10" rx="5" fill="#ffffff" opacity="0.55" />
          <rect x="54" y="108" width="52" height="26" rx="6" fill="#0b0c0e" opacity="0.55" />
          <text x="80" y="126" textAnchor="middle" fontFamily="monospace" fontSize="15" fill="#7ee0a8">
            100
          </text>
          <circle cx="138" cy="121" r="9" fill="#ffffff" opacity="0.85" />
        </svg>
      );
    case "detector":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="46" y="52" width="108" height="96" rx="16" fill="currentColor" opacity="0.9" />
          <rect x="62" y="70" width="76" height="46" rx="8" fill="#a78bfa" opacity="0.85" />
          <rect x="72" y="80" width="56" height="26" rx="4" fill="#ffffff" opacity="0.7" />
          <path d="M100 70 V52" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <circle cx="76" cy="132" r="6" fill="#ffffff" opacity="0.8" />
          <circle cx="100" cy="132" r="6" fill="#7ee0a8" />
          <circle cx="124" cy="132" r="6" fill="#ffffff" opacity="0.8" />
        </svg>
      );
    case "coin":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M60 52 H140 L118 96 H82 Z" fill="currentColor" opacity="0.9" />
          <rect x="82" y="96" width="36" height="40" rx="6" fill="currentColor" opacity="0.7" />
          <circle cx="78" cy="46" r="12" fill="#ffd23e" />
          <circle cx="104" cy="40" r="12" fill="#ffd23e" opacity="0.85" />
          <circle cx="128" cy="48" r="10" fill="#ffd23e" opacity="0.7" />
          <rect x="70" y="150" width="60" height="12" rx="6" fill="currentColor" opacity="0.5" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="50" y="120" width="100" height="30" rx="10" fill="currentColor" opacity="0.9" />
          <rect x="64" y="96" width="72" height="28" rx="6" fill="currentColor" opacity="0.7" />
          <ellipse cx="100" cy="94" rx="46" ry="12" fill="#a5b4ff" opacity="0.7" />
          <rect x="112" y="60" width="34" height="22" rx="5" fill="#0b0c0e" opacity="0.55" />
          <text x="129" y="76" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#7ee0a8">
            2.4k
          </text>
        </svg>
      );
    case "pen":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="58" y="120" width="96" height="18" rx="9" fill="currentColor" opacity="0.9" transform="rotate(-35 106 129)" />
          <rect x="132" y="86" width="26" height="18" rx="4" fill="#ffd23e" transform="rotate(-35 145 95)" />
          <circle cx="60" cy="150" r="7" fill="currentColor" opacity="0.6" />
          <path d="M74 96 L92 78" stroke="#a78bfa" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
  }
}
