// lib/connection-engine.ts
// Módulo enterprise de conexión real entre:
// Usuarios → Empresas → Workspaces → Motores DNIP
// Basado 100% en tu schema real de Supabase

import { createClient } from "@/lib/supabase/Client"
import { hasPermission, UserRole } from "@/lib/roles-engine"

const supabase = createClient()

/* -------------------------------------------------------
   USUARIOS (tabla: public.users)
-------------------------------------------------------- */

export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) throw new Error("Error obteniendo usuario: " + error.message)
  return data
}

/* -------------------------------------------------------
   EMPRESAS (tabla: public.companies)
   + relación: public.users_companies
   + roles: public.company_roles
-------------------------------------------------------- */

export async function getCompanyByUser(userId: string) {
  // Busca empresa donde el usuario es owner o miembro
  const { data, error } = await supabase
    .from("users_companies")
    .select("company_id, role")
    .eq("user_id", userId)
    .single()

  if (error) return null

  const { data: company, error: companyErr } = await supabase
    .from("companies")
    .select("*")
    .eq("id", data.company_id)
    .single()

  if (companyErr) return null

  return company
}

export async function getCompanyRole(userId: string, companyId: string): Promise<UserRole> {
  const { data, error } = await supabase
    .from("company_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("company_id", companyId)
    .single()

  if (error || !data) return "member"
  return data.role as UserRole
}

export async function assertCanManageCompany(role: UserRole) {
  if (!hasPermission(role, "manage_company")) {
    throw new Error("El usuario no tiene permisos para gestionar la empresa.")
  }
}

/* -------------------------------------------------------
   WORKSPACES (tabla: public.workspaces)
   + relación: public.users_workspaces
   + roles: public.workspace_roles
-------------------------------------------------------- */

export async function getWorkspaceByCompany(companyId: string) {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("company_id", companyId)
    .single()

  if (error) return null
  return data
}

export async function getWorkspaceRole(userId: string, workspaceId: string): Promise<UserRole> {
  const { data, error } = await supabase
    .from("workspace_roles")
    .select("rol")
    .eq("user_id", userId)
    .eq("workspace_id", workspaceId)
    .single()

  if (error || !data) return "member"
  return data.rol as UserRole
}

export async function assertCanManageWorkspace(role: UserRole) {
  if (!hasPermission(role, "manage_workspace")) {
    throw new Error("El usuario no tiene permisos para gestionar el workspace.")
  }
}

/* -------------------------------------------------------
   DNIP BINDINGS (tabla: public.dnip_bindings)
   ÚNICA tabla nueva necesaria
-------------------------------------------------------- */

export async function getDnipBinding(workspaceId: string) {
  const { data, error } = await supabase
    .from("dnip_bindings")
    .select("*")
    .eq("workspace_id", workspaceId)
    .single()

  if (error) return null
  return data
}

export async function bindWorkspaceToDnip(workspaceId: string, engine: "mock" | "advanced" | "enterprise") {
  const { data, error } = await supabase
    .from("dnip_bindings")
    .insert({
      workspace_id: workspaceId,
      dnip_engine: engine,
    })
    .select("*")
    .single()

  if (error) throw new Error("Error vinculando DNIP: " + error.message)
  return data
}

/* -------------------------------------------------------
   OVERVIEW COMPLETO DEL SISTEMA
-------------------------------------------------------- */

export async function getConnectionOverviewReal(userId: string) {
  // 1. Usuario real
  const user = await getUser(userId)

  // 2. Empresa real del usuario
  const company = await getCompanyByUser(user.id)

  // 3. Rol del usuario en la empresa
  const companyRole = company ? await getCompanyRole(user.id, company.id) : "member"

  // 4. Workspace real de la empresa
  const workspace = company ? await getWorkspaceByCompany(company.id) : null

  // 5. Rol del usuario en el workspace
  const workspaceRole = workspace ? await getWorkspaceRole(user.id, workspace.id) : "member"

  // 6. Motor DNIP vinculado al workspace
  const dnip = workspace ? await getDnipBinding(workspace.id) : null

  return {
    user,
    company,
    companyRole,
    workspace,
    workspaceRole,
    dnip,
  }
}
