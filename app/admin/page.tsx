// app/admin/page.tsx

import AdminPanelLayout from "@/components/admin/admin-layout"
import AdminDashboard from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <AdminPanelLayout>
      <AdminDashboard />
    </AdminPanelLayout>
  )
}
