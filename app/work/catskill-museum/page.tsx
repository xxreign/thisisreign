import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Catskill Museum | XXREIGN",
  description: "Catskill Museum: a two-storey exhibition building with a café, lobby and viewing steps at 218 Spring Street, Catskill, NY.",
};

const dir = "/work/catskill-museum";
const img = (file: string, width: number, height: number, alt: string, caption?: string): Shot => ({ src: `${dir}/${file}`, width, height, alt, caption });

const meta = [
  { label: "DISCIPLINE", value: "Architecture Design" },
  { label: "YEAR", value: "2022" },
];

const interior2 = img("interior-2.jpg", 1920, 1243, "Interior of the museum with its viewing steps");
const exterior = img("exterior-1.jpg", 1920, 1243, "Exterior of the museum among the existing buildings");
const structure = img("structure-program.png", 2951, 2305, "Exploded diagram of the structure and program", "Structure and Program");
const plans = [
  img("first-floor-plan.png", 3000, 2400, "First floor plan with the exhibition hall, café and lobby", "First Floor Plan"),
  img("second-floor-plan.png", 3000, 2400, "Second floor plan with the museum and viewing steps", "Second Floor Plan"),
];
const construction = img("construction-system.png", 3000, 1985, "Diagram of the construction system", "Construction System");

const Q = 90;
const half = "(max-width: 760px) 100vw, 50vw";

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

// A single image shown whole, with its caption if it has one.
function Single({ shot, sizes = "100vw" }: { shot: Shot; sizes?: string }) {
  return (
    <figure className={styles.rowItem} data-reveal="" suppressHydrationWarning>
      <Whole src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} quality={Q} />
      {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
    </figure>
  );
}

export default function CatskillMuseumPage() {
  return (
    <main className={styles.page}>
      {/* Hero: the main interior render, full width under the nav. The h1 stays for screen readers and search. */}
      <header className={styles.videoHero}>
        <h1 className={styles.visuallyHidden}>Catskill Museum</h1>
        <Image src={`${dir}/interior-1.jpg`} width={1920} height={1243} alt="Interior render of the Catskill Museum" sizes="100vw" quality={Q} priority className={styles.whole} />
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
            <p>The project is located at 218 Spring Street in Catskill, NY. It is a two-story building with an exhibition hall, a café, a lobby and a museum with viewing steps, set near one of the site’s entrances. The circulation forms a loop that lets visitors pass through every existing building.</p>
          </div>
        </section>

        <section className={styles.section} aria-label="Renders and drawings">
          <div className={styles.stack}>
            <Single shot={interior2} />
            <Single shot={exterior} />
            {/* Capped so the diagram isn't oversized. */}
            <div className={`${styles.narrow} ${styles.narrowWide}`}>
              <Single shot={structure} sizes="(max-width: 760px) 100vw, 85vw" />
            </div>
            <Row shots={plans} sizes={half} quality={Q} className={styles.stackOnPhone} />
            <Single shot={construction} />
          </div>
        </section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/psa-suicide-prevention">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
