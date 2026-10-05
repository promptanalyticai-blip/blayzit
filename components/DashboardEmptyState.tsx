//components/DashboardEmptyState.tsx
interface DashboardEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function DashboardEmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: DashboardEmptyStateProps) {
  return (
    <div className="dashboard-empty-state">
      <h3>{title}</h3>
      <p>{description}</p>

      {actionLabel && onAction && (
        <button className="dashboard-empty-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
