import { getADIPContext } from "./context";

export async function adipEngine() {
  const ctx = await getADIPContext();

  if (!ctx) {
    throw new Error("ADIP: No hay contexto empresarial.");
  }

  return {
    userId: ctx.user.id,
    companyId: ctx.companyId,
    workspaceId: ctx.workspaceId,
    role: ctx.role,
  };
}
