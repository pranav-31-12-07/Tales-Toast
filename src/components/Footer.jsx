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

  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Two+Stories+Cafe,+V87Q%2B3X5,+4-13-693,+Shrikrishna+Nagar,+Ulkanagari,+Chhatrapati+Sambhajinagar,+Maharashtra+431009";

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
              <div>
                <span className="font-editorial text-2xl font-bold tracking-tight text-[#FAF7F2] block leading-tight">
                  Two Stories
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51] block">
                  Coffee &amp; Kitchen • Pure Veg
                </span>
              </div>
            </div>

            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm mb-6">
              A pure vegetarian coffee house and kitchen in Ulkanagari (Near Khinvansara Park), Chhatrapati Sambhajinagar. Specialty pour-overs, cold brews, sizzling platters, and handcrafted culinary comforts.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.zomato.com/aurangabad/two-stories-ulkanagari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C62828] text-[#FAF7F2] flex items-center justify-center font-extrabold text-sm transition-colors"
                aria-label="Zomato"
                title="Two Stories on Zomato"
              >
                Z
              </a>
              <a
                href="https://www.swiggy.com/city/aurangabad/two-stories-ulkanagari-rest1088507"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FC8019] text-[#FAF7F2] flex items-center justify-center font-extrabold text-sm transition-colors"
                aria-label="Swiggy"
                title="Two Stories on Swiggy"
              >
                S
              </a>
              <a
                href="https://www.district.in/dining/aurangabad/two-stories-ulkanagari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center font-black text-xs transition-colors"
                aria-label="District"
                title="Two Stories on District"
              >
                D
              </a>
              <a
                href="https://www.instagram.com/popular/two-stories-cafe-aurangabad/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Instagram"
                title="Two Stories on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:+919922822247"
                className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 hover:bg-[#C86D51] text-[#FAF7F2] flex items-center justify-center transition-colors"
                aria-label="Call Us"
                title="Call +91 99228 22247"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-4">
              Explore Two Stories
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-[#C86D51] transition-colors cursor-pointer"
                >
                  Coffee House Story
                </button>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C86D51] transition-colors">
                  100% Pure Veg Menu
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-[#C86D51] transition-colors">
                  Atmosphere &amp; Ambience
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#C86D51] transition-colors">
                  Location &amp; Directions
                </a>
              </li>
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C86D51] transition-colors"
                >
                  Plus Code: V87Q+3X5
                </a>
              </li>
            </ul>
          </div>

          {/* Visit & Hours */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-4">
              Café &amp; Kitchen Sanctuary
            </h4>
            <div className="space-y-3 text-sm text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C86D51] shrink-0 mt-0.5" />
                <span>
                  CTS 15735/30, Shop 5 &amp; 6, Plot 2, Sai Heritage, Ward 98, Zone 7, Near Khinvansara Park (Shrikrishna Nagar), Ulkanagari, Chhatrapati Sambhajinagar 431009
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C86D51] shrink-0" />
                <a href="tel:+919922822247" className="hover:underline text-[#FAF7F2]">
                  +91 99228 22247
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#C86D51] uppercase tracking-wider">
                    Operating Hours
                  </p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300">
                    Open Daily
                  </span>
                </div>
                <p className="text-sm font-bold text-[#FAF7F2] mt-1">
                  12:00 PM – 12:00 AM &amp; Till 2:15 AM
                </p>
                <p className="text-xs text-[#FAF7F2]/60 mt-0.5">
                  Approx. ~₹550 for two • Dine-in, Takeaway &amp; Delivery
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Two Stories Coffee &amp; Kitchen. Pure Vegetarian in Ulkanagari. Crafted with</span>
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
