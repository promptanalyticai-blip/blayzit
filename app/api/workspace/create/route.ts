// app/api/workspace/create/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/Client"

const supabase = createClient()

export async function POST(req: Request) {
  const { companyId, name } = await req.json()

  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      company_id: companyId,
      name,
      type: "primary",
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json(data)
}
