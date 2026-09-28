//app/auth/reset/page.tsx

"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendReset() {
    setMessage("");

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Hemos enviado un enlace para restablecer tu contraseña.");
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Restablecer contraseña</h1>

      <input
        type="email"
        placeholder="Tu correo"
        className="border p-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={sendReset}
        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Enviar enlace
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
