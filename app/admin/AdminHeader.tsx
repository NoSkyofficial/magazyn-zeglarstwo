"use client";
import { signOut } from "next-auth/react";
import { AdmIcon } from "@/components/icons";

export default function AdminHeader({ email }: { email: string }) {
  const initials = email ? email.slice(0, 2).toUpperCase() : "PK";

  return (
    <header style={{ height: 56, background: "var(--paper)", borderBottom: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
      <div />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <a href="/" target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-muted)", textDecoration: "none" }}>
          <AdmIcon name="globe" size={14} /> Zobacz stronę
        </a>
        <div style={{ height: 20, width: 1, background: "var(--rule)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--ink)", color: "var(--paper)", display: "grid", placeItems: "center", fontFamily: "var(--f-display)", fontSize: 13 }}>
            {initials}
          </div>
          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 600, color: "var(--ink)" }}>{email}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="btn"
          style={{ padding: "8px 14px", fontSize: 10 }}
        >
          <AdmIcon name="logout" size={12} /> Wyloguj
        </button>
      </div>
    </header>
  );
}
