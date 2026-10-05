//lib/adip/roles.ts

export function canAccess(role: string, module: string) {
  const permissions = {
    owner: ["dashboard", "analysis", "historial", "blayzit", "init", "admin"],
    admin: ["dashboard", "analysis", "historial", "blayzit"],
    user: ["dashboard", "analysis"],
  };

  return permissions[role]?.includes(module) ?? false;
}
