//app/api/adip/summary/route.ts
import { NextResponse } from "next/server"
import { getMetrics } from "@/lib/dnip-engine"
import { analyzeMetrics, generateInsights } from "@/lib/adip-engine"

export async function GET() {
  const metrics = getMetrics()
  const summary = analyzeMetrics(metrics)
  const insights = generateInsights(summary)

  return NextResponse.json({
    metrics,
    summary,
    insights,
  })
}
