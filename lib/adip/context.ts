import { supabaseServer } from "@/lib/supabase/server";

export async function getADIPContext() {
  const supabase = supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Obtener rol del usuario
  const { data: role } = await supabase
    .from("company_roles")
    .select("role, company_id")
    .eq("user_id", user.id)
    .single();

  if (!role) return null;

  // Obtener workspace principal
  const { data: workspace } = await supabase
    .from("workspaces")
    .select("*")
    .eq("company_id", role.company_id)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  return {
    user,
    role: role.role,
    companyId: role.company_id,
    workspaceId: workspace?.id ?? null,
  };
}
