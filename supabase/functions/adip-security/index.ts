import { createClient } from "@supabase/supabase-js";

export default async function handler(req: Request): Promise<Response> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: logs } = await supabase
    .from("history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: abuse } = await supabase
    .from("abuse_monitor")
    .select("*");

  const events: string[] = [];

  // Detectar abuso
  abuse?.forEach((a) => {
    if (a.count > 50) {
      events.push(`Abuso detectado: usuario ${a.user_id} excedió 50 acciones.`);
    }
  });

  // Detectar fallos repetidos
  const errors = logs.filter((l) => l.details?.includes("ERROR"));
  if (errors.length > 10) {
    events.push("Más de 10 errores detectados en los últimos logs.");
  }

  // Detectar picos de actividad
  if (logs.length > 80) {
    events.push("Pico de actividad detectado.");
  }

  // Registrar eventos
  for (const e of events) {
    await supabase.from("security_events").insert({
      event_type: "security_alert",
      details: e,
      severity: "medium",
    });
  }

  return new Response(JSON.stringify({ success: true, events }));
}
