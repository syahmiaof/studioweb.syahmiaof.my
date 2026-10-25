"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";

interface HeaderProps {
  locale: Locale;
}

function HeaderBar({ locale }: HeaderProps) {
  const t = getTranslations(locale);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute alternate locale URL while preserving search parameters
  const getToggleUrl = () => {
    const targetLocale = locale === "ms" ? "en" : "ms";
    const queryString = searchParams?.toString() ? `?${searchParams.toString()}` : "";

    if (targetLocale === "en") {
      // Switching from ms to en: prefix with /en
      if (pathname === "/") return `/en${queryString}`;
      return `/en${pathname}${queryString}`;
    } else {
      // Switching from en to ms: strip /en prefix
      const stripped = pathname.replace(/^\/en(\/|$)/, "/");
      return `${stripped === "" ? "/" : stripped}${queryString}`;
    }
  };

  const navLinks = [
    { href: locale === "en" ? "/en" : "/", label: t.nav.home },
    { href: locale === "en" ? "/en/servis" : "/servis", label: t.nav.services },
    { href: locale === "en" ? "/en/portfolio" : "/portfolio", label: t.nav.portfolio },
    { href: locale === "en" ? "/en/harga" : "/harga", label: t.nav.pricing },
    { href: locale === "en" ? "/en/coaching" : "/coaching", label: t.nav.coaching },
    { href: locale === "en" ? "/en/tentang" : "/tentang", label: t.nav.about },
    { href: locale === "en" ? "/en/hubungi" : "/hubungi", label: t.nav.contact },
  ];

  const isActive = (href: string) => {
    if (href === "/" || href === "/en") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? "bg-ink/95 backdrop-blur-md border-ink-border py-3"
          : "bg-ink/80 backdrop-blur-sm border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Studio Logo */}
        <Link
          href={locale === "en" ? "/en" : "/"}
          className="group flex items-center gap-2 tracking-tighter"
        >
          <span className="w-3 h-3 bg-acid inline-block group-hover:scale-125 transition-transform" />
          <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase">
            SYAHMIAOF<span className="text-acid">.STUDIO</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 border border-zinc-800 text-zinc-400 uppercase">
            V1.0
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs lg:text-sm font-medium tracking-wide uppercase transition-colors ${
                  active
                    ? "text-acid font-bold"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900/60"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-acid shadow-[0_0_8px_#F3FF00]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Language Toggle & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <Link
            href={getToggleUrl()}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-zinc-800 hover:border-acid text-zinc-300 hover:text-acid transition-colors"
            title={`Switch to ${locale === "ms" ? "English" : "Bahasa Melayu"}`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-bold">{locale === "ms" ? "EN" : "BM"}</span>
          </Link>

          {/* Quick Contact CTA */}
          <Link
            href={locale === "en" ? "/en/hubungi" : "/hubungi"}
            className="flex items-center gap-1 px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-acid text-ink hover:bg-acid-hover transition-colors shadow-brutal"
          >
            <span>{t.nav.ctaStart}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={getToggleUrl()}
            className="flex items-center justify-center min-h-[44px] min-w-[44px] px-2.5 py-2 text-xs font-mono border border-zinc-800 text-zinc-300 hover:text-acid hover:border-acid transition-colors"
            title={`Switch to ${locale === "ms" ? "English" : "Bahasa Melayu"}`}
          >
            <span className="font-bold">{locale === "ms" ? "EN" : "BM"}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] p-2.5 flex items-center justify-center border border-zinc-800 text-zinc-200 hover:text-acid hover:border-acid transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink/98 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn max-h-[calc(100vh-4rem)] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center px-4 py-3 text-sm font-semibold uppercase tracking-wider border-l-2 transition-colors ${
                  active
                    ? "border-acid text-acid bg-zinc-900/40"
                    : "border-transparent text-zinc-300 hover:text-white hover:border-zinc-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <Link
              href={locale === "en" ? "/en/hubungi" : "/hubungi"}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 min-h-[44px] py-3.5 text-xs font-bold uppercase tracking-wider bg-acid text-ink hover:bg-acid-hover transition-colors shadow-brutal"
            >
              <span>{t.nav.ctaStart}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Suspense
      fallback={
        <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-ink border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <span className="font-display font-black text-xl text-white">SYAHMIAOF.STUDIO</span>
          </div>
        </header>
      }
    >
      <HeaderBar {...props} />
    </Suspense>
  );
};

