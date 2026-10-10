import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowR } from "@/components/icons";
import KioskArchive from "./KioskArchive";

export default async function Kiosk() {
  const [current, archive, settings] = await Promise.all([
    prisma.issue.findFirst({ where: { isCurrent: true } }),
    prisma.issue.findMany({ where: { isCurrent: false }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
  ]);

  const shopUrl = settings?.shopBaseUrl ?? "https://sklep.3oceans.pl";
  const subscriptionUrl = settings?.subscriptionUrl ?? shopUrl;

  return (
    <section id="kiosk" className="section section-ink" style={{ position: "relative", background: "var(--ink)" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05, backgroundImage: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.4), transparent 50%)" }} />
      <div className="pg" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="sec-head" data-reveal>
          <div>
            <div className="kicker">
              <span className="num" style={{ color: "var(--brass-bright)" }}>§ 02</span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass-bright)", display: "inline-block" }} />
              <span className="eyebrow eyebrow-light">Sprzedaż i Archiwum</span>
            </div>
            <h2>Kiosk</h2>
          </div>
          <div className="sec-aside">Salony prasowe w całej Polsce<br />oraz sklep online 3 Oceans</div>
        </div>

        {current && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(32px, 6vw, 80px)", alignItems: "center" }} data-reveal>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: -18, left: -18, right: -18, bottom: -18,
                border: "1px solid var(--brass)", pointerEvents: "none",
              }} />
              <div style={{ position: "relative", boxShadow: "var(--sh-cover)" }}>
                <Image
                  src={current.coverImage}
                  alt={`Okładka numeru ${current.label}`}
                  width={480}
                  height={640}
                  className="object-cover w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 480px"
                  priority
                />
              </div>
            </div>

            <div>
              <div className="eyebrow eyebrow-light">Numer bieżący · w sprzedaży</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 16 }}>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 84, lineHeight: 0.9, color: "var(--paper)", letterSpacing: "-0.02em" }}>
                  {current.number}
                </span>
                <div style={{ display: "flex", flexDirection: "column", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brass-bright)", fontWeight: 600 }}>
                  <span>numer</span>
                  <span style={{ color: "rgba(245,241,232,.7)", marginTop: 6 }}>{current.label}</span>
                </div>
              </div>
              <p style={{ color: "rgba(245,241,232,.78)", fontSize: 15, lineHeight: 1.7, marginTop: 20, marginBottom: 32, fontFamily: "var(--f-serif)" }}>
                Dostępny w salonach prasowych (The Warsaw Store, InMedio, Relay, 1Minute, Empik) oraz w sklepie online.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a className="btn btn-brass" href={current.shopUrl} target="_blank" rel="noopener noreferrer">
                  Kup w sklepie <ArrowR />
                </a>
                <a className="btn btn-light" href={subscriptionUrl} target="_blank" rel="noopener noreferrer">
                  Prenumerata
                </a>
              </div>
            </div>
          </div>
        )}

        {archive.length > 0 && (
          <div style={{ marginTop: 120 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 40, paddingBottom: 20, borderBottom: "1px solid rgba(245,241,232,.18)" }}>
              <div>
                <div className="eyebrow eyebrow-light">Archiwum</div>
                <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 36, margin: "8px 0 0", color: "var(--paper)" }}>Poprzednie numery</h3>
              </div>
            </div>
            <KioskArchive archive={archive} />
          </div>
        )}
      </div>
    </section>
  );
}
