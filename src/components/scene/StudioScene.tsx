"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsapSetup";
import { responsiveMotion } from "@/lib/motion/responsiveMotion";
import type { Locale } from "@/lib/types";

export const localPath = (locale: Locale, path: string) =>
  locale === "en" ? `/en${path === "/" ? "" : path}` : path;
export const sectionPath = (
  locale: Locale,
  section: string,
  query?: URLSearchParams,
) => {
  const prefix = locale === "en" ? "/en" : "";
  const search = query?.toString();
  return `${prefix}${search ? `?${search}` : ""}#${section}`;
};
export const copy = (locale: Locale, ms: string, en: string) =>
  locale === "ms" ? ms : en;

export function StudioPage({
  locale,
  children,
  embedded = false,
  motion = true,
}: {
  locale: Locale;
  children: ReactNode;
  embedded?: boolean;
  motion?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useGSAP(
    () => {
      if (!motion) return;
      const disposeEntrance = responsiveMotion(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const select = gsap.utils.selector(root);
          const section = select(".studio-scene")[0] as HTMLElement | undefined;
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
            ...(embedded && section
              ? {
                  scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    toggleActions: "play none none reverse",
                  },
                }
              : {}),
          });
          const art = select(".scene-art"),
            lines = select(".display-line"),
            foreground = select(".scene-character"),
            controls = select(".scene-intro, .scene-actions, .console");
          if (art.length) tl.from(art, { opacity: 0.82 }, 0);
          if (lines.length)
            tl.from(
              lines,
              { yPercent: 35, clipPath: "inset(0 0 100% 0)", stagger: 0.085 },
              0.05,
            );
          if (foreground.length)
            tl.from(foreground, { y: 28, opacity: 0, duration: 1 }, 0.12);
          if (controls.length)
            tl.from(
              controls,
              { y: 16, opacity: 0, stagger: 0.07, duration: 0.65 },
              0.26,
            );
          select("[data-reveal]").forEach((section: HTMLElement) => {
            gsap.from(section, {
              y: 36,
              opacity: 0.25,
              duration: 0.85,
              scrollTrigger: {
                trigger: section,
                start: "top 94%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
      );
      const disposeDepth = responsiveMotion(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.current
            ?.querySelectorAll<HTMLElement>("[data-depth]")
            .forEach((el) => {
              gsap.to(el, {
                y: Number(el.dataset.depth),
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest(".studio-scene"),
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.5,
                },
              });
            });
        },
      );
      return () => {
        disposeEntrance();
        disposeDepth();
      };
    },
    { scope: root, dependencies: [locale, embedded, motion], revertOnUpdate: true },
  );
  useEffect(() => {
    if (embedded) return;
    let active = true;
    let frame = 0;
    const refresh = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img"));
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refresh);
        image.addEventListener("error", refresh);
      }
    });
    void document.fonts.ready.then(refresh);
    refresh();
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      images.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });
    };
  }, [embedded]);
  if (embedded) {
    return (
      <div className="studio-page-fragment" data-locale={locale} ref={root}>
        {children}
      </div>
    );
  }
  return (
    <div className="studio-page" data-locale={locale} ref={root}>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
export function DisplayTitle({
  lines,
  accent = 1,
  level = 1,
}: {
  lines: string[];
  accent?: number;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading className="display-title">
      {lines.map((line, i) => (
        <span
          key={line}
          className={`display-line ${i === accent ? "accent-line" : ""}`}
        >
          {line}
        </span>
      ))}
    </Heading>
  );
}
export function SceneLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="scene-label">
      <span>[</span> {number} / {children} <span>]</span>
    </div>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
  blue = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  blue?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`studio-button ${secondary ? "button-secondary" : ""} ${blue ? "button-blue" : ""}`}
    >
      {children}
      <ArrowRight size={22} aria-hidden="true" />
    </Link>
  );
}
const assets = {
  hero: ["07_hero_seated_character", 1031, 1299],
  builder: ["02_character_builder_laptop", 731, 1473],
  creator: ["03_character_creator_laptop", 908, 1408],
  consultant: ["04_character_consultant_laptop", 487, 1475],
  pointing: ["05_character_pointing_throw", 1100, 1301],
  laptop: ["06_laptop_closed_floating", 839, 831],
} as const;
export function Character({
  kind,
  className = "",
  priority = true,
}: {
  kind: keyof typeof assets;
  className?: string;
  priority?: boolean;
}) {
  const [file, width, height] = assets[kind];
  return (
    <div className={`character character-${kind} ${className}`}>
      <Image
        src={`/assets/optimized/${file}.webp`}
        alt=""
        width={width}
        height={height}
        sizes="(max-width: 767px) 95vw, (max-width: 1023px) 60vw, 58vw"
        priority={priority}
        className="character-image"
      />
    </div>
  );
}
export function Architecture({
  variant,
  priority = true,
}: {
  variant: "home" | "services" | "portfolio" | "pricing" | "coaching" | "about" | "contact";
  word?: string;
  priority?: boolean;
}) {
  const plates = {
    home: ["01-home", 712, 982, 712],
    services: ["02-services", 864, 672, 864],
    portfolio: ["03-portfolio", 778, 0, 0],
    pricing: ["04-pricing", 864, 780, 451],
    coaching: ["05-coaching", 864, 912, 864],
    about: ["06-about", 864, 962, 864],
    contact: ["07-contact", 807, 903, 807],
  } as const;
  const [name, , mobileWidth, mobileHeight] = plates[variant];
  return (
    <div className={`reference-artwork artwork-${variant}`} aria-hidden="true">
      <div className="reference-plate scene-art">
        <Image src={`/assets/astra-v21/${name}-plate.webp?v=21-final`} alt="" fill
          priority={priority} quality={95} sizes="(min-width: 1024px) 100vw, 1px"
          style={{objectFit:"contain",objectPosition:"top"}} />
      </div>
      {mobileWidth > 0 && (
        <div className="mobile-artwork">
          <Image src={`/assets/astra-v21/${name}-mobile.webp?v=21-final`} alt=""
            width={mobileWidth} height={mobileHeight} quality={95}
            sizes="(max-width: 1023px) 100vw, 1px" />
        </div>
      )}
    </div>
  );
}
