//app/dashboard-modern/components/OperationalImpact.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function OperationalImpact() {
  const { companyId } = useCompany();
  const [impact, setImpact] = useState({
    decisions: 0,
    alerts: 0,
    clients: 0,
    operations: 0,
  });

  useEffect(() => {
    const loadImpact = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id ?? '';

      const supremeDecision = await ADIP_Supreme.canExecute(
        userId,
        companyId ?? '',
        ''
      );

      if (!supremeDecision.allowed) {
        setImpact({
          decisions: 0,
          alerts: 0,
          clients: 0,
          operations: 0,
        });
        return;
      }

      const { count: decisions } = await supabase
        .from('adip_history')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .eq('mode', 'executing');

      const { count: alerts } = await supabase
        .from('adip_history')
        .select('*', { count: 'exact', head: true })
        .eq('company_id', companyId)
        .like('command', '%ALERT%');

      setImpact({
        decisions: decisions ?? 0,
        alerts: alerts ?? 0,
        clients: Math.floor((decisions ?? 0) * 0.2),
        operations: Math.floor((decisions ?? 0) * 0.5),
      });
    };

    loadImpact();
  }, [companyId]);

  return (
    <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
      <div className="text-sm text-gray-600 mb-3">Análisis de Impacto Operacional</div>

      <div className="flex flex-col gap-3 text-xs text-gray-800">
        <div className="p-3 bg-gray-100 rounded-lg">
          Impacto de Decisiones — {impact.decisions}
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          Impacto de Alertas — {impact.alerts}
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          Impacto en Clientes — {impact.clients}
        </div>
        <div className="p-3 bg-gray-100 rounded-lg">
          Impacto en Operaciones — {impact.operations}
        </div>
      </div>
    </section>
  );
}
