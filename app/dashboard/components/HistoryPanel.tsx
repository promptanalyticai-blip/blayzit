// app/dashboard/components/HistoryPanel.tsx

'use client';

import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../context/CompanyContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { ADIP_Supreme } from '../adipSupreme';

export default function HistoryPanel({ history }: { history: string[] }) {
  const { companyId } = useCompany();
  const { workspaceId } = useWorkspace();

  const loadProtectedHistory = async () => {
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
      command: 'HISTORY_PANEL_ACCESS',
      result: 'Historial consultado desde HistoryPanel',
      mode: 'idle',
      company_id: companyId,
      workspace_id: workspaceId,
    });
  };

  return (
    <div className="bg-[#111] text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm">Historial ADIP</div>
        <button
          className="bg-[#333] px-2 py-1 rounded text-xs"
          onClick={loadProtectedHistory}
        >
          Registrar acceso
        </button>
      </div>
      <div className="text-xs max-h-40 overflow-y-auto space-y-1">
        {history.map((h, i) => (
          <div key={i} className="bg-[#222] px-2 py-1 rounded">
            {h}
          </div>
        ))}
      </div>
    </div>
  );
}

