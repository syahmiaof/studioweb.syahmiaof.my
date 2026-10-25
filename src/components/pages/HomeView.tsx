"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowUpRight,
  Terminal,
  Layers,
  Sparkles,
  Cpu,
  Calculator,
  GraduationCap,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface HomeViewProps {
  locale: Locale;
}

export const HomeView: React.FC<HomeViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-20">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Approved Hero B Composition)            */}
        {/* ========================================================= */}
        <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-zinc-800 bg-grid-pattern">
          {/* Angular Acid Yellow Accent Block (Brutalist Geometry) */}
          <div className="absolute top-12 right-0 w-72 sm:w-96 lg:w-[480px] h-72 sm:h-96 lg:h-[480px] bg-acid/10 -rotate-12 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-cobalt/20 rotate-45 blur-3xl pointer-events-none" />

          {/* Technical Grid Top Badge */}
          <div className="absolute top-6 left-6 hidden lg:flex items-center gap-3 font-mono text-xs text-zinc-500">
            <span className="text-acid font-bold">[01/07]</span>
            <span>HERO_INDEX // DIGITAL_BRUTALISM</span>
            <span className="w-1.5 h-1.5 bg-acid rounded-full animate-ping" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Headlines & Action CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Status Chip */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-acid" />
                  <span>{t.home.heroTag}</span>
                </div>

                {/* Main Giant Brutalist Heading */}
                <div className="space-y-1">
                  <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tighter uppercase leading-[0.9] text-white">
                    {t.home.headlinePart1}
                    <br />
                    <span className="text-acid drop-shadow-[0_0_35px_rgba(243,255,0,0.2)]">
                      {t.home.headlinePart2}
                    </span>
                  </h1>
                </div>

                {/* Subtitle / Value Proposition */}
                <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-xl leading-relaxed">
                  {t.home.subhead}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={locale === "en" ? "/en/portfolio" : "/portfolio"}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-acid text-ink font-display font-black text-base sm:text-lg uppercase tracking-wider hover:bg-acid-hover transition-transform hover:-translate-y-0.5 shadow-brutal"
                  >
                    <span>{t.home.ctaPortfolio}</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>

                  <Link
                    href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                    className="flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-zinc-700 bg-surface text-white font-display font-bold text-base sm:text-lg uppercase tracking-wider hover:border-acid hover:text-acid transition-colors"
                  >
                    <span>{t.home.ctaProject}</span>
                  </Link>
                </div>

                {/* Technical Meta Bar */}
                <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-zinc-400">
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

              {/* Right Column: Hero B Seated Character Composited Foreground */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {/* Brutalist Frame Background Graphic */}
                <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[4/5] bg-gradient-to-b from-zinc-900 to-ink border-2 border-zinc-800 p-2 shadow-2xl overflow-hidden group">
                  {/* Decorative Crosshairs */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-acid z-20">
                    +[01]_HERO_CHAR
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-500 z-20">
                    2D_ALPHA_COMPOSITED
                  </div>

                  {/* Cobalt Architectural Accent Layer */}
                  <div className="absolute top-1/4 right-0 w-3/4 h-1/2 bg-cobalt/25 -skew-y-6 blur-xl" />

                  {/* Character Image */}
                  <div className="relative w-full h-full flex items-end justify-center z-10">
                    <Image
                      src="/assets/characters/07_hero_seated_character.png"
                      alt="SYAHMIAOF Studio Visual Brand Mascot - Seated Techwear Character"
                      width={1200}
                      height={1310}
                      priority
                      className="w-full h-auto object-contain max-h-[92%] transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                    />
                  </div>

                  {/* Bottom Technical Ticker */}
                  <div className="absolute bottom-2 left-2 right-2 bg-ink/90 border border-zinc-800 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-zinc-400 z-20">
                    <span>KARAKTER VISUAL JENAMA</span>
                    <span className="text-acid">TVETMARA BESUT</span>
                  </div>
                </div>
              </div>
            </div>
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
