// components/enterprise/enterprise-create-workspace.tsx

"use client"

import { useState } from "react"
import EnterpriseCard from "./enterprise-card"

export default function EnterpriseCreateWorkspace({ companyId }) {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")

  async function createWorkspace() {
    const res = await fetch("/api/workspace/create", {
      method: "POST",
      body: JSON.stringify({ companyId, name }),
    })

    const json = await res.json()

    if (json.error) setStatus("Error: " + json.error)
    else setStatus("Workspace creado correctamente.")
  }

  return (
    <EnterpriseCard title="Crear Workspace">
      <input
        className="p-2 rounded bg-white/30 border border-white/40 w-full mb-3"
        placeholder="Nombre del workspace"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={createWorkspace}
        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
      >
        Crear Workspace
      </button>

      {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
    </EnterpriseCard>
  )
}
