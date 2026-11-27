"use client";

import { useRef } from "react";
import styles from "../project.module.css";

// The film with native controls (play with sound, scrub, fullscreen), plus a visible FULLSCREEN
// button. It never autoplays. iOS Safari only supports fullscreen on the video element itself,
// via webkitEnterFullscreen, so that is the fallback.
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function FilmPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  const fullscreen = () => {
    const video = ref.current as IOSVideo | null;
    if (!video) return;
    if (typeof video.requestFullscreen === "function") {
      video.requestFullscreen().then(() => video.play()).catch(() => video.webkitEnterFullscreen?.());
    } else {
      video.webkitEnterFullscreen?.();
    }
  };

  return (
    <figure className={styles.film}>
      <video
        ref={ref}
        className={styles.filmVideo}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        width={1920}
        height={1080}
        aria-label={label}
      />
      <figcaption className={styles.filmBar}>
        <span className={styles.caption}>
          Location: Stockholm, Sweden
          <br />
          Music: BLUE by raph
        </span>
        <button type="button" className={styles.filmButton} onClick={fullscreen}>FULLSCREEN</button>
      </figcaption>
    </figure>
  );
}
