import type { Metadata } from "next";
import { anton } from "../_lib/fonts";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";
import interior from "../interior.module.css";

export const metadata: Metadata = {
  title: "Contact | XXREIGN",
  description: "Connect with Reign on Instagram, LinkedIn, or by email.",
};

const email = "xxreign314@gmail.com";

const elsewhere = [
  { label: "INSTAGRAM", account: "@xxreign_", href: "https://www.instagram.com/xxreign_/" },
  { label: "INSTAGRAM - ART ACCOUNT", account: "@reign_rkive", href: "https://www.instagram.com/reign_rkive/" },
  { label: "INSTAGRAM - PRODUCE.R BRAND", account: "@produce.r_", href: "https://www.instagram.com/produce.r_/" },
  { label: "LINKEDIN", account: "Yuruo (Reign) Zhou", href: "https://www.linkedin.com/in/yuruo-zhou-82507122a/" },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={`${interior.heading} ${anton.className}`}><span className="hero-word">CONTACT</span></h1>
      </header>

      <div className={styles.columns}>
        <section className={styles.direct} aria-labelledby="direct-line">
          <h2 id="direct-line" className={styles.label} data-reveal="" suppressHydrationWarning>DIRECT LINE</h2>
          <a className={`${styles.email} ${anton.className}`} href={`mailto:${email}`} data-reveal="" suppressHydrationWarning style={{ "--i": 1 } as React.CSSProperties}>
            <span className={styles.emailText}>{email}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>

          <h2 id="elsewhere" className={`${styles.label} ${styles.elsewhereLabel}`} data-reveal="" suppressHydrationWarning>ELSEWHERE</h2>
          <ul className={styles.socials} aria-labelledby="elsewhere">
            {elsewhere.map(({ label, account, href }, index) => (
              <li key={href} data-reveal="" suppressHydrationWarning style={{ "--i": index } as React.CSSProperties}>
                <a className={styles.social} href={href} target="_blank" rel="noopener noreferrer">
                  <span className={styles.socialLabel}>{label}</span>
                  <span className={styles.socialAccount}>{account}<span aria-hidden="true"> ↗</span></span>
                  <span className={styles.srOnly}> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.formColumn} aria-label="Send a message">
          <ContactForm email={email} />
        </section>
      </div>
    </main>
  );
}
