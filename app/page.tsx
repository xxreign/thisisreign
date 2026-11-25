import FrostGlassImage from "./_components/FrostGlassImage";
import { anton } from "./_lib/fonts";
import portrait from "../public/reign-portrait.jpg";
import styles from "./homepage.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <div className={styles.composition}>
        <h1 className={`${styles.hero} ${anton.className}`} aria-label="THIS IS REIGN">
          <span className={styles.intro}>
            <span>THIS</span>
            <span>IS</span>
          </span>
          <span className={styles.name}>REIGN</span>
        </h1>
        <FrostGlassImage
          className={styles.portrait}
          src={portrait}
          alt="Reign seated in a mirrored elevator"
          sizes="(max-width: 760px) 64vw, 34vw"
          preload
        />
      </div>
    </main>
  );
}
