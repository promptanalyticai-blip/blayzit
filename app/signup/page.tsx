//app/signup/page.tsx

"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, companyName }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(JSON.stringify(data.error ?? data));
    } else {
      window.location.href = "/login";
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>Crear cuenta y empresa</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <input
        placeholder="Nombre de la empresa"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
      />

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creando..." : "Crear cuenta y empresa"}
      </button>

      {error && <pre>{error}</pre>}
    </div>
  );
}
