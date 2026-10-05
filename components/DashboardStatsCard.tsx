//components/DashboardStatsCard.tsx
interface DashboardStatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

export default function DashboardStatsCard({ label, value, icon }: DashboardStatsCardProps) {
  return (
    <div className="dashboard-stats-card">
      {icon && <span className="stats-icon">{icon}</span>}
      <div className="stats-info">
        <p className="stats-label">{label}</p>
        <h3 className="stats-value">{value}</h3>
      </div>
    </div>
  );
}
