// app/api/company/roles/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/Client"

const supabase = createClient()

export async function POST(req: Request) {
  const { userId, companyId } = await req.json()

  const { data, error } = await supabase
    .from("company_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("company_id", companyId)
    .single()

  if (error) return NextResponse.json({ role: "member" })

  return NextResponse.json({ role: data.role })
}
