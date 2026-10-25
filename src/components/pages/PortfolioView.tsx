"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { PROJECTS } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { ConcretePlinth } from "@/components/ui/ConcretePlinth";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

interface PortfolioViewProps {
  locale: Locale;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        tl.from(".motion-portfolio-title", {
          opacity: 0,
          y: 40,
          duration: 0.7,
        }).from(
          ".motion-3d-stage",
          { opacity: 0, scale: 0.94, duration: 0.75 },
          "-=0.4"
        );

        tl.eventCallback("onComplete", () => {
          gsap.set(".motion-portfolio-title, .motion-3d-stage", {
            clearProps: "all",
          });
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".motion-portfolio-title, .motion-3d-stage", {
          opacity: 1,
          clearProps: "all",
        });
      });
    },
    { scope: containerRef }
  );

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink overflow-x-hidden relative"
    >
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="03 // PORTFOLIO_3D_STAGE" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Section Layout: Left Typography + Right 3D Gallery Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px]">
            {/* Left 5 Cols: Monumental Typography & CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <Terminal className="w-4 h-4" />
                <span>[ 03 / PORTFOLIO ] {t.portfolio.badge}</span>
              </div>

              <div>
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white motion-portfolio-title">
                  IDEA JADI
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    REALITI.
                  </span>
                </h1>
              </div>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                {t.portfolio.subhead}
              </p>

              <div>
                <a
                  href="#project-details"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal"
                >
                  <span>Lihat Semua Projek</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>
            </div>

            {/* Right 7 Cols: CSS 3D Perspective Stage */}
            <div className="lg:col-span-7 relative motion-3d-stage">
              <div className="relative w-full [perspective:1200px] perspective-1000 py-6 sm:py-10">
                <div className="relative w-full preserve-3d h-[380px] sm:h-[480px] lg:h-[520px] flex items-center justify-center">
                  {/* Background Concrete Plinth Geometry */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 scale-90 sm:scale-100">
                    <ConcretePlinth
                      variant="pedestal-angled"
                      hasHazardMarkings={true}
                      cobaltSplash={true}
                      className="w-full max-w-[550px]"
                    />
                  </div>

                  {/* 3D Floating Screen Cards */}
                  {PROJECTS.map((project, idx) => {
                    const isCenter = idx === activeIndex;
                    const isLeft = idx === (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
                    const isRight = idx === (activeIndex + 1) % PROJECTS.length;

                    // Desktop 3D dynamic transforms
                    let transformClass = "opacity-0 pointer-events-none";
                    if (isCenter) {
                      transformClass =
                        "z-30 opacity-100 scale-100 translate-x-0 translate-y-[-20px] [transform:translate3d(0,-20px,60px)_rotateY(0deg)_rotateX(4deg)]";
                    } else if (isLeft) {
                      transformClass =
                        "z-10 opacity-75 scale-90 -translate-x-[120px] sm:-translate-x-[200px] translate-y-[30px] sm:translate-y-[50px] [transform:translate3d(-180px,40px,-40px)_rotateY(16deg)_rotateX(6deg)] hover:opacity-100";
                    } else if (isRight) {
                      transformClass =
                        "z-20 opacity-75 scale-90 translate-x-[120px] sm:translate-x-[200px] translate-y-[40px] sm:translate-y-[60px] [transform:translate3d(180px,50px,20px)_rotateY(-16deg)_rotateX(6deg)] hover:opacity-100";
                    }

                    return (
                      <div
                        key={project.id}
                        onClick={() => setActiveIndex(idx)}
                        className={`absolute w-[290px] sm:w-[420px] lg:w-[460px] transition-all duration-700 ease-out cursor-pointer group ${transformClass}`}
                      >
                        {/* Browser Chrome Window */}
                        <div
                          className={`bg-zinc-950 border-2 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
                            isCenter
                              ? "border-acid shadow-[0_0_25px_rgba(243,255,0,0.25)]"
                              : "border-zinc-700 hover:border-zinc-500"
                          }`}
                        >
                          {/* Chrome Top Bar */}
                          <div className="px-3 py-2 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                            </div>

                            <div className="font-mono text-xs font-bold text-zinc-300">
                              <span className="text-acid">0{idx + 1} / </span>
                              <span>{project.title}</span>
                            </div>

                            <div>
                              <DemoBadge
                                type={
                                  idx === 0
                                    ? "KONSEP DEMO"
                                    : idx === 1
                                    ? "EKSPERIMENTAL"
                                    : "FRONTEND DEMO"
                                }
                                variant={isCenter ? "acid" : "zinc"}
                                showPulse={isCenter}
                              />
                            </div>
                          </div>

                          {/* Screenshot Mockup Container */}
                          <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 300px, 460px"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                              priority={idx === 0}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Slider Track */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="font-bold text-white text-sm">
                0{activeIndex + 1} <span className="text-zinc-600">/ 0{PROJECTS.length}</span>
              </span>
              <div className="w-36 sm:w-48 h-1 bg-zinc-800 relative overflow-hidden">
                <div
                  className="h-full bg-acid transition-all duration-500 ease-out"
                  style={{ width: `${((activeIndex + 1) / PROJECTS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="w-11 h-11 min-w-[44px] min-h-[44px] border border-zinc-700 bg-surface flex items-center justify-center text-zinc-300 hover:bg-acid hover:text-ink hover:border-acid transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="w-11 h-11 min-w-[44px] min-h-[44px] border border-zinc-700 bg-surface flex items-center justify-center text-zinc-300 hover:bg-acid hover:text-ink hover:border-acid transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Project Technical Details Section */}
          <div id="project-details" className="mt-8 sm:mt-16 p-6 sm:p-8 border-2 border-zinc-800 bg-surface">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-acid font-bold">
                    {activeProject.category}
                  </span>
                  <DemoBadge
                    type={locale === "en" ? activeProject.statusEn : activeProject.status}
                    variant="acid"
                  />
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                  {activeProject.title} — {activeProject.tagline[locale]}
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {activeProject.description[locale]}
                </p>

                {/* Stack Tags */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase block mb-1.5">
                    {t.portfolio.stackLabel}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 bg-ink border border-zinc-800 text-xs font-mono text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Honest Disclosure */}
                {activeProject.demoNote && (
                  <div className="mt-4 p-3 bg-ink border border-zinc-800 flex items-start gap-2.5 text-xs font-mono text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-acid shrink-0 mt-0.5" />
                    <div>
                      <span className="text-zinc-200 font-bold block mb-0.5">
                        {t.portfolio.noteLabel}
                      </span>
                      <span>{activeProject.demoNote[locale]}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="shrink-0 pt-4 lg:pt-0 w-full sm:w-auto">
                <Link
                  href={`/${locale === "en" ? "en/" : ""}hubungi?service=website-ui&project=${activeProject.slug}`}
                  className="w-full sm:w-auto justify-center px-6 py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-colors flex items-center gap-2 shadow-brutal"
                >
                  <span>Bincang Projek Serupa</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
