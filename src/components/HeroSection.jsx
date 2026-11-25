import React, { useState, useEffect } from 'react';
import { ArrowDown, Compass, Coffee, Sparkles, BookOpen, UtensilsCrossed } from 'lucide-react';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for subtle parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track subtle mouse movement for 3D card tilt
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setMousePos({ x, y });
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen pt-32 pb-20 flex items-center bg-[#FAF7F2] overflow-hidden"
    >
      {/* =========================================================================
          BLURRED FLOATING ORBS IN BACKGROUND
          ========================================================================= */}
      {/* Orb 1: Warm Terracotta Glow (Top Left) */}
      <div 
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#C86D51]/25 via-[#E5D6C2]/30 to-transparent blur-3xl pointer-events-none animate-orb-1"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />

      {/* Orb 2: Soft Caramel / Latte Ambient (Center Right) */}
      <div 
        className="absolute top-1/4 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-[#C86D51]/20 via-[#F0E8DC]/50 to-transparent blur-3xl pointer-events-none animate-orb-2"
        style={{ transform: `translateY(${-scrollY * 0.12}px)` }}
      />

      {/* Orb 3: Subtle Warm Espresso Accent (Bottom Left) */}
      <div 
        className="absolute -bottom-28 left-1/3 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-[#3B261D]/10 via-[#F5EFE6]/40 to-transparent blur-3xl pointer-events-none animate-orb-3"
      />

      {/* Ambient Noise / Warm Glow Overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =====================================================================
              LEFT COLUMN: HERO CONTENT
              ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in-up">
            
            {/* Top Pill Badge: Pure Veg Coffee & Kitchen */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F0E8DC]/90 border border-[#3B261D]/10 backdrop-blur-md shadow-warm-sm mb-6 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] ring-2 ring-[#2E7D32]/30 animate-pulse" />
              <span className="text-[#C86D51] text-xs">✦</span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#3B261D]">
                100% Pure Veg Coffee House &amp; Kitchen
              </span>
              <span className="text-[#3B261D]/30">•</span>
              <span className="text-[11px] sm:text-xs font-semibold text-[#7E5745]">
                Ulkanagari • Open Till 2:15 AM
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl xl:text-[76px] font-bold text-[#3B261D] tracking-tight leading-[1.08] mb-6">
              Where Every Sip{' '}
              <span className="block font-serif italic text-[#C86D51] font-normal mt-1">
                Tells Two Stories.
              </span>
            </h1>

            {/* Editorial Body Description */}
            <p className="text-base sm:text-lg text-[#644436] font-normal leading-relaxed max-w-xl mb-8">
              An aesthetic, pure vegetarian coffee house and kitchen in the heart of Ulkanagari. Single-origin manual pours, sizzling hot plates, handcrafted footlongs, artisanal pasta, 10-inch stone-baked pizzas, and decadent shakes for conversations that linger late into the night.
            </p>

            {/* Call To Action Row */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={scrollToMenu}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3B261D] hover:bg-[#C86D51] text-[#FAF7F2] font-bold text-sm sm:text-base shadow-warm-lg hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Explore Pure Veg Menu</span>
                <ArrowDown className="w-4 h-4 text-[#FAF7F2] group-hover:translate-y-1 transition-transform" />
              </button>

              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10 text-xs font-bold text-[#3B261D]">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>100+ Pure Veg Delights</span>
              </div>
            </div>

            {/* Bottom Highlights Row */}
            <div className="pt-6 border-t border-[#3B261D]/10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl text-xs sm:text-sm font-semibold text-[#3B261D]/85">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F0E8DC] flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-[#C86D51]" />
                </div>
                <span>Near Khinvansara Park</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F0E8DC] flex items-center justify-center shrink-0">
                  <Coffee className="w-4 h-4 text-[#C86D51]" />
                </div>
                <span>Specialty Arabica Brews</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#F0E8DC] flex items-center justify-center shrink-0">
                  <UtensilsCrossed className="w-4 h-4 text-[#C86D51]" />
                </div>
                <span>Sizzlers &amp; Footlongs</span>
              </div>
            </div>

          </div>

          {/* =====================================================================
              RIGHT COLUMN: AESTHETIC VISUAL CARD COMPOSITION
              ===================================================================== */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Main Visual Container with Interactive Tilt & Parallax */}
            <div 
              className="relative w-full max-w-[440px] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
              }}
            >
              
              {/* Back Card: Terracotta Arch Café Interior Photo (Crystal Clear img1.png) */}
              <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-[#3B261D]/15 shadow-warm-xl bg-[#F0E8DC] aspect-[4/5] group">
                <img 
                  src="/img1.png" 
                  alt="Two Stories Coffee House & Kitchen Interior"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Subtle Warm Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#23150F]/30 via-transparent to-transparent pointer-events-none" />

                {/* Single Floating Top-Right Badge: Ulkanagari Two Stories Sanctuary */}
                <div className="absolute top-5 right-5 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[#23150F]/90 backdrop-blur-md text-[#FAF7F2] border border-white/15 shadow-xl">
                  <div className="w-6 h-6 rounded-lg bg-[#C86D51] flex items-center justify-center text-white shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[#FAF7F2]/70 block leading-tight">
                      ULKANAGARI
                    </span>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Two Stories Sanctuary
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Overlapping Cappuccino Card (Crystal Clear img2.png) */}
              <div 
                className="absolute -bottom-6 -left-6 sm:-left-8 w-44 sm:w-48 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white animate-float-card z-30"
                style={{
                  transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`,
                }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                  <img 
                    src="/img2.png" 
                    alt="Two Stories Handcrafted Cappuccino & Book"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {/* Subtle steam glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23150F]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Ambient Glow behind the card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C86D51]/20 to-[#E5D6C2]/40 rounded-[3rem] blur-2xl -z-10 pointer-events-none" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
