//lib/adip/engine.ts
import { getADIPContext } from "./context";

export async function adipEngine() {
  const ctx = await getADIPContext();

  if (!ctx || !ctx.user) {
    throw new Error("ADIP: No hay contexto empresarial.");
  }

  return {
    userId: ctx.user.id,
    email: ctx.user.email,
    companyId: ctx.companyId,
    workspaceId: ctx.workspaceId,
    role: ctx.role,
  };
}
