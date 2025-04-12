import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IPL 2025 Dashboard",
  description: "Live IPL info, points, and match schedule",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-blue-600 text-white p-4 text-xl font-bold sticky top-0 z-50 shadow">
          IPL 2025 Dashboard
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
