//components/DashboardUserMenu.tsx
"use client";

import { useState } from "react";

export default function DashboardUserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-user-menu">
      <button
        className="user-menu-trigger"
        onClick={() => setOpen(!open)}
      >
        Mi cuenta ▾
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <a href="/dashboard/profile">Perfil</a>
          <a href="/dashboard/billing">Facturación</a>
          <a href="/dashboard/settings">Configuración</a>
          <a href="/logout">Cerrar sesión</a>
        </div>
      )}
    </div>
  );
}
