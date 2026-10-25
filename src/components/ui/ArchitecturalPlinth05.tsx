import React from "react";

export interface ArchitecturalPlinth05Props {
  children?: React.ReactNode;
  className?: string;
}

export const ArchitecturalPlinth05: React.FC<ArchitecturalPlinth05Props> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-[650px] aspect-[4/3] select-none ${className}`}>
      {/* 1. Deep Cobalt Architectural Panel Backdrop */}
      <div className="absolute inset-0 bg-cobalt rounded-none border-2 border-cobalt-light/40 overflow-hidden shadow-2xl">
        {/* Industrial Panel Subdivisions & Rivets */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20" />
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20" />

        {/* Slicing Diagonal Hazard Yellow Light Beam */}
        <div className="absolute -bottom-10 -left-20 w-[140%] h-14 bg-acid -rotate-25 shadow-[0_0_40px_#F3FF00] opacity-90" />
      </div>

      {/* 2. Colossal 3D Concrete "05" Structure */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 450" fill="none" className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]">
          {/* Concrete "0" */}
          <polygon points="160,80 210,40 210,340 160,380" fill="#1C1C22" stroke="#27272A" />
          <path d="M 60 80 L 160 80 L 160 380 L 60 380 Z" fill="#D4D3CD" stroke="#3F3F46" strokeWidth="2" />
          <rect x="90" y="140" width="40" height="180" fill="#103BFF" />

          {/* Concrete "5" */}
          <polygon points="440,80 490,40 490,340 440,380" fill="#1C1C22" stroke="#27272A" />
          <path
            d="M 280 80 L 440 80 L 440 140 L 340 140 L 340 220 L 440 220 L 440 380 L 280 380 Z"
            fill="#D4D3CD"
            stroke="#3F3F46"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* 3. Foreground Seating Plinth & Character Slot */}
      <div className="absolute bottom-0 right-10 z-20 w-72 sm:w-84">
        {/* Concrete Cube Platform */}
        <div className="relative w-full h-32 bg-gradient-to-b from-[#282830] to-[#141418] border-t border-l border-zinc-600 border-r border-b border-black shadow-2xl">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-acid font-bold">
            [PLATFORM_05 // TVETMARA]
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
