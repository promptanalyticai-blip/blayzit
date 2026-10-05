// components/dnip/dnip-insights.tsx
"use client"

import { DnipMetrics } from "@/lib/dnip-engine"

type Props = {
  metrics: DnipMetrics
}

export function DnipApiInsights({ metrics }: Props) {
  const { load, latencyMs, errorRate, jobsInQueue } = metrics

  const loadInsight =
    load < 70
      ? "Carga estable."
      : load < 85
      ? "Carga elevada, monitorear."
      : "Carga crítica, riesgo de saturación."

  const latencyInsight =
    latencyMs < 150
      ? "Latencia óptima."
      : latencyMs < 200
      ? "Latencia elevada."
      : "Latencia crítica, posible cuello de botella."

  const errorInsight =
    errorRate < 1
      ? "Errores bajos."
      : errorRate < 2
      ? "Errores moderados."
      : "Errores críticos, revisar logs."

  const queueInsight =
    jobsInQueue < 40
      ? "Cola estable."
      : jobsInQueue < 80
      ? "Cola creciendo."
      : "Cola saturada."

  return (
    <div className="grid gap-3 md:grid-cols-2 text-xs">
      {[loadInsight, latencyInsight, errorInsight, queueInsight].map((text, i) => (
        <div
          key={i}
          className="rounded-md border border-white/40 bg-white/20 backdrop-blur-lg p-3 shadow-md hover:scale-[1.03] transition-all"
        >
          <p className="text-slate-900">{text}</p>
        </div>
      ))}
    </div>
  )
}
