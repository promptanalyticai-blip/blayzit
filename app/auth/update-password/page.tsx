//app/auth/update-password/page.tsx

"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  async function handleUpdate() {
    const { error } = await supabaseClient.auth.updateUser({ password });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Tu contraseña ha sido actualizada.");
    router.replace("/dashboard/historial");
  }

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Actualizar contraseña</h1>

      <input
        type="password"
        placeholder="Nueva contraseña"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Guardar cambios
      </button>
    </div>
  );
}
