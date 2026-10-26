"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getTranslations } from "@/i18n";
import type { Locale } from "@/lib/types";

const SECTION_IDS = [
  "utama",
  "servis",
  "portfolio",
  "harga",
  "coaching",
  "tentang",
  "hubungi",
] as const;

function HeaderBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const t = getTranslations(locale);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("utama");
  const toggle = useRef<HTMLButtonElement>(null);
  const routes = SECTION_IDS.map((id, index) => ({
    id,
    label: [
      t.nav.home,
      t.nav.services,
      t.nav.portfolio,
      t.nav.pricing,
      t.nav.coaching,
      t.nav.about,
      t.nav.contact,
    ][index],
  }));
  const prefix = locale === "en" ? "/en" : "";
  const alternate = locale === "ms" ? "/en" : "/";
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    let frame = 0;
    let initialHashFrame = 0;
    let initialHashAttempts = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const headerOffset =
          document.querySelector(".studio-header")?.getBoundingClientRect().height ?? 72;
        let current: string = SECTION_IDS[0];
        const atDocumentEnd =
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        if (atDocumentEnd) {
          current = SECTION_IDS[SECTION_IDS.length - 1];
        } else {
          for (const id of SECTION_IDS) {
            const section = document.getElementById(id);
            if (section && section.getBoundingClientRect().top <= headerOffset + 24) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      });
    };
    const scrollToInitialHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
        return;
      }
      if (initialHashAttempts++ < 120) {
        initialHashFrame = requestAnimationFrame(scrollToInitialHash);
      }
    };
    update();
    if (window.location.hash) initialHashFrame = requestAnimationFrame(scrollToInitialHash);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initialHashFrame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <header className="studio-header">
      <a className="skip-link" href="#main-content">
        {locale === "ms" ? "Terus ke kandungan" : "Skip to content"}
      </a>
      <Link
        className="studio-brand"
        href={`${prefix}#utama`}
        aria-label="SYAHMIAOF Studio"
      >
        <span className="brand-role">FULL-STACK DEVELOPER</span>
        <span className="brand-wordmark">
          SYAHMIAOF<span className="brand-dot">.</span>
        </span>
      </Link>
      <nav
        aria-label={locale === "ms" ? "Navigasi utama" : "Main navigation"}
        id="studio-navigation"
        className={"studio-nav " + (open ? "is-open" : "")}
      >
        {routes.map((route) => {
          const href = `#${route.id}`;
          return (
            <Link
              key={route.id}
              href={href}
              aria-current={activeSection === route.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>
      <div className="header-actions">
        <Link
          className="language-switch"
          href={`${alternate}${params.toString() ? `?${params.toString()}` : ""}#${activeSection}`}
          aria-label={locale === "ms" ? "EN" : "BM"}
        >
          <span className={locale === "ms" ? "current-language" : ""}>BM</span>
          <span>/</span>
          <span className={locale === "en" ? "current-language" : ""}>EN</span>
        </Link>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={
            locale === "ms" ? "Buka menu navigasi" : "Toggle navigation menu"
          }
          aria-expanded={open}
          aria-controls="studio-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Header({ locale }: { locale: Locale }) {
  return (
    <Suspense
      fallback={
        <header className="studio-header">
          <span className="studio-brand">SYAHMIAOF.</span>
        </header>
      }
    >
      <HeaderBar locale={locale} />
    </Suspense>
  );
}
