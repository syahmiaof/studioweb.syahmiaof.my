import React from "react";

export interface IndustrialGridProps {
  density?: "dense" | "standard" | "loose";
  showCrosshairs?: boolean;
  coordinates?: string;
  className?: string;
}

export const IndustrialGrid: React.FC<IndustrialGridProps> = ({
  density = "standard",
  showCrosshairs = true,
  coordinates = "05.83° N, 102.55° E",
  className = "",
}) => {
  const cellSize = density === "dense" ? 24 : density === "loose" ? 64 : 40;

  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}>
      {/* SVG Pattern for Ultra-Crisp Resolution-Independent Grid */}
      <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={`grid-pattern-${cellSize}`}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-pattern-${cellSize})`} />
      </svg>

      {/* Decorative Technical Crosshairs */}
      {showCrosshairs && (
        <>
          <div className="absolute top-6 left-6 font-mono text-[10px] text-zinc-600 flex items-center gap-1.5">
            <span className="text-acid">+</span>
            <span>[{coordinates}]</span>
          </div>
          <div className="absolute top-6 right-6 font-mono text-[10px] text-zinc-600">
            <span className="text-acid">+</span> SEC_01 // 60FPS
          </div>
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600">
            <span className="text-acid">+</span> 100%_CODE_INTEGRITY
          </div>
        </>
      )}
    </div>
  );
};
