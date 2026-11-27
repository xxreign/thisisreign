import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Alphabet Collection | XXREIGN",
  description: "Alphabet Collection: a typographic collection built from found letterforms photographed in vinyl record stores.",
};

const dir = "/work/alphabet-collection";

const meta = [
  { label: "DISCIPLINE", value: "Graphic Design, Experimental" },
  { label: "YEAR", value: "2026" },
];

export default function AlphabetCollectionPage() {
  return (
    <main className={styles.page}>
      {/* The zine is the whole page: shown whole at content width under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>Alphabet Collection</h1>
        <Image
          src={`${dir}/zine.jpg`}
          width={3600}
          height={1801}
          alt="Alphabet Collection zine: the letters A to Z, each photographed from an album cover in a vinyl record store, with a short text on typography in music and a classification of seven type styles"
          sizes="100vw"
          quality={90}
          priority
          className={styles.whole}
        />
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
