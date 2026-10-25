import React from "react";

export interface ReflectiveFloorProps {
  glowColor?: "acid" | "cobalt" | "dual";
  height?: string;
  className?: string;
}

export const ReflectiveFloor: React.FC<ReflectiveFloorProps> = ({
  glowColor = "dual",
  height = "h-40 sm:h-56",
  className = "",
}) => {
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${height} ${className}`}>
      {/* 1. Base Dark Ground Surface */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090B]/80 to-[#09090B]" />

      {/* 2. Specular Horizontal Reflection Glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent" />

      {/* 3. Acid Yellow Specular Glow (Left / Center) */}
      {(glowColor === "acid" || glowColor === "dual") && (
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-28 bg-acid/15 rounded-[100%] blur-2xl transform -scale-y-100" />
      )}

      {/* 4. Cobalt Blue Specular Glow (Right / Center) */}
      {(glowColor === "cobalt" || glowColor === "dual") && (
        <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-28 bg-cobalt/25 rounded-[100%] blur-2xl transform -scale-y-100" />
      )}
    </div>
  );
};
