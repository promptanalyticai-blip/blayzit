// ui/blayzit/input-runner.tsx
"use client";

import { useState } from "react";
import { useBlayzit } from "./provider";

export function BlayzitInputRunner({
  placeholder = "Escribe un prompt…",
  buttonLabel = "Ejecutar",
  className = "",
}: {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}) {
  const { ejecutar, loading } = useBlayzit();
  const [value, setValue] = useState("");

  async function handleRun() {
    if (!value.trim()) return;
    await ejecutar(value);
    setValue("");
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 p-2 border rounded bg-white text-black"
      />

      <button
        onClick={handleRun}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded font-semibold"
      >
        {loading ? "..." : buttonLabel}
      </button>
    </div>
  );
}
