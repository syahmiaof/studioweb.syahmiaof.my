"use client";
import { useEffect, useRef, useState } from "react";
import { HERO_JOKES } from "@/content/hero-jokes";
import type { Locale } from "@/lib/types";

export function HeroJokeTypewriter({ locale }: { locale: Locale }) {
  const copy = HERO_JOKES[locale];
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(node.closest("#home") ?? node);
    const visibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const active = inView && pageVisible;
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setText(copy.jokes[index]); return; }
    if (!active || paused) return;
    let timer = 0;
    let cursor = 0;
    let deleting = false;
    let wait = 850;
    const tick = () => {
      if (deleting) {
        cursor = Math.max(0, cursor - 2);
        setText(copy.jokes[index].slice(0, cursor));
        if (!cursor) { deleting = false; setIndex((value) => (value + 1) % copy.jokes.length); return; }
      } else {
        cursor = Math.min(copy.jokes[index].length, cursor + 1);
        setText(copy.jokes[index].slice(0, cursor));
        if (cursor === copy.jokes[index].length) { deleting = true; wait = 4800; }
      }
      timer = window.setTimeout(tick, wait);
      wait = deleting && cursor === copy.jokes[index].length ? 4800 : deleting ? 24 : 45 + Math.random() * 35;
    };
    timer = window.setTimeout(tick, 650);
    return () => window.clearTimeout(timer);
  }, [active, paused, index, locale, copy]);
  return <div className="hero-joke" ref={root}>
    <span className="hero-joke-label">{copy.label} <span aria-hidden="true">{"//"}</span> {copy.counter(index + 1)}</span>
    <p className="hero-joke-intro">{copy.intro}</p>
    <p className="hero-joke-line" aria-hidden="true">{text}<span className="hero-joke-cursor" /></p>
    <span className="sr-only" aria-live="polite">{copy.jokes[index]}</span>
    <div className="hero-joke-controls">
      <button type="button" onClick={() => { setIndex((value) => (value + 1) % copy.jokes.length); setText(""); }} aria-label={copy.next}>↻ <span>{copy.next}</span></button>
      <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? copy.resume : copy.pause}</button>
    </div>
  </div>;
}
