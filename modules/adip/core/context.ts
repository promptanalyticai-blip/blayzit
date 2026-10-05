// lib/adip/context.ts
import { supabase } from "@/lib/supabase/Client";

export async function getADIPContext() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    user,
    role: "user",
    companyId: "default-company",
    workspaceId: "default-workspace",
  };
}
