//app/dashboard-modern/components/ModernTopbar.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../../dashboard/context/CompanyContext';
import { ADIP_Supreme } from '../../dashboard/adipSupreme';

export default function ModernTopbar() {
  const { companyId } = useCompany();

  const [status, setStatus] = useState('—');
  const [integrity, setIntegrity] = useState('—');
  const [latency, setLatency] = useState('—');

  useEffect(() => {
    const loadStatus = async () => {
      if (!companyId) return;

      const supremeDecision = await ADIP_Supreme.canScale(companyId);

      if (!supremeDecision.allowed) {
        setStatus('Inestable');
        setIntegrity('N/A');
        setLatency('N/A');
        return;
      }

      setStatus('Estable');
      setIntegrity('98.7%');
      setLatency('120ms');
    };

    loadStatus();
  }, [companyId]);

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="text-sm font-semibold text-gray-900">
        ADIP – Arquitectura de Decisión Inteligente Predictiva
      </div>

      <div className="flex gap-6 text-xs text-gray-600">
        <span>Estado del sistema: {status}</span>
        <span>Integridad: {integrity}</span>
        <span>Latencia: {latency}</span>
      </div>
    </header>
  );
}
