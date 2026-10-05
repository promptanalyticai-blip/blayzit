//components/DashboardSearch.tsx
"use client";

import { useState } from "react";

export default function DashboardSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="dashboard-search">
      <input
        type="text"
        placeholder="Buscar…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
