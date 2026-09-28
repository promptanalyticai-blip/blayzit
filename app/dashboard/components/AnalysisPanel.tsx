// app/dashboard/components/AnalysisPanel.tsx

'use client';

import { AdipState } from '../adipCore';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../context/CompanyContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { ADIP_Supreme } from '../adipSupreme';

export default function AnalysisPanel({ state }: { state: AdipState }) {
  const { companyId } = useCompany();
  const { workspaceId } = useWorkspace();

  const runProtectedAnalysis = async () => {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id ?? '';

    const supremeDecision = await ADIP_Supreme.canExecute(
      userId,
      companyId ?? '',
      workspaceId ?? ''
    );

    if (!supremeDecision.allowed) {
      return;
    }

    await supabase.from('adip_history').insert({
      command: 'ANALYZE_PANEL',
      result: 'Análisis ejecutado desde AnalysisPanel',
      mode: 'analyzing',
      company_id: companyId,
      workspace_id: workspaceId,
    });
  };

  return (
    <div className="bg-[#111] text-white p-4 rounded-lg flex flex-col">
      <div className="text-sm mb-2">Panel de Análisis</div>
      <div className="text-xs mb-4">
        Modo actual: {state.mode} | Último comando: {state.lastCommand ?? 'Ninguno'}
      </div>
      <button
        className="bg-blue-700 px-3 py-2 rounded text-white text-sm"
        onClick={runProtectedAnalysis}
      >
        Ejecutar análisis protegido
      </button>
    </div>
  );
}
