// ui/blayzit/provider.tsx

"use client";

import { createContext, useContext, useState } from "react";

type BlayzitContextValue = {
  output: string;
  setOutput: (v: string) => void;
};

const BlayzitContext = createContext<BlayzitContextValue | null>(null);

export function BlayzitProvider({ children }: { children: React.ReactNode }) {
  const [output, setOutput] = useState("");

  return (
    <BlayzitContext.Provider value={{ output, setOutput }}>
      {children}
    </BlayzitContext.Provider>
  );
}

export function useBlayzit() {
  const ctx = useContext(BlayzitContext);
  if (!ctx) throw new Error("useBlayzit must be used inside BlayzitProvider");
  return ctx;
}
