//supabase/functions/adip-security/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const body = await req.json();
  const result = `ADIP Security Scan: ${body.target}`;

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
});
