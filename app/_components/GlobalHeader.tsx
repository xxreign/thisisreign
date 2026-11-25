import Link from "next/link";
import styles from "./Navigation.module.css";

const links = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "CONTACT", href: "/contact" },
];

export default function GlobalHeader() {
  return (
    <header className={styles.header}><nav className={styles.nav} aria-label="Main navigation">
      <Link className={styles.home} href="/">HOME</Link>
      <div className={styles.links}>
        {links.map(({ label, href }) => (
          <Link className={styles.link} href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>
    </nav></header>
  );
}
