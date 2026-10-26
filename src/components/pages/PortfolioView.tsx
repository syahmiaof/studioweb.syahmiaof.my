"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/content/projects";
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
export function PortfolioView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const selectFromHash = () => {
      const index = PROJECTS.findIndex(
        (item) => "#" + item.slug === window.location.hash,
      );
      if (index >= 0) setActive(index);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);
  const project = PROJECTS[active];
  const c = (ms: string, en: string) => copy(locale, ms, en);
  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene portfolio-scene" id="portfolio">
        <Architecture variant="portfolio" priority={!embedded} />
        <div className="portfolio-copy">
          <SceneLabel number="03">PORTFOLIO</SceneLabel>
          <DisplayTitle
            level={2}
            lines={
              locale === "ms"
                ? ["IDEA JADI", "REALITI."]
                : ["IDEAS MADE", "REAL."]
            }
          />
          <p className="scene-intro">
            {c(
              "Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita.",
              "Experiments, concepts and selected projects — each with a story.",
            )}
          </p>
          <div className="scene-actions">
            <ActionLink href="#project-details">
              {c("Lihat Semua Projek", "Explore the Projects")}
            </ActionLink>
          </div>
        </div>
        <div
          className="perspective-gallery"
          aria-label={c("Galeri konsep projek", "Project concept gallery")}
        >
          {PROJECTS.map((item, i) => (
            <button
              type="button"
              key={item.id}
              id={item.slug}
              className={
                "project-plane project-plane-" +
                i +
                (active === i ? " is-selected" : "")
              }
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={c("Pilih ", "Select ") + item.title}
            >
              <div className="project-caption">
                <strong>
                  <em>0{i + 1} /</em> {["SYMI", "LAMBORGHINI", "UBERPOKMI"][i]}
                </strong>
                <span>
                  {locale === "ms" ? item.status : item.statusEn}
                </span>
              </div>
              <div className="project-image">
                <Image
                  src={`/assets/astra-v21/project-${["symi","lamborghini","uberpokmi"][i]}.webp`}
                  alt={c("Visual konsep ", "Concept preview ") + item.title}
                  fill
                  quality={95}
                  sizes="(max-width: 1023px) 90vw, 1px"
                />
              </div>
            </button>
          ))}
        </div>
      </section>
      <div className="gallery-controls">
        <span aria-live="polite">
          0{active + 1} / 03 — {project.title}
        </span>
        <div className="gallery-progress">
          <span style={{ transform: `scaleX(${(active + 1) / 3})` }} />
        </div>
        <button
          onClick={() => setActive((active + 2) % 3)}
          aria-label={c("Projek sebelumnya", "Previous project")}
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => setActive((active + 1) % 3)}
          aria-label={c("Projek seterusnya", "Next project")}
        >
          <ArrowRight />
        </button>
      </div>
      <section className="project-details" id="project-details">
        <div>
          <span className="chapter-line">
            {locale === "ms" ? project.status : project.statusEn}
          </span>
          <h2>{project.title}</h2>
          <p>{project.description[locale]}</p>
          <p className="asset-disclosure">
            {c(
              "Imej ialah visual daripada mockup diluluskan, bukan tangkapan laman live. Pautan live belum disahkan untuk penerbitan studio ini.",
              "Images are visuals from the approved mockup, not live website screenshots. Live links have not been verified for publication in this studio.",
            )}
          </p>
          {project.demoNote && <p>{project.demoNote[locale]}</p>}
        </div>
        <div>
          {project.liveUrl && (
            <a
              className="studio-button"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live <ExternalLink size={18} />
            </a>
          )}
          <ActionLink
            href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "website-ui", project: project.slug }))}
          >
            {c("Bincang Projek Serupa", "Discuss a Similar Project")}
          </ActionLink>
        </div>
      </section>
    </StudioPage>
  );
}
