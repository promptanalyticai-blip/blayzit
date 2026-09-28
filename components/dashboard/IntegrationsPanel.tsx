"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function IntegrationsPanel() {
  const user = useUser();
  const [integrations, setIntegrations] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const res = await fetch(`/api/integrations/list?tenantId=${user.tenant_id}`);
      const json = await res.json();
      setIntegrations(json.integrations || []);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>External Integrations</h2>
      <ul>
        {integrations.map((i) => (
          <li key={i.id}>
            <strong>{i.provider}</strong>
            <br />
            Active: {i.active ? "Yes" : "No"}
            <br />
            Base URL: {i.base_url}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
