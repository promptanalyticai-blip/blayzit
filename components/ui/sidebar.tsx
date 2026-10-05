//components/ui/sidebar.tsx
"use client"

import Link from "next/link"
import { Home, Brain, Settings, BarChart3 } from "lucide-react"

export default function Sidebar() {
  return (
    <aside className="w-64 h-full border-r bg-muted/30 p-4 flex flex-col gap-6">
      <div className="text-xl font-bold px-2">BLAYZIT</div>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
          <Home size={18} />
          Dashboard
        </Link>

        <Link href="/dashboard/adip" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
          <Brain size={18} />
          ADIP
        </Link>

        <Link href="/dashboard/dnip" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
          <BarChart3 size={18} />
          DNIP
        </Link>

        <Link href="/dashboard/blayzit" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted">
          <Settings size={18} />
          BLAYZIT Admin
        </Link>
      </nav>
    </aside>
  )
}
