// app/dashboard/analysis/page.tsx

import { getADIPContext } from "@/lib/adip/context";
import { redirect } from "next/navigation";

export default async function AnalysisPage() {
  const ctx = await getADIPContext();

  if (!ctx) redirect("/login");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Análisis</h1>
      <p>Workspace activo: {ctx.workspaceId}</p>
    </div>
  );
}
