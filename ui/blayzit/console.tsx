// ui/blayzit/console.tsx
"use client";

import { useState } from "react";
import { useBlayzitClient } from "./use-blayzit-client";

export function BlayzitConsole() {
  const { ejecutar, loading } = useBlayzitClient();
  const [history, setHistory] = useState<{ prompt: string; output: any }[]>([]);
  const [value, setValue] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    const prompt = value;
    setValue("");

    const output = await ejecutar(prompt);

    setHistory((prev) => [...prev, { prompt, output }]);
  }

  return (
    <div className="p-4 bg-black text-green-400 rounded space-y-4 font-mono">
      <div className="text-lg font-bold">BLAYZIT Console</div>

      <div className="space-y-2 max-h-80 overflow-auto bg-gray-900 p-3 rounded">
        {history.length === 0 && (
          <div className="text-gray-500">No hay comandos ejecutados.</div>
        )}

        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="text-green-300">$ {item.prompt}</div>
            <pre className="text-green-500 whitespace-pre-wrap">
              {JSON.stringify(item.output, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Escribe un comando…"
          className="flex-1 p-2 bg-gray-800 text-green-300 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-black font-bold rounded"
        >
          {loading ? "..." : "Run"}
        </button>
      </form>
    </div>
  );
}
