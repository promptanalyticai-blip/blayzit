import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: Request): Promise<Response> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Obtener logs globales
  const { data: logs } = await supabase
    .from("history")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  // Obtener workspaces
  const { data: workspaces } = await supabase
    .from("workspaces")
    .select("*");

  const insights: string[] = [];

  // Detectar workspace inactivo
  const inactive = workspaces?.filter((w) => {
    const count = logs?.filter((l) => l.workspace_id === w.id).length;
    return count === 0;
  });

  if (inactive.length > 0) {
    insights.push(
      `Workspaces inactivos detectados: ${inactive
        .map((w) => w.nombre)
        .join(", ")}`
    );
  }

  // Detectar picos de actividad
  const recent = logs?.slice(0, 20);
  if (recent.length > 15) {
    insights.push("Actividad inusualmente alta detectada en el sistema.");
  }

  // Detectar fallos en módulos ADIP
  const errors = logs?.filter((l) => l.details?.includes("ERROR"));
  if (errors.length > 0) {
    insights.push(`Se detectaron ${errors.length} errores en módulos ADIP.`);
  }

  // Detectar uso excesivo de créditos
  const { data: credits } = await supabase.from("credits").select("*");
  const lowCredits = credits?.filter((c) => c.credits < 5);

  if (lowCredits.length > 0) {
    insights.push(
      `Usuarios con créditos bajos: ${lowCredits
        .map((c) => c.user_id)
        .join(", ")}`
    );
  }

  // Generar recomendación automática con OpenAI
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
Eres ADIP AI AGENT, un agente autónomo de Decision Intelligence.
Genera una recomendación ejecutiva basada en los insights detectados.
        `,
      },
      {
        role: "user",
        content: insights.join("\n"),
      },
    ],
    temperature: 0.2,
  });

  const recommendation = completion.choices[0].message.content;

  // Registrar en historial
  await supabase.from("history").insert({
    event_type: "adip_agent",
    details: recommendation,
    created_at: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ success: true, insights, recommendation }));
}
