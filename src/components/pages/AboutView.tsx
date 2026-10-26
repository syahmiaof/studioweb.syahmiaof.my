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
  const c = (ms: string, en: string, zh?: string) => copy(locale, ms, en, zh);
  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene scene-light about-scene" id="tentang">
        <Architecture variant="about" priority={!embedded} />
        <div className="about-copy">
          <SceneLabel number="02">{c("TENTANG SAYA", "ABOUT ME")}</SceneLabel>
          <DisplayTitle level={2} lines={[c("SAYA", "I’M"), "SYAHMI", "AOF."]} />
          <div className="about-bio scene-intro">
            <h2>
              {c(
                "Pembangun Web & Pelajar IT (Cloud Computing)",
                "Web Developer & IT Student (Cloud Computing)",
                "网页开发者与云计算专业 IT 学生",
              )}
            </h2>
            <p>
              {c(
                "Saya reka dan bina website yang unik, responsif dan berfungsi untuk bisnes dan individu.",
                "I design and build distinctive, responsive websites for businesses and individuals.",
                "我为企业与个人设计并开发独特、响应式的网站。",
              )}
            </p>
          </div>
          <div className="credentials scene-actions">
            {[
              {
                icon: GraduationCap,
                title: "TVETMARA BESUT",
                text: locale === "zh-Hans" ? "云计算" : "Cloud Computing",
              },
              {
                icon: Laptop,
                title: locale === "zh-Hans" ? "自由职业网页开发" : "FREELANCE WEB DEV",
                text: locale === "zh-Hans" ? "设计 · 开发 · 发布" : "Design · Build · Deploy",
              },
              {
                icon: ChartNoAxesColumnIncreasing,
                title: "DFK INC",
                text: locale === "zh-Hans" ? "AI 数字营销" : "AI Digital Marketing",
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
              { icon: Code2, text: locale === "zh-Hans" ? "网页开发" : "Web Development" },
              { icon: PenTool, text: locale === "zh-Hans" ? "界面与体验" : "UI/UX" },
              { icon: Cloud, text: locale === "zh-Hans" ? "云与部署" : "Cloud & Deployment" },
              { icon: Settings, text: c("Automasi AI", "AI Automation", "AI 自动化") },
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
