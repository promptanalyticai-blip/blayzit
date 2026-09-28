//app/dashboard/context/WorkspaceContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';

type WorkspaceContextType = {
  workspaceId: string | null;
  setWorkspaceId: (id: string) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspaceId: null,
  setWorkspaceId: () => {},
});

export const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);
