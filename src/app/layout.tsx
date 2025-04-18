// src/app/layout.tsx
import "./globals.css"; // Keep globals.css import
import type { Metadata } from "next";
import { AppHeader } from "./components/AppHeader"; // Import the new header component
import { IplDataInitializer } from "./utilities/IplDataInitializer"; // Adjust path if needed
import { MatchNoteNotifier } from "./utilities/MatchNoteNotifier"; // Adjust path if needed
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Metadata remains the same
export const metadata: Metadata = {
  title: "IPL 2025 Dashboard",
  description: "Live IPL info, points, and match schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon link should be relative to the public directory */}
        <link rel="icon" href="/IPL.png" sizes="any" /> {/* Added sizes="any" */}
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans leading-relaxed">
        {/* Keep these utility components */}
        <IplDataInitializer />
        <MatchNoteNotifier />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        {/* Use the new AppHeader component */}
        <AppHeader />

        <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
          {children}
        </main>

        {/* Optional Footer */}
        {/* <footer className="py-4 text-center text-gray-600 text-sm mt-auto">
            <p>© {new Date().getFullYear()} IPL Dashboard.</p>
        </footer> */}
      </body>
    </html>
  );
}