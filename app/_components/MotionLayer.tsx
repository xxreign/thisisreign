"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./MotionLayer.module.css";

// Site-wide motion: scroll reveals, a scroll progress line, pointer parallax and a custom cursor.
// Everything is skipped when the visitor prefers reduced motion.
export default function MotionLayer() {
  const pathname = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  // Scroll reveals: re-scan on every route change.
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Scroll progress line + pointer parallax variables.
  useEffect(() => {
    const root = document.documentElement;
    const bar = progress.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = root.scrollHeight - window.innerHeight;
      const ratio = max > 40 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.transform = `scaleX(${ratio})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const parallax = (event: PointerEvent) => {
      if (reduced.matches || event.pointerType !== "mouse") return;
      root.style.setProperty("--px", ((event.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--py", ((event.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", parallax, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", parallax);
    };
  }, [pathname]);

  // Custom cursor: a small white dot that inverts what it passes over and grows on links.
  useEffect(() => {
    const dot = cursor.current;
    if (!dot) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const root = document.documentElement;
    const state = { x: -100, y: -100, tx: -100, ty: -100 };
    let frame = 0;
    let last = 0;
    const tick = (time: number) => {
      const delta = last ? Math.min(time - last, 40) : 16.67;
      last = time;
      const follow = 1 - Math.exp(-delta / 45);
      state.x += (state.tx - state.x) * follow;
      state.y += (state.ty - state.y) * follow;
      dot.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      const settled = Math.abs(state.tx - state.x) < 0.1 && Math.abs(state.ty - state.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(tick);
      if (settled) last = 0;
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      if (!root.classList.contains("has-cursor")) {
        root.classList.add("has-cursor");
        state.x = event.clientX;
        state.y = event.clientY;
      }
      state.tx = event.clientX;
      state.ty = event.clientY;
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor]") : null;
      if (target) dot.dataset.mode = target.getAttribute("data-cursor") ?? "link";
      else delete dot.dataset.mode;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const hide = () => { dot.dataset.hidden = ""; };
    const show = () => { delete dot.dataset.hidden; };
    const down = () => { dot.dataset.pressed = ""; };
    const up = () => { delete dot.dataset.pressed; };
    const off = () => { if (!media.matches) root.classList.remove("has-cursor"); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("pointerenter", show);
    media.addEventListener("change", off);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("pointerenter", show);
      media.removeEventListener("change", off);
    };
  }, []);

  return (
    <>
      <div ref={progress} className={styles.progress} aria-hidden="true" />
      <div ref={cursor} className={styles.cursor} aria-hidden="true"><span /></div>
    </>
  );
}
