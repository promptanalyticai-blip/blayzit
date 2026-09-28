// app/dashboard/components/ResultsPanel.tsx

'use client';

import { AdipState } from '../adipCore';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../context/CompanyContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { ADIP_Supreme } from '../adipSupreme';

export default function ResultsPanel({ state }: { state: AdipState }) {
  const { companyId } = useCompany();
  const { workspaceId } = useWorkspace();

  const logProtectedResult = async () => {
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
      command: 'RESULTS_PANEL',
      result: state.lastResult ?? 'Sin resultado',
      mode: state.mode,
      company_id: companyId,
      workspace_id: workspaceId,
    });
  };

  return (
    <div className="bg-[#111] text-white p-4 rounded-lg flex flex-col">
      <div className="text-sm mb-2">Panel de Resultados</div>
      <div className="text-xs mb-4">
        Último resultado: {state.lastResult ?? 'Sin resultado'}
      </div>
      <button
        className="bg-green-700 px-3 py-2 rounded text-white text-sm"
        onClick={logProtectedResult}
      >
        Registrar resultado protegido
      </button>
    </div>
  );
}
