"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowR } from "@/components/icons";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <section id="start" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "var(--ink-deep)", color: "var(--paper)" }}>
      {/* Parallax hero image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(/uploads/hero/hero.jpg)",
        backgroundSize: "cover", backgroundPosition: "center 40%",
        transform: `translateY(${scrollY * 0.3}px) scale(1.08)`,
        willChange: "transform",
        filter: "saturate(0.9)",
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(7,18,34,0.45) 0%, rgba(7,18,34,0.1) 30%, rgba(7,18,34,0.35) 65%, rgba(7,18,34,0.92) 100%)",
      }} />
      {/* Top ruled line */}
      <div style={{ position: "absolute", top: 120, left: 48, right: 48, height: 1, background: "rgba(245,241,232,0.2)", pointerEvents: "none" }} />

      {/* Logo wordmark */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", maxWidth: 1400, textAlign: "center", zIndex: 10 }} className="pg">
        <Image
          src="/uploads/logo/logo-wide.png"
          alt="Żeglarstwo"
          width={1024}
          height={131}
          priority
          style={{ objectFit: "contain", width: "min(800px, 90vw)", height: "auto", margin: "0 auto", transform: "translateX(2%)" }}
        />
        <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <span style={{ height: 1, width: 60, background: "var(--brass-bright)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--f-display)", fontStyle: "italic", fontSize: "clamp(16px, 3vw, 22px)", color: "var(--paper)", letterSpacing: "0.02em" }}>
            Magazyn Miłośników Żagli
          </span>
          <span style={{ height: 1, width: 60, background: "var(--brass-bright)", display: "inline-block" }} />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="pg" style={{
        position: "absolute", left: 0, right: 0, bottom: 56,
        maxWidth: 1400, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "end", gap: 32,
        width: "100%", boxSizing: "border-box",
      }}>
        <div style={{ color: "rgba(245,241,232,0.85)" }}>
          <div className="eyebrow eyebrow-light">Numer bieżący</div>
          <div style={{ marginTop: 10, fontFamily: "var(--f-display)", fontSize: 28, lineHeight: 1.1, color: "var(--paper)" }}>
            Gdynia - Żeglarska Stolica Polski
          </div>
        </div>
        <a href="#kiosk" onClick={go("kiosk")} className="btn btn-brass" style={{ alignSelf: "end" }}>
          Kup w kiosku <ArrowR />
        </a>
        <div style={{ textAlign: "right", color: "rgba(245,241,232,0.65)", fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, flexDirection: "column" }}>
            <div style={{ width: 1, height: 56, background: "rgba(245,241,232,0.4)" }} />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
