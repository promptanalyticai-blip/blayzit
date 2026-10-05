//components/adip/adip-insights.tsx
"use client"

import { AdipInsight, AdipSummary } from "@/lib/adip-engine"
import { Badge } from "@/components/ui/badge"

type Props = {
  summary: AdipSummary
  insights: AdipInsight[]
}

function riskLabel(risk: AdipSummary["risk"]) {
  if (risk === "low") return "Bajo"
  if (risk === "medium") return "Medio"
  return "Alto"
}

function riskColor(risk: AdipSummary["risk"]) {
  if (risk === "low") return "text-emerald-600"
  if (risk === "medium") return "text-amber-600"
  return "text-red-600"
}

export function AdipInsightsPanel({ summary, insights }: Props) {
  return (
    <div className="space-y-4 text-xs">
      <div className="rounded-xl border border-white/40 bg-white/20 backdrop-blur-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-slate-600">Nivel de riesgo global</p>
            <p className={`text-lg font-semibold ${riskColor(summary.risk)}`}>
              {riskLabel(summary.risk)} ({summary.score})
            </p>
          </div>
          <Badge className="bg-white/40 backdrop-blur-md border border-white/50 text-slate-700">
            ADIP Analysis
          </Badge>
        </div>
        {summary.focus.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {summary.focus.map((f, i) => (
              <span
                key={i}
                className="rounded-full bg-white/40 backdrop-blur-md px-2 py-[2px] text-[10px] text-slate-700 border border-white/50"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="rounded-md border border-white/40 bg-white/20 backdrop-blur-lg p-3 shadow-md hover:scale-[1.03] transition-all"
          >
            <p className="text-[11px] text-slate-500">{insight.severity.toUpperCase()}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{insight.title}</p>
            <p className="mt-1 text-[11px] text-slate-700">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
