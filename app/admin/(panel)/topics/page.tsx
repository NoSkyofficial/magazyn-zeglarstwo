import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { TopicArt, AdmIcon } from "@/components/icons";

export const metadata = { title: "Tematyka" };

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: 24, fontWeight: 400, color: "var(--ink)", margin: 0 }}>Tematyka</h1>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>9 rubryk stałych · kolejność decyduje o wyświetlaniu</p>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--ink-muted)" }}>
          <span><strong style={{ color: "var(--ink)" }}>{topics.length}</strong> aktywnych</span>
        </div>
      </div>

      <div className="admin-card" style={{ overflow: "hidden" }}>
        {topics.map((topic, i) => (
          <div
            key={topic.id}
            className="adm-table-row"
            style={{ display: "grid", gridTemplateColumns: "24px 80px 1fr 80px 80px", alignItems: "center", padding: "14px 18px", borderBottom: i < topics.length - 1 ? "1px solid var(--rule)" : "none", gap: 16 }}
          >
            <span style={{ color: "var(--ink-muted)", cursor: "grab" }}>
              <AdmIcon name="drag" size={16} />
            </span>
            <div style={{ width: 72, height: 54, overflow: "hidden", borderRadius: 1 }}>
              <TopicArt slug={topic.slug} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--f-display)", color: "var(--brass-deep)", fontSize: 14 }}>№ {String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--ink)" }}>{topic.title}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>/{topic.slug}</div>
            </div>
            <span className="chip"><span className="chip-dot" style={{ background: "#2a7" }} /> Aktywna</span>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Link href={`/admin/topics/${topic.id}/edit`} className="icon-btn" style={{ display: "grid", placeItems: "center", textDecoration: "none" }}>
                <AdmIcon name="edit" size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
