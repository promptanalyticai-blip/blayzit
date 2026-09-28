import { createServerClient } from "@/utils/createServerClient";

export async function useCredits(userId: string, amount: number) {
  const supabase = createServerClient();

  const { data: current } = await supabase
    .from("credits")
    .select("credits")
    .eq("user_id", userId)
    .single();

  if (!current || current.credits < amount) {
    return { success: false, error: "Sin créditos suficientes" };
  }

  await supabase
    .from("credits")
    .update({ credits: current.credits - amount })
    .eq("user_id", userId);

  return { success: true };
}
