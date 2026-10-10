import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HRule } from "@/components/icons";
import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = { title: "Logowanie — Panel" };

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/admin");

  return (
    <div style={{ height: "100dvh", display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--paper)" }}>
      <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Image src="/uploads/logo/logo.png" alt="Żeglarstwo" width={160} height={22} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 380 }}>
          <div className="eyebrow">Panel redakcyjny</div>
          <h1 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 44, lineHeight: 1.05, margin: "14px 0 8px", letterSpacing: "-0.01em", color: "var(--ink)" }}>
            Dzień dobry na mostku.
          </h1>
          <p style={{ color: "var(--ink-muted)", fontSize: 14, lineHeight: 1.6, margin: 0, marginBottom: 36, fontFamily: "var(--f-sans)" }}>
            Zaloguj się, by zarządzać treścią magazynu.
          </p>
          <LoginForm />
        </div>

        <div style={{ fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.1em" }}>
          © 3 Oceans Sp. z o.o. · Tylko dla autoryzowanych redaktorów.
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden", background: "var(--ink-deep)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(/uploads/hero/hero.jpg)", backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,18,34,0.2), rgba(7,18,34,0.85))" }} />
        <div style={{ position: "absolute", inset: 0, padding: 48, display: "flex", flexDirection: "column", justifyContent: "flex-end", color: "var(--paper)" }}>
          <HRule color="var(--brass-bright)" width={80} />
          <div style={{ fontFamily: "var(--f-sans)", fontStyle: "italic", fontSize: 26, lineHeight: 1.3, marginTop: 20, maxWidth: 420 }}>
            „Morze nie tłumaczy się pośpiechowi. Dwumiesięcznik — to właściwy odstęp między falami."
          </div>
          <div style={{ marginTop: 20, fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brass-bright)" }}>Redakcja · Nr 1</div>
        </div>
      </div>
    </div>
  );
}
