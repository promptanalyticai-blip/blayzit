// ui/blayzit/terminal-pro.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ejecutarComandoTerminal } from "./terminal-bridge";

export function BlayzitTerminalPro({
  className = "",
}: {
  className?: string;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { cmd: string; res: any; ok: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ALIAS = ["run", "analysis", "last", "total", "items", "help"];

  async function handleCommand() {
    if (!input.trim()) return;

    setLoading(true);

    const res = await ejecutarComandoTerminal(input);

    setHistory((prev) => [
      ...prev,
      { cmd: input, res: res.data ?? res.error, ok: res.ok },
    ]);

    setInput("");
    setLoading(false);
  }

  function autoComplete() {
    const match = ALIAS.find((a) => a.startsWith(input));
    if (match) setInput(match);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  return (
    <div
      className={`bg-black text-green-400 p-4 rounded font-mono space-y-4 ${className}`}
    >
      <div
        ref={scrollRef}
        className="h-64 overflow-auto border border-green-700 p-2 rounded"
      >
        {history.length === 0 && (
          <div className="opacity-60">BLAYZIT Terminal PRO listo.</div>
        )}

        {history.map((h, i) => (
          <div key={i} className="mb-4">
            <div className="text-green-300">$ {h.cmd}</div>
            <pre className="bg-green-900/20 p-2 rounded text-sm overflow-auto">
              {JSON.stringify(h.res, null, 2)}
            </pre>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCommand();
            if (e.key === "Tab") {
              e.preventDefault();
              autoComplete();
            }
          }}
          placeholder="Escribe un comando…"
          className="flex-1 p-2 bg-black border border-green-700 rounded text-green-300"
        />

        <button
          onClick={handleCommand}
          disabled={loading}
          className="px-4 py-2 bg-green-700 text-black font-bold rounded"
        >
          {loading ? "..." : "Run"}
        </button>
      </div>
    </div>
  );
}
