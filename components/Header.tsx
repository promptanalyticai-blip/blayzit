export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-[#c8d8e4]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-[#2b6777] font-bold text-2xl">
          PromptAnalyticAI
        </div>

        {/* NAV */}
        <nav className="hidden md:flex space-x-10 text-[#2b6777] font-medium">
          <a href="/dashboard" className="hover:text-[#52ab98] transition">
            Dashboard
          </a>
          <a href="/workspaces" className="hover:text-[#52ab98] transition">
            Workspaces
          </a>
          <a href="/analytics" className="hover:text-[#52ab98] transition">
            Analytics
          </a>
          <a href="/billing" className="hover:text-[#52ab98] transition">
            Billing
          </a>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center space-x-4">
          <a
            href="/profile"
            className="text-[#2b6777] font-medium hover:text-[#52ab98] transition"
          >
            Perfil
          </a>

          <button className="bg-[#52ab98] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#3e8c7d] transition">
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
