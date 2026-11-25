"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrambleText from "./ScrambleText";
import styles from "./Navigation.module.css";

const links = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "EXPERIENCE", href: "/experience" },
  { label: "CONTACT", href: "/contact" },
];

export default function GlobalHeader() {
  const pathname = usePathname();
  return (
    <header className={styles.header}><nav className={styles.nav} aria-label="Main navigation">
      <Link className={styles.home} href="/" aria-current={pathname === "/" ? "page" : undefined}>
        <ScrambleText text="HOME" />
      </Link>
      <div className={styles.links}>
        {links.map(({ label, href }) => (
          <Link className={styles.link} href={href} key={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>
            <ScrambleText text={label} />
          </Link>
        ))}
      </div>
    </nav></header>
  );
}
