app/dashboard-modern/layout.tsx

import ModernSidebar from './components/ModernSidebar';
import ModernTopbar from './components/ModernTopbar';

export default function DashboardModernLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <ModernSidebar />
      <main className="flex flex-col flex-1">
        <ModernTopbar />
        {children}
      </main>
    </div>
  );
}
