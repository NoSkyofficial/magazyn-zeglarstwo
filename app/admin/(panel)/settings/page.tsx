import { prisma } from "@/lib/prisma";
import { updateSettings, createDistributor, deleteDistributor } from "./actions";
import { AdmIcon } from "@/components/icons";

export const metadata = { title: "Ustawienia" };

export default async function SettingsPage() {
  const [settings, distributors] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.distributor.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {/* Publisher */}
      <div className="admin-card" style={{ padding: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h3>Dane wydawcy</h3>
          <span className="chip" style={{ background: "rgba(42,119,80,.15)", color: "#2a7" }}>
            <span className="chip-dot" style={{ background: "#2a7" }} /> Opublikowane
          </span>
        </div>
        <form action={updateSettings} style={{ display: "grid", gap: 14, marginTop: 20 }}>
          <Field label="Nazwa" name="publisherName" defaultValue={settings?.publisherName} />
          <Field label="Adres" name="address" defaultValue={settings?.address} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Telefon" name="phone" defaultValue={settings?.phone} />
            <Field label="E-mail" name="email" type="email" defaultValue={settings?.email} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Facebook URL" name="facebookUrl" type="url" defaultValue={settings?.facebookUrl} />
            <Field label="Instagram URL" name="instagramUrl" type="url" defaultValue={settings?.instagramUrl} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Prenumerata URL" name="subscriptionUrl" type="url" defaultValue={settings?.subscriptionUrl} />
            <Field label="Sklep URL" name="shopBaseUrl" type="url" defaultValue={settings?.shopBaseUrl} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <button type="submit" className="btn btn-primary">
              <AdmIcon name="check" size={12} /> Zapisz zmiany
            </button>
          </div>
        </form>
      </div>

      {/* Distributors */}
      <div className="admin-card" style={{ padding: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <h3>Dystrybutorzy</h3>
        </div>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column" }}>
          {distributors.map((d, i) => (
            <div key={d.id} style={{ display: "grid", gridTemplateColumns: "1fr 60px", alignItems: "center", padding: "12px 0", gap: 14, borderBottom: i < distributors.length - 1 ? "1px solid var(--rule)" : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{d.name}</div>
                <div style={{ fontSize: 11, color: "var(--ink-muted)" }}>/uploads/distributors/{d.name.toLowerCase().replace(/\s+/g, "-")}.png</div>
              </div>
              <form action={deleteDistributor.bind(null, d.id)} style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="icon-btn">
                  <AdmIcon name="trash" size={13} />
                </button>
              </form>
            </div>
          ))}
        </div>

        <form action={createDistributor} style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <input className="input" name="name" type="text" placeholder="Nazwa dystrybutora" required style={{ flex: 1 }} />
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 16px", fontSize: 10 }}>
            <AdmIcon name="plus" size={12} /> Dodaj
          </button>
        </form>

        <div style={{ marginTop: 24, padding: 16, background: "var(--paper-warm)", borderLeft: "3px solid var(--brass)" }}>
          <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: "var(--ink)" }}>Komunikat dla czytelnika</div>
          <div style={{ fontSize: 12, color: "var(--ink-muted)", lineHeight: 1.5 }}>Strona nie prowadzi sprzedaży — wszystkie CTA kierują do sklep.3oceans.pl.</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text" }: { label: string; name: string; defaultValue?: string | null; type?: string }) {
  return (
    <div>
      <label className="label" htmlFor={name}>{label}</label>
      <input className="input" id={name} name={name} type={type} defaultValue={defaultValue ?? ""} />
    </div>
  );
}
