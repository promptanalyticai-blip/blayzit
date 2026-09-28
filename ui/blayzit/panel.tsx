// ui/blayzit/panel.tsx
"use client";

import { useEffect, useState } from "react";
import { useBlayzitUI } from "./provider";

export function BlayzitPanel() {
  const { analisis } = useBlayzitUI();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await analisis();
    setData(res);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 rounded">
        Cargando análisis…
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold">Panel BLAYZIT</h2>

      <div>
        <p className="font-semibold">Total registros:</p>
        <p>{data.total}</p>
      </div>

      <div>
        <p className="font-semibold">Último prompt:</p>
        <p>{data.ultimoPrompt ?? "Sin datos"}</p>
      </div>

      <div>
        <p className="font-semibold">Último resultado:</p>
        <p>{data.ultimoResultado ?? "Sin datos"}</p>
      </div>

      <pre className="bg-white p-3 rounded text-sm">
        {JSON.stringify(data.items, null, 2)}
      </pre>
    </div>
  );
}
