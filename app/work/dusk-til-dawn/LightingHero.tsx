"use client";

import { useEffect, useRef } from "react";
import styles from "./lightingHero.module.css";

// Recreation of the hero on the live Dusk ‘til Dawn site (dusk-til-dawn.vercel.app).
//
// How the lighting works: two pre-rendered videos of a light sweeping across the chrome are
// scrubbed instead of played. One lights the packaging, one lights the logo (masked to the
// logo's shape). The pointer's horizontal position across the hero maps to a point in both
// videos, eased like the original GSAP quickTo (0.45s, power3.out). When the pointer leaves,
// the window blurs, the tab hides or the page scrolls, the light settles back to its resting
// frame (4.8s into the packaging video).
//
// Mouse: scrub on pointer move. Touch: the logo light sweeps slowly by itself while the hero
// is on screen. Reduced motion: no video; the static neutral renders stay.

const dir = "/work/dusk-til-dawn/live";
const EASE_SECONDS = 0.45;
const REST_SECONDS = 4.8;
const AUTO_PERIOD_MS = 9000;

type Track = { video: HTMLVideoElement; source: string; duration: number; ready: boolean; frame: number };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function LightingHero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const productsVideo = useRef<HTMLVideoElement>(null);
  const logoVideo = useRef<HTMLVideoElement>(null);
  const roll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hero = root.current;
    const box = stage.current;
    const products = productsVideo.current;
    const logo = logoVideo.current;
    if (!hero || !box || !products || !logo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches) return;

    // The tagline's bold line rolls up to the red “It’s time to care.” after two seconds, once.
    const rollTimer = window.setTimeout(() => roll.current?.setAttribute("data-rolled", "true"), 2000);

    const mouse = finePointer.matches;
    // Touch devices only sweep the logo light, which keeps the download to the smaller video.
    const tracks: Track[] = (mouse ? [products, logo] : [logo]).map((video) => ({
      video,
      source: video === products ? `${dir}/dusk-final-lighting.mp4` : `${dir}/dusk-logo-lighting-scrub.mp4`,
      duration: 0,
      ready: false,
      frame: 0,
    }));

    let disposed = false;
    let rest = 0.8;
    let progress = 0.8;
    let from = progress;
    let to = progress;
    let tweenStart = 0;
    let raf = 0;

    // Move each video to the current point; skip tiny steps and never queue a seek on a seek.
    const seek = () => {
      for (const track of tracks) {
        if (!track.duration || track.video.seeking) continue;
        const time = Math.max(0, Math.min(1, progress)) * track.duration;
        if (Math.abs(track.video.currentTime - time) >= 1 / 48) track.video.currentTime = time;
      }
    };
    const step = (now: number) => {
      const t = Math.min(1, (now - tweenStart) / (EASE_SECONDS * 1000));
      progress = from + (to - from) * easeOut(t);
      seek();
      raf = t < 1 ? requestAnimationFrame(step) : 0;
    };
    const ease = (target: number) => {
      from = progress;
      to = target;
      tweenStart = performance.now();
      if (!raf) raf = requestAnimationFrame(step);
    };
    const settle = () => ease(rest);

    const cleanups = tracks.map((track) => {
      const { video } = track;
      const onMeta = () => {
        track.duration = Number.isFinite(video.duration) ? Math.max(0, video.duration - 1 / 24) : 0;
        if (video === tracks[0].video && track.duration) {
          rest = Math.min(REST_SECONDS / track.duration, 1);
          if (!raf) progress = from = to = rest;
        }
        video.currentTime = progress * track.duration;
      };
      const markReady = () => { if (!disposed) video.dataset.ready = "true"; };
      const onSeeked = () => {
        if (!track.ready) {
          track.ready = true;
          // Reveal the video only once a real frame is on screen, so the still never flashes.
          // (Older Safari has no requestVideoFrameCallback.)
          if (typeof video.requestVideoFrameCallback === "function") track.frame = video.requestVideoFrameCallback(markReady);
          else markReady();
        }
        seek();
      };
      const onError = () => { video.dataset.ready = "false"; };
      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("seeked", onSeeked);
      video.addEventListener("error", onError);
      video.src = track.source;
      video.load();
      return () => {
        if (track.frame) video.cancelVideoFrameCallback(track.frame);
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("error", onError);
        video.dataset.ready = "false";
        video.removeAttribute("src");
        video.load();
      };
    });

    let bounds = box.getBoundingClientRect();
    const measure = () => { bounds = box.getBoundingClientRect(); };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !tracks[0].duration) return;
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) settle();
      else ease(x);
    };
    const onScroll = () => { settle(); measure(); };
    const onVisibility = () => { if (document.hidden) settle(); };

    // Touch: a slow back-and-forth sweep while the hero is visible.
    let autoRaf = 0;
    let visible = true;
    const sweep = (now: number) => {
      if (tracks[0].duration && visible && !document.hidden) {
        progress = 0.5 + 0.42 * Math.sin((now / AUTO_PERIOD_MS) * Math.PI * 2);
        seek();
      }
      autoRaf = requestAnimationFrame(sweep);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(hero);

    const area = hero.closest("main") ?? hero;
    if (mouse) {
      area.addEventListener("pointermove", onMove as EventListener, { passive: true });
      area.addEventListener("pointerleave", settle);
      window.addEventListener("blur", settle);
      window.addEventListener("resize", measure, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    } else {
      autoRaf = requestAnimationFrame(sweep);
    }

    return () => {
      disposed = true;
      window.clearTimeout(rollTimer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(autoRaf);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      area.removeEventListener("pointermove", onMove as EventListener);
      area.removeEventListener("pointerleave", settle);
      window.removeEventListener("blur", settle);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <header ref={root} className={styles.hero}>
      <h1 className={styles.visuallyHidden}>DUSK ‘TIL DAWN</h1>

      <div ref={stage} className={styles.frame}>
        <div className={styles.stage} aria-hidden="true">
          {/* Plain <img>/<video>: these are layered renders that must line up pixel for pixel. */}
          <div className={styles.products}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.layer} src={`${dir}/dusk-hero.jpg`} alt="" fetchPriority="high" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.layer} src={`${dir}/dusk-final-neutral.webp`} alt="" />
            <video ref={productsVideo} className={`${styles.layer} ${styles.video}`} muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} />
          </div>
          <div className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.layer} src={`${dir}/dusk-logo-neutral.webp`} alt="" fetchPriority="high" />
            <video ref={logoVideo} className={`${styles.layer} ${styles.video} ${styles.logoVideo}`} muted playsInline preload="auto" disablePictureInPicture tabIndex={-1} />
          </div>
        </div>
      </div>

      <div className={styles.caption}>
        <p className={styles.tagline}>
          Skincare and wellness for those on the move.{" "}
          <span ref={roll} className={styles.roll}>
            <span className={styles.rollInner}>
              <strong>Dusk ‘til Dawn.</strong>
              <strong className={styles.red} aria-hidden="true">It’s time to care.</strong>
            </span>
          </span>
        </p>
        <a className={styles.more} href="#overview">
          MORE
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${dir}/more-chevron.svg`} alt="" />
        </a>
      </div>
    </header>
  );
}
