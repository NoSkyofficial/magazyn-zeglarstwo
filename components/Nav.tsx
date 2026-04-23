"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#start", label: "Start" },
  { href: "#magazyn", label: "Magazyn" },
  { href: "#kiosk", label: "Kiosk" },
  { href: "#tematyka", label: "Tematyka" },
  { href: "#zespol", label: "Zespół" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("start");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const ids = NAV_LINKS.map((l) => l.href.slice(1));
      let cur = "start";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(11,26,44,0.95)" : "rgba(11,26,44,0)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
        transition: "background .35s, border-color .35s",
        color: "var(--paper)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", height: 72, gap: 40 }}>
        <a href="#start" onClick={go("start")} style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/uploads/logo/logo.png"
            alt="Żeglarstwo"
            width={224}
            height={29}
            style={{ objectFit: "contain", width: "auto", height: "auto" }}
            priority
          />
        </a>

        <div style={{ flex: 1 }} />

        {/* Desktop links */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }} className="hidden md:flex gap-8">
          {NAV_LINKS.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={go(n.href.slice(1))}
                style={{
                  fontFamily: "var(--f-sans)", fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.22em", textTransform: "uppercase",
                  color: active === n.href.slice(1) ? "var(--brass-bright)" : "rgba(245,241,232,0.7)",
                  textDecoration: "none", position: "relative", paddingBottom: 6,
                  transition: "color .2s",
                }}
              >
                {n.label}
                <span style={{
                  position: "absolute", left: 0, right: 0, bottom: 0, height: 1,
                  background: "var(--brass-bright)",
                  transform: active === n.href.slice(1) ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left", transition: "transform .3s",
                }} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          className="flex md:hidden flex-col gap-[6px]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
        >
          <span style={{ display: "block", width: 24, height: 1, background: "var(--paper)", transition: "transform .3s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 1, background: "var(--paper)", transition: "opacity .3s", opacity: open ? 0 : 1 }} />
          <span style={{ display: "block", width: 24, height: 1, background: "var(--paper)", transition: "transform .3s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(11,26,44,0.98)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "24px 48px" }} className="flex md:hidden flex-col gap-5">
          {NAV_LINKS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={go(n.href.slice(1))}
              style={{
                fontFamily: "var(--f-sans)", fontSize: 13, fontWeight: 600,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: active === n.href.slice(1) ? "var(--brass-bright)" : "rgba(245,241,232,0.7)",
                textDecoration: "none",
                display: "block",
                padding: "16px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
