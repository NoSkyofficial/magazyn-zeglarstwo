import { prisma } from "@/lib/prisma";
import TopicsGrid from "./TopicsGrid";

export default async function Topics() {
  const topics = await prisma.topic.findMany({ orderBy: { order: "asc" } });
  return (
    <section id="tematyka" className="section" style={{ background: "var(--paper)" }}>
      <div className="pg" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="sec-head" data-reveal>
          <div>
            <div className="kicker">
              <span className="num">§ 03</span>
              <span className="star" />
              <span className="eyebrow">Dziewięć rubryk</span>
            </div>
            <h2>Tematyka</h2>
          </div>
          <div className="sec-aside">
            Każdy numer — inne proporcje.<br />Żadna rubryka nie jest ozdobna.
          </div>
        </div>
        <TopicsGrid topics={topics} />
      </div>
    </section>
  );
}
