// components/enterprise/enterprise-create-company.tsx

"use client"

import { useState } from "react"
import EnterpriseCard from "./enterprise-card"

export default function EnterpriseCreateCompany({ userId }) {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")

  async function createCompany() {
    const res = await fetch("/api/company/create", {
      method: "POST",
      body: JSON.stringify({ userId, name }),
    })

    const json = await res.json()

    if (json.error) setStatus("Error: " + json.error)
    else setStatus("Empresa creada correctamente.")
  }

  return (
    <EnterpriseCard title="Crear Empresa">
      <input
        className="p-2 rounded bg-white/30 border border-white/40 w-full mb-3"
        placeholder="Nombre de la empresa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={createCompany}
        className="px-4 py-2 bg-slate-900 text-white rounded-lg"
      >
        Crear Empresa
      </button>

      {status && <p className="mt-3 text-sm text-slate-700">{status}</p>}
    </EnterpriseCard>
  )
}
