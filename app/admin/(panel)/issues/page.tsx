import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { setCurrentIssue } from "./actions";
import DeleteIssueButton from "@/components/admin/DeleteIssueButton";
import { AdmIcon } from "@/components/icons";

export const metadata = { title: "Numery" };

export default async function IssuesPage() {
  const issues = await prisma.issue.findMany({ orderBy: { publishedAt: "desc" }, take: 100 });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: 24, fontWeight: 400, color: "var(--ink)", margin: 0 }}>Numery</h1>
          <p style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 2 }}>Lista wszystkich wydań · zarządzanie bieżącym + archiwum</p>
        </div>
        <Link href="/admin/issues/new" className="btn btn-primary">
          <AdmIcon name="plus" size={14} /> Dodaj numer
        </Link>
      </div>

      <div className="admin-card" style={{ overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "56px 1.5fr 1fr 1fr 1fr 130px", padding: "14px 20px", background: "var(--paper-warm)", borderBottom: "1px solid var(--rule)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600, gap: 20, alignItems: "center" }}>
          <span>Okładka</span>
          <span>Numer</span>
          <span>Wydanie</span>
          <span>Data publikacji</span>
          <span>Status</span>
          <span style={{ textAlign: "right" }}>Akcje</span>
        </div>

        {issues.map((issue, i) => (
          <div
            key={issue.id}
            className="adm-table-row"
            style={{ display: "grid", gridTemplateColumns: "56px 1.5fr 1fr 1fr 1fr 130px", padding: "14px 20px", alignItems: "center", borderBottom: i < issues.length - 1 ? "1px solid var(--rule)" : "none", gap: 20 }}
          >
            <div style={{ position: "relative", width: 40, height: 54, flexShrink: 0, background: "var(--ink-soft)", boxShadow: "var(--sh-1)", overflow: "hidden" }}>
              <Image src={issue.coverImage} alt={issue.label} fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 16, color: "var(--ink)" }}>Nr {issue.number}</div>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{issue.label}</div>
            </div>
            <div style={{ fontSize: 13, fontFamily: "var(--f-serif)", color: "var(--ink)" }}>{issue.label}</div>
            <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{new Date(issue.publishedAt).toLocaleDateString("pl-PL")}</div>
            <div>
              {issue.isCurrent
                ? <span className="chip chip-current">● Bieżący</span>
                : <span className="chip"><span className="chip-dot" style={{ background: "var(--ink-muted)" }} /> Archiwum</span>}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
              {!issue.isCurrent && (
                <form action={async () => { "use server"; await setCurrentIssue(issue.id); }}>
                  <button type="submit" className="icon-btn" title="Ustaw jako bieżący">
                    <AdmIcon name="star" size={13} />
                  </button>
                </form>
              )}
              <Link href={`/admin/issues/${issue.id}/edit`} className="icon-btn" title="Edytuj" style={{ display: "grid", placeItems: "center", textDecoration: "none" }}>
                <AdmIcon name="edit" size={13} />
              </Link>
              <DeleteIssueButton action={async () => { "use server"; const { deleteIssue } = await import("./actions"); await deleteIssue(issue.id); }} />
            </div>
          </div>
        ))}

        {issues.length === 0 && (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--ink-muted)", fontSize: 14 }}>
            Brak numerów. <Link href="/admin/issues/new" style={{ color: "var(--brass-deep)" }}>Dodaj pierwszy.</Link>
          </div>
        )}
      </div>
    </div>
  );
}
