import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink-deep)", color: "rgba(245,241,232,.55)", padding: "40px 0 32px", borderTop: "1px solid rgba(245,241,232,.12)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
        <Image src="/uploads/logo/logo.png" alt="Żeglarstwo" width={150} height={20} style={{ objectFit: "contain", width: "auto", height: "auto" }} />
        <span style={{ fontSize: 12 }}>© {new Date().getFullYear()} 3 Oceans Sp. z o.o. Wszelkie prawa zastrzeżone.</span>
        <span style={{ flex: 1 }} />
        <a href="#" className="ul-link" style={{ fontSize: 12, color: "inherit" }}>Polityka prywatności</a>
        <a href="#" className="ul-link" style={{ fontSize: 12, color: "inherit" }}>Regulamin</a>
        <a href="https://www.facebook.com/magazyn.zeglarstwo/" target="_blank" rel="noopener noreferrer" className="ul-link" style={{ fontSize: 12, color: "inherit" }}>Facebook</a>
        <a href="https://www.instagram.com/magazyn.zeglarstwo/" target="_blank" rel="noopener noreferrer" className="ul-link" style={{ fontSize: 12, color: "inherit" }}>Instagram</a>
      </div>
    </footer>
  );
}
