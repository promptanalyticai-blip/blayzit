// app/blayzit/page.tsx
"use client";

import { BlayzitProvider } from "@/ui/blayzit";
import { BlayzitDashboard } from "@/ui/blayzit";

export default function BlayzitPage() {
  return (
    <BlayzitProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">BLAYZIT</h1>
        <BlayzitDashboard />
      </div>
    </BlayzitProvider>
  );
}
