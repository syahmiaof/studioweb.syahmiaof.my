"use client";

import React, { useState, useRef } from "react";
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
import { ArchitecturalNumeral04 } from "@/components/ui/ArchitecturalNumeral04";
import { BrutalistArrow } from "@/components/ui/BrutalistArrow";
import { ReflectiveFloor } from "@/components/ui/ReflectiveFloor";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  ArrowRight,
  Video,
  Globe,
  CheckCircle2,
  Circle,
  Terminal,
} from "lucide-react";

interface PricingViewProps {
  locale: Locale;
}

export const PricingView: React.FC<PricingViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const [selectedPackageId, setSelectedPackageId] = useState<string>("business");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalDisplayRef = useRef<HTMLSpanElement>(null);

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculation = calculateFrontendEstimate(selectedPackageId, selectedAddonIds);
  const selectedPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || PRICING_PACKAGES[1];

  // GSAP Entrance Reveal & Desktop Scroll Parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        // 1. Slogan
        tl.from(".motion-pricing-title", {
          opacity: 0,
          y: 40,
          duration: 0.7,
        })
          // 2. Architectural Numeral 04 & Diagonal Arrow
          .from(
            ".motion-numeral04",
            {
              opacity: 0,
              scale: 0.92,
              x: -30,
              duration: 0.8,
            },
            "-=0.45"
          )
          // 3. Hardware Terminal Box
          .from(
            ".motion-terminal-box",
            {
              opacity: 0,
              y: 40,
              duration: 0.65,
            },
            "-=0.5"
          )
          // 4. Package Cards & Add-ons
          .from(
            ".motion-package-card",
            {
              opacity: 0,
              y: 15,
              stagger: 0.06,
            },
            "-=0.35"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-pricing-title, .motion-numeral04, .motion-terminal-box, .motion-package-card",
            { clearProps: "all" }
          );
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-numeral04-num", {
          scrollTrigger: {
            trigger: ".pricing-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 12,
          ease: "none",
        });

        gsap.to(".motion-numeral04-arrow", {
          scrollTrigger: {
            trigger: ".pricing-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 18,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-pricing-title, .motion-numeral04, .motion-terminal-box, .motion-package-card",
          { opacity: 1, clearProps: "all" }
        );
      });
    },
    { scope: containerRef }
  );

  // Tactile Hardware Recalculation Pulse
  useGSAP(
    () => {
      if (!totalDisplayRef.current) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.fromTo(
        totalDisplayRef.current,
        { scale: 1.07, color: "#FFFFFF" },
        {
          scale: 1,
          color: "#F3FF00",
          duration: 0.22,
          ease: "power2.out",
          clearProps: "scale,color",
        }
      );
    },
    { dependencies: [calculation.total], revertOnUpdate: false }
  );

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
    <div
      ref={containerRef}
      className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink relative overflow-x-hidden"
    >
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="04 // PRICING_STUDIO" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pricing-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px]">
            {/* Left 5 Cols: Monumental Heading, Architectural 04 & Yellow Arrow */}
            <div className="lg:col-span-5 relative space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <Terminal className="w-4 h-4" />
                <span>[ 04 / HARGA ] {t.pricing.badge}</span>
              </div>

              <div>
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white motion-pricing-title">
                  BINA IKUT
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    BAJET.
                  </span>
                </h1>
              </div>

              <div className="inline-block bg-surface/80 border border-zinc-800 p-3 text-xs sm:text-sm font-mono text-zinc-300 max-w-md">
                {t.pricing.subhead}
              </div>

              {/* Architectural 3D Numeral "04" & Diagonal Arrow Stage */}
              <div className="relative pt-3 sm:pt-10 motion-numeral04">
                <div className="motion-numeral04-num">
                  <ArchitecturalNumeral04 className="w-full max-w-[280px] sm:max-w-[380px] opacity-90" />
                </div>
                <div className="motion-numeral04-arrow absolute top-1/2 left-1/3 w-48 sm:w-64 -translate-y-12 translate-x-4 pointer-events-none z-20">
                  <BrutalistArrow variant="diagonal-pricing" className="w-full h-auto" />
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Heavy Industrial Hardware Terminal Configurator */}
            <div className="lg:col-span-7 relative z-20">
              <div className="bg-zinc-950 border-2 border-zinc-700/80 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(243,255,0,0.06)] relative motion-terminal-box">
                {/* Hardware Screws at Corners */}
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full border border-zinc-700 bg-zinc-900" />

                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                    KIRA HARGA <span className="text-acid">WEBSITE</span>
                  </h2>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    SYS_TERMINAL // V2.4
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  {/* 1. Base Package Selector */}
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                      {t.pricing.basePackagesLabel}
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PRICING_PACKAGES.filter((p) => !p.isFullStack).map((pkg) => {
                        const isSelected = selectedPackageId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`motion-package-card p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? "bg-acid/10 border-acid shadow-[0_0_15px_rgba(243,255,0,0.2)]"
                                : "bg-surface border-zinc-800 hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {isSelected ? (
                                <CheckCircle2 className="w-4 h-4 text-acid shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                              )}
                              <span className="font-mono text-xs font-bold text-white uppercase">
                                {pkg.name[locale]}
                              </span>
                            </div>

                            <div className="pt-2 border-t border-zinc-800/80">
                              <span
                                className={`font-display font-black text-xl ${
                                  isSelected ? "text-acid" : "text-white"
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

                  {/* 2. Add-on Toggles */}
                  {!selectedPackage.isFullStack && (
                    <div>
                      <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                        {t.pricing.addonsLabel}
                      </span>

                      <div className="space-y-3">
                        {PRICING_ADDONS.map((addon) => {
                          const isEnabled = selectedAddonIds.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => toggleAddon(addon.id)}
                              className={`motion-package-card p-3.5 border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                                isEnabled
                                  ? "bg-surface border-acid/80"
                                  : "bg-surface border-zinc-800 hover:border-zinc-700"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 border border-zinc-700 bg-ink flex items-center justify-center shrink-0">
                                  {addon.id === "animation" ? (
                                    <Video className="w-4 h-4 text-acid" />
                                  ) : (
                                    <Globe className="w-4 h-4 text-acid" />
                                  )}
                                </div>
                                <div>
                                  <span className="text-xs font-mono font-bold text-white block">
                                    {addon.name[locale]}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="font-mono text-xs font-bold text-zinc-300">
                                  +{formatMYR(addon.price)}
                                </span>

                                {/* Brutalist Toggle Switch */}
                                <div
                                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                                    isEnabled
                                      ? "bg-cobalt border border-acid"
                                      : "bg-zinc-800 border border-zinc-700"
                                  }`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full transition-transform ${
                                      isEnabled ? "translate-x-6 bg-acid" : "translate-x-0 bg-zinc-400"
                                    }`}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 3. Live Project Estimate Card */}
                  <div className="p-6 bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                        {t.pricing.summaryLabel}
                      </span>
                      <span
                        ref={totalDisplayRef}
                        className="font-display font-black text-4xl sm:text-5xl text-acid tracking-tight block"
                      >
                        {formatMYR(calculation.total)}
                      </span>
                    </div>

                    <div className="w-full sm:w-auto text-center sm:text-right space-y-2">
                      <Link
                        href={quoteHandoffUrl()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal"
                      >
                        <span>{t.pricing.ctaQuote}</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </Link>
                      <p className="text-[10px] font-mono text-zinc-500">
                        Harga anggaran. Domain dan hosting berasingan.
                      </p>
                    </div>
                  </div>

                  {/* 4. Custom Full-Stack System Banner */}
                  <div className="p-4 border border-zinc-800 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 border border-zinc-700 bg-ink flex items-center justify-center font-mono font-bold text-xs text-white">
                        &lt;/&gt;
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-white block">
                          Sistem custom?
                        </span>
                        <span className="font-display font-black text-lg text-cobalt-light">
                          Dari RM3,250
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`${locale === "en" ? "/en/hubungi" : "/hubungi"}?service=full-stack&package=custom-system`}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3.5 bg-cobalt text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-cobalt-light transition-colors"
                    >
                      <span>Bincang Projek</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reflective Ground Floor Surface */}
        <ReflectiveFloor glowColor="dual" className="mt-12" />
      </main>

      <Footer locale={locale} />
    </div>
  );
};
