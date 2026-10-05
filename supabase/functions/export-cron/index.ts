// supabase/functions/export-cron/index.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve(async () => {
  const timestamp = new Date().toISOString();
  const result = `Export Cron executed at ${timestamp}`;

  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
});
