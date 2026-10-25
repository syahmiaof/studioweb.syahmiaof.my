import React from "react";

export interface ArchitecturalSYAProps {
  className?: string;
}

export const ArchitecturalSYA: React.FC<ArchitecturalSYAProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1000 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[900px] lg:max-w-[1050px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="sya-front" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4D3CD" />
            <stop offset="100%" stopColor="#A8A7A0" />
          </linearGradient>
          <linearGradient id="sya-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E5E4DE" />
            <stop offset="100%" stopColor="#C4C3BC" />
          </linearGradient>
          <linearGradient id="sya-side" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A494F" />
            <stop offset="100%" stopColor="#1E1E24" />
          </linearGradient>
        </defs>

        {/* ==================================================== */}
        {/* LETTER 'S' (Axonometric 3D Extrusion)                */}
        {/* ==================================================== */}
        <g id="letter-S">
          {/* S 3D Side Shadow Facets */}
          <path d="M 220 180 L 280 120 L 280 180 L 220 240 Z" fill="url(#sya-side)" />
          <path d="M 160 300 L 220 240 L 280 240 L 220 300 Z" fill="url(#sya-top)" />
          <path d="M 220 300 L 280 240 L 280 440 L 220 500 Z" fill="url(#sya-side)" />
          <path d="M 120 500 L 180 440 L 280 440 L 220 500 Z" fill="url(#sya-top)" />

          {/* S Front Concrete Faces */}
          <path
            d="M 120 180 L 220 180 L 220 240 L 160 240 L 160 300 L 220 300 L 220 500 L 120 500 Z"
            fill="url(#sya-front)"
            stroke="#8E8D86"
            strokeWidth="1.5"
          />
        </g>

        {/* ==================================================== */}
        {/* LETTER 'Y' (Axonometric 3D Extrusion)                */}
        {/* ==================================================== */}
        <g id="letter-Y">
          {/* Y 3D Extrusion Side Facets */}
          <path d="M 460 140 L 520 80 L 520 280 L 460 340 Z" fill="url(#sya-side)" />
          <path d="M 400 480 L 460 420 L 460 520 L 400 580 Z" fill="url(#sya-side)" />

          {/* Y Front Concrete Faces */}
          <path
            d="M 300 140 L 360 140 L 400 280 L 440 140 L 500 140 L 430 360 L 430 520 L 370 520 L 370 360 Z"
            fill="url(#sya-front)"
            stroke="#8E8D86"
            strokeWidth="1.5"
          />
        </g>

        {/* ==================================================== */}
        {/* LETTER 'A' (Axonometric 3D Extrusion)                */}
        {/* ==================================================== */}
        <g id="letter-A">
          {/* A 3D Side Shadow Facets */}
          <path d="M 720 100 L 780 40 L 840 440 L 780 500 Z" fill="url(#sya-side)" />

          {/* A Front Face */}
          <path
            d="M 640 100 L 720 100 L 800 500 L 730 500 L 700 380 L 630 380 L 600 500 L 530 500 Z"
            fill="url(#sya-front)"
            stroke="#8E8D86"
            strokeWidth="1.5"
          />
          {/* Inner Counter Window */}
          <polygon points="650,220 680,220 690,320 640,320" fill="#18181E" stroke="#27272A" />
        </g>

        {/* ==================================================== */}
        {/* DYNAMIC COBALT & YELLOW PAINT SLASHES ACROSS LETTERS */}
        {/* ==================================================== */}
        {/* Electric Cobalt Paint Stroke */}
        <path
          d="M 100 420 L 480 200 L 520 230 L 120 460 Z"
          fill="#103BFF"
          opacity="0.9"
        />
        {/* Hazard Yellow Splash Beam */}
        <path
          d="M 480 120 L 850 320 L 820 370 L 460 160 Z"
          fill="#F3FF00"
          opacity="0.85"
        />
        {/* Industrial Text Stamp on Concrete */}
        <text x="640" y="320" fill="#09090B" fontFamily="monospace" fontSize="16" fontWeight="900" letterSpacing="4">
          SYAHMIAOF
        </text>
      </svg>
    </div>
  );
};
