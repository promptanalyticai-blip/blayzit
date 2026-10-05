// app/api/connection/permissions/route.ts

import { NextResponse } from "next/server"
import { getPermissionsForRole } from "@/lib/roles-engine"

export async function GET() {
  const role = "owner" as const // luego vendrá del usuario logueado
  const permissions = getPermissionsForRole(role)

  return NextResponse.json({ role, permissions })
}
