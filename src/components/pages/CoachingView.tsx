"use client";
import { localized } from "@/lib/localized";
import { Suspense, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { COACHING_PACKAGES } from "@/content/coaching";
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

function Coaching({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const [packageId, setPackageId] = useState(() => {
    const requested = params.get("coachingPackage");
    return COACHING_PACKAGES.some((item) => item.id === requested)
      ? requested!
      : COACHING_PACKAGES[0].id;
  });
  const selected = COACHING_PACKAGES.find((item) => item.id === packageId)!;
  const c = (ms: string, en: string, zh?: string) => copy(locale, ms, en, zh);
  const select = (nextPackageId: string) => {
    const next = COACHING_PACKAGES.find((item) => item.id === nextPackageId);
    if (!next) return;
    setPackageId(next.id);
    window.history.replaceState(
      null,
      "",
      pathname + "?" + new URLSearchParams({ coachingPackage: next.id }) + window.location.hash,
    );
  };
  const durationLabel = selected.durationMinutes === 60
    ? c("1 jam", "1 hour")
    : c("2 jam", "2 hours");

  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene coaching-scene" id="coaching">
        <Architecture variant="coaching" word="05" priority={!embedded} />
        <div className="coaching-copy">
          <SceneLabel number="06">{c("COACHING 1:1", "COACHING 1:1", "一对一辅导")}</SceneLabel>
          <DisplayTitle level={2} lines={[c("BELAJAR.", "LEARN."), c("BINA.", "BUILD."), c("TERBITKAN.", "DEPLOY.", "发布。")]} />
          <p className="scene-intro">
            {c(
              "Pilih sesi 1:1 untuk asas frontend, React/Next.js atau sistem full-stack.",
              "Choose a 1:1 session for frontend fundamentals, React/Next.js or full-stack systems.",
            )}
          </p>
          <div className="console coaching-console">
            <fieldset>
              <legend>1. {c("PILIH PAKEJ COACHING", "CHOOSE A COACHING PACKAGE")}</legend>
              <div className="topic-options">
                {COACHING_PACKAGES.map((item) => (
                  <label
                    key={item.id}
                    className={"choice-option " + (packageId === item.id ? "selected" : "")}
                  >
                    <input
                      type="radio"
                      name="coaching-package"
                      value={item.id}
                      checked={packageId === item.id}
                      onChange={() => select(item.id)}
                    />
                    <span>{localized(item.name, locale)} · RM{item.price}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend>2. {c("TEMPOH SESI", "SESSION LENGTH")}</legend>
              <div className="duration-options">
                <span className="choice-option selected" aria-live="polite">
                  {durationLabel} · RM{selected.price}
                </span>
              </div>
            </fieldset>
            <ActionLink
              href={
                sectionPath(locale, "hubungi", new URLSearchParams({
                  service: "coaching",
                  coachingPackage: selected.id,
                }))
              }
            >
              {c("Tanya Slot Coaching", "Ask About a Coaching Slot")}
            </ActionLink>
            <p>
              {locale === "zh-Hans" ? "线上 · 1:1 · 马来语" : <>Online · 1:1 · {c("Bahasa Melayu", "Malay")}</>}
              <br />
              <span>
                {c(
                  "Harga pakej dipaparkan. Slot disahkan selepas pertanyaan; tiada tempahan atau bayaran automatik.",
                  "Package prices are shown. Slots are confirmed after enquiry; no automatic booking or payment.",
                )}
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="coaching-detail">
        <div>
          <span className="chapter-line">{c("TENTANG PAKEJ INI", "ABOUT THIS PACKAGE")}</span>
          <h2>{localized(selected.name, locale)}</h2>
          <p>{localized(selected.description, locale)}</p>
        </div>
        <ul>{localized(selected.includes, locale).map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
    </StudioPage>
  );
}

export function CoachingView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  return (
    <Suspense fallback={<div className="route-loading">Coaching 1:1</div>}>
      <Coaching locale={locale} embedded={embedded} />
    </Suspense>
  );
}
