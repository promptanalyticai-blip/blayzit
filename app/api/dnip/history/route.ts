//app/api/dnip/history/route.ts
import { NextResponse } from "next/server"
import { getHistory } from "@/lib/dnip-engine"

export async function GET() {
  return NextResponse.json(getHistory())
}

