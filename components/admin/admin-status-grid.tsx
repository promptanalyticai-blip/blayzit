// components/admin/admin-status-grid.tsx

import { DnipMetrics } from "@/lib/dnip-engine"
import { AdipSummary } from "@/lib/adip-engine"

export default function AdminStatusGrid({
  dnip,
  adip,
}: {
  dnip: DnipMetrics
  adip: AdipSummary
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-white/20 backdrop-blur-xl border border-white/40 p-4 shadow-lg">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">DNIP Metrics</h4>
        <ul className="text-xs text-slate-700 space-y-1">
          <li>Carga: {dnip.load}%</li>
          <li>Latencia: {dnip.latencyMs} ms</li>
          <li>Errores: {dnip.errorRate}%</li>
          <li>Jobs en cola: {dnip.jobsInQueue}</li>
        </ul>
      </div>

      <div className="rounded-xl bg-white/20 backdrop-blur-xl border border-white/40 p-4 shadow-lg">
        <h4 className="text-sm font-semibold text-slate-800 mb-2">ADIP Summary</h4>
        <ul className="text-xs text-slate-700 space-y-1">
          <li>Riesgo: {adip.risk}</li>
          <li>Puntaje: {adip.score}</li>
          {adip.focus.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
