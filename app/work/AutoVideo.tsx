"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./project.module.css";

// A silent looping video for project pages.
// - Starts only when it comes near the screen and pauses when it leaves (or the tab is hidden).
// - With prefers-reduced-motion it never autoplays and just shows its first frame.
// - `sound` adds a small MUTED / SOUND ON toggle in the corner (turning sound on also starts playback).
type Props = {
  src: string;
  width: number;
  height: number;
  label: string;
  sound?: boolean;
  priority?: boolean;
  className?: string;
};

export default function AutoVideo({ src, width, height, label, sound = false, priority = false, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const visible = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const allowed = !reduced.matches || !video.muted; // with reduced motion, only play after the visitor asks for sound
      if (visible.current && allowed && !document.hidden) video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      update();
    }, { rootMargin: "200px 0px" });
    observer.observe(video);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    video.addEventListener("volumechange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
      video.removeEventListener("volumechange", update);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  };

  return (
    <div className={`${styles.videoWrap} ${className ?? ""}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <video
        ref={ref}
        className={styles.video}
        // "#t=0.001" makes browsers paint the first frame before playback starts.
        src={`${src}#t=0.001`}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        disablePictureInPicture
        aria-label={label}
      />
      {sound && (
        <button type="button" className={styles.soundToggle} onClick={toggle} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Mute"}>
          {muted ? "MUTED" : "SOUND ON"}
        </button>
      )}
    </div>
  );
}
