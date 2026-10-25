"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Locale, ServiceCategory } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArchitecturalNumeral07 } from "@/components/ui/ArchitecturalNumeral07";
import { BrutalistArrow } from "@/components/ui/BrutalistArrow";
import { ReflectiveFloor } from "@/components/ui/ReflectiveFloor";
import { IndustrialGrid } from "@/components/ui/IndustrialGrid";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import {
  Terminal,
  Mail,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Calculator,
  GraduationCap,
  Info,
  Laptop,
  Database,
  UserCheck,
} from "lucide-react";
import { formatMYR, getPackageById } from "@/lib/pricing/calculator";

interface ContactViewProps {
  locale: Locale;
}

function ContactFormContent({ locale }: ContactViewProps) {
  const t = getTranslations(locale);
  const searchParams = useSearchParams();
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
        tl.from(".motion-contact-title", {
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.7,
        })
          // 2. Direct Email & WhatsApp Fast Channel cards
          .from(
            ".motion-contact-channel",
            { opacity: 0, y: 20, stagger: 0.1 },
            "-=0.4"
          )
          // 3. Yellow Curved Arrow & Numeral 07
          .from(
            ".motion-curved-arrow",
            { opacity: 0, scale: 0.9, duration: 0.6 },
            "-=0.35"
          )
          .from(
            ".motion-numeral07",
            { opacity: 0, scale: 0.95, duration: 0.8 },
            "-=0.5"
          )
          // 4. Industrial Terminal Console Form
          .from(
            ".motion-terminal-console",
            { opacity: 0, y: 35, duration: 0.65 },
            "-=0.4"
          );

        tl.eventCallback("onComplete", () => {
          gsap.set(
            ".motion-contact-title, .motion-contact-channel, .motion-curved-arrow, .motion-numeral07, .motion-terminal-console",
            { clearProps: "all" }
          );
        });

        // Parallax on Desktop (min-width: 768px)
        gsap.to(".motion-numeral07", {
          scrollTrigger: {
            trigger: ".contact-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: 12,
          ease: "none",
        });

        gsap.to(".motion-curved-arrow", {
          scrollTrigger: {
            trigger: ".contact-hero-grid",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          yPercent: -8,
          ease: "none",
        });
      });

      // Reduced Motion: Accessibility Fallback
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".motion-contact-title, .motion-contact-channel, .motion-curved-arrow, .motion-numeral07, .motion-terminal-console",
          { opacity: 1, clearProps: "all" }
        );
      });
    },
    { scope: containerRef }
  );

  // Query parameter state prefill
  const paramService = (searchParams?.get("service") as ServiceCategory) || "website-ui";
  const paramPackage = searchParams?.get("package") || "";
  const paramAddons = searchParams?.get("addons") || "";
  const paramEstimate = searchParams?.get("estimate") || "";
  const paramTopic = searchParams?.get("topic") || "";
  const paramDuration = (searchParams?.get("duration") as "60" | "90") || undefined;

  const [service, setService] = useState<ServiceCategory>(paramService);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    error?: string;
    mailtoFallback?: string;
  } | null>(null);

  useEffect(() => {
    if (paramService) {
      setService(paramService);
    }
  }, [paramService]);

  const packageInfo = paramPackage ? getPackageById(paramPackage) : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const payload = {
        service,
        name,
        contact,
        message,
        packageId: paramPackage || undefined,
        packageName: packageInfo ? packageInfo.name[locale] : undefined,
        addons: paramAddons ? paramAddons.split(",") : undefined,
        estimatedTotal: paramEstimate ? Number(paramEstimate) : undefined,
        coachingTopic: paramTopic || undefined,
        coachingDuration: paramDuration || undefined,
        honeypot,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitResult({ success: true });
        setName("");
        setContact("");
        setMessage("");
      } else if (data.status === "PROVIDER_PENDING_CONFIG") {
        setSubmitResult({
          error: data.message,
          mailtoFallback: data.directMailto,
        });
      } else {
        setSubmitResult({
          error: data.error || t.contact.submitError,
        });
      }
    } catch (err) {
      setSubmitResult({
        error: t.contact.submitError,
        mailtoFallback: `mailto:hello@syahmiaof.my?subject=${encodeURIComponent(
          `Pertanyaan Projek Web: ${name || "Klien"}`
        )}&body=${encodeURIComponent(
          `Nama: ${name}\nHubungi: ${contact}\n\nMesej:\n${message}`
        )}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink overflow-x-hidden relative"
    >
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20 relative">
        <IndustrialGrid density="standard" coordinates="07 // TERMINAL_INGRESS" className="opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="contact-hero-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start min-h-[640px]">
            {/* Left 5 Cols: Headlines, Channels & Sweeping Curved Arrow */}
            <div className="lg:col-span-5 space-y-8 relative z-20">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-acid">
                <Terminal className="w-4 h-4" />
                <span>[ 07 / HUBUNGI ] {t.contact.badge}</span>
              </div>

              {/* Monumental Headline */}
              <div>
                <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.95] text-white motion-contact-title">
                  IDEA KAU.
                  <span className="block text-acid drop-shadow-[0_4px_20px_rgba(243,255,0,0.2)]">
                    KITA BINA.
                  </span>
                </h1>
              </div>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                {t.contact.subhead}
              </p>

              {/* Official Direct Email Channel */}
              <div className="motion-contact-channel border-2 border-zinc-800 bg-surface p-6 space-y-3 shadow-xl">
                <span className="text-[10px] font-mono uppercase text-acid font-bold tracking-widest block">
                  SALURAN RASMI
                </span>
                <h3 className="font-display font-bold text-xl uppercase text-white">
                  {t.contact.directEmailTitle}
                </h3>
                <a
                  href="mailto:hello@syahmiaof.my"
                  className="flex items-center gap-3 p-3.5 bg-ink border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors font-mono text-sm"
                >
                  <Mail className="w-4 h-4 text-acid shrink-0" />
                  <span>hello@syahmiaof.my</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-500" />
                </a>
                <p className="text-xs text-zinc-400 font-mono">
                  Respon rasmi dalam tempoh 24 jam hari bekerja.
                </p>
              </div>

              {/* WhatsApp Fast Channel (Honest Pending Status) */}
              <div className="motion-contact-channel border-2 border-zinc-800 bg-surface p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold tracking-widest">
                    SALURAN PANTAS
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-900 border border-zinc-700 text-amber-400">
                    STATUS: MENUNGGU NOMBOR RASMI
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-white">
                  {t.contact.whatsappTitle}
                </h3>
                <div className="p-3 bg-ink border border-dashed border-zinc-800 text-xs font-mono text-zinc-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{t.contact.whatsappPending}</p>
                </div>
              </div>

              {/* Sweeping Dynamic Yellow Curved Arrow Stage */}
              <div className="motion-curved-arrow relative pt-4 hidden lg:block">
                <div className="w-64 xl:w-80 pointer-events-none">
                  <BrutalistArrow variant="curved-contact" className="w-full h-auto" />
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Industrial Terminal Console Form */}
            <div className="lg:col-span-7 relative z-20">
              {/* Architectural 3D Numeral "07" in background */}
              <div className="motion-numeral07 absolute -top-12 -right-8 w-72 sm:w-88 opacity-25 pointer-events-none z-0">
                <ArchitecturalNumeral07 />
              </div>

              <div className="motion-terminal-console border-2 border-zinc-700/80 bg-zinc-950/95 backdrop-blur-md p-6 sm:p-8 lg:p-10 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative z-10">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                    MULA <span className="text-acid">PROJEK ANDA</span>
                  </h2>
                  <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
                    CONSOLE // V2.0
                  </span>
                </div>

                {/* Active Ingress Quote / Coaching Summary Banner */}
                {paramEstimate && (
                  <div className="p-4 bg-acid/10 border-2 border-acid/80 font-mono text-xs space-y-1">
                    <div className="flex items-center gap-2 text-acid font-bold">
                      <Calculator className="w-4 h-4" />
                      <span>[ SEBUT HARGA AKTIF: {packageInfo?.name[locale] || paramPackage} ]</span>
                    </div>
                    <div className="text-zinc-200">
                      Anggaran: <span className="font-bold text-acid">{formatMYR(Number(paramEstimate))}</span>
                      {paramAddons && <span className="text-zinc-400"> • Ciri: {paramAddons}</span>}
                    </div>
                  </div>
                )}

                {paramTopic && (
                  <div className="p-4 bg-cobalt/20 border-2 border-cobalt font-mono text-xs space-y-1">
                    <div className="flex items-center gap-2 text-cobalt-light font-bold">
                      <GraduationCap className="w-4 h-4" />
                      <span>[ SESI COACHING AKTIF: {paramTopic.toUpperCase()} ]</span>
                    </div>
                    <div className="text-zinc-200">
                      Tempoh: <span className="font-bold text-cobalt-light">{paramDuration || "90"} Minit</span>
                    </div>
                  </div>
                )}

                {/* Submission Success Notice */}
                {submitResult?.success && (
                  <div className="p-4 bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 text-xs font-mono flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>{t.contact.submitSuccess}</p>
                  </div>
                )}

                {/* Honest Fallback Alert (HTTP 503 Provider Pending Config) */}
                {submitResult?.error && (
                  <div className="p-4 bg-amber-950/60 border-2 border-amber-500 text-amber-200 text-xs font-mono space-y-3">
                    <div className="flex items-start gap-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>{submitResult.error}</span>
                    </div>
                    {submitResult.mailtoFallback && (
                      <div>
                        <a
                          href={submitResult.mailtoFallback}
                          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-3 bg-amber-400 text-ink font-bold uppercase text-xs hover:bg-amber-300 transition-colors shadow-md"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Hantar Terus Melalui Emel (hello@syahmiaof.my)</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Inquiry Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden bot trap) */}
                  <input
                    type="text"
                    name="website_pot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* 1. Service Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300 uppercase block font-bold">
                      1. {t.contact.fieldService} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "website-ui", label: "Website UI", icon: Laptop },
                        { id: "full-stack", label: "Sistem Lengkap", icon: Database },
                        { id: "coaching", label: "Coaching 1:1", icon: UserCheck },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = service === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setService(item.id as ServiceCategory)}
                            className={`min-h-[44px] p-3.5 text-left text-xs font-mono border-2 transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-acid text-ink border-acid font-bold shadow-brutal"
                                : "bg-ink border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Icon className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </div>
                            <span
                              className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? "border-ink" : "border-zinc-700"
                              }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-ink" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block font-bold">
                      2. {t.contact.fieldName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.fieldNamePlaceholder}
                      className="w-full bg-ink border-2 border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono"
                    />
                  </div>

                  {/* 3. Contact Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block font-bold">
                      3. {t.contact.fieldContact} *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t.contact.fieldContactPlaceholder}
                      className="w-full bg-ink border-2 border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono"
                    />
                  </div>

                  {/* 4. Message / Brief Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block font-bold">
                      4. {t.contact.fieldMessage} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.fieldMessagePlaceholder}
                      className="w-full bg-ink border-2 border-zinc-800 p-4 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-white transition-colors shadow-brutal disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "Memproses..." : t.contact.submitButton}</span>
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <p className="text-[11px] font-mono text-zinc-500 text-center leading-normal">
                    {t.contact.emailFallbackNotice}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Reflective Ground Floor Surface */}
        <ReflectiveFloor glowColor="dual" className="mt-12" />
      </main>

      <Footer locale={locale} />
    </div>
  );
}

export const ContactView: React.FC<ContactViewProps> = (props) => {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-ink text-white flex items-center justify-center font-mono text-xs text-acid">
          MEMUATKAN BORANG HUBUNGI...
        </div>
      }
    >
      <ContactFormContent {...props} />
    </React.Suspense>
  );
};
