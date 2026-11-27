import type { Metadata } from "next";
import Link from "next/link";
import styles from "../project.module.css";
import FilmPlayer from "../FilmPlayer";

export const metadata: Metadata = {
  title: "See U in Paris | XXREIGN",
  description: "See U in Paris: a short film shot and edited in Paris, set to SEE U IN PARIS by TRADE L.",
};

const dir = "/work/see-u-in-paris";

const meta = [
  { label: "DISCIPLINE", value: "Film, Editing" },
  { label: "YEAR", value: "2025" },
];

export default function SeeUInParisPage() {
  return (
    <main className={styles.page}>
      {/* The film is the whole page: a content-width player under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>SEE U IN PARIS</h1>
        <FilmPlayer src={`${dir}/film.mp4`} poster={`${dir}/preview.jpg`} label="See U in Paris, a short film" caption={["Location: Paris, France", "Music: SEE U IN PARIS by TRADE L"]} />
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
          <Link href="/work/dusk-til-dawn">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
