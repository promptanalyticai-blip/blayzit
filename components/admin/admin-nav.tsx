// components/admin/admin-nav.tsx

import Link from "next/link"

export default function AdminNav() {
  return (
    <aside className="w-64 bg-white/30 backdrop-blur-xl border-r border-white/40 p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">BLAYZIT Admin</h2>

      <nav className="flex flex-col gap-4 text-sm">
        <Link href="/admin" className="text-slate-700 hover:text-slate-900">
          Overview
        </Link>
        <Link href="/admin/logs" className="text-slate-700 hover:text-slate-900">
          Logs
        </Link>
        <Link href="/admin/jobs" className="text-slate-700 hover:text-slate-900">
          Jobs
        </Link>
        <Link href="/admin/system" className="text-slate-700 hover:text-slate-900">
          Estado del sistema
        </Link>
      </nav>
    </aside>
  )
}
