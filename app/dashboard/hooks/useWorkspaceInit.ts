// app/dashboard/hooks/useWorkspaceInit.ts

"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase/Client";

export function useWorkspaceInit() {
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabaseClient.auth.getUser();
      const user = auth?.user;
      if (!user) return;

      // 1. Buscar empresa del usuario
      const { data: company } = await supabaseClient
        .from("companies")
        .select("*")
        .eq("owner_id", user.id)
        .maybeSingle();

      if (!company) return;

      // 2. Buscar workspace
      const { data: ws } = await supabaseClient
        .from("workspaces")
        .select("*")
        .eq("company_id", company.id)
        .maybeSingle();

      setWorkspace(ws || null);
    }

    load();
  }, []);

  return workspace;
}
