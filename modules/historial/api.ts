import { supabase } from "@/lib/supabase/client";

export async function getHistorial() {
  const { data, error } = await supabase
    .from("historial")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error historial:", error.message);
    return [];
  }

  return data ?? [];
}
