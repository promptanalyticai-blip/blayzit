//app/auth/forgot-password/page.tsx

"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleReset() {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Revisa tu correo para continuar.");
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Recuperar contraseña</h1>

      <input
        type="email"
        placeholder="Correo"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Enviar enlace
      </button>
    </div>
  );
}
