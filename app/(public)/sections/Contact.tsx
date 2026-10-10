import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { FbIcon, IgIcon, ArrowR } from "@/components/icons";

export default async function Contact() {
  const [settings, distributors] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.distributor.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <section id="kontakt" className="section section-ink" style={{ background: "var(--ink)" }}>
      <div className="pg" style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="sec-head" data-reveal>
          <div>
            <div className="kicker">
              <span className="num" style={{ color: "var(--brass-bright)" }}>§ 05</span>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brass-bright)", display: "inline-block" }} />
              <span className="eyebrow eyebrow-light">Wydawca, dystrybucja, łącza</span>
            </div>
            <h2>Kontakt</h2>
          </div>
          <div className="sec-aside">Listy pochwalne i listy z błędami —<br />czytamy jedne i drugie.</div>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.4fr 0.9fr", gap: 72 }} data-reveal>
          <div>
            <div className="eyebrow eyebrow-light">Wydawca</div>
            {settings && (
              <>
                <div style={{ marginTop: 16, fontFamily: "var(--f-display)", fontSize: 28, color: "var(--paper)", lineHeight: 1.15 }}>
                  {settings.publisherName}
                </div>
                <div style={{ marginTop: 20, fontFamily: "var(--f-serif)", fontSize: 16, lineHeight: 1.7, color: "rgba(245,241,232,.78)" }}>
                  {settings.address}
                </div>
                <div style={{ marginTop: 28, borderTop: "1px solid rgba(245,241,232,.18)", paddingTop: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,.55)", marginBottom: 8 }}>Telefon</div>
                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="ul-link" style={{ color: "var(--paper)", fontFamily: "var(--f-display)", fontSize: 22 }}>
                    {settings.phone}
                  </a>
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,241,232,.55)", marginBottom: 8 }}>E-mail</div>
                  <a href={`mailto:${settings.email}`} className="ul-link" style={{ color: "var(--paper)", fontFamily: "var(--f-display)", fontSize: 18 }}>
                    {settings.email}
                  </a>
                </div>
              </>
            )}
          </div>

          <div>
            <div className="eyebrow eyebrow-light">Dystrybucja</div>
            <div style={{ marginTop: 16, fontFamily: "var(--f-serif)", fontSize: 16, lineHeight: 1.6, color: "rgba(245,241,232,.78)", maxWidth: 420 }}>
              Magazyn w wybranych salonach prasowych na terenie kraju oraz w sklepie internetowym wydawcy.
            </div>
            <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {distributors.map((d) => {
                const slug = d.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <div key={d.id} className="distributor-logo">
                    <Image src={`/uploads/distributors/${slug}.png`} alt={d.name} fill className="object-contain" sizes="100px" />
                  </div>
                );
              })}
              {settings && (
                <a href={settings.shopBaseUrl} target="_blank" rel="noopener noreferrer" className="btn btn-light" style={{ justifyContent: "center", fontSize: 10, padding: "10px 14px" }}>
                  Sklep online <ArrowR size={12} />
                </a>
              )}
            </div>
          </div>

          <div>
            <div className="eyebrow eyebrow-light">Społeczność</div>
            <div style={{ marginTop: 16, fontFamily: "var(--f-serif)", fontSize: 16, lineHeight: 1.6, color: "rgba(245,241,232,.78)" }}>
              Szerzej o redakcji, zdjęcia z rejsów, kulisy wydań — w mediach społecznościowych.
            </div>
            {settings && (
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span style={{ color: "var(--brass-bright)" }}><FbIcon size={16} /></span>
                  <span style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,.5)" }}>Facebook</div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 17, marginTop: 2 }}>/magazyn.zeglarstwo</div>
                  </span>
                  <ArrowR size={12} />
                </a>
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span style={{ color: "var(--brass-bright)" }}><IgIcon size={16} /></span>
                  <span style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,241,232,.5)" }}>Instagram</div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 17, marginTop: 2 }}>@magazyn.zeglarstwo</div>
                  </span>
                  <ArrowR size={12} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
