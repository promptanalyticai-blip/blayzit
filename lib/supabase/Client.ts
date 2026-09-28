// lib/supabase/Client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookieOptions: {
      name: "sb",
      lifetime: 60 * 60 * 24 * 30, // 30 días
      domain: "localhost",
      path: "/",
      sameSite: "lax",
    },
  }
);
