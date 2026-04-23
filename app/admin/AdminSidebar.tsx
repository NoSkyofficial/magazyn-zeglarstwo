"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AdmIcon } from "@/components/icons";

const NAV = [
  { id: "dashboard", label: "Pulpit",     icon: "dashboard", href: "/admin" },
  { id: "issues",    label: "Numery",     icon: "issues",    href: "/admin/issues",   group: "Treść" },
  { id: "pages",     label: "Strony",     icon: "pages",     href: "/admin/pages" },
  { id: "topics",    label: "Tematyka",   icon: "topics",    href: "/admin/topics" },
  { id: "team",      label: "Zespół",     icon: "team",      href: "/admin/team" },
  { id: "settings",  label: "Ustawienia", icon: "settings",  href: "/admin/settings", group: "System" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: 240, flexShrink: 0, background: "var(--ink)", color: "var(--paper)", padding: "20px 0", borderRight: "1px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "0 20px 18px", borderBottom: "1px solid rgba(255,255,255,0.12)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <Image src="/uploads/logo/logo.png" alt="Żeglarstwo" width={140} height={18} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
          <div style={{ fontFamily: "var(--f-sans)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,241,232,.5)", marginTop: 6 }}>Admin · v1</div>
        </div>
      </div>

      <nav style={{ flex: 1 }}>
        {NAV.map((n) => {
          const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
          return (
            <div key={n.id}>
              {n.group && (
                <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,241,232,.4)", padding: "14px 20px 6px" }}>
                  {n.group}
                </div>
              )}
              <Link
                href={n.href}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 20px",
                  color: active ? "var(--paper)" : "rgba(245,241,232,.65)",
                  fontSize: 13, letterSpacing: "0.04em",
                  textDecoration: "none",
                  borderLeft: active ? "2px solid var(--brass)" : "2px solid transparent",
                  background: active ? "rgba(176,137,71,.12)" : "transparent",
                  transition: "background .15s, color .15s, border-color .15s",
                }}
              >
                <span style={{ color: active ? "var(--brass-bright)" : "rgba(245,241,232,.55)" }}>
                  <AdmIcon name={n.icon} size={15} />
                </span>
                {n.label}
              </Link>
            </div>
          );
        })}
      </nav>

      <div style={{ padding: "0 20px", marginTop: 24, borderTop: "1px solid rgba(245,241,232,.12)", paddingTop: 16 }}>
        <Link href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,241,232,.45)", textDecoration: "none", transition: "color .15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,241,232,.8)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,241,232,.45)"; }}
        >
          <AdmIcon name="globe" size={12} /> Zobacz stronę
        </Link>
      </div>
    </aside>
  );
}
