# GreenSock Animation Platform (GSAP) Engineering Guide
Local copy for Worker M3-1
Source: C:\Users\USER\.gemini\config\skills\gsap\SKILL.md

GSAP is the industry-standard JavaScript animation library for high-performance, frame-accurate motion on the modern web.
Core patterns:
- useGSAP with { scope: containerRef }
- prefers-reduced-motion check via window.matchMedia('(prefers-reduced-motion: reduce)') -> gsap.set(elements, { opacity: 1, y: 0, clearProps: 'all' })
- clearProps: 'all' or 'transform' on animation completion to avoid trapping transforms/blurs
- Animate only composited properties: opacity, y, x, scale
- Responsive motion via gsap.matchMedia()
