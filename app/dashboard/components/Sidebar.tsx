// app/dashboard/components/Sidebar.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useRole } from '../context/RoleContext';
import { ADIP_Supreme } from '../adipSupreme';
import { useCompany } from '../context/CompanyContext';

export default function Sidebar({
  setCompanyId,
  setWorkspaceId,
}: {
  setCompanyId: (id: string) => void;
  setWorkspaceId: (id: string) => void;
}) {
  const { role } = useRole();
  const { companyId } = useCompany();

  const [companies, setCompanies] = useState<any[]>([]);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      const { data } = await supabase.from('companies').select('*');
      if (data) setCompanies(data);
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    const loadWorkspaces = async () => {
      if (!selectedCompany) return;

      const { data } = await supabase
        .from('workspaces')
        .select('*')
        .eq('company_id', selectedCompany);

      if (data) setWorkspaces(data);
    };

    loadWorkspaces();
  }, [selectedCompany]);

  const handleSelectCompany = async (id: string) => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id ?? '';

    const supremeDecision = await ADIP_Supreme.canModifyWorkspace(
      userId,
      companyId ?? id
    );

    if (!supremeDecision.allowed) {
      return;
    }

    setCompanyId(id);
    setSelectedCompany(id);
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] text-white p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">ADIP</h1>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm opacity-70">Empresas</h2>
        {companies.map((c) => (
          <button
            key={c.id}
            className="bg-[#222] px-3 py-2 rounded text-left hover:bg-[#333]"
            onClick={() => handleSelectCompany(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {selectedCompany && (
        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-sm opacity-70">Workspaces</h2>
          {workspaces.map((w) => (
            <button
              key={w.id}
              className="bg-[#333] px-3 py-2 rounded text-left hover:bg-[#444]"
              onClick={() => setWorkspaceId(w.id)}
            >
              {w.name}
            </button>
          ))}
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-6">
          <button className="bg-purple-700 px-3 py-2 rounded w-full text-left hover:bg-purple-800">
            Supreme Admin
          </button>
        </div>
      )}
    </aside>
  );
}
