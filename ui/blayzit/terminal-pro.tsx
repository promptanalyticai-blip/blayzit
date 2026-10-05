// ui/blayzit/terminal-pro.tsx
"use client";

import { useState } from "react";

export default function TerminalPro() {
  const [output, setOutput] = useState("");

  function execute(cmd: string) {
    setOutput(`DNIP Pro executed: ${cmd}`);
  }

  return (
    <div className="bg-black text-blue-400 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">DNIP Terminal Pro</h2>

      <button
        onClick={() => execute("deep-scan")}
        className="bg-blue-700 px-4 py-2 rounded"
      >
        Deep Scan
      </button>

      <pre className="mt-4">{output}</pre>
    </div>
  );
}
