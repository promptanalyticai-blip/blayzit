// app/dashboard/adipCore.ts

import { adipEngine } from "@/lib/adip/engine";
import { ADIP_Pipelines } from "./adipPipelines";
import { ADIP_Critical } from "./adipCritical";
import { ADIP_Alerts } from "./adipAlerts";
import { ADIP_Supreme } from "./adipSupreme";
import { supabase } from "@/lib/supabase/Client";

export type AdipExecutionResult = {
  command: string;
  mode: "analysis" | "execution" | "idle";
  companyId: string;
  workspaceId: string;
  userId: string;
  timeline: any[];
  critical: any;
  supreme: any;
  alertSent: boolean;
  executed: boolean;
  created_at: string;
};

/* -------------------------------------------------------
   ADIP CORE — Motor Empresarial Unificado
------------------------------------------------------- */
export async function ADIPCore(command: string): Promise<AdipExecutionResult> {
  // 1. Obtener contexto empresarial
  const ctx = await adipEngine();

  const timeline: any[] = [];
  const start = performance.now();

  timeline.push({
    step: "context-loaded",
    ctx,
    ts: Date.now(),
  });

  // 2. Determinar modo (analysis / execution / idle)
  let mode: "analysis" | "execution" | "idle" = "idle";

  if (command.startsWith("analyze")) mode = "analysis";
  if (command.startsWith("run")) mode = "execution";

  timeline.push({
    step: "mode-selected",
    mode,
    ts: Date.now(),
  });

  // 3. ADIP Supreme — Validación de permisos empresariales
  const supreme = await ADIP_Supreme.canExecute(
    ctx.userId,
    ctx.companyId,
    ctx.workspaceId
  );

  timeline.push({
    step: "supreme-evaluation",
    supreme,
    ts: Date.now(),
  });

  if (!supreme.allowed) {
    return {
      command,
      mode,
      companyId: ctx.companyId,
      workspaceId: ctx.workspaceId,
      userId: ctx.userId,
      timeline,
      critical: null,
      supreme,
      alertSent: false,
      executed: false,
      created_at: new Date().toISOString(),
    };
  }

  // 4. Pipelines empresariales
  await ADIP_Pipelines.processEvent(
    ctx.userId,
    ctx.companyId,
    ctx.workspaceId,
    command
  );

  timeline.push({
    step: "pipelines-processed",
    ts: Date.now(),
  });

  // 5. Evaluación crítica
  const critical = await ADIP_Critical.evaluate(
    ctx.userId,
    ctx.companyId,
    ctx.workspaceId,
    command
  );

  timeline.push({
    step: "critical-evaluation",
    critical,
    ts: Date.now(),
  });

  let alertSent = false;

  if (critical.critical && critical.action === "alert") {
    await ADIP_Alerts.send(
      ctx.userId,
      ctx.companyId,
      ctx.workspaceId,
      `CRITICAL: ${command}`
    );

    alertSent = true;

    timeline.push({
      step: "alert-sent",
      ts: Date.now(),
    });
  }

  // 6. Resultado final
  const executed = true;
  const end = performance.now();

  const result: AdipExecutionResult = {
    command,
    mode,
    companyId: ctx.companyId,
    workspaceId: ctx.workspaceId,
    userId: ctx.userId,
    timeline,
    critical,
    supreme,
    alertSent,
    executed,
    created_at: new Date().toISOString(),
  };

  // 7. Guardar historial empresarial
  await supabase.from("adip_history").insert({
    command,
    mode,
    company_id: ctx.companyId,
    workspace_id: ctx.workspaceId,
    user_id: ctx.userId,
    timeline,
    critical,
    supreme,
    alert_sent: alertSent,
    executed,
    execution_time_ms: end - start,
  });

  return result;
}
