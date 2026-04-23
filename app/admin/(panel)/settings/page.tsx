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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Publisher */}
      <div className="admin-card p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-gloock text-ink">Dane wydawcy</h3>
          <span className="chip bg-green-500/10 text-green-700 border border-green-200">
            <span className="chip-dot bg-green-600" /> Aktywne
          </span>
        </div>
        <form action={updateSettings} className="grid gap-4 mt-5">
          <Field label="Nazwa" name="publisherName" defaultValue={settings?.publisherName} required />
          <Field label="Adres" name="address" defaultValue={settings?.address} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Telefon" name="phone" defaultValue={settings?.phone} />
            <Field label="E-mail" name="email" type="email" defaultValue={settings?.email} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Facebook URL" name="facebookUrl" type="url" defaultValue={settings?.facebookUrl} />
            <Field label="Instagram URL" name="instagramUrl" type="url" defaultValue={settings?.instagramUrl} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Prenumerata URL" name="subscriptionUrl" type="url" defaultValue={settings?.subscriptionUrl} />
            <Field label="Sklep URL" name="shopBaseUrl" type="url" defaultValue={settings?.shopBaseUrl} />
          </div>
          <div className="flex gap-2.5 justify-end mt-2">
            <button type="submit" className="btn btn-primary">
              <AdmIcon name="check" size={12} /> Zapisz zmiany
            </button>
          </div>
        </form>
      </div>

      {/* Distributors */}
      <div className="admin-card p-7">
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-gloock text-ink">Dystrybutorzy</h3>
        </div>
        <div className="mt-4 flex flex-col">
          {distributors.map((d, i) => (
            <div key={d.id} className={`grid grid-cols-[1fr,60px] items-center py-3 gap-4 ${i < distributors.length - 1 ? "border-b border-rule" : ""}`}>
              <div>
                <div className="text-sm font-medium text-ink">{d.name}</div>
                <div className="text-[11px] text-ink-muted">/uploads/distributors/{d.name.toLowerCase().replace(/\s+/g, "-")}.png</div>
              </div>
              <form action={deleteDistributor.bind(null, d.id)} className="flex justify-end">
                <button type="submit" className="icon-btn hover:text-rust hover:border-rust transition-colors">
                  <AdmIcon name="trash" size={13} />
                </button>
              </form>
            </div>
          ))}
        </div>

        <form action={createDistributor} className="flex gap-2.5 mt-5">
          <input className="input flex-1" name="name" type="text" placeholder="Nazwa dystrybutora" required />
          <button type="submit" className="btn btn-primary py-2.5 px-4 text-[10px]">
            <AdmIcon name="plus" size={12} /> Dodaj
          </button>
        </form>

        <div className="mt-6 p-4 bg-paper-warm border-l-4 border-brass">
          <div className="text-[12px] font-bold mb-1 text-ink">Komunikat dla czytelnika</div>
          <div className="text-[12px] text-ink-muted leading-relaxed">Strona nie prowadzi sprzedaży — wszystkie CTA kierują do sklep.3oceans.pl.</div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", required = false }: { label: string; name: string; defaultValue?: string | null; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="label" htmlFor={name}>{label} {required && <span className="text-rust">*</span>}</label>
      <input className="input" id={name} name={name} type={type} defaultValue={defaultValue ?? ""} required={required} />
    </div>
  );
}
