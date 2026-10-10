import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { AdmIcon, ArrowR } from "@/components/icons";

export const metadata = { title: "Dashboard" };

const QUICK_ACTIONS = [
  { t: "Dodaj nowy numer", d: "Okładka, numer, dystrybucja", ic: "plus", href: "/admin/issues/new" },
  { t: "Edytuj treść magazynu", d: "Misja, wizja, redakcyjne", ic: "pages", href: "/admin/pages" },
  { t: "Dodaj członka zespołu", d: "Redakcja lub współpraca", ic: "team", href: "/admin/team/new" },
  { t: "Ustawienia wydawcy", d: "Dane kontaktowe, social media", ic: "settings", href: "/admin/settings" },
];

export default async function AdminDashboard() {
  const [issueCount, topicCount, memberCount, distributorCount, current] = await Promise.all([
    prisma.issue.count(),
    prisma.topic.count(),
    prisma.teamMember.count(),
    prisma.distributor.count(),
    prisma.issue.findFirst({ where: { isCurrent: true } }),
  ]);

  const stats = [
    { label: "Numery", val: String(issueCount).padStart(2, "0"), sub: "w archiwum + bieżący", ic: "issues" },
    { label: "Kategorie", val: String(topicCount).padStart(2, "0"), sub: "aktywnych rubryk", ic: "topics" },
    { label: "Zespół", val: String(memberCount).padStart(2, "0"), sub: "redakcja + współpraca", ic: "team" },
    { label: "Dystrybutorzy", val: String(distributorCount).padStart(2, "0"), sub: "salonów prasowych", ic: "globe" },
  ];

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="admin-card" style={{ padding: 24, display: "flex", alignItems: "center", gap: 24, background: "var(--ink)", color: "var(--paper)", border: "none" }}>
          {current && (
            <div style={{ position: "relative", width: 72, height: 96, flexShrink: 0, boxShadow: "var(--sh-2)" }}>
              <Image src={current.coverImage} alt="Okładka" fill className="object-cover" sizes="60px" priority />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div className="eyebrow eyebrow-light">Aktualnie w sprzedaży</div>
            <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 22, margin: "8px 0 4px", color: "var(--paper)" }}>
              {current ? `Nr ${current.number} · ${current.label}` : "Brak bieżącego numeru"}
            </h3>
            <div style={{ fontSize: 12, color: "rgba(245,241,232,.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              status: {current ? "bieżący" : "nie ustawiony"}
            </div>
          </div>
          <Link href="/admin/issues" className="btn btn-brass">
            Zarządzaj <ArrowR />
          </Link>
        </div>
        <div className="admin-card" style={{ padding: 20 }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Szybkie akcje</div>
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
            {QUICK_ACTIONS.slice(0, 2).map((a) => (
              <Link key={a.t} href={a.href} className="adm-quick-link">
                <AdmIcon name={a.ic} size={14} />
                {a.t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 28 }}>
        {stats.map((s) => (
          <div key={s.label} className="admin-card" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: 16, top: 16, color: "var(--brass)", opacity: .45 }}>
              <AdmIcon name={s.ic} size={22} />
            </div>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 56, lineHeight: 1, marginTop: 10, letterSpacing: "-0.02em", color: "var(--ink)" }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 10, paddingTop: 10, borderTop: "1px solid var(--rule)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <h3>Szybkie akcje</h3>
          <div className="eyebrow" style={{ fontSize: 10 }}>Najczęstsze</div>
        </div>
        <div style={{ display: "grid", gap: 2 }}>
          {QUICK_ACTIONS.map((a) => (
            <Link key={a.t} href={a.href} className="adm-row-link">
              <span style={{ width: 32, height: 32, display: "grid", placeItems: "center", background: "var(--paper-warm)", color: "var(--brass-deep)", flexShrink: 0 }}>
                <AdmIcon name={a.ic} />
              </span>
              <span style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{a.t}</div>
                <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{a.d}</div>
              </span>
              <AdmIcon name="chevron" size={14} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
