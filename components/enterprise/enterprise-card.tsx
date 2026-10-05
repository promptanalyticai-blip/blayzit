// components/enterprise/enterprise-card.tsx

export default function EnterpriseCard({ title, children }) {
  return (
    <div className="rounded-xl bg-white/20 backdrop-blur-xl p-6 border border-white/40 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
      {children}
    </div>
  )
}
