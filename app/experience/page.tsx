import type { Metadata } from "next";
import Image from "next/image";
import { anton } from "../_lib/fonts";
import ExperienceSectionNav from "./SectionNavigation";
import { education, work, awards, brands, type ExperienceEntry } from "./data";
import styles from "./experience.module.css";
// Same single-word hero as the other interior pages, so the heroes line up.
import interior from "../interior.module.css";

export const metadata: Metadata = {
  title: "Experience | XXREIGN",
  description: "Education, work, awards, and fashion content collaborations from Reign.",
};

// Collapse the runs of spaces in the transcribed data ("2023/08 -     NOW").
const tidy = (text?: string) => text?.replace(/[ \t]+/g, " ").trim();

type Columns = { main: string; detail: string; years: boolean };

// Column labels per section. Every entry leads with the school, studio or issuer, with the degree, role or award underneath.
function columnsFor(entries: ExperienceEntry[], main: string): Columns {
  const hasDescription = entries.some((entry) => entry.description);
  const hasLocation = entries.some((entry) => entry.location);
  return {
    main,
    detail: hasDescription ? "DETAIL" : hasLocation ? "LOCATION" : "",
    years: entries.some((entry) => entry.date),
  };
}

function Entry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const title = entry.href ? (
    <a className={styles.nameLink} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.title}</a>
  ) : entry.title;
  const location = tidy(entry.location);
  return (
    <li className={styles.entry} data-reveal="" suppressHydrationWarning>
      <span className={styles.index} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.entryMain}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.secondary}>{entry.role}</p>
      </div>
      {(entry.description || location) && (
        <div className={styles.detail}>
          {entry.description && <p className={styles.description}>{entry.description}</p>}
          {location && <p className={entry.description ? styles.location : styles.description}>{location}</p>}
        </div>
      )}
      {entry.date && <p className={styles.years}>{tidy(entry.date)}</p>}
    </li>
  );
}

function ColumnLabels({ columns }: { columns: Columns }) {
  return (
    <div className={styles.columnLabels} aria-hidden="true" data-reveal="" suppressHydrationWarning>
      <span />
      <span>{columns.main}</span>
      <span className={styles.detailLabel}>{columns.detail}</span>
      <span className={styles.yearsLabel}>{columns.years ? "YEARS" : ""}</span>
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={`${interior.heading} ${anton.className}`}><span className="hero-word">EXPERIENCE</span></h1>
      </header>
      <ExperienceSectionNav />
      <div className={styles.sections}>
        {[
          { id: "education", title: "EDUCATION", entries: education, columns: columnsFor(education, "SCHOOL / DEGREE") },
          { id: "work", title: "WORK", entries: work, columns: columnsFor(work, "STUDIO / ROLE") },
          { id: "awards", title: "AWARDS", entries: awards, columns: columnsFor(awards, "ISSUER / AWARD") },
        ].map(({ id, title, entries, columns }) => (
          <section className={styles.section} id={id} key={id} aria-labelledby={`${id}-heading`}>
            <h2 id={`${id}-heading`} className={anton.className} data-reveal="" suppressHydrationWarning>{title}</h2>
            <div className={styles.table}>
              <ColumnLabels columns={columns} />
              <ul className={styles.entries}>{entries.map((entry, index) => <Entry key={entry.title} entry={entry} index={index} />)}</ul>
            </div>
          </section>
        ))}
        <section className={`${styles.section} ${styles.content}`} id="content" aria-labelledby="content-heading">
          <h2 id="content-heading" className={anton.className} data-reveal="" suppressHydrationWarning>CONTENT</h2>
          <h3 className={styles.brandTitle} data-reveal="" suppressHydrationWarning>COLLABORATION BRANDS FOR FASHION CONTENT</h3>
          <ul className={styles.brands}>
            {brands.map(({ name, src, width, height = 320, href }, index) => (
              <li key={name} data-reveal="" suppressHydrationWarning style={{ "--i": index % 3 } as React.CSSProperties}>
                {href ? (
                  <a className={styles.logoLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on Instagram (opens in a new tab)`}>
                    <Image src={src} width={width} height={height} sizes="(max-width: 760px) 40vw, 20vw" alt={`${name} logo`} className={styles.logo} />
                  </a>
                ) : <Image src={src} width={width} height={height} sizes="(max-width: 760px) 40vw, 20vw" alt={`${name} logo`} className={styles.logo} />}
                <p>{name}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
