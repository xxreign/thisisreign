import type { Metadata } from "next";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import FilmPlayer from "../FilmPlayer";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "PSA Suicide Prevention | XXREIGN",
  description: "PSA Suicide Prevention: a motion design public service announcement on suicide prevention and mental health awareness.",
};

const dir = "/work/psa-suicide-prevention";

const meta = [
  { label: "DISCIPLINE", value: "Motion Design" },
  { label: "YEAR", value: "2025" },
];

export default function PsaSuicidePreventionPage() {
  return (
    <main className={styles.page}>
      {/* The film is the first thing on the page: a content-width player under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>PSA SUICIDE PREVENTION</h1>
        <FilmPlayer src={`${dir}/film.mp4`} poster={`${dir}/cover.jpg`} label="PSA Suicide Prevention, a motion design public service announcement" />
      </header>

      <div id="overview" className={styles.content}>
        <dl className={styles.meta} data-reveal="" suppressHydrationWarning>
          {meta.map(({ label, value }) => (
            <div key={label}>
              <dt className={styles.label}>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <section className={styles.section} aria-labelledby="about-heading">
          <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
            <h2 id="about-heading" className={anton.className}>ABOUT THE PROJECT</h2>
          </div>
          <div className={`${styles.copy} ${styles.copySmall}`} data-reveal="" suppressHydrationWarning>
            <p>A public service announcement (PSA) exploring suicide prevention and mental health awareness through minimalist motion graphics, visual metaphors, and typography.</p>
            <p>Using a predominantly monochromatic visual language, the film translates complex emotional experiences and statistical information into an accessible visual narrative. Time, human silhouettes, unanswered messages, and heartbeat imagery are used to communicate the often invisible struggles behind suicide.</p>
          </div>
        </section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/dusk-til-dawn">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
