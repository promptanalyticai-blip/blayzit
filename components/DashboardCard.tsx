//components/DashboardCard.tsx
interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
}

export default function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      {title && <h3 className="dashboard-card-title">{title}</h3>}
      <div className="dashboard-card-body">{children}</div>
    </div>
  );
}
