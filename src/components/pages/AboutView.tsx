"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Terminal,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Code2,
  ArrowUpRight,
  Info,
} from "lucide-react";

interface AboutViewProps {
  locale: Locale;
}

export const AboutView: React.FC<AboutViewProps> = ({ locale }) => {
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-acid mb-3">
              <Terminal className="w-4 h-4" />
              <span>[06/07] {t.about.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.about.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.about.role} // {t.about.institution}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Cols: Factual Background & Skills */}
            <div className="lg:col-span-7 space-y-8">
              {/* Bio Cards */}
              <div className="border border-zinc-800 bg-surface p-6 sm:p-8 space-y-4 leading-relaxed">
                <div className="flex items-center gap-2 text-xs font-mono text-acid font-bold uppercase">
                  <GraduationCap className="w-4 h-4" />
                  <span>LATAR BELAKANG PENDIDIKAN & KERJAYA</span>
                </div>
                <p className="text-sm sm:text-base text-zinc-300">
                  {t.about.bio1}
                </p>
                <p className="text-sm sm:text-base text-zinc-300">
                  {t.about.bio2}
                </p>
              </div>

              {/* Verified Identity Integrity Disclosure */}
              <div className="border-2 border-zinc-800 bg-ink p-6 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono text-acid font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PRINSIP INTEGRITI MAKLUMAT SYAHMI AOF</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Tiada tuntutan kelayakan palsu, pensijilan rekaan, atau pengalaman bertahun yang dimanipulasi. Semua maklumat perkhidmatan dan latar belakang disampaikan dengan ketelusan mutlak.
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs font-mono text-zinc-500">
                  <span>INSTITUSI: TVETMARA BESUT</span>
                  <span>BIDANG: PENGKOMPUTERAN AWAN</span>
                </div>
              </div>

              {/* Technical Skills Categorized */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                  {t.about.skillsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.about.skills.map((skill) => (
                    <div
                      key={skill.category}
                      className="border border-zinc-800 bg-surface p-5 space-y-1.5"
                    >
                      <span className="text-xs font-mono text-acid font-bold uppercase">
                        {skill.category}
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 font-mono">
                        {skill.items}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <Link
                  href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors shadow-brutal"
                >
                  <span>Bincang Projek Bersama Syahmi</span>
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Final Approved About Me Character + Tossed Laptop Composition */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="border-2 border-zinc-800 bg-gradient-to-b from-surface to-ink p-4 relative overflow-hidden group shadow-2xl">
                {/* Visual Label Corner */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-acid z-30">
                  +[06]_ABOUT_COMPOSITION
                </div>
                <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-500 z-30">
                  POINT_THROW_POSE
                </div>

                {/* Floating Tossed Laptop (Layered Above Character's Hand) */}
                <div className="absolute top-12 left-10 w-36 sm:w-44 aspect-square z-20 animate-bounce duration-1000 transition-transform">
                  <Image
                    src="/assets/characters/06_laptop_closed_floating.png"
                    alt="Floating Closed Laptop Asset"
                    width={1254}
                    height={1254}
                    className="w-full h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] -rotate-12"
                  />
                </div>

                {/* Pointing/Throw Character */}
                <div className="relative w-full aspect-[4/5] flex items-end justify-center z-10 pt-10">
                  <Image
                    src="/assets/characters/05_character_pointing_throw.png"
                    alt="SYAHMIAOF Brand Mascot Character - Pointing Throw Pose"
                    width={1116}
                    height={1410}
                    priority
                    className="w-full h-auto object-contain max-h-[95%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                  />

                  {/* Protected Annotation Beside Thigh (As in final approved mockup) */}
                  <div className="absolute bottom-12 right-2 bg-ink/95 border border-zinc-700 px-2 py-1 text-[9px] font-mono font-bold text-acid uppercase tracking-wider shadow-lg z-30">
                    KARAKTER VISUAL JENAMA
                  </div>
                </div>

                {/* Character Mascot Disclosure */}
                <div className="mt-3 p-3 bg-ink border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-acid shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.about.characterNotice}</p>
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
