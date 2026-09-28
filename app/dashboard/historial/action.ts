// app/dashboard/historial/action.ts
"use server";

import { runBlayzitEngine } from "@/modules/blayzit/engine";
import { redirect } from "next/navigation";

export async function ejecutarMotor(formData: FormData) {
  const prompt = formData.get("prompt")?.toString() ?? "";

  if (!prompt.trim()) {
    throw new Error("Prompt vacío");
  }

  await runBlayzitEngine(prompt);

  redirect("/dashboard/historial");
}
