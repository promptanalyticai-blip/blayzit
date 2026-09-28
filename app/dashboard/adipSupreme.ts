// app/dashboard/adipSupreme.ts

import { adipEngine } from "@/lib/adip/engine";
import { supabase } from "@/lib/supabase/Client";

export const ADIP_Supreme = {
  async canExecute(userId: string, companyId: string, workspaceId: string) {
    const ctx = await adipEngine();

    const { data: role } = await supabase
      .from("company_roles")
      .select("role")
      .eq("user_id", ctx.userId)
      .eq("company_id", ctx.companyId)
      .single();

    if (!role) {
      return {
        allowed: false,
        reason: "No role found",
      };
    }

    const allowedRoles = ["owner", "admin"];

    return {
      allowed: allowedRoles.includes(role.role),
      reason: allowedRoles.includes(role.role)
        ? "Role permitted"
        : "Role not permitted",
      role: role.role,
    };
  },
};
