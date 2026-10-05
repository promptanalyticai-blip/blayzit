//app/api/admin/overview/route.ts
import { NextResponse } from "next/server"
import { getMetrics } from "@/lib/dnip-engine"
import { analyzeMetrics } from "@/lib/adip-engine"
import { computeSystemHealth } from "@/lib/admin-engine"

export async function GET() {
  const dnip = getMetrics()
  const adipSummary = analyzeMetrics(dnip)
  const health = computeSystemHealth(dnip, adipSummary)

  return NextResponse.json({
    health,
    dnip,
    adip: adipSummary,
  })
}
