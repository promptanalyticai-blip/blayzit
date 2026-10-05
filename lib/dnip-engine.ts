// lib/dnip-engine.ts

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

function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function getMetrics(): DnipMetrics {
  return {
    load: Math.round(random(50, 95)),
    latencyMs: Math.round(random(100, 280)),
    errorRate: parseFloat(random(0.2, 3.5).toFixed(2)),
    requestsPerMin: Math.round(random(800, 2600)),
    workspacesActive: Math.round(random(5, 14)),
    jobsInQueue: Math.round(random(10, 140)),
  }
}

export function getHistory(): DnipHistoryItem[] {
  const events = [
    "Sync workspace",
    "Rebuild index",
    "Cleanup orphan tasks",
    "Metrics snapshot",
    "Optimize memory blocks",
    "Purge stale jobs",
    "Rebalance queues",
    "Rebuild cache",
  ]

  return events.map((e, i) => ({
    label: `${e} → ${Math.round(random(20, 600))} registros`,
    minutesAgo: Math.round(random(1, 12)),
  }))
}

export function getChart(): DnipChartPoint[] {
  const hours = ["09", "10", "11", "12", "13", "14", "15", "16"]

  return hours.map((h) => ({
    label: `${h}:00`,
    value: Math.round(random(40, 100)),
  }))
}
