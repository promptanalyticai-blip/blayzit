// app/dashboard/TerminalPro.tsx

import { adipEngine } from "@/lib/adip/engine";
import { ADIPCore } from "./adipCore";

export default async function TerminalPro() {
  const ctx = await adipEngine();

  async function execute(command: string) {
    "use server";
    return await ADIPCore(command);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Terminal ADIP</h2>

      <div className="mb-4">
        <p>Empresa: {ctx.companyId}</p>
        <p>Workspace: {ctx.workspaceId}</p>
        <p>Rol: {ctx.role}</p>
      </div>

      <form action={execute}>
        <input
          type="text"
          name="command"
          placeholder="Escribe un comando ADIP..."
          className="border p-2 rounded w-full"
        />
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
          Ejecutar
        </button>
      </form>
    </div>
  );
}
