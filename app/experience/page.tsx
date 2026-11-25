import type { Metadata } from "next";
import Image from "next/image";
import { anton } from "../_lib/fonts";
import ExperienceSectionNav from "./SectionNavigation";
import { education, work, awards, brands, type ExperienceEntry } from "./data";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Experience | XXREIGN",
  description: "Education, work, awards, and fashion content collaborations from Reign.",
};

function Entry({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className={styles.entry} data-reveal="">
      <div className={styles.entryMain}>
        <h3>{entry.href ? (
          <a className={styles.nameLink} href={entry.href} target="_blank" rel="noopener noreferrer">{entry.title}</a>
        ) : entry.title}</h3>
        <p className={styles.role}>{entry.role}</p>

      </div>
      {entry.date && <p className={styles.details}><span>{entry.date}</span>{entry.location && <span>{entry.location}</span>}</p>}
      {entry.description && <p className={styles.description}>{entry.description}</p>}
    </li>
  );
}

export default function ExperiencePage() {
  return (
    <main className={styles.page}>
      <ExperienceSectionNav />
      <header className={styles.hero}>
        <h1 className={`${styles.heading} ${anton.className}`}>
          <span className={styles.intro}><span className="hero-word" style={{ "--i": 0 } as React.CSSProperties}>EXPERIENCE</span>{" "}<span className="hero-word" style={{ "--i": 1 } as React.CSSProperties}>FROM</span></span>{" "}
          <span className={styles.name}><span className="hero-word" style={{ "--i": 2 } as React.CSSProperties}>REIGN</span></span>
        </h1>
      </header>
      <div className={styles.sections}>
        {[
          { id: "education", title: "EDUCATION", entries: education },
          { id: "work", title: "WORK", entries: work },
          { id: "awards", title: "AWARDS", entries: awards },
        ].map(({ id, title, entries }) => (
          <section className={styles.section} id={id} key={id} aria-labelledby={`${id}-heading`}>
            <h2 id={`${id}-heading`} className={anton.className} data-reveal="">{title}</h2>
            <ul className={styles.entries}>{entries.map((entry) => <Entry key={entry.title} entry={entry} />)}</ul>
          </section>
        ))}
        <section className={`${styles.section} ${styles.content}`} id="content" aria-labelledby="content-heading">
          <h2 id="content-heading" className={anton.className} data-reveal="">CONTENT</h2>
          <h3 className={styles.brandTitle} data-reveal="">COLLABORATION BRANDS FOR FASHION CONTENT</h3>
          <ul className={styles.brands}>
            {brands.map(({ name, src, width, height = 320, href }, index) => (
              <li key={name} data-reveal="" style={{ "--i": index % 3 } as React.CSSProperties}>
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
