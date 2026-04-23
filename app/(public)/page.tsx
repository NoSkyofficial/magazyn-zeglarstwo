export const dynamic = "force-dynamic";

export const metadata = {
  title: "Magazyn ŻEGLARSTWO — Magazyn Miłośników Żagli",
  description: "Najstarszy polski magazyn żeglarski w nowym wydaniu. Relacje z wielkich regat, testy jachtów, wiedza i nauka oraz kultowa sekcja Ku Przestrodze.",
};

import Hero     from "./sections/Hero";
import Magazine  from "./sections/Magazine";
import Kiosk     from "./sections/Kiosk";
import Topics    from "./sections/Topics";
import Team      from "./sections/Team";
import Contact   from "./sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Magazine />
      <Kiosk />
      <Topics />
      <Team />
      <Contact />
    </>
  );
}
