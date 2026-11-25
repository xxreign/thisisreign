"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#/_+-";

// Letters shuffle briefly and settle left to right when the parent link is hovered or focused.
export default function ScrambleText({ text }: { text: string }) {
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = node.current;
    const trigger = element?.closest("a, button");
    if (!element || !trigger) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame = 0;
    let start = 0;
    const duration = 420;
    const run = (time: number) => {
      if (!start) start = time;
      const progress = Math.min(1, (time - start) / duration);
      const settled = Math.floor(progress * text.length);
      element.textContent = text
        .split("")
        .map((char, i) => (i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (progress < 1) frame = requestAnimationFrame(run);
      else { element.textContent = text; frame = 0; }
    };
    const play = () => {
      if (!media.matches) return;
      cancelAnimationFrame(frame);
      start = 0;
      frame = requestAnimationFrame(run);
    };
    trigger.addEventListener("pointerenter", play);
    trigger.addEventListener("focus", play);
    return () => {
      cancelAnimationFrame(frame);
      element.textContent = text;
      trigger.removeEventListener("pointerenter", play);
      trigger.removeEventListener("focus", play);
    };
  }, [text]);

  // The real label stays readable for screen readers; the shuffling copy is visual only.
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{text}</span>
      <span ref={node} aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, whiteSpace: "nowrap" }}>{text}</span>
    </span>
  );
}
