import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { anton } from "../../_lib/fonts";
import AutoVideo from "../AutoVideo";
import { Row, Whole, type Shot } from "../ProjectMedia";
import styles from "../project.module.css";

export const metadata: Metadata = {
  title: "Glitch Technology Festival | XXREIGN",
  description: "Glitch: visual direction, branding and product design for a three-day festival about how technology changed the way we communicate.",
};

const dir = "/work/glitch";
const img = (file: string, width: number, height: number, alt: string, video = false): Shot => ({ src: `${dir}/${file}`, width, height, alt, video });

const meta: { label: string; value: string; href?: string }[] = [
  { label: "DISCIPLINE", value: "Visual direction, Branding, Product design" },
  { label: "YEAR", value: "2026" },
  { label: "WEBSITE", value: "glitch-lost-in-transmission.vercel.app", href: "https://glitch-lost-in-transmission.vercel.app/" },
];

const schedule = img("p04.png", 2400, 903, "GLITCH logo above the three-day schedule: Day 01 The Glitch, Day 02 The Glitch, Day 03 The Portal");
const cities = img("p05.png", 1718, 1774, "Festival banners in New York, London and Tokyo");
const brand = [
  img("p02-typeface.png", 2400, 1393, "Typefaces: Noka Light and Neue Montreal Bold and Regular, with sample copy"),
  img("p01-palette.png", 2400, 1108, "Colour palette: black and white with signal red, blue and green, plus a glitch pattern"),
];
const logos = [
  img("p06.png", 2400, 1358, "GLITCH logotype in black on white and white on black"),
  img("p07.png", 2400, 2092, "Colour-shifted and broken-signal versions of the GLITCH logotype"),
];
const posters = [
  img("bus-shelter.mp4", 1472, 1492, "Animated GLITCH poster in a bus shelter at night", true),
  img("p08.png", 1896, 936, "A series of three GLITCH posters"),
];
const tickets = [
  [
    img("p09.png", 2400, 1577, "Blue admission ticket in its folded GLITCH sleeve"),
    img("p10.png", 2400, 1577, "Green admission ticket in its folded GLITCH sleeve"),
    img("p11.png", 2400, 1577, "Red admission ticket in its folded GLITCH sleeve"),
  ],
  [
    img("p12.png", 2400, 1577, "Blue glitch-pattern ticket and card"),
    img("p13.png", 2400, 1577, "Green glitch-pattern ticket and card"),
    img("p14.png", 2400, 1577, "Red glitch-pattern ticket and card"),
  ],
  [
    img("p15.png", 1726, 1124, "Printed ticket in its sleeve beside the mobile ticket on a phone"),
    img("in-situ-screen.mp4", 900, 1328, "The ticket holder's name appearing on a screen at the venue", true),
  ],
];
const invitations = [
  img("inv-3.jpg", 2400, 1382, "Digital invitation reading You are invited on a laptop"),
  img("inv-4.jpg", 1408, 976, "Digital invitation on a phone held in a hand"),
  img("inv-5.jpg", 1992, 1494, "Printed die-cut invitation reading You are invited beside its glitch-pattern card"),
];
// Paired so both rows come out a similar height: ring + notebook, cube + tape.
const merch = [
  [
    img("merch-ring.png", 1520, 1140, "Screen ring: a silver ring with a small display showing GLITCH"),
    img("merch-notebook.png", 2400, 570, "Notebooks in blue, green and red glitch covers"),
  ],
  [
    img("merch-cube.png", 2400, 851, "Glitching cube: a black-and-white cube puzzle shown from three angles"),
    img("merch-tape.png", 2400, 744, "Glitch-pattern tape rolls and a sticker"),
  ],
];

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div className={styles.sectionHeader} data-reveal="" suppressHydrationWarning>
      <h2 id={`${id}-heading`} className={anton.className}>{title}</h2>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section} aria-labelledby={`${id}-heading`}>
      <SectionHeader id={id} title={title} />
      <div className={styles.stack}>{children}</div>
    </section>
  );
}

const half = "(max-width: 760px) 88vw, 45vw";
const third = "(max-width: 760px) 88vw, 30vw";

export default function GlitchPage() {
  return (
    <main className={styles.page}>
      {/* The teaser film is the hero; the h1 stays for screen readers and search. */}
      <header className={styles.videoHero}>
        <h1 className={styles.visuallyHidden}>GLITCH TECHNOLOGY FESTIVAL</h1>
        <AutoVideo src={`${dir}/teaser.mp4`} width={1920} height={1080} label="GLITCH Technology Festival teaser film" sound priority />
      </header>

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

        <section className={styles.section} aria-labelledby="about-heading">
          <SectionHeader id="about" title="ABOUT THE PROJECT" />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutLeft}>
              <div className={styles.copy} data-reveal="" suppressHydrationWarning>
                <p className={styles.lead}>A LIVE GLOBAL EXPERIMENT IN COMMUNICATION.</p>
                <p>GLITCH is a three-day interactive festival exploring how technology has changed the way we communicate, from the telegraph to AI.</p>
                <p>Happening across New York, London + Tokyo, the festival explores where communication breaks down, how we fix it + what connection could look like next.</p>
              </div>
              <div data-reveal="" suppressHydrationWarning style={delay(1)}>
                <Whole {...schedule} sizes={half} />
              </div>
            </div>
            <div data-reveal="" suppressHydrationWarning style={delay(1)}>
              <Whole {...cities} sizes={half} />
            </div>
          </div>
          <div className={styles.subBlock}>
            <Row shots={brand} sizes={half} className={styles.stackOnPhone} />
          </div>
        </section>

        <Section id="logo" title="LOGO DESIGN">
          <Row shots={logos} sizes={half} className={styles.stackOnPhone} />
        </Section>

        <Section id="poster" title="POSTER DESIGN">
          <Row shots={posters} sizes={half} className={styles.stackOnPhone} />
        </Section>

        <Section id="ticket" title="TICKET DESIGN">
          <Row shots={tickets[0]} sizes={third} className={styles.stackOnPhone} />
          <Row shots={tickets[1]} sizes={third} className={styles.stackOnPhone} />
          <Row shots={tickets[2]} sizes={half} className={styles.stackOnPhone} />
        </Section>

        <Section id="invitation" title="INVITATION DESIGN">
          <Row shots={invitations} sizes={third} className={styles.stackOnPhone} />
        </Section>

        <Section id="merch" title="MERCH DESIGN">
          <Row shots={merch[0]} sizes={half} className={styles.stackOnPhone} />
          <Row shots={merch[1]} sizes={half} className={styles.stackOnPhone} />
        </Section>

        <nav className={styles.pager} aria-label="Project navigation">
          <Link href="/work">← WORK</Link>
          <Link href="/work/produce-r">NEXT PROJECT →</Link>
        </nav>
      </div>

      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
