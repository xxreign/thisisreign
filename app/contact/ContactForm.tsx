"use client";

import type { FormEvent } from "react";
import styles from "./contact.module.css";

// There is no form backend on this site yet, so sending opens the visitor's
// own email app with the message filled in, addressed to Reign.
export default function ContactForm({ email }: { email: string }) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Hello from ${name}`;
    const body = `${message}\n\n${name}\n${from}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className={`${styles.label} ${styles.formNote}`} data-reveal="" suppressHydrationWarning style={{ "--i": 0 } as React.CSSProperties}>SEND A NOTE — I&apos;LL REPLY OR NEVER</p>
      <label className={styles.field} data-reveal="" suppressHydrationWarning style={{ "--i": 1 } as React.CSSProperties}>
        <span className={styles.label}>YOUR NAME</span>
        <input className={styles.input} name="name" type="text" autoComplete="name" placeholder="Name" required />
      </label>
      <label className={styles.field} data-reveal="" suppressHydrationWarning style={{ "--i": 2 } as React.CSSProperties}>
        <span className={styles.label}>YOUR EMAIL</span>
        <input className={styles.input} name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <label className={styles.field} data-reveal="" suppressHydrationWarning style={{ "--i": 3 } as React.CSSProperties}>
        <span className={styles.label}>A FEW WORDS</span>
        <textarea className={`${styles.input} ${styles.textarea}`} name="message" rows={8} placeholder="Tell me about the project…" required />
      </label>
      <button className={styles.send} type="submit" data-reveal="" suppressHydrationWarning style={{ "--i": 4 } as React.CSSProperties}>SEND <span aria-hidden="true">↗</span></button>
    </form>
  );
}
