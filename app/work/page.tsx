import { anton } from "../_lib/fonts";
import styles from "../interior.module.css";

// Temporary placeholder so the homepage navigation works.
// Replace this with your full WORK page when ready.
export default function WORKPage() {
  return (
    <main className={styles.page}>
      <h1 className={`${styles.heading} ${anton.className}`}><span className="hero-word">WORK</span></h1>
    </main>
  );
}
