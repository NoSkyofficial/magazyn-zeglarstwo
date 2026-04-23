"use client";
import { useState } from "react";
import Image from "next/image";

type Person = { id: string; name: string; role: string; group: string; img: string };

export default function TeamGrid({ staff, contributors }: { staff: Person[]; contributors: Person[] }) {
  return (
    <div data-reveal>
      <div className="eyebrow mb-7">I. Zespół redakcyjny</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8 mb-20">
        {staff.map((p) => <PersonCard key={p.id} p={p} />)}
      </div>

      <div className="eyebrow mb-7">II. Stali współpracownicy</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-8">
        {contributors.map((p) => <PersonCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function PersonCard({ p }: { p: Person }) {
  const [hover, setHover] = useState(false);
  const initials = p.name.split(" ").map((n) => n[0]).join("");

  return (
    <figure onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="m-0">
      <div className="aspect-[3/4] bg-ink relative overflow-hidden">
        <Image
          src={p.img}
          alt={p.name}
          fill
          className="object-cover"
          style={{
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform .6s cubic-bezier(.2,.7,.3,1)",
          }}
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 grid place-items-center text-paper/30 font-gloock text-[64px] pointer-events-none">
          {initials}
        </div>
        <div className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase text-paper bg-ink/70 px-2.5 py-1">
          {p.group === "STAFF" ? "Redakcja" : "Współpraca"}
        </div>
      </div>
      <figcaption className="pt-4 border-t border-rule mt-3.5">
        <div className="font-gloock text-xl text-ink tracking-tight">{p.name}</div>
        <div className="font-worksans text-[11px] tracking-[0.18em] uppercase text-brass-deep mt-1">{p.role}</div>
      </figcaption>
    </figure>
  );
}
