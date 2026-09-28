//app/dashboard-modern/components/ModernSidebar.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useRole } from '../../dashboard/context/RoleContext';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function ModernSidebar() {
  const { role } = useRole();
  const { companyId, setCompanyId } = useCompany();

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
      id
    );

    if (!supremeDecision.allowed) {
      return;
    }

    setCompanyId(id);
    setSelectedCompany(id);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-8">
      <div className="text-2xl font-bold text-gray-900 tracking-tight">
        ADIP
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-xs font-semibold text-gray-500 uppercase">Empresas</div>
        <div className="flex flex-col gap-2">
          {companies.map((c) => (
            <button
              key={c.id}
              className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-left text-gray-800"
              onClick={() => handleSelectCompany(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {selectedCompany && (
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-gray-500 uppercase">Workspaces</div>
          <div className="flex flex-col gap-2">
            {workspaces.map((w) => (
              <button
                key={w.id}
                className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-left text-gray-800"
              >
                {w.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-auto">
          <button className="w-full px-3 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">
            Supreme Admin
          </button>
        </div>
      )}
    </aside>
  );
}
