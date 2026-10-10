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
      <div className="admin-card p-7 grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8">
        <div>
          <label className="label">Okładka {!issue && <span className="text-rust">*</span>}</label>
          <div 
            className="relative aspect-[3/4.1] border border-dashed border-rule bg-paper-warm overflow-hidden cursor-pointer" 
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <Image src={preview} alt="Podgląd" fill className="object-cover" sizes="240px" unoptimized />
            ) : (
              <div className="h-full flex flex-col items-center justify-center gap-2 text-ink-muted">
                <AdmIcon name="upload" size={24} />
                <div className="text-[11px] tracking-widest uppercase font-semibold">Wybierz plik</div>
              </div>
            )}
            {preview && (
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} 
                className="absolute right-2.5 top-2.5 bg-ink-deep/90 text-paper border-none px-2.5 py-1.5 text-[10px] tracking-widest uppercase cursor-pointer inline-flex gap-1.5 items-center transition-colors hover:bg-ink-deep"
              >
                <AdmIcon name="upload" size={12} /> Zmień
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" name="coverImage" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleFileChange} className="hidden" />
          <div className="text-[11px] text-ink-muted mt-2 leading-relaxed">
            JPEG, PNG, WebP · max 8 MB
            {issue && <><br />Zostaw puste, by zachować obecną.</>}
          </div>
        </div>

        <div className="flex flex-col gap-[18px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Etykieta <span className="text-rust">*</span></label>
              <input className="input" id="label" name="label" required defaultValue={issue?.label ?? ""} placeholder="np. 1–2 / 2026" />
            </div>
            <div>
              <label className="label">Numer <span className="text-rust">*</span></label>
              <input className="input" id="number" name="number" type="number" required min="1" defaultValue={issue?.number ?? ""} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Rok <span className="text-rust">*</span></label>
              <input className="input" id="year" name="year" type="number" required min="2000" max="2100" defaultValue={issue?.year ?? new Date().getFullYear()} />
            </div>
            <div>
              <label className="label">Data publikacji <span className="text-rust">*</span></label>
              <input className="input" id="publishedAt" name="publishedAt" type="date" required defaultValue={defaultDate} />
            </div>
          </div>

          <div>
            <label className="label">URL w sklepie <span className="text-rust">*</span></label>
            <input className="input" id="shopUrl" name="shopUrl" type="url" required defaultValue={issue?.shopUrl ?? "https://sklep.3oceans.pl"} />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-paper-warm border border-rule/30 rounded-sm">
            <div>
              <div className="text-[13px] font-medium text-ink">Numer bieżący</div>
              <div className="text-[12px] text-ink-muted">Wyświetlany na stronie w sekcji „Kiosk"</div>
            </div>
            <input id="isCurrent" name="isCurrent" type="checkbox" defaultChecked={issue?.isCurrent ?? false} className="w-[18px] h-[18px] accent-brass cursor-pointer" />
          </div>

          <div className="flex gap-2.5 justify-end mt-2">
            <a href="/admin/issues" className="btn py-2.5 px-6">Anuluj</a>
            <button type="submit" className="btn btn-primary py-2.5 px-6">
              <AdmIcon name="check" size={12} /> Zapisz
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
