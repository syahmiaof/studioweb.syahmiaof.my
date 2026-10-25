import React from "react";

export interface ArchitecturalNumeral07Props {
  className?: string;
}

export const ArchitecturalNumeral07: React.FC<ArchitecturalNumeral07Props> = ({ className = "" }) => {
  return (
    <div className={`relative w-full select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[450px]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="cobalt-rim-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#3B62FF" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 07 Extruded Shadow Facet */}
        <polygon points="180,60 230,20 230,400 180,440" fill="#14141A" />
        <polygon points="400,60 450,20 450,400 400,440" fill="#14141A" />

        {/* Front Concrete Block Faces */}
        {/* Numeral 0 */}
        <path
          d="M 60 60 L 180 60 L 180 440 L 60 440 Z"
          fill="#32323A"
          stroke="#4F4F5A"
          strokeWidth="2"
        />
        <rect x="95" y="130" width="50" height="240" fill="#09090B" stroke="#103BFF" strokeWidth="2" filter="url(#cobalt-rim-glow)" />

        {/* Numeral 7 */}
        <path
          d="M 260 60 L 400 60 L 400 130 L 330 440 L 260 440 L 330 130 L 260 130 Z"
          fill="#32323A"
          stroke="#4F4F5A"
          strokeWidth="2"
        />

        {/* Electric Cobalt Rim Highlight */}
        <line x1="260" y1="60" x2="400" y2="60" stroke="#3B62FF" strokeWidth="3" filter="url(#cobalt-rim-glow)" />
      </svg>
    </div>
  );
};
