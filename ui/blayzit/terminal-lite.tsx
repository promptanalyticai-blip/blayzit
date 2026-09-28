// ui/blayzit/terminal-lite.tsx
"use client";

import { useState } from "react";
import { ejecutarComandoTerminal } from "./terminal-bridge";

export function BlayzitTerminalLite({
  className = "",
}: {
  className?: string;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleRun() {
    if (!input.trim()) return;

    setLoading(true);
    const res = await ejecutarComandoTerminal(input);
    setOutput(res.data ?? res.error);
    setLoading(false);
  }

  return (
    <div className={`bg-zinc-900 text-zinc-200 p-4 rounded ${className}`}>
      <div className="mb-3">
        <pre className="bg-black p-3 rounded h-40 overflow-auto text-sm">
          {loading
            ? "Procesando..."
            : output
            ? JSON.stringify(output, null, 2)
            : "Terminal LITE listo."}
        </pre>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleRun();
          }}
          placeholder="Comando…"
          className="flex-1 p-2 bg-black border border-zinc-700 rounded text-zinc-300"
        />

        <button
          onClick={handleRun}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
        >
          {loading ? "..." : "Run"}
        </button>
      </div>
    </div>
  );
}
