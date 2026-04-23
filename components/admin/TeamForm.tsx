"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import type { TeamMember } from "@prisma/client";

interface Props {
  action: (formData: FormData) => Promise<void>;
  member?: TeamMember;
}

export default function TeamForm({ action, member }: Props) {
  const [preview, setPreview] = useState<string | null>(member?.photo ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Photo upload */}
      <div className="flex flex-col gap-2">
        <label className="section-label text-navy-300">Zdjęcie</label>
        <div className="flex gap-6 items-start">
          {preview ? (
            <div className="relative w-24 h-32 bg-navy-800 overflow-hidden shrink-0">
              <Image src={preview} alt="Podgląd zdjęcia" fill className="object-cover" sizes="96px" unoptimized />
            </div>
          ) : (
            <div
              className="w-24 h-32 bg-navy-800 border-2 border-dashed border-navy-600 flex flex-col gap-2 items-center justify-center text-navy-500 text-xs cursor-pointer shrink-0 hover:bg-navy-700 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span>Wybierz</span>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <input
              ref={fileRef}
              type="file"
              name="photo"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              className="text-xs text-navy-300 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-navy-800 file:text-navy-200 file:cursor-pointer file:hover:bg-navy-700 file:transition-colors"
            />
            <p className="text-xs text-navy-500">JPEG, PNG, WebP, AVIF · max 8 MB</p>
            {member && <p className="text-xs text-navy-500">Zostaw puste, by zachować obecne zdjęcie.</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="section-label text-navy-300">Imię i nazwisko <span className="text-red-400">*</span></label>
        <input name="name" type="text" required defaultValue={member?.name ?? ""} className="input-field" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="section-label text-navy-300">Rola <span className="text-red-400">*</span></label>
        <input name="role" type="text" required defaultValue={member?.role ?? ""} placeholder="np. Redaktor Naczelny" className="input-field" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="section-label text-navy-300">Grupa</label>
        <select name="group" className="input-field" defaultValue={member?.group ?? "STAFF"}>
          <option value="STAFF">Zespół redakcyjny</option>
          <option value="CONTRIBUTOR">Stali współpracownicy</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="section-label bg-brass-400 hover:bg-brass-300 text-navy-950 font-bold px-6 py-2.5 transition-colors">
          Zapisz
        </button>
        <a href="/admin/team" className="section-label text-navy-400 hover:text-paper border border-navy-700 hover:border-navy-500 px-6 py-2.5 transition-colors">
          Anuluj
        </a>
      </div>
    </form>
  );
}
