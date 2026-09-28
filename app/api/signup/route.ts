// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { email, password, companyName } = await req.json();

  const { data: userData, error: signupError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (signupError || !userData.user) {
    return NextResponse.json({ error: signupError }, { status: 400 });
  }

  const userId = userData.user.id;

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      name: companyName,
      owner_id: userId,
      role: "owner",
    })
    .select("*")
    .single();

  if (companyError || !company) {
    return NextResponse.json({ error: companyError }, { status: 400 });
  }

  await supabase.from("users_companies").insert({
    user_id: userId,
    company_id: company.id,
    role: "owner",
  });

  await supabase.from("workspaces").insert({
    company_id: company.id,
    name: "Default workspace",
    type: "primary",
  });

  return NextResponse.json({ userId, companyId: company.id }, { status: 201 });
}
