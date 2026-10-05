// components/connection/connection-dashboard.tsx

"use client"

import { useEffect, useState } from "react"

export default function ConnectionDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/connection/overview")
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  if (!data) return null

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#BFD0DD] to-[#F1F3F7]">
      <h1 className="text-3xl font-semibold text-slate-800 mb-4">
        Conexión del Sistema (Real)
      </h1>

      <div className="space-y-4 text-sm">
        <div className="rounded-xl bg-white/20 backdrop-blur-xl p-4 border border-white/40 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-800">Usuario</h2>
          <p>Email: {data.user.email}</p>
          <p>Rol: {data.user.role}</p>
        </div>

        {data.company && (
          <div className="rounded-xl bg-white/20 backdrop-blur-xl p-4 border border-white/40 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-800">Empresa</h2>
            <p>Nombre: {data.company.name}</p>
            <p>ID: {data.company.id}</p>
          </div>
        )}

        {data.workspace && (
          <div className="rounded-xl bg-white/20 backdrop-blur-xl p-4 border border-white/40 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-800">Workspace</h2>
            <p>Nombre: {data.workspace.name}</p>
            <p>ID: {data.workspace.id}</p>
          </div>
        )}

        {data.dnip && (
          <div className="rounded-xl bg-white/20 backdrop-blur-xl p-4 border border-white/40 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-800">Motor DNIP</h2>
            <p>Engine: {data.dnip.dnipEngine}</p>
          </div>
        )}
      </div>
    </div>
  )
}
