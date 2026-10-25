"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Locale, ServiceCategory } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Terminal,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Calculator,
  GraduationCap,
  Info,
} from "lucide-react";
import { formatMYR, getPackageById } from "@/lib/pricing/calculator";

interface ContactViewProps {
  locale: Locale;
}

function ContactFormContent({ locale }: ContactViewProps) {
  const t = getTranslations(locale);
  const searchParams = useSearchParams();

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
    <div className="min-h-screen bg-ink text-white flex flex-col selection:bg-acid selection:text-ink">
      <Header locale={locale} />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="border-b border-zinc-800 pb-10 mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-acid mb-3">
              <Terminal className="w-4 h-4" />
              <span>[07/07] {t.contact.badge}</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              {t.contact.title}
            </h1>
            <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
              {t.contact.subhead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 5 Cols: Contact Channels & Honest Blockers Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Official Email */}
              <div className="border border-zinc-800 bg-surface p-6 space-y-3">
                <span className="text-[10px] font-mono uppercase text-acid font-bold tracking-widest block">
                  SALURAN RASMI
                </span>
                <h3 className="font-display font-bold text-xl uppercase text-white">
                  {t.contact.directEmailTitle}
                </h3>
                <a
                  href="mailto:hello@syahmiaof.my"
                  className="flex items-center gap-2 p-3 bg-ink border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors font-mono text-sm"
                >
                  <Mail className="w-4 h-4 text-acid shrink-0" />
                  <span>hello@syahmiaof.my</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-zinc-500" />
                </a>
                <p className="text-xs text-zinc-400">
                  Respon rasmi dalam tempoh 24 jam hari bekerja.
                </p>
              </div>

              {/* Direct WhatsApp Honest Status */}
              <div className="border border-zinc-800 bg-surface p-6 space-y-3">
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

              {/* Preserved Context Summary (if arrived from /harga or /coaching) */}
              {paramEstimate && (
                <div className="border border-acid/50 bg-acid/5 p-6 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-acid font-bold">
                    <Calculator className="w-4 h-4" />
                    <span>{t.contact.pricingContextLabel}</span>
                  </div>
                  <div className="space-y-1 text-zinc-300">
                    <p>Pakej: {packageInfo ? packageInfo.name[locale] : paramPackage}</p>
                    <p>Anggaran: {formatMYR(Number(paramEstimate))}</p>
                    {paramAddons && <p className="text-zinc-400">Ciri: {paramAddons}</p>}
                  </div>
                </div>
              )}

              {paramTopic && (
                <div className="border border-cobalt/50 bg-cobalt/10 p-6 space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-cobalt-light font-bold">
                    <GraduationCap className="w-4 h-4" />
                    <span>{t.contact.coachingContextLabel}</span>
                  </div>
                  <div className="space-y-1 text-zinc-300">
                    <p>Topik: {paramTopic}</p>
                    {paramDuration && <p>Tempoh: {paramDuration} Minit</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Right 7 Cols: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="border-2 border-zinc-800 bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative">
                <h3 className="font-display font-black text-2xl uppercase text-white pb-4 border-b border-zinc-800">
                  {t.contact.formTitle}
                </h3>

                {submitResult?.success && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p>{t.contact.submitSuccess}</p>
                  </div>
                )}

                {submitResult?.error && (
                  <div className="p-4 bg-amber-950/40 border border-amber-500 text-amber-200 text-xs font-mono space-y-2">
                    <div className="flex items-start gap-2 font-bold">
                      <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>{submitResult.error}</span>
                    </div>
                    {submitResult.mailtoFallback && (
                      <div className="pt-2">
                        <a
                          href={submitResult.mailtoFallback}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 text-ink font-bold uppercase hover:bg-amber-300 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Hantar Terus Melalui Emel Anda</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="website_pot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                  />

                  {/* Service Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-300 uppercase block">
                      {t.contact.fieldService} *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { id: "website-ui", label: t.contact.serviceOptions.websiteUi },
                        { id: "full-stack", label: t.contact.serviceOptions.fullStack },
                        { id: "coaching", label: t.contact.serviceOptions.coaching },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setService(item.id as ServiceCategory)}
                          className={`p-3 text-left text-xs font-mono border transition-all ${
                            service === item.id
                              ? "bg-acid text-ink border-acid font-bold"
                              : "bg-ink border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block">
                      {t.contact.fieldName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.contact.fieldNamePlaceholder}
                      className="w-full bg-ink border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono"
                    />
                  </div>

                  {/* Contact (Email or WhatsApp) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block">
                      {t.contact.fieldContact} *
                    </label>
                    <input
                      type="text"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={t.contact.fieldContactPlaceholder}
                      className="w-full bg-ink border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono"
                    />
                  </div>

                  {/* Project Message / Brief */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300 uppercase block">
                      {t.contact.fieldMessage} *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.fieldMessagePlaceholder}
                      className="w-full bg-ink border border-zinc-800 p-4 text-sm text-white placeholder-zinc-600 focus:border-acid focus:outline-none font-mono leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-acid text-ink font-display font-black text-base uppercase tracking-wider hover:bg-acid-hover transition-colors shadow-brutal disabled:opacity-50 flex items-center justify-center gap-2"
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
