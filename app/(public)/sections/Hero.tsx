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
    <section id="start" className="relative min-h-screen overflow-hidden bg-ink-deep text-paper">
      {/* Parallax hero image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/uploads/hero/hero.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(1.08)`,
            filter: "saturate(0.9)",
            willChange: "transform",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,18,34,0.45)] via-[rgba(7,18,34,0.1)] via-[30%] via-[rgba(7,18,34,0.35)] via-[65%] to-[rgba(7,18,34,0.92)]" />

      {/* Top ruled line */}
      <div className="absolute top-[120px] left-12 right-12 h-px bg-white/20 pointer-events-none" />

      {/* Logo wordmark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] text-center z-10 pg">
        <Image
          src="/uploads/logo/logo-wide.png"
          alt="Żeglarstwo"
          width={1024}
          height={131}
          priority
          className="object-contain mx-auto translate-x-[2%]"
          style={{ width: "min(800px, 90vw)", height: "auto" }}
        />
        <div className="mt-7 flex items-center justify-center gap-5">
          <span className="h-px w-[60px] bg-brass-bright inline-block" />
          <span className="font-gloock italic text-[clamp(16px,3vw,22px)] text-paper tracking-wider">
            Magazyn Miłośników Żagli
          </span>
          <span className="h-px w-[60px] bg-brass-bright inline-block" />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="pg absolute left-0 right-0 bottom-14 max-w-[1400px] mx-auto grid grid-cols-[1fr_auto_1fr] items-end gap-8 w-full box-border">
        <div className="text-white/85">
          <div className="eyebrow eyebrow-light">Numer bieżący</div>
          <div className="mt-2.5 font-gloock text-[28px] leading-[1.1] text-paper">
            Gdynia - Żeglarska Stolica Polski
          </div>
        </div>
        <a href="#kiosk" onClick={go("kiosk")} className="btn btn-brass w-fit self-end">
          Kup w kiosku <ArrowR />
        </a>
        <div className="text-right text-white/65 text-[12px] tracking-[0.2em] uppercase">
          <div className="inline-flex flex-col items-center gap-2.5">
            <div className="w-px h-14 bg-white/40" />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
