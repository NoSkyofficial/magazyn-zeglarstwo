import { prisma } from "@/lib/prisma";
import Editor from "@/components/tiptap/Editor";
import { updatePageContent } from "./actions";
import { AdmIcon } from "@/components/icons";

export const metadata = { title: "Strony" };

const PAGES = [{ slug: "magazine", label: "Magazyn · O nas" }];

export default async function PagesAdmin() {
  const pages = await prisma.pageContent.findMany({ where: { slug: { in: PAGES.map((p) => p.slug) } } });
  const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
      {/* Sidebar */}
      <aside className="admin-card" style={{ padding: 16 }}>
        <div className="eyebrow" style={{ fontSize: 10 }}>Strony</div>
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 2 }}>
          {PAGES.map((p) => (
            <div key={p.slug} style={{ padding: "10px 12px", fontSize: 13, color: "var(--ink)", background: "var(--paper-warm)", borderLeft: "2px solid var(--brass)", fontWeight: 600 }}>
              {p.label}
            </div>
          ))}
          {["Prenumerata", "Polityka prywatności", "Regulamin"].map((t) => (
            <div key={t} style={{ padding: "10px 12px", fontSize: 13, color: "var(--ink-muted)", borderLeft: "2px solid transparent" }}>{t}</div>
          ))}
        </div>
      </aside>

      {/* Editor */}
      {PAGES.map((p) => {
        const action = updatePageContent.bind(null, p.slug);
        return (
          <div key={p.slug} className="admin-card" style={{ overflow: "hidden" }}>
            <form action={action}>
              <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "8px 12px", borderBottom: "1px solid var(--rule)", background: "var(--paper-warm)", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {[["bold","B"],["italic","I"],["h1","H1"],["h2","H2"],["list","L"],["quote","Q"],["link","🔗"]].map(([ic, _]) => (
                    <button key={ic} type="button" className="icon-btn" style={{ width: 32, height: 32 }}>
                      <AdmIcon name={ic} size={14} />
                    </button>
                  ))}
                </div>
                <button type="submit" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 10 }}>
                  <AdmIcon name="check" size={12} /> Publikuj
                </button>
              </div>
              <div style={{ padding: "24px 32px" }}>
                <Editor name="contentJson" defaultValue={bySlug[p.slug]?.contentJson} />
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}
