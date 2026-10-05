//components/ui/topbar.tsx
"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Topbar() {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      <div className="font-medium text-lg">Workspace</div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="w-8 h-8 rounded-full bg-muted" />
      </div>
    </header>
  )
}
