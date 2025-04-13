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
        <header className="sticky top-0 z-10 bg-blue-600 text-white shadow-md"> {/* Added shadow-md and z-10 */}
          <div className="container mx-auto px-4 py-4 flex items-center justify-between"> {/* Added py-4 and px-4, flex, justify-between, items-center */}
            <h1 className="text-xl font-bold">IPL 2025 Dashboard</h1>
            {/*  Removed Dropdown for simplicity, can add navigation links here later if needed */}
          </div>
        </header>
        <main className="container mx-auto px-4 py-6 space-y-8"> {/* Added py-6 and space-y-8 to main */}
          {children}
        </main>
      </body>
    </html>
  )
}