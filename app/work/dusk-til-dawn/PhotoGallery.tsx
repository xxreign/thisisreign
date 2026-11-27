"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./gallery.module.css";

// Recreation of the infinite photo gallery on the live Dusk ‘til Dawn site.
//
// How it works (same as the original): a native horizontal scroller holds the 24 photos three
// times over and starts centred on the middle copy. You move it yourself: drag with the mouse,
// swipe or scroll a trackpad sideways, or use the arrow keys. There is no autoplay. Whenever
// scrolling stops more than about half a loop away from the middle, the scroll position jumps
// by exactly one loop; the copies are identical, so the jump can't be seen. The card nearest
// the centre grows up to 1.38x on a smoothstep curve and sits on top of its neighbours.

const dir = "/work/dusk-til-dawn/live/gallery";
const RATIO = 1.5;
const ZOOM = 0.38;

const photos = [
  { file: "dsc5226.jpg", alt: "Dusk chrome product collection reflected on a black floor" },
  { file: "dsc5233.jpg", alt: "Silver Dusk packaging with its presentation box" },
  { file: "dsc5234.jpg", alt: "Open Pre-Game carton containing red wellness shots" },
  { file: "dsc5236.jpg", alt: "A hand lifting a red wellness shot from its silver carton" },
  { file: "dsc5244.jpg", alt: "Pre-Game carton beside two red wellness shots" },
  { file: "dsc5249.jpg", alt: "Red wellness shots arranged beside an open silver carton" },
  { file: "dsc5257.jpg", alt: "Open wellness shot carton lying beside red glass bottles" },
  { file: "dsc5261.jpg", alt: "Closed silver All-Nighter supplement package and its reflection" },
  { file: "dsc5268.jpg", alt: "Open supplement case with yellow capsules" },
  { file: "dsc5270.jpg", alt: "Silver supplement cases and yellow capsules on a black surface" },
  { file: "dsc5272.jpg", alt: "Long silver Dusk cream package and its reflection" },
  { file: "dsc5274.jpg", alt: "Upright silver Dusk cream carton" },
  { file: "dsc5280.jpg", alt: "Dusk cream tube resting across its silver packaging" },
  { file: "dsc5285.jpg", alt: "Upright chrome cream tube beside its packaging" },
  { file: "dsc5291.jpg", alt: "Close view of the open silver Dusk gift tin" },
  { file: "dsc5292.jpg", alt: "Open Dusk gift tin containing its chrome product collection" },
  { file: "all.jpg", alt: "Dusk ‘til Dawn — all" },
  { file: "cig-1-2.jpg", alt: "Dusk ‘til Dawn — cig 1 2" },
  { file: "cig-3-4.jpg", alt: "Dusk ‘til Dawn — cig 3 4" },
  { file: "cream.jpg", alt: "Dusk ‘til Dawn — cream" },
  { file: "lighter-all.jpg", alt: "Dusk ‘til Dawn — lighter all" },
  { file: "set1.jpg", alt: "Dusk ‘til Dawn — set1" },
  { file: "set2.jpg", alt: "Dusk ‘til Dawn — set2" },
  { file: "set3.jpg", alt: "Dusk ‘til Dawn — set3" },
];

export default function PhotoGallery() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-gallery-card]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let loop = 0; // width of one copy of the set
    let origin = 0; // scroll position that centres the first card of the middle copy
    let measured = false;
    let dragId: number | null = null;
    let dragX = 0;
    let dragStart = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    // Grow the card nearest the centre.
    const paint = () => {
      frame = 0;
      if (!el.clientWidth) return;
      const centre = el.scrollLeft + el.clientWidth / 2;
      for (const card of cards) {
        const t = Math.max(0, 1 - Math.abs(card.offsetLeft + card.offsetWidth / 2 - centre) / (0.95 * card.offsetWidth));
        const s = t * t * (3 - 2 * t);
        card.style.transform = reduced.matches ? "none" : `scale(${1 + ZOOM * s})`;
        card.style.zIndex = String(Math.round(100 * s));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };

    // Jump back by whole loops once the scroll has settled far from the middle copy.
    const wrap = () => {
      if (dragId !== null || !loop) return;
      const offset = el.scrollLeft - origin;
      if (Math.abs(offset) < 0.45 * loop) return;
      const wrapped = (((offset + loop / 2) % loop) + loop) % loop - loop / 2;
      el.scrollLeft = origin + wrapped;
      schedule();
    };
    const onScroll = () => {
      schedule();
      clearTimeout(idle);
      idle = setTimeout(wrap, 200);
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      dragId = event.pointerId;
      dragX = event.clientX;
      dragStart = el.scrollLeft;
      el.setPointerCapture(event.pointerId);
      el.dataset.dragging = "true";
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerId === dragId) el.scrollLeft = dragStart - (event.clientX - dragX);
    };
    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== dragId) return;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      dragId = null;
      delete el.dataset.dragging;
      wrap();
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.target !== el || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const stepSize = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 344;
      const left =
        event.key === "Home" ? origin
        : event.key === "End" ? origin + loop - stepSize
        : el.scrollLeft + (event.key === "ArrowRight" ? stepSize : -stepSize);
      el.scrollTo({ left, behavior: reduced.matches ? "instant" : "smooth" });
    };
    const noDrag = (event: Event) => event.preventDefault();

    // Measure one loop and keep the same relative position when the size changes.
    // Load every photo once the gallery is near the screen. The three copies share the same 24
    // files, so this is 24 downloads, and a card is never still loading when the loop jumps to it.
    const nearby = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.querySelectorAll("img").forEach((img) => { img.loading = "eager"; });
      nearby.disconnect();
    }, { rootMargin: "800px 0px" });
    nearby.observe(el);

    const resize = new ResizeObserver(() => {
      const anchor = cards[photos.length];
      if (!el.clientWidth || !anchor) return;
      const nextLoop = anchor.offsetLeft - cards[0].offsetLeft;
      const nextOrigin = anchor.offsetLeft + anchor.offsetWidth / 2 - el.clientWidth / 2;
      const relative = measured && loop ? (el.scrollLeft - origin) / loop : 0;
      loop = nextLoop;
      measured = true;
      origin = nextOrigin;
      el.scrollLeft = origin + relative * loop;
      schedule();
    });
    resize.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("scrollend", wrap);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", onUp);
    el.addEventListener("keydown", onKey);
    el.addEventListener("dragstart", noDrag);
    reduced.addEventListener("change", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(idle);
      nearby.disconnect();
      resize.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("scrollend", wrap);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("lostpointercapture", onUp);
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("dragstart", noDrag);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div className={styles.gallery}>
      <p id="dtd-gallery-instructions" className={styles.instructions} data-reveal="" suppressHydrationWarning>
        Swipe or scroll horizontally to explore.
      </p>
      <div
        ref={track}
        className={styles.track}
        role="region"
        aria-label="Dusk ‘til Dawn photo gallery"
        aria-describedby="dtd-gallery-instructions"
        tabIndex={0}
      >
        {[0, 1, 2].flatMap((copy) =>
          photos.map((photo, i) => (
            <figure key={`${copy}-${photo.file}`} className={styles.card} data-gallery-card="" aria-hidden={copy !== 1} style={{ "--photo-ratio": RATIO } as CSSProperties}>
              {/* Same src and sizes in every copy, so the copies reuse one download and the loop jump never shows a blank card. */}
              <Image
                src={`${dir}/${photo.file}`}
                alt={copy === 1 ? photo.alt : ""}
                width={1920}
                height={1280}
                draggable={false}
                sizes="(max-width: 899px) 90vw, (max-width: 1500px) 50vw, 750px"
              />
              {copy === 1 && <figcaption className={styles.srOnly}>{`${i + 1} of ${photos.length}: ${photo.alt}`}</figcaption>}
            </figure>
          )),
        )}
      </div>
    </div>
  );
}
