"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./FrostGlassImage.module.css";

type FrostGlassImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  sizes: string;
  preload?: boolean;
  blur?: number;
  radius?: number;
};

export default function FrostGlassImage({ src, alt, className, sizes, preload = false, blur = 40, radius = 194 }: FrostGlassImageProps) {
  const surface = useRef<HTMLDivElement>(null);
  const frost = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = surface.current;
    const overlay = frost.current;
    if (!element || !overlay) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let lastTime = 0;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, reveal: 0, targetReveal: 0 };
    let reach = radius;

    const paint = () => {
      const mask = pointer.reveal < 0.001 ? "none" : `radial-gradient(circle ${reach * pointer.reveal}px at ${pointer.x}px ${pointer.y}px, transparent 0%, transparent 35%, rgba(0,0,0,0.35) 65%, #000 100%)`;
      overlay.style.maskImage = mask;
      overlay.style.webkitMaskImage = mask;
    };
    const tick = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 40) : 16.67;
      lastTime = time;
      const follow = 1 - Math.exp(-delta / 58);
      const fade = 1 - Math.exp(-delta / 130);
      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;
      pointer.reveal += (pointer.targetReveal - pointer.reveal) * fade;
      const settled = Math.abs(pointer.targetX - pointer.x) < 0.1 && Math.abs(pointer.targetY - pointer.y) < 0.1 && Math.abs(pointer.targetReveal - pointer.reveal) < 0.001;
      if (settled) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        pointer.reveal = pointer.targetReveal;
      }
      paint();
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const animate = () => {
      if (!frame) {
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const track = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      pointer.targetX = event.clientX - bounds.left;
      pointer.targetY = event.clientY - bounds.top;
      reach = Math.min(radius, bounds.width * 0.6);
    };
    const enter = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      track(event);
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
      pointer.targetReveal = 1;
      element.dataset.revealing = "true";
      animate();
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return;
      if (!pointer.targetReveal) enter(event);
      else { track(event); animate(); }
    };
    const leave = () => {
      pointer.targetReveal = 0;
      delete element.dataset.revealing;
      if (pointer.reveal > 0) animate();
    };
    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pointer.reveal = pointer.targetReveal = 0;
      delete element.dataset.revealing;
      paint();
    };
    const hide = () => { if (document.hidden) reset(); };
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);
    window.addEventListener("resize", reset);
    window.addEventListener("scroll", reset, { passive: true });
    document.addEventListener("visibilitychange", hide);
    media.addEventListener("change", reset);
    return () => {
      reset();
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
      window.removeEventListener("resize", reset);
      window.removeEventListener("scroll", reset);
      document.removeEventListener("visibilitychange", hide);
      media.removeEventListener("change", reset);
    };
  }, [radius]);

  const variables = { "--portrait-ratio": `${src.width} / ${src.height}` } as CSSProperties;
  return (
    <div className={`${className ?? ""} ${styles.container}`} style={variables}>
      <div ref={surface} className={styles.surface}>
        <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} preload={preload} draggable={false} />
        <div ref={frost} className={styles.frost} style={{ backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)` }} aria-hidden="true" />
      </div>
    </div>
  );
}
