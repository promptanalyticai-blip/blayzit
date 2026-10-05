// components/admin/admin-section-card.tsx

export default function AdminSectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-xl border border-white/40 p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-slate-800 mb-3">{title}</h3>
      {children}
    </div>
  )
}
