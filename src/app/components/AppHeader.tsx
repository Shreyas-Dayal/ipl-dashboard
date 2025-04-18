"use client"; 
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white rounded-md" onClick={closeMenu}>
          <Image src="/IPL.png" alt="IPL Logo" width={40} height={40} className="h-8 w-8 md:h-10 md:w-10"/>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white md:text-3xl hidden sm:inline">
             IPL 2025 Dashboard
          </h1>
           <h1 className="text-lg font-extrabold text-white sm:hidden">
             IPL 2025
          </h1>
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-blue-200 transition duration-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white">Home</Link>
          <Link href="/schedule" className="text-white hover:text-blue-200 transition duration-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white">Schedule</Link>
          <Link href="/points-table" className="text-white hover:text-blue-200 transition duration-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white">Points Table</Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-8 6h8" />
              </svg>
            )}
          </button>
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 bg-blue-700 shadow-md md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'transform scale-y-100 origin-top' : 'transform scale-y-0 origin-top'
        }`}
        style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
        aria-hidden={!isMenuOpen}
      >
         {isMenuOpen && (
             <nav className="flex flex-col px-4 pt-2 pb-4 space-y-1">
                 <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white">Home</Link>
                 <Link href="/schedule" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white">Schedule</Link>
                 <Link href="/points-table" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white">Points Table</Link>
             </nav>
         )}
      </div>
    </header>
  );
};