// ui/blayzit/terminal-lite.tsx
"use client";

import { useState } from "react";

export default function TerminalLite() {
  const [output, setOutput] = useState("");

  function execute(cmd: string) {
    setOutput(`Lite executed: ${cmd}`);
  }

  return (
    <div className="bg-black text-yellow-400 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">DNIP Terminal Lite</h2>

      <button
        onClick={() => execute("ping")}
        className="bg-yellow-700 px-4 py-2 rounded"
      >
        Ping
      </button>

      <pre className="mt-4">{output}</pre>
    </div>
  );
}
