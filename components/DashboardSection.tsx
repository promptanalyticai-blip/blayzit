//components/DashboardSection.tsx
interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className="dashboard-section">
      <h2 className="dashboard-section-title">{title}</h2>
      <div className="dashboard-section-content">
        {children}
      </div>
    </section>
  );
}
