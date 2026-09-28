//app/dashboard-modern/components/CriticalEvents.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function CriticalEvents() {
  const { companyId } = useCompany();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id ?? '';

      const supremeDecision = await ADIP_Supreme.canExecute(
        userId,
        companyId ?? '',
        ''
      );

      if (!supremeDecision.allowed) {
        setEvents([]);
        return;
      }

      const { data } = await supabase
        .from('adip_history')
        .select('*')
        .eq('company_id', companyId)
        .like('command', '%CRITICAL%')
        .order('created_at', { ascending: false })
        .limit(5);

      setEvents(data ?? []);
    };

    loadEvents();
  }, [companyId]);

  return (
    <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
      <div className="text-sm text-gray-600 mb-3">Eventos Críticos en Tiempo Real</div>

      <div className="flex flex-col gap-3 text-xs text-gray-800">
        {events.length === 0 && (
          <div className="p-3 bg-gray-100 rounded-lg">No hay eventos críticos</div>
        )}

        {events.map((e) => (
          <div key={e.id} className="p-3 bg-gray-100 rounded-lg">
            {e.command} — {e.result ?? 'Sin resultado'}
          </div>
        ))}
      </div>
    </section>
  );
}
