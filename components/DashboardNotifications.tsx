//components/DashboardNotifications.tsx
"use client";

import { useState } from "react";

export default function DashboardNotifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-notifications">
      <button
        className="notifications-trigger"
        onClick={() => setOpen(!open)}
      >
        🔔
      </button>

      {open && (
        <div className="notifications-dropdown">
          <p>No hay notificaciones nuevas.</p>
        </div>
      )}
    </div>
  );
}
