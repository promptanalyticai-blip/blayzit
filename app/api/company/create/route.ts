// app/api/company/create/route.ts

import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/Client"

const supabase = createClient()

export async function POST(req: Request) {
  const { userId, name } = await req.json()

  // Crear empresa
  const { data: company, error } = await supabase
    .from("companies")
    .insert({
      name,
      owner_id: userId,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Registrar relación usuario ↔ empresa
  await supabase.from("users_companies").insert({
    user_id: userId,
    company_id: company.id,
    role: "owner",
  })

  return NextResponse.json(company)
}
