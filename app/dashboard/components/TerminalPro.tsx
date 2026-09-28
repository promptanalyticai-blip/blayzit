// app/dashboard/components/TerminalPro.tsx

'use client';

import { useState } from 'react';
import { AdipState } from '../adipCore';
import { supabase } from '@/lib/supabase/Client';
import { useCompany } from '../context/CompanyContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { ADIP_Pipelines } from '../adipPipelines';
import { ADIP_Critical } from '../adipCritical';
import { ADIP_Alerts } from '../adipAlerts';

export default function TerminalPro({
  onCommand,
  state,
}: {
  onCommand: (cmd: string) => void;
  state: AdipState;
}) {
  const [input, setInput] = useState('');
  const { companyId } = useCompany();
  const { workspaceId } = useWorkspace();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim();
    setInput('');

    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id ?? '';

    await ADIP_Pipelines.processEvent(userId, companyId ?? '', workspaceId ?? '', cmd);

    const criticalEval = await ADIP_Critical.evaluate(
      userId,
      companyId ?? '',
      workspaceId ?? '',
      cmd
    );

    if (criticalEval.critical && criticalEval.action === 'alert') {
      await ADIP_Alerts.send(
        userId,
        companyId ?? '',
        workspaceId ?? '',
        `CRITICAL: ${cmd}`
      );
    }

    onCommand(cmd);
  };

  return (
    <div className="bg-[#111] text-white p-4 rounded-lg flex flex-col">
      <div className="text-sm mb-2">Modo: {state.mode}</div>
      <div className="text-xs mb-4">
        Último comando: {state.lastCommand ?? 'Ninguno'}
      </div>
      <div className="text-xs mb-4">
        Último resultado: {state.lastResult ?? 'Sin resultado'}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 bg-[#222] text-white px-3 py-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un comando para ADIP..."
        />
        <button
          type="submit"
          className="bg-purple-700 px-3 py-2 rounded text-white"
        >
          Ejecutar
        </button>
      </form>
    </div>
  );
}
