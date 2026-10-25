"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { COACHING_TOPICS, COACHING_DURATIONS } from "@/content/coaching";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArchitecturalPlinth05 } from "@/components/ui/ArchitecturalPlinth05";
import { ReflectiveFloor } from "@/components/ui/ReflectiveFloor";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  Terminal,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Info,
  Circle,
} from "lucide-react";

interface CoachingViewProps {
  locale: Locale;
}

export const CoachingView: React.FC<CoachingViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const [selectedTopicId, setSelectedTopicId] = useState<string>("react-next");
  const [selectedDuration, setSelectedDuration] = useState<"60" | "90">("90");
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Standard Motion: Desktop & Tablets
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.65 },
        });

        // 1. Monumental 3-Line Headline
        tl.from(".motion-coaching-line", {
          opacity: 0,
          y: 45,
          stagger: 0.1,
          duration: 0.7,
        })
          // 2. Compact Configurator Console
          .from(
            ".motion-coaching-console",
            { opacity: 0, y: 30, duration: 0.6 },
            "-=0.4"
          )
          // 3. Colossal Cobalt Blue Plinth 05
          .from(
            ".motion-plinth05",
            { opacity: 0, scale: 0.94, duration: 0.75 },
            "-=0.45"
          )
          // 4. Seated Techwear Creator Mascot Cutout
          .from(
            ".motion-creator-character",
            { opacity: 0, y: 40, duration: 0.7 },
            "-=0.5"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-coaching-line, .motion-coaching-console, .motion-plinth05, .motion-creator-character",
            { clearProps: "all" }
          );
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-plinth05", {
          scrollTrigger: {
            trigger: ".coaching-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 10,
          ease: "none",
        });

        gsap.to(".motion-creator-character", {
          scrollTrigger: {
            trigger: ".coaching-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 5,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-coaching-line, .motion-coaching-console, .motion-plinth05, .motion-creator-character",
          { opacity: 1, clearProps: "all" }
        );
      });
    },
    { scope: containerRef }
  );

  const selectedTopic =
    COACHING_TOPICS.find((top) => top.id === selectedTopicId) || COACHING_TOPICS[1];

  const coachingHandoffUrl = () => {
    const base = locale === "en" ? "/en/hubungi" : "/hubungi";
    return `${base}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`;
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink overflow-x-hidden relative"
    >
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="05 // COACHING_STUDIO" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================= */}
          {/* HERO SECTION: Colossal 05 Plinth & Interactive Console    */}
          {/* ========================================================= */}
          <div className="coaching-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px] pb-16 border-b border-zinc-800">
            {/* Left 6 Cols: Monumental 3-Line Headline & Configurator Console */}
            <div className="lg:col-span-6 space-y-6 z-20">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-cobalt-light">
                <Terminal className="w-4 h-4" />
                <span>[ 05 / COACHING 1:1 ] {t.coaching.badge}</span>
              </div>

              {/* Monumental 3-Line Headline */}
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.88] select-none">
                <span className="block text-white motion-coaching-line">BELAJAR.</span>
                <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)] motion-coaching-line">
                  BINA.
                </span>
                <span className="block text-white motion-coaching-line">DEPLOY.</span>
              </h1>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg">
                {t.coaching.subhead}
              </p>

              {/* Compact Configurator Console */}
              <div className="motion-coaching-console border-2 border-zinc-800 bg-surface/95 backdrop-blur-md p-6 space-y-5 shadow-2xl">
                {/* 1. PILIH TOPIK */}
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                    {t.coaching.topicsLabel}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {COACHING_TOPICS.map((topic) => {
                      const isSelected = selectedTopicId === topic.id;
                      const shortTitle =
                        topic.id === "web-fundamentals"
                          ? "Asas Web"
                          : topic.id === "react-next"
                          ? "React / Next.js"
                          : "Mentor Projek";

                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopicId(topic.id)}
                          className={`min-h-[44px] p-3.5 text-left border-2 transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? "bg-cobalt border-cobalt-light text-white font-bold shadow-[0_0_15px_rgba(16,59,255,0.4)]"
                              : "bg-ink/80 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                          }`}
                        >
                          <span className="text-xs font-mono truncate">{shortTitle}</span>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-acid" : "border-zinc-600"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-acid" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. DURASI SESI */}
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 block mb-3">
                    {t.coaching.durationLabel}
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    {COACHING_DURATIONS.map((dur) => {
                      const isSelected = selectedDuration === dur.value;
                      return (
                        <button
                          key={dur.value}
                          type="button"
                          onClick={() => setSelectedDuration(dur.value)}
                          className={`p-3.5 border-2 transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-cobalt border-cobalt-light text-white font-bold shadow-[0_0_15px_rgba(16,59,255,0.4)]"
                              : "bg-ink/80 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className={`w-4 h-4 ${isSelected ? "text-acid" : "text-zinc-500"}`} />
                            <span className="text-xs font-mono font-bold">
                              {dur.value === "60" ? "60 Minit" : "90 Minit"}
                            </span>
                          </div>
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? "border-acid" : "border-zinc-600"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-acid" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action CTA & Notice */}
                <div className="pt-2 space-y-3">
                  <Link
                    href={coachingHandoffUrl()}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-white hover:text-ink transition-colors shadow-brutal"
                  >
                    <span>{t.coaching.ctaAskSlot}</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </Link>

                  <div className="p-3 bg-ink/80 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 flex items-start gap-2">
                    <Info className="w-4 h-4 text-cobalt-light shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{t.coaching.notice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Colossal Cobalt Blue "05" Plinth with Anchored Creator */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] z-10">
              <div className="motion-plinth05 w-full">
                <ArchitecturalPlinth05 className="w-full">
                  {/* Seated Techwear Creator Character Cutout Anchored onto Concrete Cube Pedestal */}
                  <div className="motion-creator-character absolute -top-32 sm:-top-44 -left-6 sm:-left-10 w-72 sm:w-96 aspect-square pointer-events-none z-30">
                    <Image
                      src="/assets/characters/03_character_creator_laptop.png"
                      alt="Syahmi AOF Coaching Mentor"
                      width={1024}
                      height={1536}
                      priority
                      className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                    />
                  </div>
                </ArchitecturalPlinth05>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CURRICULUM TRACK DETAILS SECTION                          */}
          {/* ========================================================= */}
          <div className="py-16 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cobalt-light block mb-2">
                MODUL LATIHAN
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white">
                SILIBUS & STRUKTUR BIMBINGAN 1:1
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {COACHING_TOPICS.map((topic, idx) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`border-2 p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-surface border-cobalt shadow-[0_0_20px_rgba(16,59,255,0.25)]"
                        : "bg-surface border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-cobalt-light font-bold">MODUL 0{idx + 1}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 bg-cobalt text-white font-bold text-[10px]">
                            AKTIF
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-black text-xl uppercase text-white">
                        {topic.title[locale]}
                      </h3>

                      <p className="text-xs text-zinc-400 font-mono">
                        {topic.subtitle[locale]}
                      </p>

                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {topic.description[locale]}
                      </p>

                      <div className="pt-4 border-t border-zinc-800 space-y-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                          Fokus Pembelajaran:
                        </span>
                        {topic.points[locale].map((pt) => (
                          <div key={pt} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-acid shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Pilih Topik Ini</span>
                      <span className="text-acid">&rarr;</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reflective Ground Floor Surface */}
        <ReflectiveFloor glowColor="cobalt" className="mt-8" />
      </main>

      <Footer locale={locale} />
    </div>
  );
};
