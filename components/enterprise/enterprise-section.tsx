// components/enterprise/enterprise-section.tsx

export default function EnterpriseSection({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {children}
    </div>
  )
}
