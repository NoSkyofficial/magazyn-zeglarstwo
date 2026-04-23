"use client";
import { useState } from "react";
import Image from "next/image";

type Person = { id: string; name: string; role: string; group: string; img: string };

export default function TeamGrid({ staff, contributors }: { staff: Person[]; contributors: Person[] }) {
  return (
    <div data-reveal>
      <div className="eyebrow" style={{ marginBottom: 28 }}>I. Zespół redakcyjny</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 32, marginBottom: 80 }}>
        {staff.map((p) => <PersonCard key={p.id} p={p} />)}
      </div>

      <div className="eyebrow" style={{ marginBottom: 28 }}>II. Stali współpracownicy</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 32 }}>
        {contributors.map((p) => <PersonCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function PersonCard({ p }: { p: Person }) {
  const [hover, setHover] = useState(false);
  const initials = p.name.split(" ").map((n) => n[0]).join("");

  return (
    <figure onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ margin: 0 }}>
      <div style={{ aspectRatio: "3/4", background: "var(--ink)", position: "relative", overflow: "hidden" }}>
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
        <div style={{
          position: "absolute", inset: 0, display: "grid", placeItems: "center",
          color: "rgba(245,241,232,.3)", fontFamily: "var(--f-display)", fontSize: 64,
          pointerEvents: "none",
        }}>
          {initials}
        </div>
        <div style={{ position: "absolute", top: 12, left: 12, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--paper)", background: "rgba(11,26,44,.7)", padding: "4px 10px" }}>
          {p.group === "STAFF" ? "Redakcja" : "Współpraca"}
        </div>
      </div>
      <figcaption style={{ paddingTop: 16, borderTop: "1px solid var(--rule)", marginTop: 14 }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 20, color: "var(--ink)", letterSpacing: "-0.005em" }}>{p.name}</div>
        <div style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brass-deep)", marginTop: 4 }}>{p.role}</div>
      </figcaption>
    </figure>
  );
}
