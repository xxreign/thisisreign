import type { Metadata } from "next";
import { anton } from "../_lib/fonts";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact | XXREIGN",
  description: "Connect with Reign on Instagram, LinkedIn, or by email.",
};

const contacts = [
  { label: "INSTAGRAM", account: "@xxreign_", href: "https://www.instagram.com/xxreign_/" },
  { label: "INSTAGRAM - ART ACCOUNT", account: "@reign_rkive", href: "https://www.instagram.com/reign_rkive/" },
  { label: "INSTAGRAM - PRODUCE.R BRAND", account: "@produce.r_", href: "https://www.instagram.com/produce.r_/" },
  { label: "LINKEDIN", account: "Yuruo (Reign) Zhou", href: "https://www.linkedin.com/in/yuruo-zhou-82507122a/" },
  { label: "EMAIL", account: "xxreign314@gmail.com", href: "mailto:xxreign314@gmail.com" },
];

function ExternalLinkIcon() {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M15 3h6v6M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={`${styles.heading} ${anton.className}`}>
          <span className={styles.intro}><span>CONTACT</span>{" "}<span>WITH</span></span>{" "}
          <span className={styles.name}>REIGN</span>
        </h1>
      </header>
      <section className={styles.contacts} aria-label="Contact details">
        <ul className={styles.list}>
          {contacts.map(({ label, account, href }) => {
            const external = href.startsWith("https:");
            return (
              <li key={href}>
                <a className={styles.row} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
                  <span className={styles.label}>{label}{external && <ExternalLinkIcon />}</span>
                  <span className={styles.account}>{account}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
