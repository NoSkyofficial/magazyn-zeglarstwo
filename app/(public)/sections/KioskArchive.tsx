"use client";
import { useState } from "react";
import Image from "next/image";

type Issue = {
  id: string;
  label: string;
  number: number;
  coverImage: string;
  shopUrl: string;
};

export default function KioskArchive({ archive }: { archive: Issue[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6">
      {archive.map((issue, i) => <ArchiveCover key={issue.id} issue={issue} i={i} />)}
    </div>
  );
}

function ArchiveCover({ issue, i }: { issue: Issue; i: number }) {
  const [hover, setHover] = useState(false);
  const gradients = ["bg-[#0b1a2c]", "bg-[#142232]", "bg-[#1a2c44]", "bg-[#0f1e30]", "bg-[#1c2638]", "bg-[#07111f]"];

  return (
    <a
      href={issue.shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="no-underline text-inherit block outline-none"
    >
      <div 
        className={`aspect-[3/4] relative overflow-hidden border border-brass transition-all duration-500 ease-[cubic-bezier(0.2,0.7,0.3,1)] ${gradients[i % gradients.length]}`}
        style={{ 
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hover ? "0 24px 48px rgba(0,0,0,.5)" : "0 8px 20px rgba(0,0,0,.35)"
        }}
      >
        <Image
          src={issue.coverImage}
          alt={`Numer ${issue.label}`}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      <div className="mt-3.5 pt-2.5 border-t border-paper-line/10 flex justify-between">
        <span className="font-worksans text-[11px] tracking-[0.16em] uppercase text-brass-bright font-semibold">Nr {issue.number}</span>
        <span className="text-[11px] tracking-[0.12em] text-paper/60">{issue.label}</span>
      </div>
    </a>
  );
}
