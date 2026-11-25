import React, { useState, useEffect } from 'react';
import { Coffee, Phone, Menu, X, MapPin, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Our Story', href: '#' },
    { label: 'Pure Veg Menu', href: '#menu' },
    { label: 'The Kitchen', href: '#atmosphere' },
    { label: 'Visit & Map', href: '#visit' },
  ];

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Two+Stories+Cafe,+V87Q%2B3X5,+4-13-693,+Shrikrishna+Nagar,+Ulkanagari,+Chhatrapati+Sambhajinagar,+Maharashtra+431009";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#FAF7F2]/95 backdrop-blur-md shadow-warm-md border-b border-[#3B261D]/10'
          : 'py-5 bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#3B261D] text-[#FAF7F2] flex items-center justify-center shadow-warm-sm group-hover:bg-[#C86D51] transition-colors">
            <Coffee className="w-5 h-5 text-[#FAF7F2]" />
          </div>
          <div>
            <span className="font-editorial text-2xl font-black text-[#3B261D] tracking-tight block leading-tight">
              Two Stories
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51] block">
              Coffee &amp; Kitchen • Ulkanagari
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold text-[#3B261D]/80 hover:text-[#C86D51] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action: Pure Veg Hours Badge & Call Button */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Live Hours Badge */}
          <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10 text-xs font-semibold text-[#3B261D]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Open Till Late • 12 PM – 2:15 AM</span>
          </div>

          {/* Quick Call */}
          <a
            href="tel:+919922822247"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B261D] hover:bg-[#C86D51] text-[#FAF7F2] text-xs font-bold shadow-warm-sm hover:shadow-warm-md transition-all active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-[#C86D51] group-hover:text-white" />
            <span>Call +91 99228 22247</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#F0E8DC] text-[#3B261D] hover:bg-[#3B261D] hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#3B261D]/15 px-6 pt-4 pb-6 shadow-warm-lg animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-[#3B261D] hover:text-[#C86D51] py-1 border-b border-[#3B261D]/5"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7E5745]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Ulkanagari, Chhatrapati Sambhajinagar • Open Daily</span>
              </div>

              <a
                href="tel:+919922822247"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#3B261D] text-white text-sm font-bold shadow-warm-sm"
              >
                <Phone className="w-4 h-4 text-[#C86D51]" />
                <span>Call +91 99228 22247</span>
              </a>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F0E8DC] text-[#3B261D] text-xs font-bold border border-[#3B261D]/10"
              >
                <MapPin className="w-3.5 h-3.5 text-[#C86D51]" />
                <span>Directions (Near Khinvansara Park, Ulkanagari)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
