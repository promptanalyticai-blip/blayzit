// app/dashboard/components/Topbar.tsx

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../context/CompanyContext';
import { ADIP_Supreme } from '../adipSupreme';

export default function Topbar() {
  const { companyId } = useCompany();
  const [status, setStatus] = useState('Desconocido');
  const [latency, setLatency] = useState<number | null>(null);
  const [integrity, setIntegrity] = useState<number | null>(null);

  useEffect(() => {
    const loadSystemStatus = async () => {
      if (!companyId) return;

      const supremeDecision = await ADIP_Supreme.canScale(companyId);

      if (!supremeDecision.allowed) {
        setStatus('Inestable');
        setLatency(null);
        setIntegrity(null);
        return;
      }

      setStatus('Estable');
      setLatency(120);
      setIntegrity(98.7);
    };

    loadSystemStatus();
  }, [companyId]);

  return (
    <header className="w-full bg-[#050505] text-white px-4 py-2 flex justify-between items-center">
      <div className="text-sm font-semibold">ADIP – Arquitectura de Decisión Inteligente Predictiva</div>
      <div className="flex gap-4 text-xs items-center">
        <span>Estado del sistema: {status}</span>
        <span>Integridad: {integrity !== null ? `${integrity}%` : 'N/A'}</span>
        <span>Latencia: {latency !== null ? `${latency}ms` : 'N/A'}</span>
      </div>
    </header>
  );
}
