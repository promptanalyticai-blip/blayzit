// app/admin/jobs/page.tsx

import AdminPanelLayout from "@/components/admin/admin-layout"
import AdminSectionCard from "@/components/admin/admin-section-card"

export default function AdminJobsPage() {
  return (
    <AdminPanelLayout>
      <AdminSectionCard title="Jobs del sistema">
        <p className="text-xs text-slate-700">
          Aquí se mostrarán los jobs activos y su estado cuando se conecte el módulo de colas.
        </p>
      </AdminSectionCard>
    </AdminPanelLayout>
  )
}
