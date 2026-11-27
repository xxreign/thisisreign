import type { Metadata } from "next";
import Link from "next/link";
import FilmPlayer from "../FilmPlayer";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "But I Am So Blue | XXREIGN",
  description: "But I Am So Blue: a short motion design piece.",
};

const dir = "/work/but-i-am-so-blue";

const meta = [
  { label: "DISCIPLINE", value: "Motion Design" },
  { label: "YEAR", value: "2025" },
];

export default function ButIAmSoBluePage() {
  return (
    <main className={styles.page}>
      {/* The film is the first thing on the page: a content-width player under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>BUT I AM SO BLUE</h1>
        <FilmPlayer src={`${dir}/film.mp4`} poster={`${dir}/cover.jpg`} label="But I Am So Blue, a motion design piece" />
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

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/pixel-tower">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
