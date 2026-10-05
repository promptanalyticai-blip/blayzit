// ui/blayzit/terminal.tsx
"use client";

import { useState } from "react";

export default function Terminal() {
  const [output, setOutput] = useState("");

  function execute(cmd: string) {
    setOutput(`Executed command: ${cmd}`);
  }

  return (
    <div className="bg-black text-green-400 p-4 rounded-xl">
      <h2 className="text-lg font-semibold mb-2">DNIP Terminal</h2>

      <button
        onClick={() => execute("status")}
        className="bg-green-700 px-4 py-2 rounded"
      >
        Status
      </button>

      <pre className="mt-4">{output}</pre>
    </div>
  );
}
