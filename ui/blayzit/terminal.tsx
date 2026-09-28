// ui/blayzit/terminal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useBlayzitClient } from "./use-blayzit-client";

const COMMANDS = {
  help: "Lista los comandos disponibles",
  clear: "Limpia la consola",
  history: "Muestra el historial de comandos",
  run: "Ejecuta un prompt en BLAYZIT: run <prompt>",
};

const ALIAS: Record<string, string> = {
  h: "help",
  cls: "clear",
  ls: "history",
  r: "run",
};

export function BlayzitTerminal() {
  const { ejecutar } = useBlayzitClient();

  const [history, setHistory] = useState<
    { input: string; output: any; type: "cmd" | "blz" }[]
  >([]);

  const [value, setValue] = useState("");
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  function resolveCommand(cmd: string) {
    return ALIAS[cmd] ?? cmd;
  }

  async function handleCommand(raw: string) {
    const parts = raw.trim().split(" ");
    const cmd = resolveCommand(parts[0]);
    const args = parts.slice(1);

    // Registrar comando
    setHistory((prev) => [...prev, { input: raw, output: null, type: "cmd" }]);

    switch (cmd) {
      case "help":
        return {
          type: "cmd",
          output: Object.entries(COMMANDS).map(
            ([k, v]) => `${k} — ${v}`
          ),
        };

      case "clear":
        setHistory([]);
        return null;

      case "history":
        return {
          type: "cmd",
          output: history.map((h) => h.input),
        };

      case "run":
        if (args.length === 0) {
          return {
            type: "cmd",
            output: "Uso: run <prompt>",
          };
        }

        const prompt = args.join(" ");
        const result = await ejecutar(prompt);

        return {
          type: "blz",
          output: result,
        };

      default:
        return {
          type: "cmd",
          output: `Comando no reconocido: ${cmd}`,
        };
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    const raw = value;
    setValue("");
    setCursor(-1);

    const res = await handleCommand(raw);

    if (res) {
      setHistory((prev) => [
        ...prev,
        { input: raw, output: res.output, type: res.type },
      ]);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newCursor = Math.max(0, cursor === -1 ? history.length - 1 : cursor - 1);
      setCursor(newCursor);
      setValue(history[newCursor]?.input ?? "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newCursor = cursor + 1;
      if (newCursor >= history.length) {
        setCursor(-1);
        setValue("");
      } else {
        setCursor(newCursor);
        setValue(history[newCursor]?.input ?? "");
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(COMMANDS).find((c) =>
        c.startsWith(value)
      );
      if (match) setValue(match);
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="p-4 bg-black text-green-400 rounded space-y-4 font-mono">
      <div className="text-lg font-bold">BLAYZIT Terminal</div>

      <div className="space-y-2 max-h-96 overflow-auto bg-gray-900 p-3 rounded">
        {history.length === 0 && (
          <div className="text-gray-500">Terminal lista.</div>
        )}

        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="text-green-300">$ {item.input}</div>

            {item.output && (
              <pre className="text-green-500 whitespace-pre-wrap">
                {Array.isArray(item.output)
                  ? item.output.join("\n")
                  : JSON.stringify(item.output, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un comando…"
          className="flex-1 p-2 bg-gray-800 text-green-300 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-black font-bold rounded"
        >
          Run
        </button>
      </form>
    </div>
  );
}
