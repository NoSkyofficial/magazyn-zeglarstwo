import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const italiana = localFont({
  src: "./fonts/Italiana-Regular.ttf",
  variable: "--italiana",
  display: "swap",
});

const gloock = localFont({
  src: "./fonts/Gloock-Regular.ttf",
  variable: "--gloock",
  display: "swap",
});

const workSans = localFont({
  src: [
    { path: "./fonts/WorkSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/WorkSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/WorkSans-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--worksans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Magazyn ŻEGLARSTWO",
    template: "%s — Magazyn ŻEGLARSTWO",
  },
  description:
    "Dwumiesięcznik dla miłośników żagli. Ku Przestrodze, Wielkie Regaty, Akweny i Miejsca, Wiedza i Nauka, Jachty i Żaglowce.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Magazyn ŻEGLARSTWO",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pl"
      className={`${italiana.variable} ${gloock.variable} ${workSans.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
