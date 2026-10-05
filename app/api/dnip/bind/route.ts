// app/api/dnip/bind/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/Client"

const supabase = createClient()

export async function POST(req: Request) {
  const { workspaceId, engine } = await req.json()

  const { data, error } = await supabase
    .from("dnip_bindings")
    .insert({
      workspace_id: workspaceId,
      dnip_engine: engine,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json(data)
}
