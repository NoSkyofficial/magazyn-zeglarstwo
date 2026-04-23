"use client";
import { useState } from "react";
import { TopicArt, Compass } from "@/components/icons";

type Topic = { id: string; slug: string; title: string; description: string; order: number; image: string };

export default function TopicsGrid({ topics }: { topics: Topic[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]" style={{ borderTop: "1px solid var(--rule)", borderLeft: "1px solid var(--rule)" }}>
      {topics.map((t, i) => <TopicCard key={t.id} t={t} n={String(i + 1).padStart(2, "0")} />)}
    </div>
  );
}

function TopicCard({ t, n }: { t: Topic; n: string }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", aspectRatio: "4/3",
        borderRight: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)",
        overflow: "hidden", cursor: "pointer", background: "var(--ink-deep)", color: "var(--paper)",
      }}
    >
      {/* Art */}
      <div style={{
        position: "absolute", inset: 0,
        transform: hover ? "scale(1.05)" : "scale(1)",
        transition: "transform .8s cubic-bezier(.2,.7,.3,1)",
      }}>
        <TopicArt slug={t.slug} />
        {t.image && t.image !== `/uploads/topics/${t.slug}.jpg` && (
          <img src={t.image} alt={t.title} onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(7,18,34,0.2) 40%, rgba(7,18,34,0.85) 100%)" }} />

      {/* Top corner */}
      <div style={{ position: "absolute", top: 20, left: 24, right: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--f-display)", fontSize: 14, color: "var(--brass-bright)", letterSpacing: "0.1em" }}>№ {n}</span>
        <Compass size={18} color="rgba(245,241,232,0.45)" />
      </div>

      {/* Bottom */}
      <div style={{ position: "absolute", left: 24, right: 24, bottom: 24 }}>
        <h3 style={{ fontFamily: "var(--f-display)", fontWeight: 400, fontSize: 30, lineHeight: 1.05, margin: 0, color: "var(--paper)", letterSpacing: "-0.005em" }}>
          {t.title}
        </h3>
        <div style={{
          maxHeight: hover ? 200 : 0, opacity: hover ? 1 : 0,
          overflow: "hidden",
          transition: "max-height .5s cubic-bezier(.2,.7,.3,1), opacity .35s .1s, margin-top .4s",
          marginTop: hover ? 14 : 0,
        }}>
          <p style={{ fontFamily: "var(--f-sans)", fontSize: 13, lineHeight: 1.55, color: "rgba(245,241,232,0.88)", margin: 0, paddingBottom: 4 }}>
            {t.description}
          </p>
        </div>
      </div>
    </div>
  );
}
