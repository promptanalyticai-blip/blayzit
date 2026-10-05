// components/enterprise/enterprise-bind-dnip.tsx

"use client"

import { useState } from "react"
import EnterpriseCard from "./enterprise-card"

export default function EnterpriseBindDnip({ workspaceId }) {
  const [engine, setEngine] = useState("enterprise")
  const [status, setStatus] = useState("")

  async function bind() {
    const res = await fetch("/api/dnip/bind", {
      method: "POST",
      body: JSON.stringify({ workspaceId, engine }),
    })

    const json = await res.json()

    if (json.error) setStatus("Error: " + json.error)
    else setStatus("DNIP vinculado correctamente.")
  }

  return (
    <EnterpriseCard title="Vincular DNIP">
      <select
        className="p-2 rounded bg-white/30 border border-white/40 w-full mb-3"
        value={engine}
        onChange={(e) => setEngine(e.target.value)}
      >
        <option value="mock">Mock</option>
        <option value="advanced">Advanced</option>
        <option value="enterprise">Enterprise</option>
      </select>

      <button
        onClick={bind}
        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
      >
        Vincular DNIP
      </button>

      {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
    </EnterpriseCard>
  )
}
