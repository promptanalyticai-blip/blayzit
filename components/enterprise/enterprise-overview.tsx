// components/enterprise/enterprise-overview.tsx

"use client"

import { useEffect, useState } from "react"
import EnterpriseCard from "./enterprise-card"

export default function EnterpriseOverview() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/connection/overview")
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  if (!data) return <p className="text-slate-500">Cargando...</p>

  return (
    <EnterpriseCard title="Estado del Sistema">
      <div className="space-y-2 text-sm">
        <p><strong>Usuario:</strong> {data.user.email}</p>
        <p><strong>Rol Empresa:</strong> {data.companyRole}</p>
        <p><strong>Empresa:</strong> {data.company?.name ?? "No asignada"}</p>
        <p><strong>Workspace:</strong> {data.workspace?.name ?? "No asignado"}</p>
        <p><strong>Rol Workspace:</strong> {data.workspaceRole}</p>
        <p><strong>DNIP Engine:</strong> {data.dnip?.dnip_engine ?? "No vinculado"}</p>
      </div>
    </EnterpriseCard>
  )
}
