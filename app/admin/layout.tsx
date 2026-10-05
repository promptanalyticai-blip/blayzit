// app/admin/layout.tsx
import LogoutButton from "@/components/auth/logout-button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR ADMIN */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">BLAYZIT — Admin</h1>
        <LogoutButton />
      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        {children}
      </main>
    </div>
  )
}
