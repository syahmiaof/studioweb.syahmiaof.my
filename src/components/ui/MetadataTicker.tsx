import React from "react";

export interface TickerItem {
  label: string;
  value: string;
  isStatus?: boolean;
}

export interface MetadataTickerProps {
  items?: TickerItem[];
  className?: string;
}

export const DEFAULT_TICKER_ITEMS: TickerItem[] = [
  { label: "LOKASI", value: "BESUT, TERENGGANU" },
  { label: "KADAR PRESTASI", value: "60FPS // 100 LIGHTHOUSE" },
  { label: "SENI BINA", value: "NEXT.JS 14 APP ROUTER" },
  { label: "INTEGRITI", value: "100% TIADA FAKE TESTIMONIAL" },
  { label: "STATUS", value: "ONLINE", isStatus: true },
];

export const MetadataTicker: React.FC<MetadataTickerProps> = ({
  items = DEFAULT_TICKER_ITEMS,
  className = "",
}) => {
  return (
    <div className={`w-full bg-ink border-y border-zinc-800/80 py-2.5 px-4 overflow-hidden select-none ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-6 text-[11px] font-mono">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-zinc-600 font-bold">{item.label}:</span>
            {item.isStatus ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                {item.value}
              </span>
            ) : (
              <span className="text-zinc-300 font-medium">{item.value}</span>
            )}
            {idx < items.length - 1 && <span className="text-zinc-800 ml-4 hidden md:inline">{"//"}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
