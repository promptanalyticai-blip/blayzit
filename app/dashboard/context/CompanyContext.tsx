//app/dashboard/context/CompanyContext.tsx

'use client';

import { createContext, useContext, useState } from 'react';

type CompanyContextType = {
  companyId: string | null;
  setCompanyId: (id: string) => void;
};

const CompanyContext = createContext<CompanyContextType>({
  companyId: null,
  setCompanyId: () => {},
});

export const CompanyProvider = ({ children }: { children: React.ReactNode }) => {
  const [companyId, setCompanyId] = useState<string | null>(null);

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
