import { prisma } from "@/lib/prisma";
import TeamGrid from "./TeamGrid";

const getPhotoUrl = (name: string) =>
  `/uploads/team/${name.toLowerCase()
    .replace(/ł/g, "l").replace(/ż/g, "z").replace(/ś/g, "s")
    .replace(/ć/g, "c").replace(/ń/g, "n").replace(/ó/g, "o")
    .replace(/ź/g, "z").replace(/ę/g, "e").replace(/ą/g, "a")
    .replace(/[\s_]+/g, "-")}.jpg`;

export default async function Team() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  const staff = members.filter((m) => m.group === "STAFF");
  const contributors = members.filter((m) => m.group === "CONTRIBUTOR");

  const toCard = (m: (typeof members)[0]) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    group: m.group,
    img: m.photo || getPhotoUrl(m.name),
  });

  return (
    <section id="zespol" className="section" style={{ background: "var(--paper-warm)" }}>
      <div className="pg" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="sec-head" data-reveal>
          <div>
            <div className="kicker">
              <span className="num">§ 04</span>
              <span className="star" />
              <span className="eyebrow">Stopka redakcyjna</span>
            </div>
            <h2>Zespół</h2>
          </div>
          <div className="sec-aside">Piszą, redagują, ryzykują zdania,<br />których nie trzeba potem prostować.</div>
        </div>

        <TeamGrid staff={staff.map(toCard)} contributors={contributors.map(toCard)} />
      </div>
    </section>
  );
}
