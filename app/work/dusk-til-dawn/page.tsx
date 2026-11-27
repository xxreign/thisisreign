import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { anton } from "../../_lib/fonts";
import LightingHero from "./LightingHero";
import PhotoGallery from "./PhotoGallery";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Dusk ‘til Dawn | XXREIGN",
  description: "Dusk ‘til Dawn: brand identity, product and packaging for a late-night emergency skincare and wellness brand.",
};

const dir = "/work/dusk-til-dawn";

const meta: { label: string; value: string; href?: string }[] = [
  { label: "DISCIPLINE", value: "Visual direction, Branding, Packaging" },
  { label: "YEAR", value: "Fall 2026" },
  { label: "WEBSITE", value: "dusk-til-dawn.vercel.app", href: "https://dusk-til-dawn.vercel.app/" },
];

const rev = `${dir}/rev2`;

// Images shown whole in rows of equal height: each one's flex-grow is its width/height ratio,
// so every image in a row comes out exactly the same height, gaps included.
type LocalShot = { file: string; width: number; height: number; alt: string };

const typography: LocalShot[] = [
  { file: "type-hierarchy.png", width: 2400, height: 1031, alt: "Type hierarchy: title and subheading in Editorial New, body and caption in Neue Montreal, with examples" },
  { file: "typefaces.png", width: 2400, height: 1191, alt: "Typefaces: Editorial New and Neue Montreal, with their weights and character sets" },
];
const palette = { file: "palette.png", width: 1534, height: 746, alt: "Colour palette: Night #040404, Dusk #302E2F, Dawn #D1D3D4 and brushed Silver" };

// Row 1 is composed on the same canvas and layout as row 2 (pack-all-nighter): the four-view
// box model where the lighter sits, the two cards stacked in the same card column.
const packagingRow1: LocalShot = { file: "packaging-row1.png", width: 2400, height: 1107, alt: "Pre-Game case views (front, right, back, left) beside its How to use and Flavor guide cards" };
const packagingFull: LocalShot[] = [
  { file: "pack-all-nighter.png", width: 2400, height: 1107, alt: "All-Nighter lighter-style case beside its accessory card" },
  { file: "pack-sos.png", width: 2400, height: 1134, alt: "SOS emergency facial cream tubes beside their accessory card" },
  { file: "pack-gift-set.png", width: 2400, height: 1521, alt: "Gift set tin beside its accessory card" },
];

const invitations: LocalShot[] = [
  { file: "invitation-card.jpg", width: 2400, height: 1598, alt: "Embossed silver invitation cards reading You’re invited" },
  { file: "invitation-mirror.jpg", width: 2400, height: 1800, alt: "Compact mirror engraved with You’re invited" },
  { file: "invitation-phone-case.jpg", width: 2400, height: 2199, alt: "Silver phone case engraved with You’re invited" },
  { file: "invitation-phone-cases.jpg", width: 2400, height: 1598, alt: "Three engraved silver phone cases carrying the Dusk ‘til Dawn mark" },
];

const products = [
  {
    name: "PRE-GAME",
    type: "Wellness shots",
    image: "product-pregame.jpg",
    text: "A concentrated wellness shot formulated for the transition from day to night. Packed with functional ingredients and antioxidants to support hydration, energy, and your daily wellness routine, whether you’re leaving the office, finishing class, or heading straight into the night.",
  },
  {
    name: "ALL-NIGHTER",
    type: "Last-minute supplements",
    image: "product-allnighter.jpg",
    text: "A daily supplement blend designed for people whose schedules don’t end at 5. A combination of vitamins, minerals, and botanical ingredients to complement your everyday wellness routine from dusk to dawn.",
  },
  {
    name: "SOS",
    type: "Emergency facial cream",
    image: "product-sos.jpg",
    text: "A concentrated, pocket-sized rescue cream for sudden dryness, irritation, and blemishes. Formulated with soothing and barrier-supporting ingredients to help calm stressed skin without slowing you down.",
  },
];

const sections = [
  { id: "brand", title: "ABOUT THE BRAND" },
  { id: "product", title: "PRODUCT" },
  { id: "packaging", title: "PACKAGING DESIGN" },
  { id: "invitation", title: "INVITATION DESIGN" },
  { id: "photography", title: "PHOTOGRAPHY" },
] as const;

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHeader({ index }: { index: number }) {
  const { id, title } = sections[index];
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

function Media({ file, alt, sizes, position, ratio, className }: { file: string; alt: string; sizes: string; position?: string; ratio?: string; className?: string }) {
  return (
    <div className={`${styles.media} ${className ?? ""}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image src={`${dir}/${file}`} alt={alt} fill sizes={sizes} className={styles.image} style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}

// Turn a file in rev2/ into a shared Shot.
const at = (shot: LocalShot): Shot => ({ src: `${rev}/${shot.file}`, width: shot.width, height: shot.height, alt: shot.alt });

export default function DuskTilDawnPage() {
  return (
    <main className={styles.page}>
      {/* Hero recreated from the live site, with its cursor-driven lighting (see LightingHero.tsx). */}
      <LightingHero />

      <div id="overview" className={styles.content}>
        <dl className={`${styles.meta} ${styles.metaThree}`} data-reveal="" suppressHydrationWarning>
          {meta.map(({ label, value, href }) => (
            <div key={label}>
              <dt className={styles.label}>{label}</dt>
              <dd>
                {href ? (
                  <a className={styles.metaLink} href={href} target="_blank" rel="noopener noreferrer">{value}<span className={styles.visuallyHidden}> (opens in a new tab)</span></a>
                ) : value}
              </dd>
            </div>
          ))}
        </dl>

        <section className={styles.section} aria-labelledby="brand-heading">
          <SectionHeader index={0} />
          <div className={styles.brand}>
            <div className={styles.copy} data-reveal="" suppressHydrationWarning>
              <p>DUSK ‘TIL DAWN is a last-minute emergency repair healthcare/skincare brand, specifically designed to be used from late night through to the following morning.</p>
              <p>Whether you’re heading straight from work to dinner, rushing to meet friends, or getting ready for a night out with no time to spare, we make it easier to feel refreshed, confident, and ready to go.</p>
            </div>
            <dl className={styles.details} data-reveal="" suppressHydrationWarning style={delay(1)}>
              <div>
                <dt className={styles.label}>AUDIENCE</dt>
                <dd>Clubs, Bars, Late-nights, Fashion, Accessories, Personal care</dd>
              </div>
            </dl>
          </div>
          <div className={styles.subBlock}>
            <p className={styles.label} data-reveal="" suppressHydrationWarning>TYPOGRAPHY</p>
            <Row shots={typography.map(at)} sizes="(max-width: 760px) 88vw, 48vw" className={styles.stackOnPhone} />
          </div>
          <div className={styles.subBlock}>
            <p className={styles.label} data-reveal="" suppressHydrationWarning>COLOUR PALETTE</p>
            <div data-reveal="" suppressHydrationWarning>
              <Whole src={`${dir}/${palette.file}`} width={palette.width} height={palette.height} alt={palette.alt} sizes="(max-width: 760px) 88vw, 90vw" />
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="product-heading">
          <SectionHeader index={1} />
          <ol className={styles.products}>
            {products.map((product) => (
              <li key={product.name} className={styles.product} data-reveal="" suppressHydrationWarning>
                <Media file={product.image} alt={`${product.name} ${product.type.toLowerCase()} by Dusk ‘til Dawn`} sizes="(max-width: 760px) 88vw, 50vw" />
                <div className={styles.productText}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.label}>{product.type}</p>
                  <p className={styles.productBody}>{product.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="packaging-heading">
          <SectionHeader index={2} />
          <div className={styles.stack}>
            {[packagingRow1, ...packagingFull].map((shot) => (
              <div key={shot.file} data-reveal="" suppressHydrationWarning>
                <Whole src={`${rev}/${shot.file}`} width={shot.width} height={shot.height} alt={shot.alt} sizes="(max-width: 760px) 88vw, 90vw" />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="invitation-heading">
          <SectionHeader index={3} />
          <Row shots={invitations.map(at)} sizes="(max-width: 760px) 44vw, 24vw" className={styles.gridOnPhone} />
        </section>

        <section className={styles.section} aria-labelledby="photography-heading">
          <SectionHeader index={4} />
          <div data-reveal="" suppressHydrationWarning>
            <Whole src={`${rev}/gift-tin.jpg`} width={2400} height={1147} alt="The engraved silver Dusk ‘til Dawn gift tin with its cases, reflected on black" sizes="(max-width: 760px) 88vw, 90vw" />
          </div>
        </section>
      </div>

      {/* Full-bleed like the original, so it sits outside the content margins. */}
      <PhotoGallery />

      <div className={styles.content}>
        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/soft-and-hard">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
