// lib/blayzit-client.ts

export const BLZClient = {
  async ejecutar(prompt: string) {
    const res = await fetch("/api/blayzit/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error("Error ejecutando BLAYZIT");
    }

    const data = await res.json();
    return data.resultado;
  },

  async analisis() {
    const res = await fetch("/api/blayzit/analysis");

    if (!res.ok) {
      throw new Error("Error obteniendo análisis BLAYZIT");
    }

    const data = await res.json();
    return data.analysis;
  },
};
