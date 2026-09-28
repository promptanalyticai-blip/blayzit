import { supabase } from "@/lib/supabase/client";

export async function getAnalysis() {
  const { data, error } = await supabase
    .from("analysis")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error analysis:", error.message);
    return [];
  }

  return data ?? [];
}
