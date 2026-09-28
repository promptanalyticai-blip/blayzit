// ui/blayzit/input.tsx
"use client";

import { useState } from "react";
import { useBlayzitUI } from "./provider";

export function BlayzitInput() {
  const { ejecutar } = useBlayzitUI();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    await ejecutar(value);
    setLoading(false);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe un prompt…"
        className="w-full p-3 border rounded"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded"
        disabled={loading}
      >
        {loading ? "Procesando..." : "Ejecutar motor"}
      </button>
    </form>
  );
}
