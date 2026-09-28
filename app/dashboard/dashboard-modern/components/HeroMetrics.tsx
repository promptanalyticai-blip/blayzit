//app/dashboard-modern/components/HeroMetrics.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { useWorkspace } from '../../dashboard/context/WorkspaceContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function HeroMetrics() {
  const { companyId } = useCompany();
  const { workspaceId } = useWorkspace();

  const [companiesCount, setCompaniesCount] = useState<number | null>(null);
  const [decisionsCount, setDecisionsCount] = useState<number | null>(null);
  const [analysisCount, setAnalysisCount] = useState<number | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id ?? '';

      const supremeDecision = await ADIP_Supreme.canExecute(
        userId,
        companyId ?? '',
        workspaceId ?? ''
      );

      if (!supremeDecision.allowed) {
        setCompaniesCount(null);
        setDecisionsCount(null);
        setAnalysisCount(null);
        return;
      }

      const { count: companies } = await supabase
        .from('companies')
        .select('*', { count: 'exact', head: true });

      const { count: decisions } = await supabase
        .from('adip_history')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId);

      const { count: analysis } = await supabase
        .from('adip_history')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .eq('mode', 'analyzing');

      setCompaniesCount(companies ?? 0);
      setDecisionsCount(decisions ?? 0);
      setAnalysisCount(analysis ?? 0);
    };

    loadMetrics();
  }, [companyId, workspaceId]);

  return (
    <section className="grid grid-cols-3 gap-6 p-6">
      <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-xl">
        <div className="text-sm text-gray-500">Empresas Activas</div>
        <div className="text-4xl font-bold text-gray-900 mt-2">
          {companiesCount ?? '—'}
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-xl">
        <div className="text-sm text-gray-500">Decisiones Emitidas</div>
        <div className="text-4xl font-bold text-gray-900 mt-2">
          {decisionsCount ?? '—'}
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 p-6 rounded-xl">
        <div className="text-sm text-gray-500">Análisis Activos</div>
        <div className="text-4xl font-bold text-gray-900 mt-2">
          {analysisCount ?? '—'}
        </div>
      </div>
    </section>
  );
}
