import React from 'react';
import { Coffee, MapPin, Phone, ArrowUp, Heart } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#3B261D] text-[#FAF7F2] pt-16 pb-12 border-t border-[#FAF7F2]/10 relative overflow-hidden">
      {/* Subtle Warm Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-[#C86D51]/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF7F2]/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51] flex items-center justify-center text-white shadow-warm-sm">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-[#FAF7F2]">
                Tales &amp; Toast
              </span>
            </div>

            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm mb-6">
              An aesthetic café and lounge beside IRA Executive in Samarth Nagar (Nirala Bazar), Chhatrapati Sambhajinagar. Handcrafted coffees, artisanal bites, and cozy moments.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/tales_and_toast/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="Instagram @tales_and_toast"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.zomato.com/aurangabad/tales-toast-nirala-bazar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C62828] text-[#FAF7F2] flex items-center justify-center font-extrabold text-sm transition-colors"
                aria-label="Zomato"
                title="Tales & Toast on Zomato"
              >
                Z
              </a>
              <a
                href="https://www.district.in/dining/aurangabad/tales-toast-nirala-bazar?srsltid=AYCX9vInPs_ImSotNfk0QOBZAN3KiR9BiAEpL0ZZU_tBg688orAC4HbD"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center font-black text-xs transition-colors"
                aria-label="District"
                title="Tales & Toast on District"
              >
                D
              </a>
              <a
                href="tel:+917677252525"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Call Us"
                title="Call +91 76772 52525"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-4">
              Quick Exploration
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-[#C86D51] transition-colors cursor-pointer"
                >
                  3D Exploded Burger Hero
                </button>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C86D51] transition-colors">
                  Artisanal Food &amp; Coffee Menu
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#C86D51] transition-colors">
                  Map &amp; Landmark Directions
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plot+no+231%2C+Varad+Ganesh+Mandir+Rd%2C+Samarth+Nagar%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra+431001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C86D51] transition-colors"
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Visit & Hours */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-4">
              Café Sanctuary
            </h4>
            <div className="space-y-3 text-sm text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <span>
                  Plot no 231, Varad Ganesh Mandir Rd, Samarth Nagar (beside IRA Executive), Nirala Bazar, Chhatrapati Sambhajinagar 431001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C86D51] shrink-0" />
                <a href="tel:+917677252525" className="hover:underline text-[#FAF7F2]">
                  +91 76772 52525
                </a>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 mt-3">
                <p className="text-xs font-semibold text-[#C86D51] uppercase tracking-wider">
                  Open Daily
                </p>
                <p className="text-sm font-bold text-[#FAF7F2]">
                  11:00 AM – 11:00 PM
                </p>
                <p className="text-xs text-[#FAF7F2]/60 mt-0.5">
                  Walk-ins warmly welcomed anytime
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Tales &amp; Toast. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#C86D51] fill-[#C86D51]" />
            <span>in Chhatrapati Sambhajinagar.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
