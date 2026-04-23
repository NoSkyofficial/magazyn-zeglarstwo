"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowR } from "@/components/icons";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", { email: fd.get("email"), password: fd.get("password"), redirect: false });
    if (res?.ok) { router.push("/admin"); router.refresh(); }
    else setError("Nieprawidłowy email lub hasło.");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <label className="label">E-mail</label>
        <input className="input" name="email" type="email" required autoComplete="email" placeholder="redakcja@example.com" />
      </div>
      <div>
        <label className="label">Hasło</label>
        <input className="input" name="password" type="password" required autoComplete="current-password" />
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "#c0392b", background: "rgba(192,57,43,.08)", border: "1px solid rgba(192,57,43,.3)", padding: "10px 14px", margin: 0 }}>
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ justifyContent: "center", marginTop: 8 }}>
        {loading ? "Logowanie…" : <><span>Wejdź na pokład</span><ArrowR /></>}
      </button>
    </form>
  );
}
