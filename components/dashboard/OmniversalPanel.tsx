"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/providers/UserProvider";

export function OmniversalPanel() {
  const user = useUser();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const res = await fetch("/api/omniversal", {
        method: "POST",
        body: JSON.stringify({ tenantId: user.tenant_id }),
      });

      const json = await res.json();
      setData(json);
    })();
  }, [user]);

  if (!user) return null;

  return (
    <div>
      <h2>Omniversal Decision</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
