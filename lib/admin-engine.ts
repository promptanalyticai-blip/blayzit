// lib/admin-engine.ts

import { DnipMetrics } from "@/lib/dnip-engine"
import { AdipSummary } from "@/lib/adip-engine"

export type AdminSystemHealth = "healthy" | "warning" | "critical"

export type AdminOverview = {
  health: AdminSystemHealth
  dnip: DnipMetrics
  adip: AdipSummary
}

export function computeSystemHealth(dnip: DnipMetrics, adip: AdipSummary): AdminSystemHealth {
  if (adip.risk === "high" || dnip.errorRate > 3 || dnip.latencyMs > 260) return "critical"
  if (adip.risk === "medium" || dnip.load > 80 || dnip.jobsInQueue > 100) return "warning"
  return "healthy"
}
