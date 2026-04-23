import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "../AdminSidebar";
import AdminHeader from "../AdminHeader";

export const metadata = { title: { default: "Panel — ŻEGLARSTWO", template: "%s — Panel" } };

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div style={{ minHeight: "100dvh", background: "var(--paper)", display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AdminHeader email={session.user?.email ?? ""} />
        <main style={{ flex: 1, padding: "28px 32px", overflow: "auto" }}>{children}</main>
      </div>
    </div>
  );
}
