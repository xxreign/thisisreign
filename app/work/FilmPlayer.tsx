"use client";

import { useRef } from "react";
import { Fragment } from "react";
import styles from "./project.module.css";

// A project film (Blue in Stockholm, See U in Paris) with native controls (play with sound, scrub, fullscreen), plus a visible FULLSCREEN
// button. It never autoplays. iOS Safari only supports fullscreen on the video element itself,
// via webkitEnterFullscreen, so that is the fallback.
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export default function FilmPlayer({ src, poster, label, caption }: { src: string; poster: string; label: string; caption: string[] }) {
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
        // The poster fills the 16:9 frame until the first play; after that the film shows at its own size.
        onPlay={(event) => { event.currentTarget.dataset.started = "true"; }}
        width={1920}
        height={1080}
        aria-label={label}
      />
      <figcaption className={styles.filmBar}>
        <span className={styles.caption}>
          {caption.map((line, i) => (
            <Fragment key={line}>{i > 0 && <br />}{line}</Fragment>
          ))}
        </span>
        <button type="button" className={styles.filmButton} onClick={fullscreen}>FULLSCREEN</button>
      </figcaption>
    </figure>
  );
}
