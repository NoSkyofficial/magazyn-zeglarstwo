import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main style={{ background: "var(--paper)" }}>{children}</main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
