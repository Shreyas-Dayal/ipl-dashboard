import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";
import { IplDataInitializer } from "./components/IplDataInitializer";

export const metadata: Metadata = {
  title: "IPL 2025 Dashboard",
  description: "Live IPL info, points, and match schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans leading-relaxed">
        <IplDataInitializer />
        <header className="sticky top-0 z-10 bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white md:text-3xl">IPL 2025 Dashboard</h1>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-white hover:text-blue-300 transition duration-300">Home</Link>
              <Link href="/schedule" className="text-white hover:text-blue-300 transition duration-300">Schedule</Link>
              <Link href="/points-table" className="text-white hover:text-blue-300 transition duration-300">Points Table</Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8 space-y-8">
          {children}

          {/* Footer Placeholder */}
          {/* <footer className="py-4 text-center text-gray-600 text-sm">
            <p>© 2025 IPL Dashboard. All Rights Reserved. By Shreyas</p>
          </footer> */}
        </main>
      </body>
    </html>
  );
}
