//components/DashboardTabs.tsx
"use client";

import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface DashboardTabsProps {
  tabs: Tab[];
}

export default function DashboardTabs({ tabs }: DashboardTabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="dashboard-tabs">
      <div className="dashboard-tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`dashboard-tab-btn ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-tabs-content">
        {tabs[active].content}
      </div>
    </div>
  );
}
