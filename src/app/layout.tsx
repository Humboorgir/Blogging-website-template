import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Field Notes | A journal for making things well",
  description: "Thoughtful notes on technology, craft, and the work between the two.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <Script id="theme-init" strategy="beforeInteractive">
        {`(() => {
          const saved = localStorage.getItem("field-notes-theme");
          const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
          document.documentElement.classList.toggle("dark", dark);
        })();`}
      </Script>
      <body>{children}</body>
    </html>
  );
}
