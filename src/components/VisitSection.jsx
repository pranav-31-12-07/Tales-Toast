import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Wallet, 
  ExternalLink, 
  Navigation, 
  Share2, 
  Check, 
  Compass,
  Sparkles
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function VisitSection() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const addressText = "Plot no 231, Varad Ganesh Mandir Rd, Samarth Nagar (beside IRA Executive), Chhatrapati Sambhajinagar, Maharashtra 431001";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Plot+no+231%2C+Varad+Ganesh+Mandir+Rd%2C+Samarth+Nagar%2C+Chhatrapati+Sambhajinagar%2C+Maharashtra+431001";
  const phoneCallUrl = "tel:+917677252525";

  const copyAddress = () => {
    navigator.clipboard?.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="visit" className="relative py-24 sm:py-32 bg-[#FAF7F2] border-t border-[#3B261D]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10 text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-4 shadow-warm-sm">
            <Compass className="w-4 h-4" />
            <span>Find Your Sanctuary</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#3B261D] tracking-tight">
            Visit Tales &amp; Toast
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#7E5745] font-normal leading-relaxed">
            Located in the heart of Samarth Nagar, Nirala Bazar — right beside IRA Executive. Drop in for artisanal pours, warm bites, and cozy moments.
          </p>
        </div>

        {/* Main Grid: Details on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Café Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-7 rounded-3xl bg-[#F0E8DC]/60 border border-[#3B261D]/10 shadow-warm-md hover:shadow-warm-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C86D51] text-white flex items-center justify-center shrink-0 shadow-warm-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                    Prime Location • Nirala Bazar
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#3B261D] mb-1.5">
                    Our Address
                  </h3>
                  <p className="text-sm text-[#4E3429] leading-relaxed">
                    Plot no 231, Varad Ganesh Mandir Rd, Samarth Nagar (beside IRA Executive), Nirala Bazar, Chhatrapati Sambhajinagar, Maharashtra 431001.
                  </p>
                  
                  <div className="mt-3 inline-block px-3 py-1 rounded-lg bg-[#FAF7F2] text-xs font-mono font-bold text-[#3B261D] border border-[#3B261D]/10">
                    Plus Code: V8HC+84
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={copyAddress}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B261D] hover:text-[#C86D51] transition-colors cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Timings & Cost Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Timings */}
              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#3B261D]/10 shadow-warm-sm">
                <div className="w-10 h-10 rounded-xl bg-[#3B261D] text-[#FAF7F2] flex items-center justify-center mb-3 shadow-xs">
                  <Clock className="w-5 h-5 text-[#C86D51]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E5745] block">
                  Operating Hours
                </span>
                <p className="font-editorial text-xl font-bold text-[#3B261D] mt-1">
                  11:00 AM – 11:00 PM
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Open Daily (Mon – Sun)</span>
                </div>
              </div>

              {/* Average Cost */}
              <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#3B261D]/10 shadow-warm-sm">
                <div className="w-10 h-10 rounded-xl bg-[#3B261D] text-[#FAF7F2] flex items-center justify-center mb-3 shadow-xs">
                  <Wallet className="w-5 h-5 text-[#C86D51]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E5745] block">
                  Average Cost
                </span>
                <p className="font-editorial text-xl font-bold text-[#3B261D] mt-1">
                  ~₹500 – ₹800
                </p>
                <span className="text-xs text-[#7E5745] font-medium block mt-2">
                  For two people (approx.)
                </span>
              </div>

            </div>

            {/* Direct Action Buttons: Open Maps & One-Tap Call */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#3B261D] hover:bg-[#C86D51] text-[#FAF7F2] font-bold text-sm shadow-warm-md hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <Navigation className="w-4 h-4 text-[#C86D51] group-hover:text-white" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={phoneCallUrl}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#F0E8DC] text-[#3B261D] border-2 border-[#3B261D]/20 hover:border-[#3B261D] font-bold text-sm shadow-warm-sm hover:shadow-warm-md transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#C86D51]" />
                <span>Call +91 76772 52525</span>
              </a>
            </div>

            {/* Socials & Dining Links */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#3B261D]/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7E5745]">
                Order &amp; Connect
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://www.instagram.com/tales_and_toast/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0E8DC] hover:bg-[#C86D51] text-[#3B261D] hover:text-white text-xs font-bold transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.zomato.com/aurangabad/tales-toast-nirala-bazar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0E8DC] hover:bg-[#C62828] text-[#3B261D] hover:text-white text-xs font-bold transition-colors"
                >
                  <span className="font-extrabold text-xs">Z</span>
                  <span>Zomato</span>
                </a>
                <a
                  href="https://www.district.in/dining/aurangabad/tales-toast-nirala-bazar?srsltid=AYCX9vInPs_ImSotNfk0QOBZAN3KiR9BiAEpL0ZZU_tBg688orAC4HbD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0E8DC] hover:bg-[#3B261D] text-[#3B261D] hover:text-white text-xs font-bold transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-[#3B261D] text-white flex items-center justify-center text-[10px] font-black">D</span>
                  <span>District</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Custom Interactive Map with Pulsing Red Landmark Pin */}
          <div className="lg:col-span-7 relative min-h-[440px] sm:min-h-[500px] rounded-3xl overflow-hidden border-2 border-[#3B261D]/15 shadow-warm-xl bg-[#E5D6C2]/30 flex flex-col">
            
            {/* Embedded Live Map using OpenStreetMap at 19.8783, 75.3203 */}
            <iframe
              title="Tales & Toast Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=75.3050%2C19.8680%2C75.3350%2C19.8880&amp;layer=mapnik&amp;marker=19.8783%2C75.3203"
              className="w-full h-full min-h-[440px] sm:min-h-[500px] border-0 filter saturate-90 contrast-105"
              loading="lazy"
            />

            {/* Prominent Overlay Floating Card with Pulsing Red Landmark Pin */}
            <div className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-xs z-10 p-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#3B261D]/15 shadow-warm-lg">
              <div className="flex items-center gap-3">
                
                {/* Pulsing Red Landmark Pin */}
                <div className="relative flex items-center justify-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#C62828] text-white flex items-center justify-center map-pulsing-pin shadow-md">
                    <MapPin className="w-5 h-5 fill-white text-white" />
                  </div>
                </div>

                <div>
                  <h4 className="font-editorial text-lg font-black text-[#3B261D] leading-tight">
                    Tales &amp; Toast
                  </h4>
                  <p className="text-xs font-semibold text-[#C62828] flex items-center gap-1">
                    <span>Beside IRA Executive</span>
                  </p>
                  <p className="text-[11px] text-[#7E5745] font-mono mt-0.5">
                    19.8783° N, 75.3203° E
                  </p>
                </div>

              </div>
            </div>

            {/* Quick Interactive Map Control Bar at Bottom */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-[#3B261D]/10 shadow-warm-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3B261D]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
                <span>Samarth Nagar (Nirala Bazar)</span>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3B261D] hover:bg-[#C86D51] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Navigate Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
