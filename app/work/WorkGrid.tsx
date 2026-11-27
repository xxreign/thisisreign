"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import { categories, projects, type Category } from "./data";
import styles from "./work.module.css";

export default function WorkGrid() {
  const [filter, setFilter] = useState<Category | null>(null);
  const counts = Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length]));

  return (
    <>
      <nav className={styles.filters} aria-label="Filter work by discipline">
        <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)}>
          ALL<sup>{projects.length}</sup>
        </button>
        {/* Only disciplines that have at least one project get a button. */}
        {categories.filter((c) => counts[c] > 0).map((c) => (
          <button type="button" key={c} aria-pressed={filter === c} onClick={() => setFilter(filter === c ? null : c)}>
            {c}<sup>{counts[c]}</sup>
          </button>
        ))}
      </nav>

      <ol className={styles.grid}>
        {projects.map((project, index) => {
          const active = !filter || project.category === filter;
          const number = String(index + 1).padStart(2, "0");
          const discipline = project.label ?? project.category;
          const label = `${project.title}, ${discipline}, ${project.year}`;
          const overlay = (
            <div className={styles.overlay} aria-hidden="true">
              <span className={styles.number}>{number}</span>
              <span className={styles.text}>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.meta}>{discipline} · {project.year}</span>
              </span>
            </div>
          );
          // Placeholders (no link) are focusable too, so keyboard users can read their text.
          const tile = (
            <figure className={styles.tile} data-cursor="view" aria-label={project.url ? undefined : label} tabIndex={project.url ? undefined : 0}>
              <div className={styles.media}>
                {project.video ? (
                  <video className={styles.image} src={project.video} poster={project.image} autoPlay muted loop playsInline preload="metadata" aria-label={project.title} />
                ) : project.image ? (
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 46vw, (max-width: 1100px) 30vw, 23vw" className={styles.image} style={project.objectPosition ? { objectPosition: project.objectPosition } : undefined} />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true" />
                )}
                {overlay}
              </div>
            </figure>
          );
          // Filtering hides tiles (the grid reflows); the rest stay mounted so their reveal state is kept.
          return (
            <li key={project.slug} className={styles.item} hidden={!active} data-reveal="" suppressHydrationWarning style={{ "--i": index % 4 } as CSSProperties}>
              {project.url?.startsWith("/") ? (
                <Link className={styles.link} href={project.url} aria-label={label}>{tile}</Link>
              ) : project.url ? (
                <a className={styles.link} href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>{tile}</a>
              ) : tile}
            </li>
          );
        })}
      </ol>
    </>
  );
}
