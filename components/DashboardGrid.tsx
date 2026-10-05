//components/DashboardGrid.tsx
interface DashboardGridProps {
  columns?: number;
  children: React.ReactNode;
}

export default function DashboardGrid({ columns = 3, children }: DashboardGridProps) {
  return (
    <div
      className="dashboard-grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {children}
    </div>
  );
}
