//components/admin/admin-dashboard.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Gauge } from "lucide-react"

import { DnipMetrics } from "@/lib/dnip-engine"
import { AdipSummary } from "@/lib/adip-engine"

type AdminPayload = {
  health: "healthy" | "warning" | "critical"
  dnip: DnipMetrics
  adip: AdipSummary
}

function healthLabel(h: AdminPayload["health"]) {
  if (h === "healthy") return "Saludable"
  if (h === "warning") return "Advertencia"
  return "Crítico"
}

function healthColor(h: AdminPayload["health"]) {
  if (h === "healthy") return "text-emerald-600"
  if (h === "warning") return "text-amber-600"
  return "text-red-600"
}

export default function AdminDashboard() {
  const [data, setData] = useState<AdminPayload | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/overview")
      const json = await res.json()
      setData(json)
    }
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const { health, dnip, adip } = data

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-[#BCCFDD] via-[#D6DFE6] to-[#F1F3F7]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">BLAYZIT Admin</h1>
          <p className="text-sm text-slate-600">
            Vista global del sistema: DNIP + ADIP.
          </p>
        </div>
        <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
          Salud: {healthLabel(health)}
        </Badge>
      </div>

      <Separator className="bg-white/40 backdrop-blur-md" />

      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg md:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-slate-700" />
              <CardTitle className="text-sm text-slate-800">
                Estado del motor DNIP
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-700">Carga</span>
              <span className="font-semibold text-slate-900">{dnip.load}%</span>
            </div>
            <Progress value={dnip.load} className="h-2 bg-white/40" />

            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                <p className="text-slate-700">Latencia</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {dnip.latencyMs} ms
                </p>
              </div>
              <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                <p className="text-slate-700">Errores</p>
                <p className="mt-1 text-lg font-semibold text-emerald-600">
                  {dnip.errorRate}%
                </p>
              </div>
              <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                <p className="text-slate-700">Jobs en cola</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {dnip.jobsInQueue}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm text-slate-800">
              Resumen ADIP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-700">
            <p>
              Riesgo global:{" "}
              <span className={healthColor(health)}>
                {adip.risk.toUpperCase()} ({adip.score})
              </span>
            </p>
            {adip.focus.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {adip.focus.map((f, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white/40 backdrop-blur-md px-2 py-[2px] text-[10px] text-slate-700 border border-white/50"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
