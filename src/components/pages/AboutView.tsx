"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BrutalistBanner } from "@/components/ui/BrutalistBanner";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  Terminal,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  BarChart3,
  ArrowUpRight,
  Info,
  Laptop,
} from "lucide-react";

interface AboutViewProps {
  locale: Locale;
}

export const AboutView: React.FC<AboutViewProps> = ({ locale }) => {
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

        // 1. Brutalist Banner
        tl.from(".motion-about-banner", {
          opacity: 0,
          y: 40,
          duration: 0.7,
        })
          // 2. Credential Badges
          .from(
            ".motion-about-badge",
            { opacity: 0, y: 20, stagger: 0.08 },
            "-=0.4"
          )
          // 3. Standing Pointing Creator Cutout
          .from(
            ".motion-pointing-character",
            { opacity: 0, y: 45, duration: 0.75 },
            "-=0.45"
          )
          // 4. Floating Closed Laptop
          .from(
            ".motion-floating-laptop",
            { opacity: 0, scale: 0.85, duration: 0.6 },
            "-=0.5"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-about-banner, .motion-about-badge, .motion-pointing-character",
            { clearProps: "all" }
          );
        });

        // Ambient Levitation Idle Loop for Suspended Floating Laptop
        gsap.to(".motion-floating-laptop", {
          y: -10,
          rotation: -8,
          duration: 2.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-pointing-character", {
          scrollTrigger: {
            trigger: ".about-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 6,
          ease: "none",
        });

        gsap.to(".motion-floating-laptop", {
          scrollTrigger: {
            trigger: ".about-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: -12,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-about-banner, .motion-about-badge, .motion-pointing-character, .motion-floating-laptop",
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
        <IndustrialGrid density="standard" coordinates="06 // IDENTITY_ARCHIVE" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ========================================================= */}
          {/* HERO SECTION: Dual-Asset & Brutalist Banner Stage         */}
          {/* ========================================================= */}
          <div className="about-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px] pb-16 border-b border-zinc-800">
            {/* Left 7 Cols: Brutalist Banner Headline & Profile Info */}
            <div className="lg:col-span-7 space-y-6 z-20">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <Terminal className="w-4 h-4" />
                <span>[ 06 / TENTANG SAYA ] {t.about.badge}</span>
              </div>

              {/* Headline using BrutalistBanner Component */}
              <h1 className="motion-about-banner">
                <BrutalistBanner
                  part1="SAYA"
                  highlight="SYAHMI"
                  part2="AOF."
                  size="giant"
                />
              </h1>

              {/* Subhead & Bio Summary */}
              <div className="space-y-3">
                <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {t.about.role}
                </p>
                <p className="text-zinc-400 font-mono text-xs sm:text-sm">
                  {t.about.institution}
                </p>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {t.about.bio1}
                </p>
              </div>

              {/* 3 Credential Badges Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Badge 1: TVETMARA */}
                <div className="motion-about-badge bg-surface border-2 border-zinc-800 p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-acid shrink-0" />
                    <span className="font-display font-bold text-xs uppercase text-white tracking-wider">
                      TVETMARA BESUT
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Cloud Computing
                  </p>
                </div>

                {/* Badge 2: Freelance */}
                <div className="motion-about-badge bg-surface border-2 border-zinc-800 p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-4 h-4 text-acid shrink-0" />
                    <span className="font-display font-bold text-xs uppercase text-white tracking-wider">
                      FREELANCE DEV
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Design • Build • Deploy
                  </p>
                </div>

                {/* Badge 3: DFK INC */}
                <div className="motion-about-badge bg-surface border-2 border-zinc-800 p-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-acid shrink-0" />
                    <span className="font-display font-bold text-xs uppercase text-white tracking-wider">
                      DFK INC
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    AI Digital Marketing
                  </p>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href={locale === "en" ? "/en/portfolio" : "/portfolio"}
                  className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-acid text-ink font-display font-black text-sm uppercase tracking-wider hover:bg-white hover:text-ink transition-all shadow-brutal flex items-center gap-2"
                >
                  <span>Lihat Portfolio</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href={locale === "en" ? "/en/hubungi" : "/hubungi"}
                  className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-zinc-700 bg-surface text-white font-display font-bold text-sm uppercase tracking-wider hover:border-acid hover:text-acid transition-colors flex items-center gap-2"
                >
                  <span>Bincang Projek</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Dual-Asset Composition (Pointing Pose + Floating Laptop + Protected Annotation) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
              {/* Layer 1: Architectural Concrete Backdrop Slab */}
              <div className="absolute inset-0 bg-[#2A2A32] border-2 border-zinc-700/80 -skew-y-2 opacity-40 pointer-events-none" />
              <div className="absolute top-10 right-6 w-56 h-56 bg-cobalt/20 rotate-12 blur-2xl pointer-events-none" />

              {/* Layer 2: Floating Closed Laptop (Suspended in the air above hand) */}
              <div className="motion-floating-laptop absolute top-4 sm:top-8 left-4 sm:left-8 w-32 sm:w-44 aspect-square z-30 pointer-events-none">
                <Image
                  src="/assets/characters/06_laptop_closed_floating.png"
                  alt="Floating Closed Laptop Asset"
                  width={1254}
                  height={1254}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] -rotate-12 transition-transform duration-700 hover:rotate-0"
                />
              </div>

              {/* Layer 3: Standing Pointing Creator Cutout */}
              <div className="motion-pointing-character relative z-20 w-full max-w-[380px] sm:max-w-[440px] flex items-end justify-center pointer-events-none pt-12">
                <Image
                  src="/assets/characters/05_character_pointing_throw.png"
                  alt="SYAHMIAOF Brand Mascot Character - Pointing Pose"
                  width={1116}
                  height={1410}
                  priority
                  className="w-full h-auto object-contain max-h-[580px] filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
                />
              </div>

              {/* Layer 4: Protected Annotation beside Thigh with Technical Leader Line */}
              <div className="absolute bottom-16 right-0 sm:right-4 z-30 pointer-events-none select-none">
                {/* SVG Technical Leader Line */}
                <svg className="w-32 h-16 -mb-2 overflow-visible" viewBox="0 0 130 65" fill="none">
                  <path d="M 10 45 L 50 15 L 125 15" stroke="#F3FF00" strokeWidth="2" />
                  <circle cx="10" cy="45" r="3.5" fill="#F3FF00" />
                </svg>

                {/* Stenciled Brutalist Annotation Box */}
                <div className="bg-ink border-2 border-acid px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase shadow-brutal-dark inline-block">
                  <div className="text-acid">KARAKTER VISUAL</div>
                  <div className="text-white">JENAMA</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DETAILED BIO & FORENSIC INTEGRITY SECTION                 */}
          {/* ========================================================= */}
          <div className="py-16 border-b border-zinc-800 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Extended Biography */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-acid block mb-2">
                  FALSAFAH KERJA
                </span>
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase text-white">
                  KEJURUTERAAN DENGAN DISIPLIN DIGITAL BRUTALISM
                </h2>
              </div>

              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <p>{t.about.bio2}</p>
                <p>
                  Setiap baris kod yang dihasilkan dibina berasaskan standard web moden: tiada templat kitar semula, tiada animasi berat yang membazirkan data pengguna, dan reka bentuk yang berani menonjol dalam pasaran tepu.
                </p>
              </div>

              {/* Categorized Skills Grid */}
              <div className="pt-4 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 block">
                  {t.about.skillsTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {t.about.skills.map((skill) => (
                    <div key={skill.category} className="p-4 bg-surface border border-zinc-800 space-y-1">
                      <span className="text-xs font-mono font-bold text-acid uppercase block">
                        {skill.category}
                      </span>
                      <p className="text-xs font-mono text-zinc-300">
                        {skill.items}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Integrity Disclosure & Mascot Notice */}
            <div className="lg:col-span-5 space-y-6">
              {/* Verified Identity Integrity Card */}
              <div className="border-2 border-zinc-800 bg-surface p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-acid font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PRINSIP INTEGRITI MAKLUMAT</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-mono">
                  Tiada tuntutan kelayakan palsu, pensijilan rekaan, atau pengalaman bertahun yang dimanipulasi. Semua maklumat perkhidmatan dan latar belakang disampaikan dengan ketelusan mutlak.
                </p>
                <div className="pt-2 border-t border-zinc-800/80 flex flex-col gap-1 text-xs font-mono text-zinc-400">
                  <div>INSTITUSI: <span className="text-white">TVETMARA BESUT</span></div>
                  <div>BIDANG: <span className="text-white">PENGKOMPUTERAN AWAN</span></div>
                  <div>LOKASI: <span className="text-white">TERENGGANU, MALAYSIA</span></div>
                </div>
              </div>

              {/* Brand Mascot Clarification */}
              <div className="p-4 bg-ink border border-zinc-800 text-xs font-mono text-zinc-400 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-acid shrink-0 mt-0.5" />
                <p className="leading-relaxed">{t.about.characterNotice}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
};
