// ui/blayzit/button.tsx
"use client";

import { useBlayzit } from "./provider";

export function BlayzitButton({
  prompt,
  children,
  className = "",
}: {
  prompt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { ejecutar, loading } = useBlayzit();

  async function handleClick() {
    await ejecutar(prompt);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold ${className}`}
    >
      {loading ? "Procesando…" : children ?? "Ejecutar"}
    </button>
  );
}
