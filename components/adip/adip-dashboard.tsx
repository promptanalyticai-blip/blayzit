//components/adip/adip-dashboard.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Gauge } from "lucide-react"

import { DnipMetrics } from "@/lib/dnip-engine"
import { AdipSummary, AdipInsight } from "@/lib/adip-engine"
import { AdipInsightsPanel } from "./adip-insights"
import { DnipApiChart } from "@/components/dnip/dnip-charts"

type AdipPayload = {
  metrics: DnipMetrics
  summary: AdipSummary
  insights: AdipInsight[]
}

export default function ADIPDashboard() {
  const [data, setData] = useState<AdipPayload | null>(null)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/adip/summary")
      const json = await res.json()
      setData(json)
    }
    load()
    const interval = setInterval(load, 5000)
    return () => clearInterval(interval)
  }, [])

  if (!data) return null

  const { metrics, summary, insights } = data

  return (
    <div className="min-h-screen w-full p-6 bg-gradient-to-br from-[#BFD0DD] via-[#D7E0E6] to-[#F1F3F7]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
            ADIP — Analysis Dashboard
          </h1>
          <p className="text-sm text-slate-600">
            Panel enterprise de análisis sobre el motor DNIP.
          </p>
        </div>
        <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
          ADIP: Live
        </Badge>
      </div>

      <Separator className="bg-white/40 backdrop-blur-md" />

      {/* Layout */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {/* Columna izquierda: estado + charts */}
        <div className="flex flex-col gap-4 md:col-span-2">
          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-slate-700" />
                <CardTitle className="text-sm text-slate-800">
                  Estado global del motor DNIP
                </CardTitle>
              </div>
              <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
                Riesgo: {summary.risk.toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-700">Carga</span>
                <span className="font-semibold text-slate-900">{metrics.load}%</span>
              </div>
              <Progress value={metrics.load} className="h-2 bg-white/40" />

              <div className="grid grid-cols-3 gap-3 mt-3">
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
                <div className="rounded-md bg-white/20 backdrop-blur-lg p-3 shadow-md">
                  <p className="text-slate-700">Jobs en cola</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {metrics.jobsInQueue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-800">
                Métricas visuales DNIP (consumidas por ADIP)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="charts" className="space-y-4">
                <TabsList className="bg-white/30 backdrop-blur-md border border-white/40">
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="charts">
                  <div className="grid gap-3 md:grid-cols-2">
                    <DnipApiChart
                      title="Carga del motor"
                      subtitle="Fuente: DNIP API"
                      endpoint="/api/dnip/charts/load"
                      accent="blue"
                    />
                    <DnipApiChart
                      title="Latencia"
                      subtitle="Fuente: DNIP API"
                      endpoint="/api/dnip/charts/latency"
                      accent="green"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="insights">
                  <AdipInsightsPanel summary={summary} insights={insights} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha: panel ADIP puro */}
        <div className="flex flex-col gap-4">
          <Card className="backdrop-blur-xl bg-white/20 border border-white/40 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm text-slate-800">
                Rol de ADIP en el sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-700">
              <p>
                ADIP actúa como capa de análisis sobre DNIP, interpretando métricas y generando
                insights accionables para administración y decisiones de capacidad.
              </p>
              <p>
                Este módulo está diseñado para integrarse con BLAYZIT Admin y futuros paneles
                de Workspace sin romper la arquitectura base.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
