import React from "react";

export interface ConcretePlinthProps {
  variant?: "hero-stepped" | "cube-monolith" | "pedestal-angled";
  hasHazardMarkings?: boolean;
  hazardPattern?: "stripes" | "arrow" | "both";
  cobaltSplash?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ConcretePlinth: React.FC<ConcretePlinthProps> = ({
  variant = "hero-stepped",
  hasHazardMarkings = true,
  hazardPattern = "both",
  cobaltSplash = true,
  className = "",
  children,
}) => {
  return (
    <div className={`relative select-none ${className}`}>
      {/* 1. Underlying Volumetric SVG Concrete Geometry */}
      {variant === "hero-stepped" && (
        <div className="relative w-full aspect-[16/10] max-w-[700px]">
          <svg
            viewBox="0 0 700 440"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="concrete-grain" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.1  0 0 0 0 0.1  0 0 0 0 0.12  0.15 0" />
                <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
              </filter>
              <linearGradient id="concrete-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A2A32" />
                <stop offset="100%" stopColor="#1E1E24" />
              </linearGradient>
              <linearGradient id="concrete-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1A1A20" />
                <stop offset="100%" stopColor="#121216" />
              </linearGradient>
              <linearGradient id="concrete-side" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#141418" />
                <stop offset="100%" stopColor="#0B0B0E" />
              </linearGradient>
              <pattern id="hazard-pattern-plinth" width="24" height="24" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="24" stroke="#F3FF00" strokeWidth="12" />
                <line x1="12" y1="0" x2="12" y2="24" stroke="#09090B" strokeWidth="12" />
              </pattern>
            </defs>

            {/* Back Upper Tier (Seating Platform) */}
            <polygon points="120,120 480,120 420,180 60,180" fill="url(#concrete-top)" stroke="#3F3F46" strokeWidth="1" />
            <polygon points="60,180 420,180 420,320 60,320" fill="url(#concrete-front)" stroke="#27272A" strokeWidth="1" />
            <polygon points="420,180 480,120 480,260 420,320" fill="url(#concrete-side)" stroke="#18181B" strokeWidth="1" />

            {/* Formwork Tie-Holes (Industrial Brutalist Detail) */}
            <circle cx="85" cy="205" r="4" fill="#09090B" stroke="#3F3F46" strokeWidth="1" />
            <circle cx="395" cy="205" r="4" fill="#09090B" stroke="#3F3F46" strokeWidth="1" />
            <circle cx="85" cy="295" r="4" fill="#09090B" stroke="#3F3F46" strokeWidth="1" />
            <circle cx="395" cy="295" r="4" fill="#09090B" stroke="#3F3F46" strokeWidth="1" />

            {/* Lower Front Step (Cascading Tier) */}
            <polygon points="340,240 660,240 600,300 280,300" fill="url(#concrete-top)" stroke="#3F3F46" strokeWidth="1" />
            <polygon points="280,300 600,300 600,420 280,420" fill="url(#concrete-front)" stroke="#27272A" strokeWidth="1" />
            <polygon points="600,300 660,240 660,360 600,420" fill="url(#concrete-side)" stroke="#18181B" strokeWidth="1" />

            {/* Hazard Markings Painted Across Concrete Front */}
            {hasHazardMarkings && (hazardPattern === "stripes" || hazardPattern === "both") && (
              <polygon points="280,370 420,370 400,420 280,420" fill="url(#hazard-pattern-plinth)" opacity="0.85" />
            )}

            {/* Hazard Stencil Arrow on Concrete Face */}
            {hasHazardMarkings && (hazardPattern === "arrow" || hazardPattern === "both") && (
              <path
                d="M 460 400 L 520 340 L 500 340 L 545 325 L 530 370 L 530 350 Z"
                fill="#F3FF00"
                opacity="0.9"
              />
            )}

            {/* Cobalt Architectural Accent Slash */}
            {cobaltSplash && (
              <polygon points="60,180 180,180 140,260 60,260" fill="#103BFF" opacity="0.75" />
            )}
          </svg>
        </div>
      )}

      {/* Monolithic Cube Variant (For Coaching / Pricing) */}
      {variant === "cube-monolith" && (
        <div className="relative w-full max-w-[480px] aspect-[16/9]">
          <svg viewBox="0 0 500 280" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <polygon points="60,40 440,40 380,100 0,100" fill="#24242C" stroke="#3F3F46" strokeWidth="1" />
            <polygon points="0,100 380,100 380,260 0,260" fill="#18181F" stroke="#27272A" strokeWidth="1" />
            <polygon points="380,100 440,40 440,200 380,260" fill="#101014" stroke="#18181B" strokeWidth="1" />
            {/* Stencil Coordinates */}
            <text x="20" y="140" fill="#F3FF00" fontFamily="monospace" fontSize="12" fontWeight="bold">
              [PLINTH_05 // COBALT_CORE]
            </text>
            <text x="20" y="160" fill="#71717A" fontFamily="monospace" fontSize="10">
              STRUCTURAL_LOAD: 1200KG/M2
            </text>
          </svg>
        </div>
      )}

      {/* Pedestal Angled Variant (For Portfolio / Display) */}
      {variant === "pedestal-angled" && (
        <div className="relative w-full max-w-[500px] aspect-[16/8]">
          <svg viewBox="0 0 500 250" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <polygon points="80,30 460,30 380,90 0,90" fill="#2A2A34" stroke="#3F3F46" strokeWidth="1" />
            <polygon points="0,90 380,90 380,230 0,230" fill="#1A1A22" stroke="#27272A" strokeWidth="1" />
            <polygon points="380,90 460,30 460,170 380,230" fill="#121218" stroke="#18181B" strokeWidth="1" />
            {hasHazardMarkings && (
              <polygon points="0,190 140,190 110,230 0,230" fill="#F3FF00" opacity="0.8" />
            )}
            <text x="24" y="140" fill="#71717A" fontFamily="monospace" fontSize="10">
              [PEDESTAL // 3D_GALLERY_MOUNT]
            </text>
          </svg>
        </div>
      )}

      {/* 2. Layered Foreground Anchor (Mounting point for Character or Terminal) */}
      {children && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};
