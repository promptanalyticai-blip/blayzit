// ui/blayzit/result-viewer.tsx
"use client";

import { useBlayzit } from "./provider";

export function BlayzitResultViewer({
  className = "",
}: {
  className?: string;
}) {
  const { resultado, loading } = useBlayzit();

  return (
    <div className={`p-4 rounded ${className}`}>
      <h2 className="text-xl font-bold mb-3">Resultado</h2>

      <div className="bg-black text-green-300 p-3 rounded h-48 overflow-auto text-sm font-mono">
        {loading
          ? "Procesando..."
          : resultado
          ? JSON.stringify(resultado, null, 2)
          : "Sin resultados aún."}
      </div>
    </div>
  );
}
