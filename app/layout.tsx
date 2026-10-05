// app/layout.tsx
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ui/theme-provider"

export const metadata = {
  title: "BLAYZIT",
  description: "Enterprise SaaS",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-background text-foreground">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
