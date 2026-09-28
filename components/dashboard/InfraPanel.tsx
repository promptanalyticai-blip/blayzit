"use client";

import { useEffect, useState } from "react";

export function InfraPanel() {
  const [health, setHealth] = useState<any>(null);
  const [db, setDb] = useState<any>(null);
  const [failover, setFailover] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const h = await fetch("/api/infra/health").then((r) => r.json());
      const d = await fetch("/api/infra/db-status").then((r) => r.json());
      const f = await fetch("/api/infra/failover").then((r) => r.json());

      setHealth(h);
      setDb(d);
      setFailover(f);
    })();
  }, []);

  return (
    <div>
      <h2>Infrastructure Status</h2>

      <h3>App Health</h3>
      <pre>{JSON.stringify(health, null, 2)}</pre>

      <h3>Database Status</h3>
      <pre>{JSON.stringify(db, null, 2)}</pre>

      <h3>Failover</h3>
      <pre>{JSON.stringify(failover, null, 2)}</pre>
    </div>
  );
}
