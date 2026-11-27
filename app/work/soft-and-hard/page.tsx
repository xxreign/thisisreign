import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import interior from "../../interior.module.css";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Soft and Hard | XXREIGN",
  description: "Soft and Hard: two typefaces designed from a pair of opposite words.",
};

const dir = "/work/soft-and-hard";

const meta = [
  { label: "DISCIPLINE", value: "Typeface design" },
  { label: "YEAR", value: "2026" },
];

// Each section shows one image whole, at full content width, on the black page.
// A set with no title (the posters) has no heading or hairline.
const sets = [
  { id: "soft", title: "SOFT", file: "soft-set.png", width: 1624, height: 747, alt: "The SOFT typeface: rounded, flowing letters from A to Z" },
  { id: "hard", title: "HARD", file: "hard-set.png", width: 1793, height: 797, alt: "The HARD typeface: sharp, spiked blackletter-like letters from A to Z" },
  { id: "final", title: "", file: "posters.jpg", width: 2400, height: 1353, alt: "Two posters: I FEEL SOFT BUT BLUE set over water in the soft typeface, and WATCH OUT THIS IS HARD in the hard typeface" },
];

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

export default function SoftAndHardPage() {
  return (
    <main className={styles.page}>
      {/* Reign's own lettering in place of the text headline, in the same spot and with the same
          entrance as the other pages' headlines; the h1 stays for screen readers and search. */}
      <header className={styles.hero}>
        <h1 className={styles.visuallyHidden}>SOFT AND HARD</h1>
        <div className={`${interior.heading} ${styles.lettering}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-word" src={`${dir}/hero-lettering.png`} alt="SOFT AND HARD" width={3542} height={324} fetchPriority="high" />
        </div>
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
          <SectionHeader id="about" title="ABOUT THE PROJECT" />
          <div className={styles.copy} data-reveal="" suppressHydrationWarning>
            <p>Designing two sets of typefaces based on two selected words that are opposites. The chosen words are SOFT and HARD.</p>
          </div>
        </section>

        {sets.map((set) => (
          <section key={set.id} className={styles.section} aria-labelledby={set.title ? `${set.id}-heading` : undefined} aria-label={set.title ? undefined : "Final posters"}>
            {set.title && <SectionHeader id={set.id} title={set.title} />}
            <div data-reveal="" suppressHydrationWarning>
              <Image src={`${dir}/${set.file}`} width={set.width} height={set.height} alt={set.alt} sizes="(max-width: 760px) 88vw, 90vw" className={styles.whole} />
            </div>
          </section>
        ))}

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/glitch-technology-festival">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
