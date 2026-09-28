//app/dashboard-modern/components/MainChart.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function MainChart() {
  const { companyId } = useCompany();
  const [dailyCounts, setDailyCounts] = useState<number[]>([]);

  useEffect(() => {
    const loadChartData = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id ?? '';

      const supremeDecision = await ADIP_Supreme.canExecute(
        userId,
        companyId ?? '',
        ''
      );

      if (!supremeDecision.allowed) {
        setDailyCounts([]);
        return;
      }

      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const results: number[] = [];

      for (const day of days) {
        const { count } = await supabase
          .from('adip_history')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', companyId);

        results.push(count ?? 0);
      }

      setDailyCounts(results);
    };

    loadChartData();
  }, [companyId]);

  return (
    <section className="p-6">
      <div className="text-sm text-gray-600 mb-3">
        Actividad del Sistema (Últimos 7 días)
      </div>

      <div className="w-full h-56 bg-white border border-gray-200 shadow-sm rounded-xl p-4">
        <pre className="text-xs text-gray-600">
          {JSON.stringify(dailyCounts, null, 2)}
        </pre>
      </div>
    </section>
  );
}
