// app/api/workspace/roles/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/Client"

const supabase = createClient()

export async function POST(req: Request) {
  const { userId, workspaceId } = await req.json()

  const { data, error } = await supabase
    .from("workspace_roles")
    .select("rol")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .single()

  if (error) return NextResponse.json({ role: "member" })

  return NextResponse.json({ role: data.rol })
}
