// Shared SVG primitives for ŻEGLARSTWO

export function Compass({ size = 32, color = "currentColor", style }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={style} fill="none" stroke={color} strokeWidth="1.2" aria-hidden>
      <circle cx="32" cy="32" r="28" />
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="2" fill={color} stroke="none" />
      <path d="M32 4 L35 30 L32 32 L29 30 Z" fill={color} stroke="none" />
      <path d="M32 60 L35 34 L32 32 L29 34 Z" fill={color} fillOpacity=".5" stroke="none" />
      <path d="M60 32 L34 35 L32 32 L34 29 Z" fill={color} fillOpacity=".5" stroke="none" />
      <path d="M4 32 L30 35 L32 32 L30 29 Z" fill={color} fillOpacity=".5" stroke="none" />
      <path d="M48 16 L36 28 L34 26 Z" fill={color} fillOpacity=".3" stroke="none" />
      <path d="M48 48 L36 36 L34 38 Z" fill={color} fillOpacity=".3" stroke="none" />
      <path d="M16 48 L28 36 L26 38 Z" fill={color} fillOpacity=".3" stroke="none" />
      <path d="M16 16 L28 28 L26 26 Z" fill={color} fillOpacity=".3" stroke="none" />
      <text x="32" y="14" fontSize="5" fill={color} textAnchor="middle" fontFamily="Gloock,serif" stroke="none">N</text>
    </svg>
  );
}

export function ArrowR({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size * 1.8} height={size} viewBox="0 0 28 14" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" aria-hidden>
      <path d="M1 7h25M20 2l5.5 5L20 12" />
    </svg>
  );
}

export function HRule({ color = "currentColor", width = 120 }: { color?: string; width?: number }) {
  return (
    <svg width={width} height="8" viewBox="0 0 120 8" fill={color} aria-hidden>
      <line x1="0" y1="4" x2="50" y2="4" stroke={color} strokeWidth="1" />
      <circle cx="56" cy="4" r="1.5" />
      <circle cx="60" cy="4" r="1.5" />
      <circle cx="64" cy="4" r="1.5" />
      <line x1="70" y1="4" x2="120" y2="4" stroke={color} strokeWidth="1" />
    </svg>
  );
}

export function FbIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M13 22V12h3l1-4h-4V6c0-1.2.4-2 2-2h2V.2C16.6.1 15.4 0 14 0c-3 0-5 1.8-5 5v3H6v4h3v10h4z" />
    </svg>
  );
}

export function IgIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export function AdmIcon({ name, size = 16 }: { name: string; size?: number }) {
  const paths: Record<string, string> = {
    dashboard: "M3 3h7v7H3zM3 14h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7z",
    issues:    "M4 4h12l4 4v12H4zM16 4v4h4",
    pages:     "M5 3h14v18H5zM9 7h6M9 11h6M9 15h4",
    topics:    "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    team:      "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 4a4 4 0 1 1-8 0 4 4 0 0 1 8 0M22 20v-2a4 4 0 0 0-3-3.87M17 4.13a4 4 0 0 1 0 7.75",
    settings:  "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z",
    logout:    "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    plus:      "M12 5v14M5 12h14",
    edit:      "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z",
    trash:     "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6",
    drag:      "M9 5h2v2H9zM13 5h2v2h-2zM9 11h2v2H9zM13 11h2v2h-2zM9 17h2v2H9zM13 17h2v2h-2z",
    star:      "M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z",
    bold:      "M6 4h7a4 4 0 1 1 0 8H6zM6 12h8a4 4 0 1 1 0 8H6z",
    italic:    "M19 4h-9M14 20H5M15 4L9 20",
    h1:        "M4 6v12M12 6v12M4 12h8M17 18V9l-3 2",
    h2:        "M4 6v12M12 6v12M4 12h8M16 10a2 2 0 1 1 4 0c0 1-4 4-4 8h4",
    list:      "M3 6h2M9 6h12M3 12h2M9 12h12M3 18h2M9 18h12",
    quote:     "M3 11h4v4H3zM3 11c0-3 1-5 4-6M13 11h4v4h-4zM13 11c0-3 1-5 4-6",
    link:      "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
    upload:    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    check:     "M4 12l5 5L20 6",
    eye:       "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    search:    "M11 11a7 7 0 1 0-14 0 7 7 0 0 0 14 0zM21 21l-5-5",
    chevron:   "M9 6l6 6-6 6",
    bell:      "M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
    globe:     "M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zM1 12h22M12 1a17 17 0 0 1 0 22M12 1a17 17 0 0 0 0 22",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={paths[name] ?? ""} />
    </svg>
  );
}

// SVG topic art — one per slug, no external images needed
export function TopicArt({ slug }: { slug: string }) {
  const stroke = "#f5f1e8";
  const accent = "#c9a35f";
  const bgBySlug: Record<string, string> = {
    "ku-przestrodze":    "#1c2638",
    "wielkie-regaty":    "#0b1a2c",
    "rozmowy-i-wywiady": "#23303f",
    "akweny-i-miejsca":  "#142232",
    "wiedza-i-nauka":    "#0b1a2c",
    "kultura-i-sztuka":  "#1a2c44",
    "jachty-i-zaglowce": "#0f1e30",
    "sail-training":     "#142232",
    "felietony":         "#221b12",
  };
  const fill = bgBySlug[slug] ?? "#0b1a2c";

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden>
      <rect width="400" height="300" fill={fill} />
      {slug === "ku-przestrodze" && <>
        <path d="M0 210 Q80 195 160 205 T320 198 T400 210 V300 H0 Z" fill="#08141f" />
        <path d="M0 240 Q100 225 200 235 T400 232 V300 H0 Z" fill="#060e18" />
        <g stroke={stroke} strokeWidth="0.8" fill="none" opacity=".25">
          <path d="M10 60 Q100 40 200 55 T390 50" />
          <path d="M10 80 Q120 65 240 78 T390 72" />
        </g>
        <g transform="translate(300,110)">
          <path d="M0 100 L10 0 L20 0 L30 100 Z" fill={stroke} />
          <rect x="5" y="-16" width="20" height="16" fill={accent} />
          <path d="M-8 -24 L38 -24 L34 -18 L-4 -18 Z" fill={stroke} />
          <path d="M25 -8 L80 -18 L80 -6 Z" fill={accent} opacity=".5" />
        </g>
      </>}
      {slug === "wielkie-regaty" && <>
        <path d="M0 220 Q100 200 200 215 T400 210 V300 H0 Z" fill="#07111f" />
        {([{x:60,h:120},{x:140,h:160},{x:220,h:130},{x:300,h:150},{x:360,h:110}] as {x:number;h:number}[]).map((s,i)=>(
          <g key={i} transform={`translate(${s.x},${220-s.h})`}>
            <path d={`M0 0 L0 ${s.h} M-2 ${s.h} L22 ${s.h}`} stroke={stroke} strokeWidth="1.2" fill="none"/>
            <path d={`M0 4 L18 ${s.h-4} L0 ${s.h-4} Z`} fill={stroke} fillOpacity={0.85-i*0.08} stroke="none"/>
            <path d={`M-2 16 L-18 ${s.h-4} L-2 ${s.h-4} Z`} fill={stroke} fillOpacity={0.6-i*0.05} stroke="none"/>
          </g>
        ))}
      </>}
      {slug === "rozmowy-i-wywiady" && <>
        <g fill={stroke} opacity=".9">
          <path d="M80 80 Q60 80 60 110 L60 180 L130 180 L130 130 L100 130 Q100 110 130 110 Z" />
          <path d="M230 80 Q210 80 210 110 L210 180 L280 180 L280 130 L250 130 Q250 110 280 110 Z" />
        </g>
        <line x1="60" y1="220" x2="340" y2="220" stroke={accent} strokeWidth="1"/>
      </>}
      {slug === "akweny-i-miejsca" && <>
        <g stroke={stroke} strokeWidth="0.6" fill="none" opacity=".35">
          {[40,80,120,160,200,240,280].map(y=><line key={y} x1="0" y1={y} x2="400" y2={y}/>)}
          {[40,100,160,220,280,340].map(x=><line key={x} x1={x} y1="0" x2={x} y2="300"/>)}
        </g>
        <path d="M20 200 Q60 180 100 195 T180 190 Q210 165 240 180 T320 175 L380 190 L380 240 L20 240 Z" fill="#08141f" stroke={stroke} strokeWidth="0.8"/>
        <g transform="translate(220,120)">
          <path d="M0 0 C-14 0 -14 18 0 30 C14 18 14 0 0 0 Z" fill={accent} stroke="none"/>
          <circle cx="0" cy="10" r="4" fill={fill} stroke="none"/>
        </g>
      </>}
      {slug === "wiedza-i-nauka" && <>
        <g stroke={stroke} strokeWidth="0.8" fill="none">
          <circle cx="200" cy="160" r="100" />
          <circle cx="200" cy="160" r="70" />
          <circle cx="200" cy="160" r="40" opacity=".5"/>
          {[0,30,60,90,120,150].map(a=>(
            <line key={a} x1={200} y1={160} x2={200+100*Math.cos(a*Math.PI/180)} y2={160+100*Math.sin(a*Math.PI/180)} opacity=".4"/>
          ))}
        </g>
        <path d="M200 60 L204 160 L200 164 L196 160 Z" fill={accent} stroke="none"/>
        <circle cx="200" cy="160" r="3" fill={accent} stroke="none"/>
      </>}
      {slug === "kultura-i-sztuka" && <>
        <rect x="80" y="60" width="240" height="200" fill="none" stroke={stroke} strokeWidth="1" />
        <rect x="96" y="76" width="208" height="168" fill="none" stroke={accent} strokeWidth="0.8" />
        <g fill={stroke} opacity=".9">
          <path d="M160 160 Q180 140 200 160 Q220 180 240 160 L240 200 L160 200 Z" />
          <circle cx="180" cy="130" r="8" fill={accent} stroke="none"/>
        </g>
      </>}
      {slug === "jachty-i-zaglowce" && <>
        <g stroke={stroke} strokeWidth="0.8" fill="none">
          <path d="M40 180 Q200 250 360 180 L340 170 Q200 225 60 170 Z" fill={stroke} fillOpacity=".1"/>
          <line x1="200" y1="30" x2="200" y2="200"/>
          <path d="M200 40 L200 170 M200 50 L255 165 M200 70 L255 165 M200 100 L255 165"/>
          <path d="M200 40 L155 170 M200 80 L155 170"/>
        </g>
        <circle cx="200" cy="30" r="3" fill={accent} stroke="none"/>
      </>}
      {slug === "sail-training" && <>
        <g fill="none" stroke={stroke} strokeWidth="8" strokeLinecap="round">
          <path d="M100 80 C 160 80, 160 220, 220 220" />
          <path d="M220 80 C 280 80, 160 220, 220 220" opacity=".6"/>
        </g>
        <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
          <path d="M100 80 C 160 80, 160 220, 220 220" />
          <path d="M220 80 C 280 80, 160 220, 220 220" opacity=".8"/>
        </g>
      </>}
      {slug === "felietony" && <>
        <rect x="60" y="70" width="280" height="160" fill="#1a130a" />
        <g stroke="#e8d9b0" strokeWidth="1">
          {[0,1,2,3,4,5,6,7,8].map(i=><line key={i} x1="80" y1={90+i*16} x2={i%3===2?260:300} y2={90+i*16} />)}
        </g>
        <circle cx="330" cy="220" r="14" fill={accent} stroke="none"/>
      </>}
    </svg>
  );
}
