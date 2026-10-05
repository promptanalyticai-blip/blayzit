//components/DashboardPageHeader.tsx
interface DashboardPageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardPageHeader({ title, subtitle }: DashboardPageHeaderProps) {
  return (
    <div className="dashboard-page-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
