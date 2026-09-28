"use client";

import { useEffect, useState } from "react";

export function LatencyPanel() {
  const [latency, setLatency] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/infra/latency");
      const json = await res.json();
      setLatency(json);
    })();
  }, []);

  return (
    <div>
      <h2>Latency</h2>
      <pre>{JSON.stringify(latency, null, 2)}</pre>
    </div>
  );
}
