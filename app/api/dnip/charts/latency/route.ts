//app/api/dnip/charts/latency/route.ts
import { NextResponse } from "next/server"
import { getChart } from "@/lib/dnip-engine"

export async function GET() {
  return NextResponse.json(getChart())
}
