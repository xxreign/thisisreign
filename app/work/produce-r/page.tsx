import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { anton } from "../../_lib/fonts";
import AutoVideo from "../AutoVideo";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "PRODUCE.R | XXREIGN",
  description: "PRODUCE.R: creative direction, branding, campaign and product design for a label where music meets fashion.",
};

const dir = "/work/produce-r";
const img = (file: string, width: number, height: number, alt: string, video = false): Shot => ({ src: `${dir}/${file}`, width, height, alt, video });

const meta = [
  { label: "DISCIPLINE", value: "Creative direction, Branding, Campaign, Product design" },
  { label: "YEAR", value: "2024–Now" },
];

const studio = [
  img("studio-1.jpg", 1290, 2293, "The PRODUCE.R studio: a mixing desk on a steel table"),
  img("studio-2.jpg", 1290, 2293, "A white door under an ON AIR sign"),
];
// One row at equal height. logo-prod is tiny (154 x 111); at this row height it is shown at about 1.7x.
const logos = [
  img("logo-prod.png", 154, 111, "Prod. logo with a music-note d"),
  img("logo-wordmark.png", 1460, 618, "PRODUCE.R wordmark"),
  img("logo-p.png", 926, 1012, "P monogram with produce. set along its curve"),
  img("logo-animated.mp4", 1920, 1080, "Animated PRODUCE.R logo", true),
];
const proDuCeR = img("pro-du-ce-r.png", 1712, 614, "PRO Jewelry, DU Daily Utility, CE Clothing Essentials, .R Limited/Collab");
const products = [
  [img("product-06.jpg", 2000, 921, "Note acrylic keychain"), img("product-07.jpg", 2000, 921, "Logo R black nylon baseball cap")],
  [img("product-08.jpg", 2000, 921, "Logo Prod. black nylon baseball cap"), img("product-09.jpg", 2000, 921, "Logo R mono scarf")],
  [img("product-10.jpg", 2000, 921, "ON AIR earring"), img("product-11.jpg", 2000, 921, "ON AIR ring")],
  [img("product-12.jpg", 2000, 921, "Prod. necklace"), img("product-13.jpg", 2000, 921, "Earphone volume necklace")],
];
const invitations = [
  img("invite-1.png", 570, 507, "PRODUCE.R CD label artwork"),
  img("invite-2.jpg", 566, 498, "The invitation as a CD in a clear jewel case"),
  img("invite-3.png", 431, 375, "Embossed PRODUCE.R disc"),
];

const half = "(max-width: 760px) 88vw, 45vw";

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

export default function ProduceRPage() {
  return (
    <main className={styles.page}>
      {/* The opening film is the hero; the h1 stays for screen readers and search. */}
      <header className={styles.videoHero}>
        <h1 className={styles.visuallyHidden}>PRODUCE.R</h1>
        <AutoVideo src={`${dir}/opening.mp4`} width={1920} height={1080} label="PRODUCE.R opening film" sound priority />
      </header>

      <div id="overview" className={styles.content}>
        {/* The two tall studio photos, capped so the row stays within the screen height. */}
        <div className={styles.studioRow} style={{ "--row-ratio": (1290 / 2293) * 2 } as CSSProperties}>
          <Row shots={studio} sizes={half} />
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
          <div className={styles.copy} data-reveal="" suppressHydrationWarning>
            <p>PRODUCE.R is where music meets fashion, empowering everyone to direct their unique lifestyle. We invite you to step into the spotlight, blending the rhythm of life with designs that amplify your individuality.</p>
            <p>Each piece is crafted to be more than just clothing; it’s a sound, a moment that lets you become the producer of your own life. Whether you’re making beats or curating looks, Produce.R is here to inspire you to turn up the volume on self-expression.</p>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="logo-heading">
          <SectionHeader id="logo" title="LOGO DESIGN" />
          <div className={styles.stack}>
            <Row shots={logos} sizes="(max-width: 760px) 88vw, 30vw" className={`${styles.stackOnPhone} ${styles.logoRow}`} />
            <div data-reveal="" suppressHydrationWarning>
              <Whole {...proDuCeR} sizes="(max-width: 760px) 88vw, 90vw" />
            </div>
          </div>
        </section>

        {/* Product pages: no heading, pairs at equal height. */}
        <section className={styles.section} aria-label="Products">
          <div className={styles.stack}>
            {products.map((pair) => (
              <Row key={pair[0].src} shots={pair} sizes={half} className={styles.stackOnPhone} />
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="invitation-heading">
          <SectionHeader id="invitation" title="INVITATION DESIGN" />
          <Row shots={invitations} sizes="(max-width: 760px) 88vw, 30vw" className={styles.stackOnPhone} />
        </section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/partial-wholes">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
