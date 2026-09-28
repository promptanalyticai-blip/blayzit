// ui/blayzit/analysis-viewer.tsx
"use client";

import { useBlayzit } from "./provider";

export function BlayzitAnalysisViewer({
  className = "",
}: {
  className?: string;
}) {
  const { analysis, loading } = useBlayzit();

  return (
    <div className={`p-4 rounded ${className}`}>
      <h2 className="text-xl font-bold mb-3">Análisis</h2>

      <div className="bg-black text-blue-300 p-3 rounded h-64 overflow-auto text-sm font-mono">
        {loading
          ? "Procesando análisis..."
          : analysis
          ? JSON.stringify(analysis, null, 2)
          : "Sin análisis aún."}
      </div>
    </div>
  );
}
