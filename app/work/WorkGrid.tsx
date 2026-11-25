"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { anton } from "../_lib/fonts";
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
        {categories.map((c) => (
          <button type="button" key={c} aria-pressed={filter === c} onClick={() => setFilter(filter === c ? null : c)}>
            {c}<sup>{counts[c]}</sup>
          </button>
        ))}
      </nav>

      <ol className={styles.grid} data-filtering={filter ? "" : undefined}>
        {projects.map((project, index) => {
          const active = !filter || project.category === filter;
          const number = String(index + 1).padStart(2, "0");
          const place = {
            "--col": project.col,
            "--span": project.span,
            "--shift": `${project.shift}vw`,
            "--ratio": project.ratio,
            "--d": `${project.depth}px`,
            "--i": index % 4,
          } as CSSProperties;
          return (
            <li key={project.slug} className={styles.item} style={place} data-active={active ? "" : undefined} data-reveal="">
              <figure className={`${styles.tile} drift`} data-cursor="view" aria-label={`${project.title}, ${project.category}, ${project.year}`}>
                <div className={styles.media}>
                  {project.video ? (
                    <video className={styles.image} src={project.video} poster={project.image} autoPlay muted loop playsInline preload="metadata" aria-label={project.title} />
                  ) : project.image ? (
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 760px) 50vw, 35vw" className={styles.image} />
                  ) : (
                    <div className={styles.placeholder} aria-hidden="true">
                      <span className={anton.className}>{number}</span>
                    </div>
                  )}
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.number}>{number}</span>
                  <span className={styles.title}>{project.title}</span>
                  <span className={styles.meta}>{project.category} · {project.year}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ol>
    </>
  );
}
