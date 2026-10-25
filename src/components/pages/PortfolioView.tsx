"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { PROJECTS } from "@/content/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  ArrowUpRight,
} from "lucide-react";

interface PortfolioViewProps {
  locale: Locale;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ locale }) => {
  const t = getTranslations(locale);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredProjects =
    activeFilter === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-acid mb-3">
              <Terminal className="w-4 h-4" />
              <span>[03/07] {t.portfolio.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.portfolio.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.portfolio.subhead}
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-6">
              {["ALL", "Design System", "Frontend UI", "Mobile Prototype"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeFilter === cat
                      ? "bg-acid text-ink border-acid font-bold shadow-brutal"
                      : "bg-surface border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {cat === "ALL" ? t.portfolio.statusFilterAll : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="border-2 border-zinc-800 bg-surface flex flex-col justify-between hover:border-acid transition-all duration-300 group hover:-translate-y-1.5 shadow-xl relative overflow-hidden"
              >
                {/* Visual Top Preview Frame */}
                <div className="relative aspect-[16/10] bg-zinc-950 border-b border-zinc-800 overflow-hidden flex items-center justify-center p-4">
                  {/* Subtle Neon Backdrop */}
                  <div className="absolute inset-0 bg-dots-pattern opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />

                  {/* Editorial Graphic Placeholder */}
                  <div className="relative z-10 text-center space-y-2">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                      EKSPERIMEN #{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-acid transition-colors">
                      {project.title}
                    </h3>
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold bg-acid text-ink uppercase">
                      {locale === "en" ? project.statusEn : project.status}
                    </span>
                  </div>

                  {/* Corner Index */}
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">
                    PRJ_0{idx + 1}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-grow space-y-4">
                  <div>
                    <span className="text-xs font-mono text-acid font-bold block mb-1">
                      {project.category}
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      {project.tagline[locale]}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description[locale]}
                  </p>

                  {/* Stack Badges */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1.5">
                      {t.portfolio.stackLabel}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 bg-ink border border-zinc-800 text-[11px] font-mono text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Role */}
                  <div className="pt-2 border-t border-zinc-800/60 font-mono text-xs">
                    <span className="text-zinc-500 block text-[10px]">
                      {t.portfolio.roleLabel}:
                    </span>
                    <span className="text-zinc-300">{project.role}</span>
                  </div>

                  {/* Integrity Disclosure Box */}
                  {project.demoNote && (
                    <div className="p-3 bg-ink/80 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5 text-acid" />
                        <span>{t.portfolio.noteLabel}</span>
                      </div>
                      <p>{project.demoNote[locale]}</p>
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 mt-auto">
                  <Link
                    href={`/${locale === "en" ? "en/" : ""}hubungi?service=website-ui&project=${project.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-zinc-700 bg-ink hover:border-acid hover:text-acid text-xs font-mono font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Bincang Projek Serupa</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Reference Notice */}
          <div className="mt-16 p-6 border border-zinc-800 bg-surface/50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-acid inline-block" />
              <span>
                Standard Integriti Syahmi AOF: Tiada karya ciptaan palsu atau testimoni berbayar.
              </span>
            </div>
            <Link
              href={locale === "en" ? "/en/hubungi" : "/hubungi"}
              className="text-acid hover:underline inline-flex items-center gap-1 font-bold"
            >
              <span>Mulakan Projek Anda</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
