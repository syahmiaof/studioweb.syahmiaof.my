import React from "react";

export interface BrutalistBannerProps {
  part1?: string; // e.g. "SAYA"
  highlight: string; // e.g. "SYAHMI"
  part2?: string; // e.g. "AOF."
  size?: "sm" | "md" | "lg" | "giant";
  className?: string;
}

export const BrutalistBanner: React.FC<BrutalistBannerProps> = ({
  part1 = "SAYA",
  highlight = "SYAHMI",
  part2 = "AOF.",
  size = "giant",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-2xl sm:text-3xl",
    md: "text-4xl sm:text-5xl",
    lg: "text-5xl sm:text-7xl",
    giant: "text-6xl sm:text-8xl lg:text-9xl",
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {part1 && (
        <span className={`font-display font-black uppercase text-white tracking-tighter leading-[0.88] ${sizeClasses}`}>
          {part1}
        </span>
      )}
      <div className="relative my-1">
        {/* High-Contrast Solid Yellow Brutalist Block */}
        <div className="bg-acid text-ink px-4 sm:px-6 py-1 sm:py-2 shadow-brutal-dark border-2 border-ink inline-block transform -skew-x-2">
          <span className={`font-display font-black uppercase tracking-tighter leading-[0.88] block ${sizeClasses}`}>
            {highlight}
          </span>
        </div>
      </div>
      {part2 && (
        <span className={`font-display font-black uppercase text-white tracking-tighter leading-[0.88] ${sizeClasses}`}>
          {part2}
        </span>
      )}
    </div>
  );
};
