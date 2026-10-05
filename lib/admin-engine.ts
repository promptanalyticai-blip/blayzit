// lib/admin-engine.ts
import { DnipMetrics } from "@/lib/dnip-engine"

export type AdminSystemHealth = "healthy" | "warning" | "critical"

export type AdminOverview = {
  health: AdminSystemHealth
  dnip: DnipMetrics
}

export function computeSystemHealth(dnip: DnipMetrics): AdminSystemHealth {
  if (dnip.errorRate > 3 || dnip.latencyMs > 260) return "critical"
  if (dnip.load > 80 || dnip.jobsInQueue > 100) return "warning"
  return "healthy"
}

