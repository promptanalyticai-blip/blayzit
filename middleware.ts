import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/Client"

export async function middleware(req: Request) {
  const url = new URL(req.url)

  // Rutas públicas (no requieren login)
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/auth/reset",
  ]

  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next()
  }

  // Extraer token del header Authorization
  const authHeader = req.headers.get("authorization") || ""
  const token = authHeader.replace("Bearer ", "")

  const supabase = createServerClient(token)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Si no hay usuario → redirigir al login
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  // Usuario autenticado → permitir acceso
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/enterprise/:path*",
    "/dashboard/:path*",
    "/workspace/:path*",
    "/admin/:path*",
    "/connection/:path*",
  ],
}
