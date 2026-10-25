"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { SERVICES_DATA } from "@/content/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  Check,
  ArrowUpRight,
  Database,
  Terminal,
  ShieldAlert,
  Code2,
} from "lucide-react";

interface ServicesViewProps {
  locale: Locale;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const frontendService = SERVICES_DATA[0];
  const fullstackService = SERVICES_DATA[1];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        // 1. Slogan
        tl.from(".motion-title", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
        })
          // 2. Dual Architectural Service Panels
          .from(
            ".motion-service-panel",
            { opacity: 0, y: 35, stagger: 0.15 },
            "-=0.4"
          )
          // 3. Cobalt Geometric Slabs & Chevron Arrow
          .from(
            ".motion-cobalt-geom",
            { opacity: 0, scale: 0.92, duration: 0.8 },
            "-=0.5"
          )
          // 4. Standing Builder Character Cutout
          .from(
            ".motion-builder-character",
            { opacity: 0, y: 45, duration: 0.7 },
            "-=0.55"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-title, .motion-service-panel, .motion-cobalt-geom, .motion-builder-character",
            { clearProps: "all" }
          );
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-cobalt-geom", {
          scrollTrigger: {
            trigger: ".services-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 14,
          ease: "none",
        });

        gsap.to(".motion-builder-character", {
          scrollTrigger: {
            trigger: ".services-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 6,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-title, .motion-service-panel, .motion-cobalt-geom, .motion-builder-character",
          { opacity: 1, clearProps: "all" }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink overflow-x-hidden relative"
    >
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="02 // ARCHITECTURAL_SERVICES" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================= */}
          {/* HERO SECTION: Dual Brutalist Panels & Builder Mascot      */}
          {/* ========================================================= */}
          <div className="services-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] pb-16 border-b border-zinc-800">
            {/* Left 7 Cols: Slogan & Dual Architectural Service Panels */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <Terminal className="w-4 h-4" />
                <span>[ 02 / SERVIS ] {t.services.badge}</span>
              </div>

              <div>
                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-[0.95] text-white motion-title">
                  BINA IDEA.
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    LANCAR WEB.
                  </span>
                </h1>
              </div>

              <p className="text-zinc-400 max-w-xl text-base sm:text-lg leading-relaxed">
                {t.services.subhead}
              </p>

              {/* Dual Brutalist Architectural Panels (Side-by-Side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
                {/* Panel 01: 01 / WEBSITE FRONTEND */}
                <div className="bg-zinc-950 border-2 border-zinc-800 p-6 relative flex flex-col justify-between hover:border-acid transition-all duration-300 group shadow-xl motion-service-panel">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-zinc-800">
                      <span className="text-acid font-black text-xs tracking-wider uppercase">
                        01 / WEBSITE FRONTEND
                      </span>
                      <Code2 className="w-4 h-4 text-zinc-500 group-hover:text-acid transition-colors" />
                    </div>

                    <div className="pt-4 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        Bermula
                      </span>
                      <span className="font-display font-black text-3xl sm:text-4xl text-acid tracking-tight block">
                        RM645
                      </span>
                      <p className="text-xs font-mono text-zinc-300 mt-2">
                        Landing Page <span className="text-zinc-600">•</span> Business Website <span className="text-zinc-600">•</span> Premium
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-zinc-800/80 mt-4">
                    <Link
                      href={locale === "en" ? "/en/harga" : "/harga"}
                      className="inline-flex items-center justify-between w-full min-h-[44px] px-5 py-3.5 bg-acid text-ink font-display font-black text-xs uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal"
                    >
                      <span>Lihat Pakej</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>

                {/* Panel 02: 02 / SISTEM FULL-STACK */}
                <div className="bg-zinc-950 border-2 border-zinc-800 p-6 relative flex flex-col justify-between hover:border-cobalt transition-all duration-300 group shadow-xl motion-service-panel">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-zinc-800">
                      <span className="text-cobalt-light font-black text-xs tracking-wider uppercase">
                        02 / SISTEM FULL-STACK
                      </span>
                      <Database className="w-4 h-4 text-zinc-500 group-hover:text-cobalt-light transition-colors" />
                    </div>

                    <div className="pt-4 pb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                        Bermula
                      </span>
                      <span className="font-display font-black text-3xl sm:text-4xl text-cobalt-light tracking-tight block">
                        RM3,250
                      </span>
                      <p className="text-xs font-mono text-zinc-300 mt-2">
                        Login <span className="text-zinc-600">•</span> Database <span className="text-zinc-600">•</span> Dashboard
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-zinc-800/80 mt-4">
                    <Link
                      href={
                        locale === "en"
                          ? "/en/hubungi?service=full-stack&package=custom-system"
                          : "/hubungi?service=full-stack&package=custom-system"
                      }
                      className="inline-flex items-center justify-between w-full min-h-[44px] px-5 py-3.5 bg-cobalt text-white font-display font-black text-xs uppercase tracking-wider hover:bg-cobalt-light transition-all shadow-brutal-cobalt"
                    >
                      <span>Bincang Projek</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Standing Builder Character with Layered Cobalt Architecture */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[600px]">
              {/* Layer 1: Layered Cobalt Blue Geometric Slabs */}
              <div className="motion-cobalt-geom absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-4 w-64 sm:w-80 h-64 sm:h-80 bg-cobalt -rotate-6 opacity-90 blur-[1px] pointer-events-none" />
                <div className="absolute bottom-12 left-6 w-52 h-52 bg-cobalt-light/35 skew-y-6 pointer-events-none" />

                {/* Layer 2: Giant Hazard Yellow Chevron Arrow Stencil */}
                <div className="absolute top-1/4 right-0 w-64 sm:w-76 pointer-events-none opacity-85 z-0">
                  <svg viewBox="0 0 300 180" fill="none" className="w-full h-auto drop-shadow-[0_8px_20px_rgba(243,255,0,0.3)]">
                    <path d="M 20 160 L 220 40 L 200 30 L 280 20 L 260 100 L 245 85 L 35 175 Z" fill="#F3FF00" />
                  </svg>
                </div>

                {/* Layer 3: Concrete Monolith Backdrop */}
                <div className="absolute bottom-0 right-1/4 w-48 h-60 bg-zinc-900 border border-zinc-800 -skew-x-3 pointer-events-none opacity-60 z-0" />
              </div>

              {/* Layer 4: Unboxed Standing Builder Character Cutout */}
              <div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] flex items-end justify-center pointer-events-none motion-builder-character">
                <Image
                  src="/assets/characters/02_character_builder_laptop.png"
                  alt="SYAHMIAOF Studio Standing Builder Character"
                  width={1024}
                  height={1536}
                  priority
                  className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* Corner Tag */}
              <div className="absolute bottom-4 right-2 bg-ink/90 border border-zinc-800 px-3 py-1.5 font-mono text-[10px] text-zinc-400 z-20">
                <span className="text-acid font-bold">CHAR_02 //</span> BUILDER_LAPTOP
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* TECHNICAL CAPABILITIES SECTION                           */}
          {/* ========================================================= */}
          <div className="py-16 border-b border-zinc-800 space-y-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid block mb-2">
                ANALISIS TEKNIKAL
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
                KEUPAYAAN & KEMAHIRAN REKAYASA
              </h2>
            </div>

            {/* Frontend Capabilities Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-acid text-ink font-mono text-xs font-bold uppercase">
                  01 / FRONTEND
                </span>
                <span className="font-display font-bold text-xl uppercase text-white">
                  {frontendService.title[locale]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {frontendService.features.map((feat) => (
                  <div
                    key={feat.title[locale]}
                    className="border border-zinc-800 bg-surface p-5 space-y-2 hover:border-acid transition-colors"
                  >
                    <h4 className="font-display font-bold text-base text-white">
                      {feat.title[locale]}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      {feat.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-Stack Capabilities Grid */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-cobalt text-white font-mono text-xs font-bold uppercase">
                  02 / FULL-STACK
                </span>
                <span className="font-display font-bold text-xl uppercase text-white">
                  {fullstackService.title[locale]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {fullstackService.features.map((feat) => (
                  <div
                    key={feat.title[locale]}
                    className="border border-zinc-800 bg-surface p-5 space-y-2 hover:border-cobalt-light transition-colors"
                  >
                    <h4 className="font-display font-bold text-base text-white">
                      {feat.title[locale]}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                      {feat.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DELIVERABLES VS BOUNDARIES COMPARISON                    */}
          {/* ========================================================= */}
          <div className="py-16 border-b border-zinc-800 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid block mb-2">
                TRANSPARENSI SKOP
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
                HASIL SERAHAN VS BATASAN KEJURUTERAAN
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Deliverables */}
              <div className="border-2 border-zinc-800 bg-surface p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{t.services.deliverablesLabel}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 font-mono">
                  {frontendService.deliverables[locale].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-acid mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {fullstackService.deliverables[locale].slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-cobalt-light mt-0.5">•</span>
                      <span>{item} (Full-Stack)</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Boundaries */}
              <div className="border-2 border-zinc-800 bg-surface p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t.services.boundariesLabel}</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-400 font-mono">
                  {frontendService.boundaries[locale].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-zinc-600 mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                  {fullstackService.boundaries[locale].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="text-zinc-600 mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BOTTOM ROUTING CONTINUITY STRIP                           */}
          {/* ========================================================= */}
          <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
            <div className="text-zinc-400">
              <span className="text-white font-bold">Perlu anggaran bajet segera?</span> Terokai kalkulator interaktif kami.
            </div>
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href={locale === "en" ? "/en/harga" : "/harga"}
                className="w-full sm:w-auto justify-center min-h-[44px] px-6 py-3.5 bg-acid text-ink font-display font-black uppercase text-xs tracking-wider hover:bg-white hover:text-ink transition-colors shadow-brutal flex items-center gap-2"
              >
                <span>Buka Pricing Studio</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                className="w-full sm:w-auto justify-center min-h-[44px] px-6 py-3.5 border border-zinc-700 bg-surface text-white font-display font-bold uppercase text-xs tracking-wider hover:border-acid hover:text-acid transition-colors flex items-center gap-2"
              >
                <span>Hubungi Studio</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
