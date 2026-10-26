"use client";
import type { Locale } from "@/lib/types";
import {
  ActionLink,
  Architecture,
  DisplayTitle,
  StudioPage,
  copy,
  sectionPath,
} from "@/components/scene/StudioScene";
import { HeroJokeTypewriter } from "@/components/pages/HeroJokeTypewriter";

export function HomeView({
  locale,
  embedded = false,
}: {
  locale: Locale;
  embedded?: boolean;
}) {
  const c = (ms: string, en: string, zh?: string) => copy(locale, ms, en, zh);

  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene home-scene" id="home">
        <span className="anchor-alias" id="utama" aria-hidden="true" />
        <Architecture variant="home" word="SYA" priority />
        <div className="hero-copy">
          <div className="home-categories">
          [ {c("PEMBANGUNAN WEBSITE", "WEB SERVICES", "网站服务")} ]{" "}
            <span>[ {c("COACHING PERIBADI", "PERSONAL COACHING", "一对一辅导")} ]</span>
          </div>
          <DisplayTitle lines={locale === "zh-Hans" ? ["自由接案", "网站服务。"] : ["FREELANCE", "WEB SERVICES."]} />
          <p className="scene-intro">
            {c(
              "Saya bina landing page, website bisnes dan sistem custom dengan reka bentuk premium, interaktif dan responsif.",
              "I build landing pages, business websites and custom systems with premium, interactive and responsive design.",
              "我打造精致、互动且适配各种屏幕的着陆页、商业网站与定制系统。",
            )}
          </p>
          <div className="scene-actions">
            <ActionLink href={sectionPath(locale, "servis")}>
              {c("Lihat Servis", "View Services", "查看服务")}
            </ActionLink>
            <ActionLink href={sectionPath(locale, "hubungi")} secondary>
              {c("Mulakan Projek", "Start a Project", "开始项目")}
            </ActionLink>
          </div>
        </div>
        <div className="architecture-caption" aria-hidden="true">
          {locale === "zh-Hans" ? "创意" : "IDEA"}
          <br />
          {locale === "zh-Hans" ? "代码" : "CODE"}
          <br />
          {locale === "zh-Hans" ? "体验" : "EXPERIENCE"}
        </div>
        <HeroJokeTypewriter locale={locale} />
        <a
          href="#servis"
          className="scroll-cue"
            aria-label={c("Terokai servis", "Explore services", "探索服务")}
        >
          ↓
        </a>
      </section>
    </StudioPage>
  );
}
