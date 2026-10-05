// lib/dnip-engine-advanced.ts

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

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function generateAdvancedMetrics(): DnipMetrics {
  return {
    load: Math.round(randomRange(55, 92)),
    latencyMs: Math.round(randomRange(110, 260)),
    errorRate: parseFloat(randomRange(0.2, 2.8).toFixed(2)),
    requestsPerMin: Math.round(randomRange(900, 2400)),
    workspacesActive: Math.round(randomRange(5, 12)),
    jobsInQueue: Math.round(randomRange(20, 120)),
  }
}

export function generateAdvancedHistory(): DnipHistoryItem[] {
  const events = [
    "Sync workspace",
    "Rebuild index",
    "Cleanup orphan tasks",
    "Metrics snapshot",
    "Optimize memory blocks",
    "Purge stale jobs",
    "Rebalance queues",
  ]

  return events.map((e, i) => ({
    label: `${e} → ${Math.round(randomRange(10, 500))} registros`,
    minutesAgo: i * Math.round(randomRange(1, 4)),
  }))
}

export function generateAdvancedChart(): DnipChartPoint[] {
  const hours = ["09", "10", "11", "12", "13", "14", "15"]

  return hours.map((h) => ({
    label: `${h}:00`,
    value: Math.round(randomRange(40, 100)),
  }))
}
