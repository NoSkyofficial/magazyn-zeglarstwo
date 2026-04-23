"use client";
import { useState } from "react";
import Image from "next/image";
import { TopicArt, Compass } from "@/components/icons";

type Topic = { id: string; slug: string; title: string; description: string; order: number; image: string };

export default function TopicsGrid({ topics }: { topics: Topic[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] border-t border-l border-rule">
      {topics.map((t, i) => <TopicCard key={t.id} t={t} n={String(i + 1).padStart(2, "0")} />)}
    </div>
  );
}

function TopicCard({ t, n }: { t: Topic; n: string }) {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setHover(!hover); }}
      className="relative aspect-[4/3] border-r border-b border-rule overflow-hidden cursor-pointer bg-ink-deep text-paper outline-none focus-visible:ring-2 focus-visible:ring-brass-bright z-0"
    >
      {/* Art */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
        style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
      >
        <TopicArt slug={t.slug} />
        {t.image && t.image !== `/uploads/topics/${t.slug}.jpg` && (
          <Image
            src={t.image}
            alt={t.title}
            fill
            className="object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/20 from-[40%] to-ink-deep/85" />

      {/* Top corner */}
      <div className="absolute top-5 left-6 right-6 flex justify-between items-center">
        <span className="font-gloock text-[14px] text-brass-bright tracking-widest">№ {n}</span>
        <Compass size={18} color="rgba(245,241,232,0.45)" />
      </div>

      {/* Bottom */}
      <div className="absolute left-6 right-6 bottom-6">
        <h3 className="font-gloock font-normal text-[30px] leading-[1.05] m-0 text-paper tracking-tight">
          {t.title}
        </h3>
        <div 
          className="overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.2,0.7,0.3,1)]"
          style={{ 
            maxHeight: hover ? "200px" : "0", 
            opacity: hover ? 1 : 0,
            marginTop: hover ? "14px" : "0"
          }}
        >
          <p className="font-worksans text-[13px] leading-[1.55] text-paper/90 m-0 pb-1">
            {t.description}
          </p>
        </div>
      </div>
    </div>
  );
}
