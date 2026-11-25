import { anton } from "../_lib/fonts";
import styles from "../interior.module.css";

// Temporary placeholder so the homepage navigation works.
// Replace this with your full ABOUT page when ready.
export default function ABOUTPage() {
  return (
    <main className={styles.page}>
      <h1 className={`${styles.heading} ${anton.className}`}><span className="hero-word">ABOUT</span></h1>
    </main>
  );
}
