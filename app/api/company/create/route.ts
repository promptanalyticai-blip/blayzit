//app/api/company/create/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Crear empresa
    const { data: company, error: companyError } = await supabase
      .from("companies")
      .insert({
        name: `${email.split("@")[0]} Company`,
        owner: userId,
      })
      .select()
      .single();

    if (companyError) throw companyError;

    // 2. Crear workspace inicial
    const { data: workspace, error: workspaceError } = await supabase
      .from("workspaces")
      .insert({
        company_id: company.id,
        name: "Workspace Principal",
      })
      .select()
      .single();

    if (workspaceError) throw workspaceError;

    // 3. Asignar rol owner
    const { error: roleError } = await supabase.from("company_roles").insert({
      company_id: company.id,
      user_id: userId,
      role: "owner",
    });

    if (roleError) throw roleError;

    return NextResponse.json({
      success: true,
      company,
      workspace,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
