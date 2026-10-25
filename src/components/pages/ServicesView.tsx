"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { SERVICES_DATA } from "@/content/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Check,
  X,
  ArrowUpRight,
  Layers,
  Database,
  Terminal,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface ServicesViewProps {
  locale: Locale;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const [activeTab, setActiveTab] = useState<"frontend" | "fullstack">("frontend");

  const currentService =
    SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-acid mb-3">
              <Terminal className="w-4 h-4" />
              <span>[02/07] {t.services.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.services.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.services.subhead}
            </p>

            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-3 pt-8">
              <button
                type="button"
                onClick={() => setActiveTab("frontend")}
                className={`flex items-center gap-2 px-6 py-3 font-display font-bold text-sm uppercase tracking-wider transition-all border ${
                  activeTab === "frontend"
                    ? "bg-acid text-ink border-acid shadow-brutal"
                    : "bg-surface border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t.services.tabs.frontend}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("fullstack")}
                className={`flex items-center gap-2 px-6 py-3 font-display font-bold text-sm uppercase tracking-wider transition-all border ${
                  activeTab === "fullstack"
                    ? "bg-cobalt text-white border-cobalt shadow-brutal-cobalt"
                    : "bg-surface border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                <Database className="w-4 h-4" />
                <span>{t.services.tabs.fullstack}</span>
              </button>
            </div>
          </div>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Detail Specifications */}
            <div className="lg:col-span-7 space-y-8">
              {/* Category Header Card */}
              <div className="border border-zinc-800 bg-surface p-6 sm:p-8 relative">
                <span className="text-xs font-mono text-acid font-bold block mb-2">
                  {currentService.badge[locale]}
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl uppercase text-white mb-3">
                  {currentService.title[locale]}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {currentService.description[locale]}
                </p>

                <div className="p-4 bg-ink border border-zinc-800 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400">{t.services.fromLabel}:</span>
                  <span className="text-acid font-bold text-lg">
                    {currentService.startingPrice}
                  </span>
                </div>
              </div>

              {/* Technical Features Grid */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                  KEUPAYAAN TEKNIKAL
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentService.features.map((feat) => (
                    <div
                      key={feat.title[locale]}
                      className="border border-zinc-800 bg-ink p-5 space-y-2 hover:border-zinc-700 transition-colors"
                    >
                      <h4 className="font-display font-bold text-lg text-white">
                        {feat.title[locale]}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {feat.description[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables vs Boundaries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Deliverables */}
                <div className="border border-zinc-800 bg-surface p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <Check className="w-4 h-4" />
                    <span>{t.services.deliverablesLabel}</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    {currentService.deliverables[locale].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-acid mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Boundaries */}
                <div className="border border-zinc-800 bg-surface p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{t.services.boundariesLabel}</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-400">
                    {currentService.boundaries[locale].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-zinc-600 mt-0.5">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-4">
                <Link
                  href={currentService.ctaLink}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors shadow-brutal"
                >
                  <span>{currentService.ctaText[locale]}</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right: Services Character Artwork Composition */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="border-2 border-zinc-800 bg-gradient-to-b from-surface to-ink p-4 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-3 left-3 text-[10px] font-mono text-acid z-20">
                  +[02]_BUILDER_CUTOUT
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-500 z-20">
                  LAPTOP_STANDING
                </div>

                {/* Geometric accent */}
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-acid/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative w-full aspect-[3/4] flex items-end justify-center z-10 pt-8">
                  <Image
                    src="/assets/characters/02_character_builder_laptop.png"
                    alt="SYAHMIAOF Studio Standing Builder Character"
                    width={1024}
                    height={1536}
                    priority
                    className="w-full h-auto object-contain max-h-[95%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-3 p-3 bg-ink border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">STATUS SERVIS:</span>
                  <span className="text-acid font-bold">SLOT TERBUKA // Q4 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
