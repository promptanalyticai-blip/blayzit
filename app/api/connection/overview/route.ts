// app/api/connection/overview/route.ts

import { NextResponse } from "next/server"
import { getConnectionOverviewReal } from "@/lib/connection-engine"
import { createServerClient } from "@/lib/supabase/Client"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization") || ""
  const token = authHeader.replace("Bearer ", "")

  const supabase = createServerClient(token)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const overview = await getConnectionOverviewReal(user.id)

  return NextResponse.json(overview)
}
