// components/enterprise/enterprise-dashboard.tsx
"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

import EnterpriseSection from "./enterprise-section"
import EnterpriseOverview from "./enterprise-overview"
import EnterpriseCreateCompany from "./enterprise-create-company"
import EnterpriseCreateWorkspace from "./enterprise-create-workspace"
import EnterpriseBindDnip from "./enterprise-bind-dnip"
import LogoutButton from "@/components/auth/logout-button"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function EnterpriseDashboard() {
  const [overview, setOverview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token

      if (!token) {
        setLoading(false)
        return
      }

      const res = await fetch("/api/connection/overview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await res.json()
      setOverview(json)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <p className="p-6">Cargando panel enterprise...</p>

  if (!overview || overview.error)
    return (
      <div className="p-6">
        <p className="text-red-600">No autenticado.</p>
      </div>
    )

  return (
    <div className="p-6 flex flex-col gap-10 bg-gradient-to-br from-[#BFD0DD] to-[#F1F3F7] min-h-screen">

      {/* LOGOUT */}
      <div className="flex justify-end">
        <LogoutButton />
      </div>

      {/* OVERVIEW */}
      <EnterpriseSection title="Overview del Sistema">
        <EnterpriseOverview />
      </EnterpriseSection>

      {/* ACCIONES */}
      <EnterpriseSection title="Acciones">
        <EnterpriseCreateCompany userId={overview.user.id} />

        {overview.company && (
          <EnterpriseCreateWorkspace companyId={overview.company.id} />
        )}

        {overview.workspace && (
          <EnterpriseBindDnip workspaceId={overview.workspace.id} />
        )}
      </EnterpriseSection>
    </div>
  )
}
