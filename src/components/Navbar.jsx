import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0d0c11]/95 backdrop-blur-md shadow-2xl border-b border-[#2c2933]' : 'bg-[#0d0c11] border-b border-[#2c2933]'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f0a839] to-[#ffd08a] flex items-center justify-center shadow-lg shadow-[#f0a839]/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🎬</span>
            </div>
            <span className="text-xl font-black tracking-wider uppercase text-[#f5f1ea]">
              CINEMA<span className="text-[#f0a839]">VIBE</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-semibold transition-colors hover:text-[#f0a839] ${
                location.pathname === '/' ? 'text-[#f0a839]' : 'text-[#a8a3ae]'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/movies" 
              className={`text-sm font-semibold transition-colors hover:text-[#f0a839] ${
                location.pathname === '/movies' ? 'text-[#f0a839]' : 'text-[#a8a3ae]'
              }`}
            >
              Catalog
            </Link>

            <Link 
              to="/movies" 
              className="bg-[#f0a839] hover:bg-[#ffd08a] text-[#0d0c11] px-6 py-3 rounded-xl text-sm font-extrabold shadow-lg shadow-[#f0a839]/20 transition-all transform hover:scale-105"
            >
              Explore Catalog
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#f5f1ea] hover:text-[#f0a839] focus:outline-none p-2.5 rounded-xl bg-[#17151d] border border-[#2c2933]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0c11] border-b border-[#2c2933] px-6 pt-4 pb-6 space-y-3 shadow-2xl">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-bold text-[#f5f1ea] hover:bg-[#17151d] hover:text-[#f0a839]"
          >
            Home
          </Link>
          <Link 
            to="/movies" 
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-base font-bold text-[#f5f1ea] hover:bg-[#17151d] hover:text-[#f0a839]"
          >
            Catalog
          </Link>
          <div className="pt-2">
            <Link 
              to="/movies" 
              onClick={() => setIsOpen(false)}
              className="w-full block text-center bg-[#f0a839] hover:bg-[#ffd08a] text-[#0d0c11] px-4 py-3 rounded-xl font-extrabold shadow-lg"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}