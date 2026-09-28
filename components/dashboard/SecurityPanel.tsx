"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function SecurityPanel() {
  const user = useUser();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const res = await fetch(
        `/api/observability/logs?tenantId=${user.tenant_id}&limit=200`
      );
      const json = await res.json();
      setLogs(json.logs.filter((l: any) => l.level === "security"));
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>Security Events</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            <strong>{log.message}</strong>
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
