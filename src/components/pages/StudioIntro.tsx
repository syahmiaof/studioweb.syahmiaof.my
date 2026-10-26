"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsapSetup";
import type { Locale } from "@/lib/types";

const INTRO_SESSION_KEY = "syahmiaof-intro-seen-v1";

function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberIntro() {
  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // The intro still completes when browser storage is unavailable.
  }
}

export function StudioIntro({ locale, children }: { locale: Locale; children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const skipIntroRef = useRef<() => void>(() => undefined);
  const [visible, setVisible] = useState(true);
  const copy = locale === "ms"
    ? { kicker: "DIGITAL BRUTALISM · MALAYSIA", first: "SELAMAT DATANG", second: "KE STUDIO SYAHMIAOF", note: "Idea. Kod. Pengalaman.", enter: "MASUK KE STUDIO" }
    : locale === "zh-Hans"
      ? { kicker: "数字构建 · 马来西亚", first: "欢迎来到", second: "SYAHMIAOF 工作室", note: "创意 · 代码 · 体验", enter: "进入工作室" }
      : { kicker: "DIGITAL BRUTALISM · MALAYSIA", first: "WELCOME TO", second: "SYAHMIAOF STUDIO", note: "Ideas. Code. Experience.", enter: "ENTER THE STUDIO" };

  useEffect(() => {
    if (visible) enterButtonRef.current?.focus({ preventScroll: true });
  }, [visible]);

  useGSAP((_, contextSafe) => {
    if (hasSeenIntro() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rememberIntro();
      setVisible(false);
      return;
    }

    const finishCallback = () => {
      rememberIntro();
      setVisible(false);
    };
    const finish = contextSafe ? contextSafe(finishCallback) : finishCallback;
    const timeline = gsap.timeline({ onComplete: finish });
    timelineRef.current = timeline;
    const skip = () => {
      timeline.tweenTo(timeline.duration(), { duration: 0.7, ease: "power3.inOut" });
    };
    skipIntroRef.current = contextSafe ? contextSafe(skip) : skip;

    timeline
      .fromTo(".studio-intro__image", { scale: 1.08 }, { scale: 1, duration: 5, ease: "none" }, 0)
      .fromTo(".studio-intro__frame", { autoAlpha: 0, scale: 0.98 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 0)
      .fromTo(".studio-intro__kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.42)
      .fromTo(".studio-intro__title-line", { autoAlpha: 0, yPercent: 110 }, { autoAlpha: 1, yPercent: 0, duration: 0.72, stagger: 0.12, ease: "power4.out" }, 0.62)
      .fromTo(".studio-intro__bottom", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, 1.05)
      .fromTo(".studio-intro__progress-fill", { scaleX: 0 }, { scaleX: 1, duration: 4.35, ease: "none" }, 0)
      .to(rootRef.current, { yPercent: -100, duration: 0.65, ease: "power3.inOut" }, 4.35);

    return () => {
      timelineRef.current = null;
      skipIntroRef.current = () => undefined;
    };
  }, { scope: rootRef });

  return (
    <>
      <div className="studio-intro__page" aria-hidden={visible} inert={visible}>
        {children}
      </div>
      {visible && (
        <div ref={rootRef} className="studio-intro" role="dialog" aria-modal="true" aria-label={copy.first + " " + copy.second}>
          <div className="studio-intro__image" aria-hidden="true" />
          <div className="studio-intro__shade" aria-hidden="true" />
          <div className="studio-intro__frame">
            <div className="studio-intro__topline studio-intro__kicker">
              <span>SYAHMIAOF<span className="studio-intro__dot">.</span></span>
              <span>{copy.kicker}</span>
            </div>
            <div className="studio-intro__copy">
              <p className="studio-intro__eyebrow">[ STUDIO 01 / KUALA LUMPUR ]</p>
              <h1>
                <span className="studio-intro__title-line">{copy.first}</span>
                <span className="studio-intro__title-line studio-intro__title-accent">{copy.second}</span>
              </h1>
              <p className="studio-intro__note">{copy.note}</p>
            </div>
            <div className="studio-intro__bottom">
              <span className="studio-intro__coordinates">WEB · SYSTEMS · DIGITAL EXPERIENCE</span>
              <button ref={enterButtonRef} className="studio-intro__enter" type="button" onClick={() => skipIntroRef.current()}>
                {copy.enter}<span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <div className="studio-intro__progress" aria-hidden="true"><span className="studio-intro__progress-fill" /></div>
          <span className="studio-intro__index" aria-hidden="true">EST. 2026 <i /> DIGITAL STUDIO</span>
        </div>
      )}
    </>
  );
}
