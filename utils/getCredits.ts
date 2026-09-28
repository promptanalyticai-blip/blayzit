import { createServerClient } from "@/utils/createServerClient";

export async function getCredits(userId: string) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("credits")
    .select("credits")
    .eq("user_id", userId)
    .single();

  if (error || !data) return 0;

  return data.credits;
}
