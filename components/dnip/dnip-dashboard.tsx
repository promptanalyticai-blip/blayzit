// components/dnip/dnip-dashboard.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Gauge } from "lucide-react"

import { DnipMetrics, DnipHistoryItem } from "@/lib/dnip-engine"
import { DnipApiChart } from "./dnip-charts"
import { DnipApiInsights } from "./dnip-insights"

export default function DNIPDashboard() {
  const [metrics, setMetrics] = useState<DnipMetrics | null>(null)
  const [history, setHistory] = useState<DnipHistoryItem[]>([])

  useEffect(() => {
    async function load() {
      const m = await fetch("/api/dnip/metrics").then((r) => r.json())
      const h = await fetch("/api/dnip/history").then((r) => r.json())
      setMetrics(m)
      setHistory(h)
    }
    load()
    const interval = setInterval(load, 3000)
    return () => clearInterval(interval)
  }, [])

  if (!metrics) return null

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-[#C0D2DD] via-[#D8E1E6] to-[#F2F4F7]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">DNIP Dashboard</h1>
          <p className="text-sm text-slate-600">Motor DNIP — API real.</p>
        </div>

        <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
          Engine: Live
        </Badge>
      </div>

      <Separator className="bg-white/40 backdrop-blur-md" />

      {/* Layout */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-4 md:col-span-2">

          {/* Estado del motor */}
          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-slate-700" />
                <CardTitle className="text-sm text-slate-800">Estado del motor</CardTitle>
              </div>
              <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
                Online
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700">Carga actual</span>
                <span className="font-medium text-slate-900">{metrics.load}%</span>
              </div>

              <Progress value={metrics.load} className="h-2 bg-white/40" />

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                  <p className="text-slate-700">Requests/min</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {metrics.requestsPerMin}
                  </p>
                </div>
                <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                  <p className="text-slate-700">Latencia</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {metrics.latencyMs} ms
                  </p>
                </div>
                <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                  <p className="text-slate-700">Errores</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-600">
                    {metrics.errorRate}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-800">Actividad del motor</CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="historial" className="space-y-4">
                <TabsList className="bg-white/30 backdrop-blur-md border border-white/40">
                  <TabsTrigger value="historial">Historial</TabsTrigger>
                  <TabsTrigger value="analysis">Insights</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                </TabsList>

                <TabsContent value="historial" className="space-y-3">
                  {history.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-md bg-white/20 backdrop-blur-lg px-3 py-2 shadow-sm"
                    >
                      <span className="text-slate-800">{item.label}</span>
                      <span className="text-[10px] text-slate-600">
                        hace {item.minutesAgo} min
                      </span>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="analysis">
                  <DnipApiInsights metrics={metrics} />
                </TabsContent>

                <TabsContent value="charts">
                  <div className="grid gap-3 md:grid-cols-2">
                    <DnipApiChart
                      title="Carga del motor"
                      subtitle="API real"
                      endpoint="/api/dnip/charts/load"
                      accent="blue"
                    />
                    <DnipApiChart
                      title="Latencia"
                      subtitle="API real"
                      endpoint="/api/dnip/charts/latency"
                      accent="green"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-800">Snapshot rápido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Workspaces activos</span>
                <span className="font-semibold text-slate-900">
                  {metrics.workspacesActive}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Jobs en cola</span>
                <span className="font-semibold text-slate-900">
                  {metrics.jobsInQueue}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-800">Riesgo operativo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-slate-700">
                El motor DNIP presenta fluctuaciones naturales. No se detectan fallos críticos.
              </p>
              <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-emerald-600">
                Moderado
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
