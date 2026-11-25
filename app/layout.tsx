import type { Metadata } from "next";
import "./globals.css";
import GlobalHeader from "./_components/GlobalHeader";

export const metadata: Metadata = {
  title: "XXREIGN | This is Reign",
  description: "This is Reign. About, work, experience, and contact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><GlobalHeader />{children}</body>
    </html>
  );
}
