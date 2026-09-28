import { createClient } from "@supabase/supabase-js";

export default async function handler(req: Request): Promise<Response> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Obtener organizaciones
  const { data: orgs } = await supabase.from("organizations").select("*");

  for (const org of orgs) {
    // Obtener datos de la organización
    const { data: members } = await supabase
      .from("organization_members")
      .select("*")
      .eq("organization_id", org.id);

    const { data: ws } = await supabase
      .from("organization_workspaces")
      .select("*")
      .eq("organization_id", org.id);

    const { data: credits } = await supabase
      .from("organization_credits")
      .select("*")
      .eq("organization_id", org.id)
      .single();

    const { data: audit } = await supabase
      .from("organization_audit")
      .select("*")
      .eq("organization_id", org.id);

    const backup = {
      organization: org,
      members,
      workspaces: ws,
      credits,
      audit,
      timestamp: new Date().toISOString(),
    };

    // Guardar backup en Storage
    await supabase.storage
      .from("backups")
      .upload(
        `${org.id}/${Date.now()}.json`,
        new Blob([JSON.stringify(backup)], { type: "application/json" })
      );

    // Registrar auditoría
    await supabase.from("organization_audit").insert({
      organization_id: org.id,
      action: "backup_created",
      details: "Backup automático generado",
    });
  }

  return new Response(JSON.stringify({ success: true }));
}
