import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { anton } from "../_lib/fonts";
import WorkGrid from "./WorkGrid";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work | XXREIGN",
  description: "Selected work by Reign across architecture, fashion, art and music.",
};

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={`${styles.heading} ${anton.className}`}>
          <span className={styles.intro}>
            <span className="hero-word" style={{ "--i": 0 } as CSSProperties}>WORK</span>{" "}
            <span className="hero-word" style={{ "--i": 1 } as CSSProperties}>BY</span>
          </span>{" "}
          <span className={styles.name}><span className="hero-word" style={{ "--i": 2 } as CSSProperties}>REIGN</span></span>
        </h1>
      </header>
      <WorkGrid />
      <footer className={styles.footer}>© REIGN ZHOU 2026</footer>
    </main>
  );
}
