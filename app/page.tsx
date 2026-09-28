// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold">BLAZIT</h1>
        <p className="text-zinc-600">SaaS en construcción. Entra al login para continuar.</p>
        <a
          href="/login"
          className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-white"
        >
          Ir al login
        </a>
      </div>
    </main>
  );
}
