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

export function HomeView({
  locale,
  embedded = false,
}: {
  locale: Locale;
  embedded?: boolean;
}) {
  const c = (ms: string, en: string) => copy(locale, ms, en);

  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene home-scene" id="utama">
        <Architecture variant="home" word="SYA" priority />
        <div className="hero-copy">
          <div className="home-categories">
            [ {c("PEMBANGUNAN WEBSITE", "WEB SERVICES")} ]{" "}
            <span>[ FULL-STACK ]</span>
          </div>
          <DisplayTitle lines={["FREELANCE", "WEB SERVICES."]} />
          <p className="scene-intro">
            {c(
              "Saya bina landing page, website bisnes dan sistem custom dengan reka bentuk premium, interaktif dan responsif.",
              "I build landing pages, business websites and custom systems with premium, interactive and responsive design.",
            )}
          </p>
          <div className="scene-actions">
            <ActionLink href={sectionPath(locale, "servis")}>
              {c("Lihat Servis", "View Services")}
            </ActionLink>
            <ActionLink href={sectionPath(locale, "hubungi")} secondary>
              {c("Mulakan Projek", "Start a Project")}
            </ActionLink>
          </div>
        </div>
        <div className="architecture-caption" aria-hidden="true">
          IDEA
          <br />
          CODE
          <br />
          EXPERIENCE
        </div>
        <span className="art-brand" aria-hidden="true">SYAHMIAOF</span>
        <a
          href="#servis"
          className="scroll-cue"
          aria-label={c("Terokai servis", "Explore services")}
        >
          ↓
        </a>
      </section>
    </StudioPage>
  );
}
