// app/dashboard/adipCritical.ts

import { adipEngine } from "@/lib/adip/engine";
import { supabase } from "@/lib/supabase/Client";

export const ADIP_Critical = {
  async evaluate(userId: string, companyId: string, workspaceId: string, command: string) {
    const ctx = await adipEngine();

    const criticalPatterns = [
      "delete",
      "drop",
      "shutdown",
      "wipe",
      "reset-all",
      "danger",
      "critical",
      "override",
    ];

    const isCritical = criticalPatterns.some((p) => command.includes(p));

    if (!isCritical) {
      return {
        critical: false,
        action: "none",
        reason: "No critical pattern detected",
      };
    }

    await supabase.from("adip_critical_logs").insert({
      user_id: ctx.userId,
      company_id: ctx.companyId,
      workspace_id: ctx.workspaceId,
      command,
      detected_at: new Date().toISOString(),
    });

    return {
      critical: true,
      action: "alert",
      reason: "Critical pattern detected",
    };
  },
};
