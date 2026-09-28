"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function ObservabilityPanel() {
  const user = useUser();
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const logsRes = await fetch(
        `/api/observability/logs?tenantId=${user.tenant_id}&limit=200`
      );
      const logsJson = await logsRes.json();
      setLogs(logsJson.logs || []);

      const metricsRes = await fetch(
        `/api/observability/metrics?tenantId=${user.tenant_id}&limit=200`
      );
      const metricsJson = await metricsRes.json();
      setMetrics(metricsJson.metrics || []);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>System Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.level}</strong>: {log.message}
            <br />
            {JSON.stringify(log.metadata)}
            <br />
            {new Date(log.created_at).toLocaleString()}
            <hr />
          </li>
        ))}
      </ul>

      <h2>System Metrics</h2>
      <ul>
        {metrics.map((m) => (
          <li key={m.id}>
            <strong>{m.metric_name}</strong>: {m.metric_value}
            <br />
            {JSON.stringify(m.metadata)}
            <br />
            {new Date(m.created_at).toLocaleString()}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
