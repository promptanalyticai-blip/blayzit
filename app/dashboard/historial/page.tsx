// app/dashboard/historial/page.tsx
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { ejecutarMotor } from "./action";

export default async function HistorialPage() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("historial")
    .select("*")
    .order("created_at", { ascending: false });

  const items = data ?? [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Historial</h1>

      <form action={ejecutarMotor} className="space-y-4">
        <input
          type="text"
          name="prompt"
          placeholder="Escribe un prompt…"
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Ejecutar motor
        </button>
      </form>

      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}
