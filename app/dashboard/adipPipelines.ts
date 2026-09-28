// app/dashboard/adipPipelines.ts

import { adipEngine } from "@/lib/adip/engine";
import { supabase } from "@/lib/supabase/Client";

export const ADIP_Pipelines = {
  async processEvent(userId: string, companyId: string, workspaceId: string, command: string) {
    const ctx = await adipEngine();

    const pipelineEvent = {
      user_id: ctx.userId,
      company_id: ctx.companyId,
      workspace_id: ctx.workspaceId,
      command,
      processed_at: new Date().toISOString(),
    };

    await supabase.from("adip_pipeline_events").insert(pipelineEvent);

    return {
      success: true,
      event: pipelineEvent,
    };
  },
};
