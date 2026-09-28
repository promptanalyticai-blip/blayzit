// ui/blayzit/provider.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BLZClient } from "@/lib/blayzit-client";

type Ctx = {
  ejecutar: (prompt: string) => Promise<any>;
  analisis: () => Promise<any>;
  resultado: any;
  analysis: any;
  loading: boolean;
};

const BlayzitContext = createContext<Ctx | null>(null);

export function BlayzitProvider({ children }: { children: ReactNode }) {
  const [resultado, setResultado] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function ejecutar(prompt: string) {
    setLoading(true);
    const res = await BLZClient.ejecutar(prompt);
    setResultado(res);
    setLoading(false);
    return res;
  }

  async function analisis() {
    setLoading(true);
    const res = await BLZClient.analisis();
    setAnalysis(res);
    setLoading(false);
    return res;
  }

  return (
    <BlayzitContext.Provider
      value={{
        ejecutar,
        analisis,
        resultado,
        analysis,
        loading,
      }}
    >
      {children}
    </BlayzitContext.Provider>
  );
}

export function useBlayzit() {
  const ctx = useContext(BlayzitContext);
  if (!ctx) throw new Error("BlayzitProvider no está montado.");
  return ctx;
}
