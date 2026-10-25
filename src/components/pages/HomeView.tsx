"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  ConcretePlinth,
  ArchitecturalSYA,
  IndustrialGrid,
  ReflectiveFloor,
  MetadataTicker,
} from "@/components/ui";
import {
  ArrowUpRight,
  Terminal,
  Calculator,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface HomeViewProps {
  locale: Locale;
}

export const HomeView: React.FC<HomeViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        // 1. Background Grid & 3D SYA Architecture
        tl.from(".motion-sya", {
          opacity: 0,
          scale: 0.94,
          x: 40,
          duration: 0.85,
        })
          // 2. Technical Badge & Tags
          .from(".motion-tag", { opacity: 0, y: 16, stagger: 0.08 }, "-=0.6")
          // 3. Brutalist Headline & Yellow Block
          .from(
            ".motion-headline",
            { opacity: 0, y: 45, stagger: 0.12, ease: "power3.out" },
            "-=0.45"
          )
          // 4. Subhead & Action Buttons
          .from(".motion-subhead", { opacity: 0, y: 20 }, "-=0.35")
          .from(".motion-cta", { opacity: 0, y: 20, stagger: 0.08 }, "-=0.25")
          // 5. Concrete Plinth & Seated Character
          .from(".motion-plinth", { opacity: 0, y: 55, duration: 0.75 }, "-=0.4")
          .from(".motion-character", { opacity: 0, y: 35, duration: 0.65 }, "-=0.55")
          // 6. Meta Bar & Ticker
          .from(".motion-meta", { opacity: 0, duration: 0.4 }, "-=0.3");

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-sya, .motion-tag, .motion-headline, .motion-subhead, .motion-cta, .motion-plinth, .motion-character, .motion-meta",
            { clearProps: "all" }
          );
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-sya", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 12,
          ease: "none",
        });

        gsap.to(".motion-grid", {
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: -6,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-sya, .motion-tag, .motion-headline, .motion-subhead, .motion-cta, .motion-plinth, .motion-character, .motion-meta, .motion-grid",
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

      <main className="flex-grow pt-20">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Digital Brutalism Visual Reconstruction) */}
        {/* ========================================================= */}
        <section className="hero-section relative min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-zinc-800 bg-ink">
          {/* Layer 0: Industrial Technical Grid */}
          <IndustrialGrid
            density="standard"
            showCrosshairs={true}
            coordinates="05.83° N, 102.55° E"
            className="opacity-30 motion-grid"
          />

          {/* Ambient Lighting Gradients */}
          <div className="absolute top-12 right-0 w-80 sm:w-96 lg:w-[520px] h-80 sm:h-96 lg:h-[520px] bg-acid/10 -rotate-12 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-cobalt/25 rotate-45 blur-3xl pointer-events-none" />

          {/* Layer 1: Giant 3D Angled 'SYA' Architectural Typography */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[-5%] lg:right-[0%] w-[120%] sm:w-[95%] lg:w-[68%] max-w-[1100px] opacity-40 sm:opacity-85 pointer-events-none z-0 motion-sya">
            <ArchitecturalSYA />
          </div>

          {/* Technical Grid Top Badge */}
          <div className="absolute top-6 left-6 hidden lg:flex items-center gap-3 font-mono text-xs text-zinc-500 z-20">
            <span className="text-acid font-bold">[01/07]</span>
            <span>HERO_INDEX // DIGITAL_BRUTALISM</span>
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-ping" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 lg:py-16 relative z-20 my-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headlines & Action CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Category Tags */}
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                  <span className="px-3 py-1 bg-zinc-900 border border-acid/50 text-acid font-bold tracking-wider inline-flex items-center gap-2 motion-tag">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>[ PEMBANGUNAN WEBSITE ]</span>
                  </span>
                  <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 tracking-wider motion-tag">
                    [ COACHING 1:1 ]
                  </span>
                </div>

                {/* Main Monumental Headline with Brutalist Acid Yellow Block */}
                <h1 className="font-display font-black tracking-tighter uppercase leading-[0.88] select-none motion-headline">
                  <span className="block text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white">
                    {t.home.headlinePart1}
                  </span>
                  <span className="inline-block mt-2 sm:mt-3 bg-acid text-ink px-4 sm:px-6 py-1 sm:py-2 -skew-x-2 shadow-brutal-dark border-2 border-ink">
                    <span className="block font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.88] text-ink">
                      {t.home.headlinePart2}
                    </span>
                  </span>
                </h1>

                {/* Subtitle / Value Proposition */}
                <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl leading-relaxed motion-subhead">
                  {t.home.subhead}
                </p>

                {/* High-Contrast Brutalist CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={locale === "en" ? "/en/portfolio" : "/portfolio"}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-acid text-ink font-display font-black text-base sm:text-lg uppercase tracking-wider hover:bg-white hover:text-ink transition-transform hover:-translate-y-0.5 shadow-brutal border-2 border-ink motion-cta"
                  >
                    <span>{t.home.ctaPortfolio}</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>

                  <Link
                    href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border-2 border-zinc-700 bg-surface text-white font-display font-bold text-base sm:text-lg uppercase tracking-wider hover:border-acid hover:text-acid transition-colors motion-cta"
                  >
                    <span>{t.home.ctaProject}</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>
                </div>

                {/* Technical Meta Bar */}
                <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-zinc-400 motion-meta">
                  <div>
                    <span className="text-zinc-600 block">LOKASI:</span>
                    <span>BESUT, TERENGGANU</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block">KADAR PRESTASI:</span>
                    <span className="text-acid font-bold">60FPS // 100 LIGHTHOUSE</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 block">STATUS:</span>
                    <span className="text-emerald-400 font-bold">ONLINE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Unboxed Character Anchored on Stepped Concrete Plinth */}
              <div className="lg:col-span-5 relative flex flex-col items-center justify-end min-h-[460px] sm:min-h-[560px] lg:min-h-[640px]">
                {/* Stepped Concrete Geometry Anchor Base */}
                <div className="absolute inset-x-0 bottom-0 flex justify-center z-10 pointer-events-none motion-plinth">
                  <ConcretePlinth
                    variant="hero-stepped"
                    hasHazardMarkings={true}
                    hazardPattern="both"
                    cobaltSplash={true}
                    className="w-full max-w-[560px] lg:max-w-[680px]"
                  />
                </div>

                {/* Seated Techwear Character Cutout (Unboxed) */}
                <div className="relative z-20 w-full max-w-[400px] sm:max-w-[460px] lg:max-w-[520px] pb-4 sm:pb-8 flex items-end justify-center pointer-events-none motion-character">
                  <Image
                    src="/assets/characters/07_hero_seated_character.png"
                    alt="SYAHMIAOF Studio Visual Brand Mascot - Seated Techwear Character"
                    width={1200}
                    height={1310}
                    priority
                    className="w-full h-auto object-contain filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                  />
                </div>

                {/* Stenciled Industrial Label Tag (Right Edge) */}
                <div className="absolute right-0 top-1/4 hidden xl:block z-20 pointer-events-none">
                  <div className="bg-ink/90 border border-zinc-800 px-3 py-2 space-y-0.5 text-right font-mono text-[10px]">
                    <div className="text-acid font-bold tracking-widest">IDEA / CODE / EXPERIENCE</div>
                    <div className="text-zinc-500">SYAHMIAOF // BESUT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Layer 2: Reflective Floor Glare at Base of Hero */}
          <div className="w-full relative z-10">
            <ReflectiveFloor glowColor="dual" height="h-16 sm:h-28 lg:h-36" />
          </div>

          {/* Layer 5: Industrial Metadata Ticker Bar */}
          <div className="relative z-30">
            <MetadataTicker />
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. SERVICES TEASER CHAPTER                                */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-zinc-800 bg-surface/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid">
                  {t.home.serviceTeaser.badge}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
                  {t.home.serviceTeaser.title}
                </h2>
                <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
                  {t.home.serviceTeaser.desc}
                </p>
              </div>
              <Link
                href={locale === "en" ? "/en/servis" : "/servis"}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-acid hover:text-white transition-colors"
              >
                <span>{t.home.serviceTeaser.link}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category 1 Card */}
              <div className="border border-zinc-800 bg-ink p-6 sm:p-8 relative group hover:border-acid transition-colors">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                  <span className="text-acid font-bold">KATEGORI 01</span>
                  <span>FRONTEND // UI</span>
                </div>
                <h3 className="font-display font-bold text-2xl uppercase text-white mb-2">
                  Frontend & Website UI
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Landing page moden, portfolio kreatif, dan laman web korporat dengan rekaan Digital Brutalism serta animasi GSAP.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono">
                  <span className="text-zinc-500">Mula dari:</span>
                  <span className="text-acid font-bold text-base">RM645</span>
                </div>
              </div>

              {/* Category 2 Card */}
              <div className="border border-zinc-800 bg-ink p-6 sm:p-8 relative group hover:border-cobalt-light transition-colors">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                  <span className="text-cobalt-light font-bold">KATEGORI 02</span>
                  <span>FULL-STACK // ARCHITECTURE</span>
                </div>
                <h3 className="font-display font-bold text-2xl uppercase text-white mb-2">
                  Sistem Khas & Pangkalan Data
                </h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Sistem pengurusan tersuai, pangkalan data berpusat, panel kawalan admin (dashboard), dan integrasi API lengkap.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs font-mono">
                  <span className="text-zinc-500">Mula dari:</span>
                  <span className="text-cobalt-light font-bold text-base">RM3,250 (Manual Quote)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. PORTFOLIO TEASER CHAPTER                               */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-zinc-800 bg-ink relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid">
                  {t.home.portfolioTeaser.badge}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
                  {t.home.portfolioTeaser.title}
                </h2>
                <p className="text-zinc-400 max-w-xl text-sm sm:text-base">
                  {t.home.portfolioTeaser.desc}
                </p>
              </div>
              <Link
                href={locale === "en" ? "/en/portfolio" : "/portfolio"}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-acid hover:text-white transition-colors"
              >
                <span>{t.home.portfolioTeaser.link}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3 Layered Perspective Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "SYMI UI",
                  cat: "Design System",
                  status: "KONSEP DEMO",
                  desc: "Sistem komponen web brutalist berprestasi tinggi untuk pembangun moden.",
                },
                {
                  title: "LAMBORGHINI CONCEPT",
                  cat: "Experimental UI",
                  status: "EKSPERIMENTAL",
                  desc: "Pengalaman pendaratan tidak rasmi dengan kesan 3D dan peralihan agresif.",
                },
                {
                  title: "UBERPOKMI UI",
                  cat: "Mobile Prototype",
                  status: "FRONTEND DEMO",
                  desc: "Prototaip superapp penghantaran responsif dengan aliran antaramuka lancar.",
                },
              ].map((proj, idx) => (
                <div
                  key={proj.title}
                  className="border border-zinc-800 bg-surface p-6 flex flex-col justify-between hover:border-acid transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">PROJ_0{idx + 1}</span>
                      <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-acid font-bold">
                        {proj.status}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl uppercase text-white group-hover:text-acid transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{proj.desc}</p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-500">
                    <span>{proj.cat}</span>
                    <span className="text-acid group-hover:translate-x-1 transition-transform inline-block">
                      &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. PRICING & ESTIMATOR TEASER                             */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-zinc-800 bg-surface/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-ink border-2 border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-acid/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-acid">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>{t.home.pricingTeaser.badge}</span>
                  </div>
                  <h2 className="font-display font-black text-3xl sm:text-5xl uppercase text-white">
                    {t.home.pricingTeaser.title}
                  </h2>
                  <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
                    {t.home.pricingTeaser.desc}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                    <div className="p-3 border border-zinc-800 bg-surface">
                      <span className="text-zinc-500 block">LANDING:</span>
                      <span className="text-acid font-bold text-base">RM645</span>
                    </div>
                    <div className="p-3 border border-zinc-800 bg-surface">
                      <span className="text-zinc-500 block">BUSINESS:</span>
                      <span className="text-acid font-bold text-base">RM1,745</span>
                    </div>
                    <div className="p-3 border border-zinc-800 bg-surface col-span-2 sm:col-span-1">
                      <span className="text-zinc-500 block">FULL-STACK:</span>
                      <span className="text-cobalt-light font-bold text-base">RM3,250+</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
                  <Link
                    href={locale === "en" ? "/en/harga" : "/harga"}
                    className="w-full sm:w-auto px-8 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors text-center shadow-brutal"
                  >
                    {t.home.pricingTeaser.link}
                  </Link>
                  <span className="text-[11px] font-mono text-zinc-500 mt-3 text-left lg:text-right">
                    Anggaran tepat dengan add-ons interaktif & dwibahasa.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. COACHING TEASER CHAPTER                                */}
        {/* ========================================================= */}
        <section className="py-20 border-b border-zinc-800 bg-ink relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 relative">
                <div className="w-full max-w-[340px] aspect-square border border-zinc-800 bg-surface relative p-4 flex items-center justify-center">
                  <Image
                    src="/assets/characters/03_character_creator_laptop.png"
                    alt="SYAHMIAOF Coaching Character"
                    width={1024}
                    height={1536}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 bg-ink border border-zinc-800 text-acid">
                    COACHING_1ON1
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cobalt-light">
                  {t.home.coachingTeaser.badge}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
                  {t.home.coachingTeaser.title}
                </h2>
                <p className="text-zinc-400 max-w-xl text-sm sm:text-base leading-relaxed">
                  {t.home.coachingTeaser.desc}
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    "Asas Web: HTML5, CSS Moden & JavaScript ES6+",
                    "React / Next.js App Router & Seni Bina Komponen",
                    "Mentor Projek & Ulasan Kod (Code Review)",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-acid shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={locale === "en" ? "/en/coaching" : "/coaching"}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-acid text-acid hover:bg-acid hover:text-ink font-mono text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>{t.home.coachingTeaser.link}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. FINAL CALL TO ACTION                                   */}
        {/* ========================================================= */}
        <section className="py-24 bg-gradient-to-b from-surface to-ink relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid">
              LANGKAH SETERUSNYA
            </span>
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-white">
              {t.home.finalCta.headline}
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t.home.finalCta.desc}
            </p>
            <div className="pt-4">
              <Link
                href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-black text-lg uppercase tracking-wider hover:bg-acid-hover transition-transform hover:-translate-y-0.5 shadow-brutal"
              >
                <span>{t.home.finalCta.button}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
