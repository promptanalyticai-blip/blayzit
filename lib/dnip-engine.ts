// lib/dnip-engine.ts
export type DnipMetrics = {
  errorRate: number
  latencyMs: number
  load: number
  jobsInQueue: number
}

export function getMetrics(): DnipMetrics {
  return {
    errorRate: 0,
    latencyMs: 120,
    load: 40,
    jobsInQueue: 10,
  }
}
