import React from "react";

export type DemoBadgeType =
  | "KONSEP DEMO"
  | "EKSPERIMENTAL"
  | "FRONTEND DEMO"
  | "KARAKTER VISUAL JENAMA"
  | "UI/UX KONSEP";

export interface DemoBadgeProps {
  type: DemoBadgeType | string;
  variant?: "acid" | "cobalt" | "zinc" | "outline";
  showPulse?: boolean;
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({
  type,
  variant = "acid",
  showPulse = true,
  className = "",
}) => {
  const variantStyles = {
    acid: "bg-zinc-950 border-zinc-800 text-acid shadow-[0_0_12px_rgba(243,255,0,0.15)]",
    cobalt: "bg-zinc-950 border-cobalt/60 text-cobalt-light shadow-[0_0_12px_rgba(16,59,255,0.2)]",
    zinc: "bg-surface-elevated border-zinc-700 text-zinc-300",
    outline: "bg-transparent border-zinc-600 text-white",
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 border text-[10px] font-mono font-bold tracking-widest uppercase select-none ${variantStyles} ${className}`}
    >
      {showPulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-acid" />
        </span>
      )}
      <span>{type}</span>
    </div>
  );
};
