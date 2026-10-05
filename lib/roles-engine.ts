// lib/roles-engine.ts

export type UserRole = "owner" | "admin" | "member"

export type Permission =
  | "manage_company"
  | "manage_workspace"
  | "run_dnip"
  | "view_adip"
  | "view_admin"
  | "manage_users"

const rolePermissions: Record<UserRole, Permission[]> = {
  owner: [
    "manage_company",
    "manage_workspace",
    "run_dnip",
    "view_adip",
    "view_admin",
    "manage_users",
  ],
  admin: [
    "manage_company",
    "manage_workspace",
    "run_dnip",
    "view_adip",
    "view_admin",
  ],
  member: ["run_dnip", "view_adip"],
}

export function getPermissionsForRole(role: UserRole): Permission[] {
  return rolePermissions[role] ?? []
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false
}
