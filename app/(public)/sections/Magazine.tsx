import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { prisma } from "@/lib/prisma";

import DOMPurify from "isomorphic-dompurify";

export default async function Magazine() {
  const page = await prisma.pageContent.findUnique({ where: { slug: "magazine" } });
  let html = "";
  if (page?.contentJson) {
    try {
      const rawHtml = generateHTML(JSON.parse(page.contentJson), [StarterKit]);
      html = DOMPurify.sanitize(rawHtml);
    } catch {
      html = "";
    }
  }

  return (
    <section id="magazyn" className="section" style={{ background: "var(--paper)" }}>
      <div className="pg" style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div className="sec-head" data-reveal>
          <div>
            <div className="kicker">
              <span className="num">§ 01</span>
              <span className="star" />
              <span className="eyebrow">O Magazynie</span>
            </div>
            <h2>Magazyn</h2>
          </div>
          <div className="sec-aside">
            Długie formy, staranna edycja, papier,<br />na którym chce się zatrzymać.
          </div>
        </div>

        <div className="mag-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
          <aside className="mag-aside" data-reveal style={{ fontFamily: "var(--f-sans)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-muted)", lineHeight: 2, borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
            <div style={{ color: "var(--brass-deep)", fontWeight: 600 }}>Misja</div>
            <div style={{ height: 24 }} />
            <div style={{ color: "var(--brass-deep)", fontWeight: 600 }}>Wizja</div>
            <div style={{ height: 24 }} />
            <div style={{ color: "var(--brass-deep)", fontWeight: 600 }}>Metoda</div>
            <div style={{ marginTop: 32, borderTop: "1px solid var(--rule)", paddingTop: 16, fontStyle: "italic", textTransform: "none", letterSpacing: 0, fontSize: 13, color: "var(--ink-muted)" }}>
              „Morze nie tłumaczy się pośpiechowi." — redakcja
            </div>
          </aside>

          <article data-reveal>
            {html ? (
              <div className="prose-zeg" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div style={{ color: "var(--ink)", fontSize: 17, lineHeight: 1.65, fontFamily: "var(--f-sans)" }}>
                <p className="dropcap" style={{ marginTop: 0, fontFamily: "var(--f-sans)", fontSize: 17, lineHeight: 1.65 }}>
                  <strong style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 22, textTransform: "uppercase", letterSpacing: "0.08em" }}>Żeglarstwo</strong> — dwumiesięcznik dla tych, którzy w wietrze czytają jak w księdze, a w kursie jachtu dostrzegają decyzję. Powstaliśmy z przekonania, że morze zasługuje na język staranniejszy niż doniesienie i obraz głębszy niż kadr z pokładu.
                </p>
                <p style={{ fontFamily: "var(--f-sans)", fontSize: 17, lineHeight: 1.65 }}>
                  Naszą misją jest towarzyszyć czytelnikowi w długich rozmowach z ludźmi morza, w dokładnych relacjach z regat, w ostrożnej analizie wypadków, których nie wolno powtarzać. Piszemy wolno, redagujemy uważnie, drukujemy rzadko — sześć razy w roku.
                </p>
                <blockquote style={{ fontFamily: "var(--f-sans)", fontStyle: "italic", color: "var(--ink-soft)", borderLeft: "2px solid var(--brass)", paddingLeft: 24, margin: "32px 0" }}>
                  Wizja jest prosta: magazyn, po który sięga się po latach, jak po mapę — wciąż aktualny, wciąż potrzebny, wciąż piękny w kadrze i w zdaniu.
                </blockquote>
                <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18, fontFamily: "var(--f-sans)" }}>
                  <div style={{ width: 40, height: 1, background: "var(--brass)" }} />
                  <span style={{ fontFamily: "var(--f-serif)", fontStyle: "italic", fontSize: 15, color: "var(--ink-muted)" }}>Redakcja, Warszawa</span>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
