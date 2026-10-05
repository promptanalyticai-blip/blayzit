//components/DashboardSidebar.tsx
export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <a href="/dashboard/overview">Overview</a>
      <a href="/dashboard/stats">Estadísticas</a>
      <a href="/dashboard/files">Archivos</a>
      <a href="/dashboard/prompts">Prompts</a>
      <a href="/dashboard/settings">Configuración</a>
    </aside>
  );
}
