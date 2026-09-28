"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function AuditPanel() {
  const user = useUser();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const res = await fetch(
        `/api/audit/logs?tenantId=${user.tenant_id}&limit=200`
      );
      const json = await res.json();
      setLogs(json.logs || []);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.action}</strong> — {log.entity} ({log.entity_id})  
            <br />
            {JSON.stringify(log.metadata)}
            <br />
            {new Date(log.created_at).toLocaleString()}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
