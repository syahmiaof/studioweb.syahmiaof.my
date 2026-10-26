"use client";

import { gsap } from "./gsapSetup";

/** Own the media listener as well as its GSAP context across route unmounts. */
export function responsiveMotion(
  query: string,
  setup: () => void | (() => void),
) {
  const media = window.matchMedia(query);
  let context: gsap.Context | undefined;
  const sync = () => {
    context?.revert();
    context = undefined;
    if (media.matches) context = gsap.context(setup);
  };
  media.addEventListener("change", sync);
  sync();
  return () => {
    media.removeEventListener("change", sync);
    context?.revert();
    context = undefined;
  };
}
