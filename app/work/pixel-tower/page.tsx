import type { Metadata } from "next";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Pixel Tower | XXREIGN",
  description: "Pixel Tower: a three-phase housing project with flexible pixels at 401 Van Brunt St, Red Hook, Brooklyn.",
};

const dir = "/work/pixel-tower";
const img = (file: string, width: number, height: number, alt: string, caption?: string): Shot => ({ src: `${dir}/${file}`, width, height, alt, caption });

const meta = [
  { label: "DISCIPLINE", value: "Architecture Design" },
  { label: "YEAR", value: "2024" },
];

const section = img("section.jpg", 3000, 1801, "Building section through the tower and courtyard", "Section");
const overview = [
  img("chunk.jpg", 2165, 1765, "Chunk model of the project in phase 3", "Chunk — Phase 3"),
  img("view-render.jpg", 2000, 2500, "Render of the timber courtyard with residents and balconies", "Courtyard View"),
];
const phases = [
  img("final-1.jpg", 2400, 1350, "The project in phase 1", "Phase 1"),
  img("final-2.jpg", 2400, 1350, "The project in phase 2", "Phase 2"),
  img("final-3.jpg", 2400, 1350, "The project in phase 3", "Phase 3"),
];
const program = [1, 2, 3].map((n) => img(`program-${n}.jpg`, 2810, 1766, `Program diagram, phase ${n}`, `Program — Phase ${n}`));
const material = [1, 2, 3].map((n) => img(`material-${n}.jpg`, 2095, 1383, `Material diagram, phase ${n}`, `Material — Phase ${n}`));
const plans = [1, 2, 3].map((n) => img(`plan-${n}.png`, 3000, 2024, `Floor plan, phase ${n}`, `Phase ${n} Floor Plan`));
const plans3 = [
  img("plan-3-residential.png", 3000, 2024, "Phase 3 residential floor plan", "Phase 3 Floor Plan — Residential"),
  img("plan-3-5-adaptability.png", 3000, 2024, "Phase 3.5 floor plan showing adaptable pixels", "Phase 3.5 Floor Plan — Adaptability"),
];
const pixels = [
  img("pixel-types.png", 2672, 1678, "Diagram of the pixel types", "Pixel Types"),
  img("annotated-pixels.jpg", 2970, 1688, "Annotated render of the pixels in a unit", "Annotated Pixels"),
];
const unitTypes = img("unit-types.png", 2511, 1942, "Diagram of the housing unit types", "Unit Type Diagram");

const Q = 90;
const half = "(max-width: 760px) 100vw, 60vw";
const third = "(max-width: 760px) 100vw, 34vw";

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

function Subhead({ children }: { children: string }) {
  return <h3 className={styles.subhead} data-reveal="" suppressHydrationWarning>{children}</h3>;
}

// A single image shown whole, with its caption.
function Single({ shot, sizes = "100vw" }: { shot: Shot; sizes?: string }) {
  return (
    <figure className={styles.rowItem} data-reveal="" suppressHydrationWarning>
      <Whole src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} quality={Q} />
      {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
    </figure>
  );
}

export default function PixelTowerPage() {
  return (
    <main className={styles.page}>
      {/* The section drawing comes first, at content width under the nav. The h1 stays for screen readers and search. */}
      <header className={`${styles.videoHero} ${styles.content}`}>
        <h1 className={styles.visuallyHidden}>Pixel Tower</h1>
        <Single shot={section} />
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
          <div className={`${styles.copy} ${styles.copySmall}`} data-reveal="" suppressHydrationWarning>
            <p>The project is located at 401 Van Brunt St in Red Hook, Brooklyn. Its housing unit types and secondary program develop across three phases. Its key feature is the flexible pixels within each unit, which can be changed freely in phase 3, while half of the housing units are for sale.</p>
            <p>As the Red Hook waterfront develops, the area’s population increases significantly. A proposed subway line runs through Red Hook, and a subway station is built on the site in phase 3. The secondary program changes in each phase: retail in phase 1, a job training center in phase 2, and automated robot services in phase 3.</p>
            <p>The chunk shows the project in phase 3, with housing units concentrated on the right, automated services at the front and amenities in between as a connection. The subway station entrance sits at the center of the courtyard.</p>
          </div>
          <div className={styles.subBlock}>
            <Row shots={overview} sizes={half} quality={Q} className={styles.stackOnPhone} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="phases-heading">
          <SectionHeader id="phases" title="THREE PHASES" />
          <div className={styles.stack}>
            <Row shots={phases} sizes={third} quality={Q} className={styles.stackOnPhone} />
            <Subhead>Program</Subhead>
            <Row shots={program} sizes={third} quality={Q} className={styles.stackOnPhone} />
            <Subhead>Material</Subhead>
            <Row shots={material} sizes={third} quality={Q} className={styles.stackOnPhone} />
            <Subhead>Floor Plans</Subhead>
            <Row shots={plans} sizes={third} quality={Q} className={styles.stackOnPhone} />
            <Row shots={plans3} sizes={half} quality={Q} className={styles.stackOnPhone} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="pixels-heading">
          <SectionHeader id="pixels" title="PIXELS" />
          <div className={styles.stack}>
            <Row shots={pixels} sizes={half} quality={Q} className={styles.stackOnPhone} />
            {/* Capped so the diagram isn't oversized. */}
            <div className={styles.narrow}>
              <Single shot={unitTypes} sizes="(max-width: 760px) 100vw, 80vw" />
            </div>
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
