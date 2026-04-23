import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteMember } from "./actions";
import { AdmIcon } from "@/components/icons";

export const metadata = { title: "Zespół" };

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  const staff = members.filter((m) => m.group === "STAFF");
  const contributors = members.filter((m) => m.group === "CONTRIBUTOR");

  const renderGroup = (list: typeof members, label: string, key: string) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid var(--rule)" }}>
        <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 20, margin: 0, color: "var(--ink)" }}>{label}</h3>
        <span className="chip">{key}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: "var(--ink-muted)" }}>{list.length} {list.length === 1 ? "osoba" : "osób"}</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
        {list.map((m) => (
          <div key={m.id} className="admin-card" style={{ overflow: "hidden" }}>
            <div style={{ aspectRatio: "4/3", background: "var(--ink)", position: "relative" }}>
              {m.photo ? (
                <Image src={m.photo} alt={m.name} fill className="object-cover" sizes="180px" priority />
              ) : (
                <div style={{ height: "100%", display: "grid", placeItems: "center", color: "rgba(245,241,232,.4)", fontFamily: "var(--f-display)", fontSize: 36 }}>
                  {m.name.split(" ").map((n) => n[0]).join("")}
                </div>
              )}
              <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 4 }}>
                <Link href={`/admin/team/${m.id}/edit`} className="icon-btn" style={{ background: "rgba(252,250,244,.95)", display: "grid", placeItems: "center", textDecoration: "none" }}>
                  <AdmIcon name="edit" size={12} />
                </Link>
                <form action={deleteMember.bind(null, m.id)}>
                  <button type="submit" className="icon-btn" style={{ background: "rgba(252,250,244,.95)" }}>
                    <AdmIcon name="trash" size={12} />
                  </button>
                </form>
              </div>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 15, color: "var(--ink)" }}>{m.name}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brass-deep)", marginTop: 4 }}>{m.role}</div>
            </div>
          </div>
        ))}
        <Link href="/admin/team/new" className="adm-add-card">
          <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--rule)", display: "grid", placeItems: "center" }}>
            <AdmIcon name="plus" size={16} />
          </div>
          <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>Dodaj osobę</div>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16 }}>
        <Link href="/admin/team/new" className="btn btn-primary">
          <AdmIcon name="plus" size={14} /> Dodaj osobę
        </Link>
      </div>
      {renderGroup(staff, "Zespół redakcyjny", "STAFF")}
      {renderGroup(contributors, "Stali współpracownicy", "CONTRIBUTOR")}
    </div>
  );
}
