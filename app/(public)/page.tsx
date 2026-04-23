export const dynamic = "force-dynamic";

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
