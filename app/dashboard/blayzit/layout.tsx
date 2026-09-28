// app/dashboard/blayzit/layout.tsx
"use client";

import { BlayzitProvider } from "@/ui/blayzit/provider";

export default function BlayzitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlayzitProvider>{children}</BlayzitProvider>;
}
