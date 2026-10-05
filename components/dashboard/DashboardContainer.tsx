//components/DashboardContainer.tsx
export default function DashboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-container">
      {children}
    </div>
  );
}
