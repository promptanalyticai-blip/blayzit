// app/dashboard/blayzit/page.tsx

import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BlayzitPage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <BlayzitDashboard />;
}
