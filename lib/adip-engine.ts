// lib/admin-engine.ts
export type AdipSummary = {
  risk: "low" | "medium" | "high"
}

export function analyzeMetrics(metrics: any): AdipSummary {
  return { risk: "low" }
}

export function generateInsights(metrics: any) {
  return []
}
