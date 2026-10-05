// ui/blayzit/panel-client.tsx
"use client";

import { useState } from "react";

export default function PanelClient() {
  const [panel, setPanel] = useState("overview");

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
      <h1 className="text-slate-100 text-xl font-semibold mb-4">
        DNIP Panel Client
      </h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setPanel("overview")}
          className="bg-blue-700 px-4 py-2 rounded text-white"
        >
          Overview
        </button>

        <button
          onClick={() => setPanel("details")}
          className="bg-green-700 px-4 py-2 rounded text-white"
        >
          Details
        </button>
      </div>

      <pre className="text-slate-400 bg-slate-800 p-4 rounded-xl border border-slate-700">
        {panel === "overview"
          ? "DNIP Overview Panel"
          : "DNIP Detailed Panel"}
      </pre>
    </div>
  );
}
