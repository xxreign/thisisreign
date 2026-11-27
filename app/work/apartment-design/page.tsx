import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Apartment Design | XXREIGN",
  description: "Apartment Design: a four-storey residential building with street-level retail in Downtown Troy, NY.",
};

const dir = "/work/apartment-design";
const img = (file: string, width: number, height: number, alt: string, caption?: string): Shot => ({ src: `${dir}/${file}`, width, height, alt, caption });

const meta = [
  { label: "DISCIPLINE", value: "Architecture Design" },
  { label: "YEAR", value: "2023" },
];

const interior = img("interior.jpg", 2800, 1867, "Interior of an apartment with large windows and a dining table");
const sitePlan = img("site-plan.png", 3000, 1543, "Site plan of the building at the corner of two streets in Downtown Troy", "Site Plan");
const lowerPlans = [
  img("parking-floor-plan.png", 1968, 1825, "Underground parking floor plan", "Parking Floor Plan"),
  img("ground-floor-plan.png", 1968, 1825, "Ground floor plan with retail, café, lobby and entrances", "Ground Floor Plan"),
];
const upperPlans = [
  img("housing-floor-plan.png", 1968, 1825, "Typical residential floor plan", "Typical Housing Floor Plan"),
  img("top-floor-plan.png", 1968, 1825, "Top floor plan with units and the open rooftop", "Top Floor Plan"),
];
const units = [
  img("studio-unit.jpg", 1800, 1012, "Cutaway render of the studio unit", "Studio Unit"),
  img("one-bed-unit.jpg", 1800, 1012, "Cutaway render of the one-bedroom unit", "1-Bedroom Unit"),
  img("two-bed-unit.jpg", 1800, 1012, "Cutaway render of the two-bedroom unit", "2-Bedroom Unit"),
];
const unitPlans = [
  img("studio-plan.png", 3000, 2143, "Studio unit plan", "Studio Unit Plan"),
  img("one-bed-plan.png", 3000, 2143, "One-bedroom unit plan", "1-Bedroom Unit Plan"),
  img("two-bed-plan.png", 3000, 2143, "Two-bedroom unit plan", "2-Bedroom Unit Plan"),
];
const streetView2 = img("street-view-2.jpg", 2400, 1600, "Street view of the building along a tree-lined street at dusk");
const axons = [
  img("axon-1.jpg", 1600, 1067, "Aerial axonometric view of the building in its neighbourhood, view 1"),
  img("axon-2.jpg", 1600, 1067, "Aerial axonometric view, view 2"),
  img("axon-3.jpg", 1600, 1067, "Aerial axonometric view, view 3"),
  img("axon-4.jpg", 1600, 1067, "Aerial axonometric view, view 4"),
];

const Q = 90;
const full = "100vw";
const half = "(max-width: 760px) 100vw, 50vw";
const third = "(max-width: 760px) 100vw, 34vw";

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

// A single full-width image, with its caption if it has one.
function Single({ shot }: { shot: Shot }) {
  return (
    <figure className={styles.rowItem} data-reveal="" suppressHydrationWarning>
      <Whole src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={full} quality={Q} />
      {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
    </figure>
  );
}

export default function ApartmentDesignPage() {
  return (
    <main className={styles.page}>
      {/* Hero: the street view, full width under the nav. The h1 stays for screen readers and search. */}
      <header className={styles.videoHero}>
        <h1 className={styles.visuallyHidden}>Apartment Design</h1>
        <Image src={`${dir}/street-view-1.jpg`} width={2800} height={1867} alt="The apartment building at a street corner in Downtown Troy at dusk" sizes="100vw" quality={Q} priority className={styles.whole} />
      </header>

      <div id="overview" className={styles.content}>
        <div className={styles.stack}>
          <Single shot={interior} />
        </div>

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
            <p>Located in Downtown Troy, NY, this apartment building has four stories of residential units above a ground floor with entrances, retail, an entrance to the underground parking and a lobby connected to the egress. Facing the intersection of two streets, the ground level is set back 10 feet to draw visitors to the street-level retail and café.</p>
            <p>The façade is made of metal panels that express a push-and-pull concept, with balconies and windows shaped by the same idea. The fourth story is split into two parts: living units and an open public rooftop. The rooftop is a relaxing area set up with furniture, facing north with solar daylighting in mind.</p>
          </div>
        </section>

        <section className={styles.section} aria-label="Drawings and renders">
          <div className={styles.stack}>
            <Single shot={sitePlan} />
            <Row shots={lowerPlans} sizes={half} quality={Q} className={styles.stackOnPhone} />
            <Row shots={upperPlans} sizes={half} quality={Q} className={styles.stackOnPhone} />
            <Row shots={units} sizes={third} quality={Q} className={styles.stackOnPhone} />
            <Row shots={unitPlans} sizes={third} quality={Q} className={styles.stackOnPhone} />

            {/* Street view on the left; a 2x2 grid of axons on the right, sized so both sides are exactly the same height. */}
            <div className={styles.pairGrid} data-reveal="" suppressHydrationWarning>
              <div className={styles.pairGridMain}>
                <Whole src={streetView2.src} width={streetView2.width} height={streetView2.height} alt={streetView2.alt} sizes={half} quality={Q} />
              </div>
              <div className={styles.pairGridSide}>
                {axons.map((a) => (
                  <Whole key={a.src} src={a.src} width={a.width} height={a.height} alt={a.alt} sizes="(max-width: 760px) 50vw, 25vw" quality={Q} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/alphabet-collection">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
