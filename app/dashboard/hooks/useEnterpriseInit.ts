// app/dashboard/hooks/useEnterpriseInit.ts

"use client";

import { useEffect } from "react";
import { supabaseClient } from "@/lib/supabase/Client";

export function useEnterpriseInit() {
  useEffect(() => {
    async function init() {
      const { data: auth } = await supabaseClient.auth.getUser();
      const user = auth?.user;
      if (!user) return;

      // 1. Buscar empresa del usuario
      const { data: companies, error: companyError } = await supabaseClient
        .from("companies")
        .select("*")
        .eq("owner_id", user.id);

      if (companyError) {
        console.error("Error buscando empresa:", companyError);
        return;
      }

      let companyId = companies?.[0]?.id;

      // 2. Crear empresa si no existe
      if (!companyId) {
        const { data: inserted, error: insertError } = await supabaseClient
          .from("companies")
          .insert({
            owner_id: user.id,
            name: `Empresa de ${user.email}`,
          })
          .select();

        if (insertError || !inserted || inserted.length === 0) {
          console.error("No se pudo crear la empresa:", insertError);
          return;
        }

        companyId = inserted[0].id;
      }

      // 3. Buscar workspace
      const { data: workspaces, error: wsError } = await supabaseClient
        .from("workspaces")
        .select("*")
        .eq("company_id", companyId);

      if (wsError) {
        console.error("Error buscando workspace:", wsError);
        return;
      }

      // 4. Crear workspace si no existe
      if (!workspaces || workspaces.length === 0) {
        const { error: wsInsertError } = await supabaseClient
          .from("workspaces")
          .insert({
            company_id: companyId,
            name: "Workspace Principal",
          });

        if (wsInsertError) {
          console.error("No se pudo crear workspace:", wsInsertError);
        }
      }
    }

    init();
  }, []);
}
