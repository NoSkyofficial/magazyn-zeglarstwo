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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 24 }}>
      {archive.map((issue, i) => <ArchiveCover key={issue.id} issue={issue} i={i} />)}
    </div>
  );
}

function ArchiveCover({ issue, i }: { issue: Issue; i: number }) {
  const [hover, setHover] = useState(false);
  const gradients = ["#0b1a2c", "#142232", "#1a2c44", "#0f1e30", "#1c2638", "#07111f"];

  return (
    <a
      href={issue.shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{
        aspectRatio: "3/4", position: "relative", overflow: "hidden",
        background: gradients[i % gradients.length],
        border: "1px solid var(--brass)",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform .4s cubic-bezier(.2,.7,.3,1), box-shadow .4s",
        boxShadow: hover ? "0 24px 48px rgba(0,0,0,.5)" : "0 8px 20px rgba(0,0,0,.35)",
      }}>
        <Image
          src={issue.coverImage}
          alt={`Numer ${issue.label}`}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px solid rgba(245,241,232,.14)", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--f-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brass-bright)" }}>Nr {issue.number}</span>
        <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "rgba(245,241,232,.6)" }}>{issue.label}</span>
      </div>
    </a>
  );
}
