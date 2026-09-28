//app/init/page.tsx

"use client";

import { useEffect } from "react";
import { useEnterpriseInit } from "../dashboard/hooks/useEnterpriseInit";
import { useWorkspaceInit } from "../dashboard/hooks/useWorkspaceInit";
import { useRouter } from "next/navigation";

export default function InitPage() {
  const router = useRouter();
  useEnterpriseInit();
  const workspace = useWorkspaceInit();

  useEffect(() => {
    if (workspace) {
      router.push("/dashboard");
    }
  }, [workspace]);

  return <div>Inicializando ADIP…</div>;
}
