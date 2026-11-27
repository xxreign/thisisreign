import type { Metadata } from "next";
import { anton } from "../_lib/fonts";
import interior from "../interior.module.css";
import WorkGrid from "./WorkGrid";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work | XXREIGN",
  description: "Selected work by Reign across branding, architecture, graphic design and more.",
};

export default function WorkPage() {
  return (
    <main className={styles.page}>
      {/* Same single-word hero as the other interior pages. */}
      <header className={styles.hero}>
        <h1 className={`${interior.heading} ${anton.className}`}><span className="hero-word">WORK</span></h1>
      </header>
      <WorkGrid />
      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
