//app/api/dnip/metrics/route.ts
import { NextResponse } from "next/server"
import { getMetrics } from "@/lib/dnip-engine"

export async function GET() {
  return NextResponse.json(getMetrics())
}
