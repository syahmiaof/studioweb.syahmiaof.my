import React from "react";

export interface BrutalistArrowProps {
  variant?: "curved-contact" | "diagonal-pricing" | "stencil-plinth";
  className?: string;
}

export const BrutalistArrow: React.FC<BrutalistArrowProps> = ({
  variant = "curved-contact",
  className = "",
}) => {
  if (variant === "diagonal-pricing") {
    return (
      <div className={`relative pointer-events-none select-none ${className}`}>
        <svg viewBox="0 0 350 200" fill="none" className="w-full h-auto drop-shadow-[0_8px_20px_rgba(243,255,0,0.4)]">
          <path
            d="M 20 180 L 260 50 L 240 40 L 330 30 L 310 120 L 290 100 L 40 195 Z"
            fill="#F3FF00"
          />
        </svg>
      </div>
    );
  }

  if (variant === "stencil-plinth") {
    return (
      <div className={`relative pointer-events-none select-none ${className}`}>
        <svg viewBox="0 0 200 120" fill="none" className="w-full h-auto drop-shadow-[0_4px_12px_rgba(243,255,0,0.3)]">
          <path
            d="M 10 100 L 140 25 L 130 15 L 190 10 L 180 70 L 165 55 L 25 110 Z"
            fill="#F3FF00"
          />
        </svg>
      </div>
    );
  }

  // Default "curved-contact"
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 500 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_10px_25px_rgba(243,255,0,0.5)]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Sweeping Dynamic Curved Arrow Stem */}
        <path
          d="M 10 260 C 140 260, 280 220, 420 80 L 400 65 L 485 55 L 465 140 L 440 120 C 310 240, 160 275, 10 275 Z"
          fill="#F3FF00"
        />
      </svg>
    </div>
  );
};
