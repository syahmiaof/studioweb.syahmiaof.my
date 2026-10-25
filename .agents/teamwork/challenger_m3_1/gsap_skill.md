# GreenSock Animation Platform (GSAP) Engineering Guide (Local Dump)
Reference: C:\Users\USER\.gemini\config\skills\gsap\SKILL.md

Core Methodology:
1. Composited property animations (x, y, scale, rotation, opacity, transform).
2. clearProps: 'transform' or 'all' to restore crisp subpixel typography and natural layout.
3. prefers-reduced-motion check: instant set (gsap.set / zero duration), opacity: 1, y: 0, no trapped elements.
4. useGSAP scoping and context-safe callbacks in React environments.
5. Desktop-only parallax (e.g. min-width: 768px) with no horizontal/lateral drift.
