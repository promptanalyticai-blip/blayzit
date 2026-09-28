// supabase/functions/export-cron/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  console.log("Running scheduled export cron...");

  const SUPABASE_URL = Deno.env.get("PROJECT_URL")!;
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY")!;

  const headers = {
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    "Content-Type": "application/json",
  };

  // Obtener tareas programadas
  const tasksRes = await fetch(`${SUPABASE_URL}/rest/v1/scheduled_exports`, {
    method: "GET",
    headers,
  });

  const tasks = await tasksRes.json();
  const now = new Date();

  for (const task of tasks) {
    // USAR NOMBRES REALES DE TU TABLA
    const lastRun = task.last_run ? new Date(task.last_run) : null;

    const shouldRun =
      !lastRun ||
      (task.frequency === "daily" &&
        now.getTime() - lastRun.getTime() >= 86400000) ||
      (task.frequency === "weekly" &&
        now.getTime() - lastRun.getTime() >= 604800000) ||
      (task.frequency === "monthly" &&
        now.getTime() - lastRun.getTime() >= 2592000000);

    if (!shouldRun) continue;

    // CONSULTA REAL: workspaceid, startdate, enddate
    const logsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/activity_log?workspace_id=eq.${task.workspaceid}&created_at=gte.${task.startdate}&created_at=lte.${task.enddate}`,
      { headers }
    );

    const logs = await logsRes.json();

    // Evitar Internal Server Error si no hay logs
    if (!logs || logs.length === 0) {
      console.log("No logs found for this task. Skipping export.");
      continue;
    }

    // Crear contenido TXT
    let content = "EXPORTACIÓN AUTOMÁTICA DE LOGS\n\n";

    logs.forEach((log: any) => {
      content += `ID: ${log.id}\n`;
      content += `Evento: ${log.event_type}\n`;
      content += `Detalles: ${log.details}\n`;
      content += `Fecha: ${log.created_at}\n\n`;
    });

    if (task.watermark) {
      content += "\n--- BORRADOR ---\n";
    }

    // Guardar historial
    await fetch(`${SUPABASE_URL}/rest/v1/export_history`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        userId: task.userid,          // NOMBRE REAL
        workspaceId: task.workspaceid, // NOMBRE REAL
        format: task.format,
        startDate: task.startdate,
        endDate: task.enddate,
        watermark: task.watermark,
      }),
    });

    // Actualizar last_run
    await fetch(
      `${SUPABASE_URL}/rest/v1/scheduled_exports?id=eq.${task.id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ last_run: now.toISOString() }),
      }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
