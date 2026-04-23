"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Issue } from "@prisma/client";
import { AdmIcon, ArrowR } from "@/components/icons";

interface Props {
  action: (formData: FormData) => Promise<void>;
  issue?: Issue;
}

export default function IssueForm({ action, issue }: Props) {
  const [preview, setPreview] = useState<string | null>(issue?.coverImage ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const defaultDate = issue?.publishedAt ? new Date(issue.publishedAt).toISOString().slice(0, 10) : "";

  return (
    <form action={action}>
      <div className="admin-card" style={{ padding: 28, display: "grid", gridTemplateColumns: "240px 1fr", gap: 32 }}>
        {/* Cover */}
        <div>
          <label className="label">Okładka {!issue && <span style={{ color: "var(--rust)" }}>*</span>}</label>
          <div style={{ position: "relative", aspectRatio: "3/4.1", border: "1px dashed var(--rule)", background: "var(--paper-warm)", overflow: "hidden", cursor: "pointer" }} onClick={() => fileRef.current?.click()}>
            {preview ? (
              <Image src={preview} alt="Podgląd" fill className="object-cover" sizes="240px" unoptimized />
            ) : (
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--ink-muted)" }}>
                <AdmIcon name="upload" size={24} />
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}>Wybierz plik</div>
              </div>
            )}
            {preview && (
              <button type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} style={{ position: "absolute", right: 10, top: 10, background: "rgba(7,18,34,.9)", color: "var(--paper)", border: "none", padding: "6px 10px", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }}>
                <AdmIcon name="upload" size={12} /> Zmień
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" name="coverImage" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileChange} style={{ display: "none" }} />
          <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 8 }}>JPEG, PNG, WebP · max 8 MB{issue && <><br />Zostaw puste, by zachować obecną.</>}</div>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="label">Label <span style={{ color: "var(--rust)" }}>*</span></label>
              <input className="input" id="label" name="label" required defaultValue={issue?.label ?? ""} placeholder="np. 1–2 / 2026" />
            </div>
            <div>
              <label className="label">Numer <span style={{ color: "var(--rust)" }}>*</span></label>
              <input className="input" id="number" name="number" type="number" required min="1" defaultValue={issue?.number ?? ""} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label className="label">Rok <span style={{ color: "var(--rust)" }}>*</span></label>
              <input className="input" id="year" name="year" type="number" required min="2000" max="2100" defaultValue={issue?.year ?? new Date().getFullYear()} />
            </div>
            <div>
              <label className="label">Data publikacji <span style={{ color: "var(--rust)" }}>*</span></label>
              <input className="input" id="publishedAt" name="publishedAt" type="date" required defaultValue={defaultDate} />
            </div>
          </div>

          <div>
            <label className="label">URL w sklepie <span style={{ color: "var(--rust)" }}>*</span></label>
            <input className="input" id="shopUrl" name="shopUrl" type="url" required defaultValue={issue?.shopUrl ?? "https://sklep.3oceans.pl"} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 14, background: "var(--paper-warm)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>Numer bieżący</div>
              <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>Wyświetlany na stronie w sekcji „Kiosk"</div>
            </div>
            <input id="isCurrent" name="isCurrent" type="checkbox" defaultChecked={issue?.isCurrent ?? false} style={{ width: 18, height: 18, accentColor: "var(--brass)", cursor: "pointer" }} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
            <a href="/admin/issues" className="btn">Anuluj</a>
            <button type="submit" className="btn btn-primary">
              <AdmIcon name="check" size={12} /> Zapisz
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
