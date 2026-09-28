"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function ApiKeysPanel() {
  const user = useUser();
  const [keys, setKeys] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const res = await fetch(`/api/api-keys/list?tenantId=${user.tenant_id}`);
      const json = await res.json();
      setKeys(json.keys || []);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>API Keys</h2>
      <ul>
        {keys.map((k) => (
          <li key={k.id}>
            <strong>{k.key}</strong>
            <br />
            Revoked: {k.revoked ? "Yes" : "No"}
            <br />
            Expires: {k.expires_at || "Never"}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
