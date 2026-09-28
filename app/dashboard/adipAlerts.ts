//app/dashboard/adipAlerts.ts

import { adipEngine } from "@/lib/adip/engine";
import { supabase } from "@/lib/supabase/Client";

export const ADIP_Alerts = {
  async send(userId: string, companyId: string, workspaceId: string, message: string) {
    const ctx = await adipEngine();

    const alert = {
      user_id: ctx.userId,
      company_id: ctx.companyId,
      workspace_id: ctx.workspaceId,
      message,
      sent_at: new Date().toISOString(),
    };

    await supabase.from("adip_alerts").insert(alert);

    return {
      success: true,
      alert,
    };
  },
};
