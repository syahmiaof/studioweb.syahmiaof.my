import React from "react";

export interface HazardMarkingProps {
  variant?: "stripes" | "chevrons" | "caution-bar" | "diagonal-slash";
  height?: number | string;
  className?: string;
}

export const HazardMarking: React.FC<HazardMarkingProps> = ({
  variant = "stripes",
  height = "h-4",
  className = "",
}) => {
  if (variant === "chevrons") {
    return (
      <div className={`flex items-center overflow-hidden select-none ${className}`}>
        {[...Array(8)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-acid shrink-0 -mr-1" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,2 18,12 6,22 10,22 22,12 10,2" />
          </svg>
        ))}
      </div>
    );
  }

  if (variant === "caution-bar") {
    return (
      <div className={`relative border border-acid/40 bg-ink overflow-hidden py-1 px-3 flex items-center gap-3 ${className}`}>
        <div
          className="w-12 h-2 shrink-0"
          style={{
            background:
              "repeating-linear-gradient(-45deg, #F3FF00, #F3FF00 6px, #09090B 6px, #09090B 12px)",
          }}
        />
        <span className="font-mono text-[10px] tracking-widest text-acid font-bold uppercase">
          CAUTION // BRUTALIST_SURFACE
        </span>
      </div>
    );
  }

  // Default "stripes" or "diagonal-slash"
  const heightStyle = typeof height === "number" ? { height: `${height}px` } : undefined;
  const heightClass = typeof height === "string" ? height : "";

  return (
    <div
      className={`w-full ${heightClass} ${className}`}
      style={{
        ...heightStyle,
        background:
          "repeating-linear-gradient(-45deg, #F3FF00, #F3FF00 12px, #09090B 12px, #09090B 24px)",
      }}
      role="presentation"
    />
  );
};
