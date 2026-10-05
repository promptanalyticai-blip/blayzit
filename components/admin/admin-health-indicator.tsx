// components/admin/admin-health-indicator.tsx

export default function AdminHealthIndicator({ health }: { health: string }) {
  const color =
    health === "healthy"
      ? "text-emerald-600"
      : health === "warning"
      ? "text-amber-600"
      : "text-red-600"

  return (
    <span className={`text-lg font-semibold ${color}`}>
      {health.toUpperCase()}
    </span>
  )
}
