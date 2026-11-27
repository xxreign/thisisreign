import { anton } from "../_lib/fonts";
import styles from "../interior.module.css";
import about from "./about.module.css";

// Temporary placeholder so the homepage navigation works.
// Replace this with your full ABOUT page when ready.
export default function ABOUTPage() {
  return (
    <main className={styles.page}>
      {/* Full-screen hero box so the headline keeps its position now that content follows it. */}
      <div className={about.hero}>
        <h1 className={`${styles.heading} ${anton.className}`}><span className="hero-word">ABOUT</span></h1>
      </div>

      {/* Bio section. */}
      <section className={about.bio} aria-label="Biography">
        {/* Headline across the full width, then details (narrow, left) and bio (wide, right) under a hairline. */}
        <h2 className={`${about.statement} ${anton.className}`} data-reveal="" suppressHydrationWarning style={{ "--i": 1 } as React.CSSProperties}>
          ABOUT THE ARTIST
        </h2>
        <div className={about.row}>
          <div className={about.body} data-reveal="" suppressHydrationWarning style={{ "--i": 2 } as React.CSSProperties}>
            <p>A cool kid who also happens to be a multidisciplinary designer and creative based in New York City, working across creative direction, branding, fashion, architecture, filmmaking, and interactive experiences. Currently pursuing a Master of Fine Arts in Design at the School of Visual Arts.</p>
            <p>Drawing inspiration from fashion, music, contemporary culture, and everyday observations, my creative practice explores the intersection of identity, emotion, and experience, translating ideas into distinct visual languages across physical and digital mediums.</p>
            <p>My favorite ice cream flavor is strawberry.</p>
          </div>
          <dl className={about.facts} data-reveal="" suppressHydrationWarning style={{ "--i": 3 } as React.CSSProperties}>
            <div>
              <dt className={about.label}>BASED</dt>
              <dd>NEW YORK CITY</dd>
            </div>
            <div>
              <dt className={about.label}>AVAILABLE FOR</dt>
              <dd>CREATIVE DIRECTION / DESIGN / 3D / FASHION</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
