// ui/blayzit/panel-client.tsx
"use client";

import { useEffect } from "react";
import { useBlayzitClient } from "./use-blayzit-client";

export function BlayzitPanelClient() {
  const { analisis, analysis, loading } = useBlayzitClient();

  useEffect(() => {
    analisis();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        Cargando análisis…
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        Sin datos disponibles.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">Panel BLAYZIT (Client)</h2>

      <div>
        <p className="font-semibold">Total registros:</p>
        <p>{analysis.total}</p>
      </div>

      <div>
        <p className="font-semibold">Último prompt:</p>
        <p>{analysis.ultimoPrompt ?? "Sin datos"}</p>
      </div>

      <div>
        <p className="font-semibold">Último resultado:</p>
        <p>{analysis.ultimoResultado ?? "Sin datos"}</p>
      </div>

      <pre className="bg-white p-3 rounded text-sm">
        {JSON.stringify(analysis.items, null, 2)}
      </pre>
    </div>
  );
}
