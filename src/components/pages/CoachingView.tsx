"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { COACHING_TOPICS, COACHING_DURATIONS } from "@/content/coaching";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Terminal,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Info,
  GraduationCap,
} from "lucide-react";

interface CoachingViewProps {
  locale: Locale;
}

export const CoachingView: React.FC<CoachingViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const [selectedTopicId, setSelectedTopicId] = useState<string>("react-next");
  const [selectedDuration, setSelectedDuration] = useState<"60" | "90">("90");

  const selectedTopic =
    COACHING_TOPICS.find((top) => top.id === selectedTopicId) || COACHING_TOPICS[1];

  const coachingHandoffUrl = () => {
    const base = locale === "en" ? "/en/hubungi" : "/hubungi";
    return `${base}?service=coaching&topic=${selectedTopicId}&duration=${selectedDuration}`;
  };

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-cobalt-light mb-3">
              <Terminal className="w-4 h-4" />
              <span>[05/07] {t.coaching.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.coaching.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.coaching.subhead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Cols: Topic & Duration Selection */}
            <div className="lg:col-span-7 space-y-8">
              {/* 1. Topics Selection */}
              <div className="space-y-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cobalt-light">
                  {t.coaching.topicsLabel}
                </h2>

                <div className="space-y-4">
                  {COACHING_TOPICS.map((topic) => {
                    const isSelected = selectedTopicId === topic.id;
                    return (
                      <div
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-6 border-2 transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-cobalt/15 border-cobalt shadow-brutal-cobalt"
                            : "bg-surface border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <span className="text-[10px] font-mono text-cobalt-light font-bold block mb-1">
                              MODUL // {topic.id.toUpperCase()}
                            </span>
                            <h3 className="font-display font-black text-2xl uppercase text-white">
                              {topic.title[locale]}
                            </h3>
                          </div>
                          <div
                            className={`w-5 h-5 border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-cobalt text-white border-cobalt font-bold"
                                : "border-zinc-700 bg-ink"
                            }`}
                          >
                            {isSelected ? "✓" : null}
                          </div>
                        </div>

                        <p className="text-xs text-zinc-400 font-mono mb-3">
                          {topic.subtitle[locale]}
                        </p>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                          {topic.description[locale]}
                        </p>

                        {/* Curriculum Points */}
                        <div className="pt-3 border-t border-zinc-800/80 space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                            {t.coaching.keyTakeawaysLabel}:
                          </span>
                          {topic.points[locale].map((pt) => (
                            <div key={pt} className="flex items-center gap-2 text-xs text-zinc-300">
                              <span className="text-acid">•</span>
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Duration Selection */}
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-cobalt-light">
                  {t.coaching.durationLabel}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COACHING_DURATIONS.map((dur) => {
                    const isSelected = selectedDuration === dur.value;
                    return (
                      <div
                        key={dur.value}
                        onClick={() => setSelectedDuration(dur.value)}
                        className={`p-5 border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-cobalt/15 border-cobalt shadow-brutal-cobalt"
                            : "bg-surface border-zinc-800 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 font-display font-bold text-lg text-white">
                            <Clock className="w-4 h-4 text-cobalt-light" />
                            <span>{dur.label[locale]}</span>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-cobalt text-white font-bold">
                              DIPILIH
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {dur.description[locale]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Coaching Artwork & Summary Box */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              {/* Character Artwork Frame */}
              <div className="border-2 border-zinc-800 bg-surface p-4 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-3 left-3 text-[10px] font-mono text-cobalt-light z-20">
                  +[05]_COACHING_CREATOR
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-500 z-20">
                  SEATED_LAPTOP
                </div>

                <div className="relative w-full aspect-square flex items-end justify-center z-10 pt-4">
                  <Image
                    src="/assets/characters/03_character_creator_laptop.png"
                    alt="SYAHMIAOF Coaching Mentor Character"
                    width={1024}
                    height={1536}
                    priority
                    className="w-full h-auto object-contain max-h-[95%] transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
                  />
                </div>
              </div>

              {/* Inquiry Action Box */}
              <div className="border border-zinc-800 bg-ink p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    PILIHAN SESI ANDA:
                  </span>
                  <h4 className="font-display font-bold text-xl uppercase text-white">
                    {selectedTopic.title[locale]}
                  </h4>
                  <span className="inline-block text-xs font-mono text-acid font-bold">
                    Tempoh: {selectedDuration} Minit
                  </span>
                </div>

                <div className="p-3 bg-surface border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-cobalt-light shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.coaching.notice}</p>
                </div>

                <Link
                  href={coachingHandoffUrl()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors shadow-brutal"
                >
                  <span>{t.coaching.ctaAskSlot}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
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
