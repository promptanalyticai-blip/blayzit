import { createClient } from "@supabase/supabase-js";

export default async function handler(req: Request): Promise<Response> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: orgs } = await supabase.from("organizations").select("*");

  for (const org of orgs) {
    const orgId = org.id;

    // Historial
    const { data: history } = await supabase
      .from("history")
      .select("*")
      .eq("organization_id", orgId);

    // Créditos
    const { data: credits } = await supabase
      .from("organization_credits")
      .select("*")
      .eq("organization_id", orgId)
      .single();

    // Seguridad
    const { data: security } = await supabase
      .from("security_events")
      .select("*")
      .eq("organization_id", orgId);

    // Billing
    const { data: subs } = await supabase
      .from("billing_subscriptions")
      .select("*")
      .eq("organization_id", orgId);

    const analytics = {
      total_events: history?.length || 0,
      adip_usage: history?.filter((h) => h.event_type.startsWith("adip")).length || 0,
      analyze_usage: history?.filter((h) => h.event_type === "analyze").length || 0,
      credits_left: credits?.credits || 0,
      security_alerts: security?.length || 0,
      subscription_plan: subs?.[0]?.plan || "none",
      updated_at: new Date().toISOString(),
    };

    await supabase
      .from("analytics_cache")
      .upsert({
        organization_id: orgId,
        data: analytics,
        updated_at: new Date().toISOString(),
      });
  }

  return new Response(JSON.stringify({ success: true }));
}
