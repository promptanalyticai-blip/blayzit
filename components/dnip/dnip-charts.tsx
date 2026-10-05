// components/dnip/dnip-charts.tsx
"use client"

import { useEffect, useState } from "react"
import { DnipChartPoint } from "@/lib/dnip-engine"

type Props = {
  title: string
  subtitle?: string
  endpoint: string
  accent?: "blue" | "green"
}

export function DnipApiChart({ title, subtitle, endpoint, accent = "blue" }: Props) {
  const [data, setData] = useState<DnipChartPoint[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch(endpoint)
      const json = await res.json()
      setData(json)
    }
    load()
    const interval = setInterval(load, 3000)
    return () => clearInterval(interval)
  }, [endpoint])

  const max = Math.max(...data.map((d) => d.value)) || 1

  const color =
    accent === "blue"
      ? "from-sky-500/70 via-sky-400/60 to-sky-300/50"
      : "from-emerald-500/70 via-emerald-400/60 to-emerald-300/50"

  return (
    <div className="rounded-xl border border-white/40 bg-white/20 backdrop-blur-xl p-4 shadow-lg hover:scale-[1.02] transition-all">
      <p className="text-xs font-medium text-slate-800">{title}</p>
      {subtitle && <p className="text-[11px] text-slate-600">{subtitle}</p>}

      <div className="mt-3 h-32 flex items-end gap-2">
        {data.map((point) => {
          const height = (point.value / max) * 100
          return (
            <div key={point.label} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-full bg-gradient-to-t ${color}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-[10px] text-slate-600">{point.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
