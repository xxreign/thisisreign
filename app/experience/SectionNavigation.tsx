"use client";

import { useEffect, useRef, useState } from "react";
import { sectionLinks, type SectionId } from "./data";
import styles from "./experience.module.css";

export default function ExperienceSectionNav() {
  const [active, setActive] = useState<SectionId | null>(null);
  const pending = useRef<{ id: SectionId; until: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout>;
    const update = () => {
      frame = 0;
      const offset = window.innerWidth <= 760 ? 150 : 110;
      const target = pending.current;
      if (target) {
        const element = document.getElementById(target.id);
        const atTarget = element && Math.abs(element.getBoundingClientRect().top - offset) < 3;
        const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3;
        if (!atTarget && !atBottom && performance.now() < target.until) return;
        pending.current = null;
      }
      // Keep the current section through whitespace; headings must cross a stable threshold.
      let current: SectionId | null = null;
      for (const { id } of sectionLinks) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= offset + 60) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = "content";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
      clearTimeout(settleTimer);
      settleTimer = setTimeout(update, 1500);
    };
    const cancelPending = () => { pending.current = null; schedule(); };
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancelPending();
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    window.addEventListener("wheel", cancelPending, { passive: true });
    window.addEventListener("touchstart", cancelPending, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      window.removeEventListener("wheel", cancelPending);
      window.removeEventListener("touchstart", cancelPending);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className={styles.sectionNav} aria-label="Experience sections">
      {sectionLinks.map(({ id, label }) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            pending.current = { id, until: performance.now() + 1400 };
            setActive(id);
          }}>{label}</a>
      ))}
    </nav>
  );
}
