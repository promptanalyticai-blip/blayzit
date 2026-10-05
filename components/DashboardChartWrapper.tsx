//components/DashboardChartWrapper.tsx
interface DashboardChartWrapperProps {
  title?: string;
  children: React.ReactNode;
}

export default function DashboardChartWrapper({ title, children }: DashboardChartWrapperProps) {
  return (
    <div className="dashboard-chart-wrapper">
      {title && <h3 className="dashboard-chart-title">{title}</h3>}
      <div className="dashboard-chart-body">
        {children}
      </div>
    </div>
  );
}
