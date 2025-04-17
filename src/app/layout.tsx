import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";
import { IplDataInitializer } from "./utilities/IplDataInitializer";
import { MatchNoteNotifier } from "./utilities/MatchNoteNotifier";
import { ToastContainer } from "react-toastify";
import Image from "next/image";

export const metadata: Metadata = {
  title: "IPL 2025 Dashboard",
  description: "Live IPL info, points, and match schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/IPL.png" />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans leading-relaxed">
        <IplDataInitializer />
        <MatchNoteNotifier /> 
        <ToastContainer />
        <header className="sticky top-0 z-10 bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-white md:text-3xl flex items-center gap-2">
               <Image src="/IPL.png" alt="IPL Logo" width={80} height={80} style={{marginRight:'1rem'}}/>
               IPL 2025 Dashboard
            </h1>
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
