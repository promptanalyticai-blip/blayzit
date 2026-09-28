//app/dashboard/components/SupremeAdmin.tsx

'use client';

import { useRole } from '../context/RoleContext';
import { supabase } from '@/lib/supabase/Client';
import { ADIP_Supreme } from '../adipSupreme';
import { useCompany } from '../context/CompanyContext';

export default function SupremeAdmin() {
  const { role } = useRole();
  const { companyId } = useCompany();

  const handleCreateWorkspace = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id ?? '';

    const supremeDecision = await ADIP_Supreme.canModifyWorkspace(
      userId,
      companyId ?? ''
    );

    if (!supremeDecision.allowed) {
      return;
    }

    await supabase.from('workspaces').insert({
      company_id: companyId,
      name: 'Nuevo Workspace',
    });
  };

  if (role !== 'admin') {
    return (
      <div className="bg-[#200] text-red-400 p-4 rounded-lg">
        No tienes permisos para acceder a Supreme Admin.
      </div>
    );
  }

  return (
    <section className="bg-[#111] text-white p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Supreme Admin</h2>

      <div className="text-sm opacity-80 mb-4">
        Panel de administración empresarial.
      </div>

      <button
        className="bg-green-600 px-3 py-1 text-black font-bold rounded"
        onClick={handleCreateWorkspace}
      >
        Crear Workspace
      </button>
    </section>
  );
}
