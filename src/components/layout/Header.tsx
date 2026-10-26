"use client";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getTranslations } from "@/i18n";
import type { Locale } from "@/lib/types";

const SECTION_IDS = [
  "home",
  "tentang",
  "servis",
  "portfolio",
  "harga",
  "coaching",
  "hubungi",
] as const;

function HeaderBar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const t = getTranslations(locale);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const navLinks = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const routes = SECTION_IDS.map((id, index) => ({
    id,
    label: [
      t.nav.home,
      t.nav.about,
      t.nav.services,
      t.nav.portfolio,
      t.nav.pricing,
      t.nav.coaching,
      t.nav.contact,
    ][index],
  }));
  const prefix = locale === "en" ? "/en" : locale === "zh-Hans" ? "/zh" : "";
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => {
      const link = navLinks.current.get(activeSection);
      if (!link) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    navLinks.current.forEach((link) => observer.observe(link));
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [activeSection, locale, pathname]);
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
        {locale === "ms" ? "Terus ke kandungan" : locale === "zh-Hans" ? "跳至正文" : "Skip to content"}
      </a>
      <Link
        className="studio-brand"
        href={`${prefix}#home`}
        aria-label="SYAHMIAOF Studio"
      >
        <span className="brand-role">FULL-STACK DEVELOPER</span>
        <span className="brand-wordmark">
          SYAHMIAOF<span className="brand-dot">.</span>
        </span>
      </Link>
      <nav
        aria-label={locale === "ms" ? "Navigasi utama" : locale === "zh-Hans" ? "主导航" : "Main navigation"}
        id="studio-navigation"
        ref={navRef}
        className={"studio-nav " + (open ? "is-open" : "")}
      >
        {routes.map((route) => {
          const href = `#${route.id}`;
          return (
            <Link
              key={route.id}
              ref={(node) => { if (node) navLinks.current.set(route.id, node); else navLinks.current.delete(route.id); }}
              href={href}
              aria-current={activeSection === route.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          );
        })}
        <span className="nav-active-indicator" aria-hidden="true" style={{ left: indicator.left, width: indicator.width }} />
      </nav>
      <div className="header-actions">
        <div className="language-switch" role="group" aria-label={locale === "zh-Hans" ? "选择语言" : locale === "ms" ? "Pilih bahasa" : "Choose language"}>
          {([ ["ms", "BM"], ["en", "EN"], ["zh-Hans", "中文"] ] as const).map(([target, label]) => {
            const destination = target === "ms" ? "/" : target === "en" ? "/en" : "/zh";
            const query = params.toString();
            return <Link key={target} href={`${destination}${query ? `?${query}` : ""}#${activeSection}`} aria-current={locale === target ? "true" : undefined} aria-label={target === "ms" ? "Bahasa Melayu" : target === "en" ? "English" : "简体中文"}>{label}</Link>;
          })}
        </div>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-label={
            locale === "ms" ? "Buka menu navigasi" : locale === "zh-Hans" ? "打开导航菜单" : "Toggle navigation menu"
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
