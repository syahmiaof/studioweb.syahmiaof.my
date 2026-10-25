"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import {
  PRICING_PACKAGES,
  PRICING_ADDONS,
  calculateFrontendEstimate,
  formatMYR,
} from "@/lib/pricing/calculator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Terminal,
  Check,
  Plus,
  ArrowUpRight,
  Calculator,
  ShieldAlert,
  Info,
} from "lucide-react";

interface PricingViewProps {
  locale: Locale;
}

export const PricingView: React.FC<PricingViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const [selectedPackageId, setSelectedPackageId] = useState<string>("business");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculation = calculateFrontendEstimate(selectedPackageId, selectedAddonIds);
  const selectedPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || PRICING_PACKAGES[1];

  // Build the quote handoff link with typed parameters
  const quoteHandoffUrl = () => {
    const baseRoute = locale === "en" ? "/en/hubungi" : "/hubungi";
    if (selectedPackage.isFullStack) {
      return `${baseRoute}?service=full-stack&package=custom-system`;
    }
    const addonsParam = selectedAddonIds.join(",");
    return `${baseRoute}?service=website-ui&package=${selectedPackageId}&addons=${encodeURIComponent(
      addonsParam
    )}&estimate=${calculation.total}`;
  };

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-acid mb-3">
              <Terminal className="w-4 h-4" />
              <span>[04/07] {t.pricing.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.pricing.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.pricing.subhead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 Cols: Configurator Controls */}
            <div className="lg:col-span-8 space-y-10">
              {/* 1. Base Packages */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-acid">
                    {t.pricing.basePackagesLabel}
                  </h2>
                  <span className="text-xs font-mono text-zinc-500">PILIH SATU PAKEJ</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRICING_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-6 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? pkg.isFullStack
                              ? "bg-cobalt/15 border-cobalt shadow-brutal-cobalt"
                              : "bg-acid/10 border-acid shadow-brutal"
                            : "bg-surface border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        {isSelected && (
                          <div
                            className={`absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 ${
                              pkg.isFullStack ? "bg-cobalt text-white" : "bg-acid text-ink"
                            }`}
                          >
                            DIPILIH
                          </div>
                        )}

                        <div>
                          <span className="text-[11px] font-mono text-zinc-400 block mb-1">
                            {pkg.isFullStack ? "FULL-STACK ARCHITECTURE" : "FRONTEND SCOPE"}
                          </span>
                          <h3 className="font-display font-black text-xl uppercase text-white mb-2">
                            {pkg.name[locale]}
                          </h3>
                          <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                            {pkg.tagline[locale]}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-800/80">
                          <span className="text-xs font-mono text-zinc-500 block">
                            Harga Pakej:
                          </span>
                          <span
                            className={`font-display font-black text-2xl uppercase ${
                              isSelected
                                ? pkg.isFullStack
                                  ? "text-cobalt-light"
                                  : "text-acid"
                                : "text-white"
                            }`}
                          >
                            {pkg.priceDisplay}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Optional Frontend Add-ons */}
              {!selectedPackage.isFullStack && (
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-acid">
                      {t.pricing.addonsLabel}
                    </h2>
                    <span className="text-xs font-mono text-zinc-500">PILIHAN FLEKSIBEL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PRICING_ADDONS.map((addon) => {
                      const isEnabled = selectedAddonIds.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-5 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                            isEnabled
                              ? "bg-acid/10 border-acid shadow-brutal"
                              : "bg-surface border-zinc-800 hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="font-display font-bold text-lg text-white">
                              {addon.name[locale]}
                            </h4>
                            <div
                              className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                                isEnabled
                                  ? "bg-acid text-ink border-acid font-bold"
                                  : "border-zinc-700 bg-ink"
                              }`}
                            >
                              {isEnabled ? <Check className="w-3.5 h-3.5" /> : null}
                            </div>
                          </div>

                          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                            {addon.description[locale]}
                          </p>

                          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                            <span className="text-zinc-500">Tambah ke anggaran:</span>
                            <span className="text-acid font-bold">+{formatMYR(addon.price)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Scope Deliverables Preview for Selected Package */}
              <div className="p-6 border border-zinc-800 bg-surface/50 space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-zinc-400 block">
                  SKOP YANG TERMASUK DALAM {selectedPackage.name[locale].toUpperCase()}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {selectedPackage.deliverables[locale].map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="text-acid mt-0.5">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 4 Cols: Live Calculator Summary Box */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="border-2 border-zinc-800 bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative">
                <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-zinc-800">
                  <span className="text-acid font-bold">{t.pricing.summaryLabel}</span>
                  <Calculator className="w-4 h-4 text-zinc-500" />
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>{selectedPackage.name[locale]}:</span>
                    <span className="font-bold text-white">
                      {selectedPackage.isFullStack ? "Bermula RM3,250" : formatMYR(calculation.basePrice)}
                    </span>
                  </div>

                  {!selectedPackage.isFullStack && selectedAddonIds.length > 0 && (
                    <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                      <span className="text-zinc-500 block text-[11px]">
                        CIRI TAMBAHAN TERPILIH:
                      </span>
                      {selectedAddonIds.map((id) => {
                        const addon = PRICING_ADDONS.find((a) => a.id === id);
                        if (!addon) return null;
                        return (
                          <div
                            key={id}
                            className="flex items-center justify-between text-zinc-400 pl-2 border-l border-zinc-800"
                          >
                            <span>+ {addon.name[locale]}</span>
                            <span className="text-acid">+{formatMYR(addon.price)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="pt-4 border-t-2 border-zinc-800 flex items-end justify-between">
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block uppercase">
                        {t.pricing.totalLabel}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {selectedPackage.isFullStack ? "(ANGGARAN ASAS)" : "(ANGGARAN PROJEK)"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-display font-black text-3xl sm:text-4xl tracking-tight block ${
                          selectedPackage.isFullStack ? "text-cobalt-light" : "text-acid"
                        }`}
                      >
                        {selectedPackage.isFullStack
                          ? "Bermula RM3,250"
                          : formatMYR(calculation.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-3 bg-ink border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-acid shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.pricing.disclaimer}</p>
                </div>

                {/* Handoff CTA Button */}
                <Link
                  href={quoteHandoffUrl()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors shadow-brutal"
                >
                  <span>
                    {selectedPackage.isFullStack ? t.pricing.ctaConsult : t.pricing.ctaQuote}
                  </span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </Link>

                <p className="text-[10px] font-mono text-zinc-500 text-center">
                  Maklumat pakej & anggaran akan dibawa ke borang hubungi secara automatik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
