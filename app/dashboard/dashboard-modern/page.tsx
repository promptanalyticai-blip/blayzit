app/dashboard-modern/page.tsx

'use client';

import HeroMetrics from './components/HeroMetrics';
import MainChart from './components/MainChart';
import CriticalEvents from './components/CriticalEvents';
import OperationalImpact from './components/OperationalImpact';

export default function DashboardModernPage() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <HeroMetrics />
      <MainChart />

      <div className="grid grid-cols-2 gap-6">
        <CriticalEvents />
        <OperationalImpact />
      </div>
    </div>
  );
}
