// app/admin/system/page.tsx

import AdminPanelLayout from "@/components/admin/admin-layout"
import AdminSectionCard from "@/components/admin/admin-section-card"

export default function AdminSystemPage() {
  return (
    <AdminPanelLayout>
      <AdminSectionCard title="Estado del sistema">
        <p className="text-xs text-slate-700">
          Aquí se mostrará la integridad del sistema, módulos activos y dependencias.
        </p>
      </AdminSectionCard>
    </AdminPanelLayout>
  )
}
