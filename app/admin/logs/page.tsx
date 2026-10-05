// app/admin/logs/page.tsx

import AdminPanelLayout from "@/components/admin/admin-layout"
import AdminSectionCard from "@/components/admin/admin-section-card"

export default function AdminLogsPage() {
  return (
    <AdminPanelLayout>
      <AdminSectionCard title="Logs del sistema">
        <p className="text-xs text-slate-700">
          Aquí se mostrarán los logs del sistema cuando se conecte el módulo de auditoría.
        </p>
      </AdminSectionCard>
    </AdminPanelLayout>
  )
}
