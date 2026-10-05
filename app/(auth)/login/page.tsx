// app/(auth)/login/page.tsx
"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin() {
    setLoading(true)
    setError("")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/enterprise")
  }

  async function handleMagicLink() {
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
    alert("Te enviamos un enlace mágico a tu email.")
  }

  async function handleOAuth(provider: "google" | "github" | "azure" | "apple") {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/enterprise`,
      },
    })

    if (error) setError(error.message)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">

        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src="/logo.png" className="w-40" />
        </div>

        <h1 className="text-center text-2xl font-bold mb-2">Bienvenido a BLAYZIT</h1>
        <p className="text-center text-gray-600 mb-6">
          Tecnología para decisiones inteligentes — DNIP
        </p>

        {/* OAUTH */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleOAuth("google")}
            className="w-full py-2 border rounded-lg hover:bg-gray-100"
          >
            Continuar con Google
          </button>

          <button
            onClick={() => handleOAuth("azure")}
            className="w-full py-2 border rounded-lg hover:bg-gray-100"
          >
            Continuar con Microsoft
          </button>

          <button
            onClick={() => handleOAuth("github")}
            className="w-full py-2 border rounded-lg hover:bg-gray-100"
          >
            Continuar con GitHub
          </button>

          <button
            onClick={() => handleOAuth("apple")}
            className="w-full py-2 border rounded-lg hover:bg-gray-100"
          >
            Continuar con Apple
          </button>
        </div>

        {/* FORM */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <button
          onClick={handleMagicLink}
          disabled={loading}
          className="w-full py-2 mt-3 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Enviar enlace mágico a mi email
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}

        <div className="text-center mt-4 text-sm">
          <a className="block text-blue-600">¿Olvidaste tu contraseña?</a>
          <a className="block text-blue-600">Crear cuenta nueva</a>
        </div>

        <div className="text-center text-xs text-gray-500 mt-6">
          Seguridad · Estado del sistema · Documentación · Soporte · Términos · Privacidad
          <br />
          © 2026 BLAYZIT — DNIP
        </div>

      </div>
    </div>
  )
}
