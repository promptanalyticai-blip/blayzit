//app/dashboard/context/RoleContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';

type RoleContextType = {
  role: string | null;
  setRole: (r: string) => void;
};

const RoleContext = createContext<RoleContextType>({
  role: null,
  setRole: () => {},
});

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
