// lib/dnip-mock-engine.ts

export type DnipMetrics = {
  load: number
  latencyMs: number
  errorRate: number
  requestsPerMin: number
  workspacesActive: number
  jobsInQueue: number
}

export type DnipHistoryItem = {
  label: string
  minutesAgo: number
}

export type DnipChartPoint = {
  label: string
  value: number
}

export function getDnipMetricsSimple(): DnipMetrics {
  return {
    load: 68,
    latencyMs: 142,
    errorRate: 0.3,
    requestsPerMin: 1248,
    workspacesActive: 7,
    jobsInQueue: 32,
  }
}

export function getDnipHistorySimple(): DnipHistoryItem[] {
  return [
    { label: "Sync workspace → 324 items procesados", minutesAgo: 1 },
    { label: "Rebuild index → 12.4s", minutesAgo: 3 },
    { label: "Cleanup orphan tasks → 89 registros", minutesAgo: 5 },
    { label: "Metrics snapshot → 5 paneles actualizados", minutesAgo: 8 },
  ]
}

export function getDnipLoadChartSimple(): DnipChartPoint[] {
  return [
    { label: "09:00", value: 62 },
    { label: "10:00", value: 65 },
    { label: "11:00", value: 68 },
    { label: "12:00", value: 70 },
    { label: "13:00", value: 67 },
    { label: "14:00", value: 69 },
  ]
}

export function getDnipLatencyChartSimple(): DnipChartPoint[] {
  return [
    { label: "09:00", value: 130 },
    { label: "10:00", value: 138 },
    { label: "11:00", value: 142 },
    { label: "12:00", value: 145 },
    { label: "13:00", value: 140 },
    { label: "14:00", value: 143 },
  ]
}
