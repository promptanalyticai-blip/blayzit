// lib/supabase/MiddlewareClient.ts

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export function supabaseMiddlewareClient(req: NextRequest) {
  return createMiddlewareClient({ req, res: NextResponse.next() });
}
