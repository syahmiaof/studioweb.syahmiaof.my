"use client";
import { useEffect, useRef } from "react";

export function MibotRobot({ className = "", label = "MIBOT" }: { className?: string; label?: string }) {
  const face = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const node = face.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let closed = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        node.classList.add("is-blinking");
        closed = window.setTimeout(() => node.classList.remove("is-blinking"), 135);
        schedule();
      }, 4000 + Math.random() * 3000);
    };
    schedule();
    return () => { window.clearTimeout(timer); window.clearTimeout(closed); node.classList.remove("is-blinking"); };
  }, []);
  return <svg ref={face} className={`mibot-robot ${className}`} viewBox="0 0 64 64" role="img" aria-label={label}>
    <path d="M31 5h2v7h-2z" fill="#111"/><circle cx="32" cy="6" r="3" fill="#1c54ff"/>
    <path d="M15 15 21 10h22l6 5 5 7v22l-7 8H17l-7-8V23z" fill="#f2ff00" stroke="#111" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M18 25h28v17H18z" fill="#090a0a" stroke="#111" strokeWidth="3"/>
    <rect className="mibot-eye" x="23" y="30" width="6" height="7" rx="1.5" fill="#f2ff00"/>
    <rect className="mibot-eye" x="35" y="30" width="6" height="7" rx="1.5" fill="#f2ff00"/>
    <path d="M26 47h12" stroke="#111" strokeWidth="3" strokeLinecap="square"/>
    <path d="M52 29h5v10h-5" fill="#1c54ff" stroke="#111" strokeWidth="2"/>
  </svg>;
}
