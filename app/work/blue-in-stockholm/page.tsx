import type { Metadata } from "next";
import Link from "next/link";
import styles from "../project.module.css";
import FilmPlayer from "../FilmPlayer";

export const metadata: Metadata = {
  title: "Blue in Stockholm | XXREIGN",
  description: "Blue in Stockholm: a short film shot and edited in Stockholm, set to BLUE by raph.",
};

const dir = "/work/blue-in-stockholm";

const meta = [
  { label: "DISCIPLINE", value: "Film, Editing" },
  { label: "YEAR", value: "2026" },
];

export default function BlueInStockholmPage() {
  return (
    <main className={styles.page}>
      {/* The film is the whole page: a content-width player under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>BLUE IN STOCKHOLM</h1>
        <FilmPlayer src={`${dir}/film.mp4`} poster={`${dir}/preview.jpg`} label="Blue in Stockholm, a short film" caption={["Location: Stockholm, Sweden", "Music: BLUE by raph"]} />
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
          <Link href="/work/see-u-in-paris">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
