// app/dashboard/layout.tsx

import { CompanyProvider } from "./context/CompanyContext";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { RoleProvider } from "./context/RoleContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProvider>
      <WorkspaceProvider>
        <RoleProvider>
          {children}
        </RoleProvider>
      </WorkspaceProvider>
    </CompanyProvider>
  );
}
