"use client";
import {
  GraduationCap,
  Laptop,
  ChartNoAxesColumnIncreasing,
  Code2,
  PenTool,
  Cloud,
  Settings,
} from "lucide-react";
import type { Locale } from "@/lib/types";
import {
  StudioPage,
  DisplayTitle,
  SceneLabel,
  ActionLink,
  Architecture,
  copy,
  sectionPath,
} from "@/components/scene/StudioScene";
export function AboutView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const c = (ms: string, en: string) => copy(locale, ms, en);
  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene scene-light about-scene" id="tentang">
        <Architecture variant="about" priority={!embedded} />
        <div className="about-copy">
          <SceneLabel number="06">{c("TENTANG SAYA", "ABOUT ME")}</SceneLabel>
          <DisplayTitle level={2} lines={[c("SAYA", "I’M"), "SYAHMI", "AOF."]} />
          <div className="about-bio scene-intro">
            <h2>
              {c(
                "Pembangun Web & Pelajar IT (Cloud Computing)",
                "Web Developer & IT Student (Cloud Computing)",
              )}
            </h2>
            <p>
              {c(
                "Saya reka dan bina website yang unik, responsif dan berfungsi untuk bisnes dan individu.",
                "I design and build distinctive, responsive websites for businesses and individuals.",
              )}
            </p>
          </div>
          <div className="credentials scene-actions">
            {[
              {
                icon: GraduationCap,
                title: "TVETMARA BESUT",
                text: "Cloud Computing",
              },
              {
                icon: Laptop,
                title: "FREELANCE WEB DEV",
                text: "Design · Build · Deploy",
              },
              {
                icon: ChartNoAxesColumnIncreasing,
                title: "DFK INC",
                text: "AI Digital Marketing",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
          <div className="skill-tags">
            {[
              { icon: Code2, text: "Web Development" },
              { icon: PenTool, text: "UI/UX" },
              { icon: Cloud, text: "Cloud & Deployment" },
              { icon: Settings, text: c("Automasi AI", "AI Automation") },
            ].map(({ icon: Icon, text }) => (
              <span key={text}>
                <Icon size={19} />
                {text}
              </span>
            ))}
          </div>
          <div className="scene-actions">
            <ActionLink href={sectionPath(locale, "portfolio")}>
              {c("Lihat Portfolio", "View Portfolio")}
            </ActionLink>
            <ActionLink href={sectionPath(locale, "hubungi")} secondary>
              {c("Bincang Projek", "Discuss a Project")}
            </ActionLink>
          </div>
        </div>
        <div className="about-visual">
          <span className="character-annotation">
            {c("KARAKTER VISUAL", "FICTIONAL BRAND")}
            <br />
            {c("JENAMA", "CHARACTER")}
          </span>
        </div>
      </section>
    </StudioPage>
  );
}
