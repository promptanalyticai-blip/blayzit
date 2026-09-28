// app/dashboard/page.tsx

import { getADIPContext } from "@/lib/adip/context";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const ctx = await getADIPContext();

  if (!ctx) redirect("/login");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p>Empresa: {ctx.companyId}</p>
      <p>Workspace: {ctx.workspaceId}</p>
      <p>Rol: {ctx.role}</p>
    </div>
  );
}
