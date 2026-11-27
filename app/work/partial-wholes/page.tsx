import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { anton } from "../../_lib/fonts";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Partial Wholes | XXREIGN",
  description: "Partial Wholes: The Architecture of Ambiguity. An architecture design project.",
};

const dir = "/work/partial-wholes";
const img = (file: string, width: number, height: number, alt: string, caption?: string): Shot => ({ src: `${dir}/${file}`, width, height, alt, caption });

const meta = [
  { label: "DISCIPLINE", value: "Architecture Design" },
  { label: "YEAR", value: "2026" },
];

const artPrecedent = [
  img("p02.jpg", 1428, 1104, "Tara Donovan's cloud-like installation of styrofoam cups hanging from a gallery ceiling", "Tara Donovan, Untitled (Styrofoam Cups)"),
  img("p03.jpg", 1664, 1108, "Tara Donovan's undulating field of plastic cups on a gallery floor", "Tara Donovan, Untitled (Plastic Cups), 2006, plastic cups"),
];
const literalContinuity = [
  img("p04.jpg", 1540, 1192, "Close-up of the styrofoam cups packed into a continuous surface", "Tara Donovan, Untitled (Styrofoam Cups)"),
  img("p05.png", 945, 1066, "Line tracing of the cup rims as a 2D pattern", "2D Tracing"),
];
const visualContinuity = [
  img("p06.jpg", 1440, 1124, "Curved glass walls inside the Glass Pavilion at the Toledo Museum of Art"),
  img("p07.png", 1802, 1662, "Plan of the Glass Pavilion with its rounded rooms"),
];
const study1 = [
  img("p08.png", 1515, 865, "Part-to-part relation diagram, set 1"),
  img("p09.png", 1483, 858, "Part-to-part relation diagram, set 2"),
  img("p10.png", 1463, 762, "Part-to-part relation diagram, set 3"),
  img("p11.png", 1507, 863, "Part-to-part relation diagram, set 4"),
];
const study2 = img("p12.png", 1692, 570, "Massing diagrams");
const study3 = [
  img("p14.png", 1718, 1479, "Envelope transparency render of the pavilion"),
  img("p15.png", 1752, 664, "Envelope development studies"),
];
const sites = [
  img("p16.jpg", 1920, 1274, "The pavilion lit up at night among New York City towers", "New York City, NY"),
  img("tokyo.jpg", 1920, 1302, "The pavilion lit up at night in Tokyo with Tokyo Tower behind", "Tokyo, Japan"),
];
const model = img("model.jpg", 1926, 1444, "3D printed physical model of the pavilion, lit from within", "3D Printed, with Lighting");

// Sharper source images: quality 90, and full-width images request at least the 1920 px file.
const Q = 90;
// Items in a pair can take up to ~70% of the row, so ask for that much.
const half = "(max-width: 760px) 100vw, 70vw";
const full = "100vw";

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <SectionHeader id={id} title={title} />
      {subtitle && <p className={styles.subtitle} data-reveal="" suppressHydrationWarning>{subtitle}</p>}
      <div className={styles.stack}>{children}</div>
    </section>
  );
}

// A single full-width image with its caption.
function Single({ shot }: { shot: Shot }) {
  return (
    <figure className={styles.rowItem} data-reveal="" suppressHydrationWarning>
      <Whole src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={full} quality={Q} />
      {shot.caption && <figcaption className={styles.caption}>{shot.caption}</figcaption>}
    </figure>
  );
}

export default function PartialWholesPage() {
  return (
    <main className={styles.page}>
      {/* Hero: the pavilion render, full width under the nav. The h1 stays for screen readers and search. */}
      <header className={styles.videoHero}>
        <h1 className={styles.visuallyHidden}>Partial Wholes</h1>
        <Image src={`${dir}/p01.jpg`} width={1920} height={1274} alt="The Partial Wholes pavilion glowing at night between city towers" sizes="100vw" quality={Q} priority className={styles.whole} />
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
            <p className={styles.lead}>Partial Wholes: The Architecture of Ambiguity</p>
          </div>
        </section>

        <Section id="precedent" title="ART PRECEDENT">
          <Row shots={artPrecedent} sizes={half} quality={Q} className={styles.stackOnPhone} />
        </Section>

        <Section id="literal" title="LITERAL CONTINUITY">
          <Row shots={literalContinuity} sizes={half} quality={Q} className={styles.stackOnPhone} />
        </Section>

        <Section id="visual" title="VISUAL CONTINUITY">
          <div className={styles.split}>
            <div className={styles.credits} data-reveal="" suppressHydrationWarning>
              <p>Glass Pavilion, Toledo Museum of Art, 2006</p>
              <p>Architect: SANAA (Kazuyo Sejima &amp; Ryue Nishizawa)</p>
              <p>Location: Toledo (Ohio), US</p>
            </div>
            <Row shots={visualContinuity} sizes={half} quality={Q} className={styles.stackOnPhone} />
          </div>
        </Section>

        <Section id="study-1" title="TRANSLATION STUDY 1" subtitle="Part-to-Part Relation Diagrams">
          <Row shots={study1} sizes="(max-width: 1100px) 50vw, 25vw" quality={Q} className={styles.wrapTwo} />
        </Section>

        <Section id="study-2" title="TRANSLATION STUDY 2" subtitle="Massing Models">
          <Single shot={study2} />
        </Section>

        <Section id="study-3" title="TRANSLATION STUDY 3" subtitle="Envelope Transparency Development">
          <Row shots={study3} sizes={half} quality={Q} className={styles.stackOnPhone} />
        </Section>

        <Section id="site" title="SITE TESTING">
          {sites.map((shot) => <Single key={shot.src} shot={shot} />)}
        </Section>

        <Section id="model" title="PHYSICAL MODEL">
          <Single shot={model} />
        </Section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/blue-in-stockholm">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
