import React from "react";

export interface ArchitecturalNumeral04Props {
  className?: string;
}

export const ArchitecturalNumeral04: React.FC<ArchitecturalNumeral04Props> = ({ className = "" }) => {
  return (
    <div className={`relative w-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 650 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[550px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="num04-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C8C7C0" />
            <stop offset="100%" stopColor="#9E9D96" />
          </linearGradient>
          <linearGradient id="num04-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3A3940" />
            <stop offset="100%" stopColor="#121216" />
          </linearGradient>
        </defs>

        {/* Extruded Numeral '0' */}
        <g id="numeral-0">
          <polygon points="180,60 240,10 240,400 180,450" fill="url(#num04-side)" />
          <path
            d="M 40 60 L 180 60 L 180 450 L 40 450 Z"
            fill="url(#num04-front)"
            stroke="#71717A"
            strokeWidth="1.5"
          />
          <rect x="80" y="140" width="60" height="230" fill="#103BFF" stroke="#121216" strokeWidth="2" />
        </g>

        {/* Extruded Numeral '4' */}
        <g id="numeral-4">
          <polygon points="480,60 540,10 540,400 480,450" fill="url(#num04-side)" />
          <path
            d="M 380 60 L 480 60 L 480 450 L 380 450 Z"
            fill="url(#num04-front)"
            stroke="#71717A"
            strokeWidth="1.5"
          />
          <polygon points="260,60 380,60 380,320 260,320" fill="url(#num04-front)" stroke="#71717A" />
          <polygon points="260,320 480,320 480,380 260,380" fill="url(#num04-front)" stroke="#71717A" />
        </g>

        {/* Diagonal Cobalt Blue & Acid Yellow Graphic Slashes */}
        <polygon points="20,380 480,120 540,150 80,410" fill="#103BFF" opacity="0.85" />
        <polygon points="120,440 560,200 580,230 140,470" fill="#F3FF00" opacity="0.9" />

        {/* Concrete Formwork Holes */}
        <circle cx="60" cy="90" r="4" fill="#09090B" />
        <circle cx="160" cy="90" r="4" fill="#09090B" />
        <circle cx="60" cy="420" r="4" fill="#09090B" />
        <circle cx="160" cy="420" r="4" fill="#09090B" />
        <circle cx="400" cy="90" r="4" fill="#09090B" />
        <circle cx="460" cy="90" r="4" fill="#09090B" />
      </svg>
    </div>
  );
};
