//ui/blayzit/dashboard.tsx
"use client";

import { useState } from "react";
import { useBlayzit } from "./provider";

export default function BlayzitDashboard() {
  const { output, setOutput } = useBlayzit();
  const [input, setInput] = useState("");

  function run() {
    setOutput(`DNIP Engine processed: ${input}`);
  }

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h1 className="text-slate-100 text-xl font-semibold mb-4">
        BLAYZIT DNIP Engine
      </h1>

      <input
        className="bg-slate-800 border border-slate-700 p-2 rounded w-full text-slate-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter data..."
      />

      <button
        onClick={run}
        className="mt-4 bg-blue-600 px-4 py-2 rounded text-white"
      >
        Run Engine
      </button>

      <pre className="mt-4 text-slate-400 bg-slate-800 p-4 rounded-xl border border-slate-700">
        {output}
      </pre>
    </div>
  );
}
