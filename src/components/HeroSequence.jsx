import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Sparkles, Coffee, Flame } from 'lucide-react';

/**
 * Total frame count and filename pattern detected from public/frames/:
 * Files: ezgif-frame-001.jpg -> ezgif-frame-238.jpg (Total: 238 frames)
 */
const TOTAL_FRAMES = 238;
const FRAME_PREFIX = '/frames/ezgif-frame-';
const FRAME_EXT = '.jpg';

export default function HeroSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  // State for preloading
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Loaded image cache reference
  const imagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(-1);
  const rafIdRef = useRef(null);
  const isReducedMotionRef = useRef(false);
  const isMobileRef = useRef(false);

  // Check user settings on mount
  useEffect(() => {
    isReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    isMobileRef.current = window.innerWidth < 768;
  }, []);

  // Format frame filename with 3-digit zero-padding
  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(3, '0');
    return `${FRAME_PREFIX}${padded}${FRAME_EXT}`;
  }, []);

  // Preload frames with mobile optimization (every 2nd frame on mobile, all frames on desktop)
  useEffect(() => {
    let active = true;
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1;
    const frameIndicesToLoad = [];

    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      frameIndicesToLoad.push(i);
    }
    // Always include the last frame
    if (frameIndicesToLoad[frameIndicesToLoad.length - 1] !== TOTAL_FRAMES) {
      frameIndicesToLoad.push(TOTAL_FRAMES);
    }

    const totalToLoad = frameIndicesToLoad.length;
    let loadedCount = 0;
    const imageMap = [];

    frameIndicesToLoad.forEach((frameNum) => {
      const img = new Image();
      img.src = getFrameUrl(frameNum);
      
      const onImageLoad = () => {
        if (!active) return;
        loadedCount++;
        imageMap[frameNum] = img;
        const percent = Math.min(100, Math.round((loadedCount / totalToLoad) * 100));
        setLoadProgress(percent);

        if (loadedCount >= totalToLoad) {
          imagesRef.current = imageMap;
          setIsLoaded(true);
        }
      };

      img.onload = onImageLoad;
      img.onerror = () => {
        // Fallback gracefully on error so preloader does not stall
        onImageLoad();
      };
    });

    return () => {
      active = false;
    };
  }, [getFrameUrl]);

  // Clean render frame function onto Canvas
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Find closest loaded frame in cache (especially when mobile loads every 2nd frame)
    let img = imagesRef.current[frameIndex];
    if (!img) {
      // Find nearest neighbor
      for (let offset = 1; offset < 10; offset++) {
        if (imagesRef.current[frameIndex - offset]) {
          img = imagesRef.current[frameIndex - offset];
          break;
        }
        if (imagesRef.current[frameIndex + offset]) {
          img = imagesRef.current[frameIndex + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background to Warm Cream (#FAF7F2) to blend seamlessly with the sequence
    ctx.fillStyle = '#FAF7F2';
    ctx.fillRect(0, 0, width, height);

    // Compute aspect-ratio preserved sizing (contain mode with slight zoom for aesthetic impact)
    const imgW = img.naturalWidth || 1280;
    const imgH = img.naturalHeight || 720;
    const isMobile = window.innerWidth < 768;

    const scale = Math.min(width / imgW, height / imgH) * (isMobile ? 1.28 : 1.05);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  // Update canvas internal pixel buffer size on resize (HiDPI aware)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for memory performance
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    if (lastDrawnFrameRef.current > 0) {
      renderFrame(lastDrawnFrameRef.current);
    }
  }, [renderFrame]);

  // Initial resize and window resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  /**
   * Scroll-to-Frame Mapping Logic:
   * Maps user's scroll progress (0.0 to 1.0) along the 500vh container to frame index (1 to 238).
   * - 500vh container gives a luxurious, tactile Apple-style exploded view pace.
   * - RequestAnimationFrame ensures rendering only happens when the target frame index actually changes.
   * - Speed adjustment: Modify container height (e.g. 400vh for faster, 600vh for slower).
   */
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const totalScrollable = container.scrollHeight - window.innerHeight;
        
        // Progress within this 500vh container: 0 at top, 1 at bottom
        let progress = -rect.top / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
        setScrollProgress(progress);

        if (isReducedMotionRef.current) {
          // If reduced motion is requested by user, hold at assembled frame (frame 1)
          if (lastDrawnFrameRef.current !== 1) {
            renderFrame(1);
          }
          return;
        }

        // Map progress (0 -> 1) linearly to frame numbers (1 -> 238)
        const frameIndex = Math.min(
          TOTAL_FRAMES,
          Math.max(1, Math.round(1 + progress * (TOTAL_FRAMES - 1)))
        );

        if (frameIndex !== lastDrawnFrameRef.current) {
          renderFrame(frameIndex);
        }
      });
    };

    // Draw frame 1 initially
    renderFrame(1);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isLoaded, renderFrame]);

  // Smooth scroll helper
  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Text overlay opacity calculations
  // Overlay 1: 0% to 20%
  const opacity1 = scrollProgress <= 0.2
    ? 1 - (scrollProgress / 0.2) * 0.7
    : Math.max(0, 1 - (scrollProgress - 0.2) * 10);

  // Overlay 2: 45% to 65%
  const opacity2 = scrollProgress >= 0.40 && scrollProgress <= 0.70
    ? Math.sin(((scrollProgress - 0.40) / 0.30) * Math.PI)
    : 0;

  // Overlay 3: 85% to 100%
  const opacity3 = scrollProgress >= 0.82
    ? Math.min(1, (scrollProgress - 0.82) / 0.12)
    : 0;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[500vh] bg-[#FAF7F2] select-none"
    >
      {/* Sleek Espresso & Cream Preloader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] px-6">
          <div className="w-16 h-16 mb-6 rounded-2xl bg-[#3B261D] flex items-center justify-center shadow-warm-lg animate-bounce">
            <Coffee className="w-8 h-8 text-[#FAF7F2]" />
          </div>
          <h2 className="font-editorial text-3xl md:text-4xl font-bold text-[#3B261D] mb-2 tracking-tight">
            Tales &amp; Toast
          </h2>
          <p className="text-[#C86D51] font-medium text-sm md:text-base mb-8 tracking-wide">
            Stacking artisanal layers &amp; pulling espresso shots...
          </p>

          {/* Loading Bar */}
          <div className="w-full max-w-md h-2.5 bg-[#F0E8DC] rounded-full overflow-hidden shadow-inner p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#C86D51] via-[#3B261D] to-[#C86D51] rounded-full transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full max-w-md mt-3 text-xs text-[#7E5745] font-semibold">
            <span>Samarth Nagar, Chhatrapati Sambhajinagar</span>
            <span>{loadProgress}%</span>
          </div>
        </div>
      )}

      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* The 3D Burger Exploded Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-contain block pointer-events-none"
        />

        {/* Ambient Top Subtle Grain / Gradient Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FAF7F2]/60 via-transparent to-[#FAF7F2]/80" />

        {/* =========================================================
            FLOATING SCROLL-SYNCED TEXT OVERLAYS
            ========================================================= */}

        {/* Overlay 1: 0% – 20% scroll */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{ 
            opacity: opacity1,
            transform: `translateY(${scrollProgress * 60}px)`,
            visibility: opacity1 > 0.02 ? 'visible' : 'hidden'
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0E8DC]/90 border border-[#3B261D]/10 backdrop-blur-sm shadow-warm-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#C86D51]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#3B261D]">
              Artisanal Café &amp; Lounge
            </span>
          </div>

          <h1 className="font-editorial text-5xl sm:text-6xl md:text-8xl font-black text-[#3B261D] tracking-tight leading-[1.05] drop-shadow-sm max-w-4xl">
            Tales &amp; Toast
          </h1>

          <p className="mt-4 font-serif italic text-lg sm:text-2xl md:text-3xl text-[#C86D51] max-w-2xl font-normal leading-relaxed">
            Where Every Sip Tells a Story
          </p>

          <p className="mt-2 text-sm sm:text-base font-medium text-[#7E5745] tracking-wide">
            Beside IRA Executive, Samarth Nagar (Nirala Bazar)
          </p>

          {/* Interactive Scroll Cue */}
          <div className="mt-10 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#3B261D]/70 animate-pulse">
            <span>Scroll to deconstruct the craft</span>
            <div className="w-5 h-8 rounded-full border-2 border-[#3B261D]/30 flex items-start justify-center p-1">
              <div className="w-1.5 h-2 bg-[#C86D51] rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Overlay 2: 45% – 65% scroll */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{ 
            opacity: opacity2,
            transform: `scale(${0.95 + opacity2 * 0.05})`,
            visibility: opacity2 > 0.02 ? 'visible' : 'hidden'
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B261D] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase shadow-warm-md mb-4">
            <Flame className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Signature Tandoori Paneer Burger</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#3B261D] tracking-tight max-w-3xl">
            Crafted From Scratch
          </h2>

          <p className="mt-3 font-serif italic text-lg sm:text-2xl text-[#C86D51] max-w-xl">
            Artisanal layers, bold café flavors
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg text-xs font-semibold text-[#3B261D]/80">
            <span className="px-3 py-1 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10">Toasted Brioche Bun</span>
            <span className="px-3 py-1 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10">Charred Tandoori Paneer</span>
            <span className="px-3 py-1 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10">Mint Mayo Emulsion</span>
            <span className="px-3 py-1 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10">Crisp Iceberg &amp; Onion</span>
          </div>
        </div>

        {/* Overlay 3: 85% – 100% scroll */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-300 pointer-events-auto"
          style={{ 
            opacity: opacity3,
            transform: `translateY(${Math.max(0, (1 - opacity3) * 30)}px)`,
            visibility: opacity3 > 0.02 ? 'visible' : 'hidden'
          }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2">
            The Sensory Café Journey
          </span>

          <h2 className="font-editorial text-4xl sm:text-6xl font-black text-[#3B261D] mb-4">
            Taste the Craft
          </h2>

          <p className="text-sm sm:text-lg text-[#7E5745] max-w-md mb-8">
            Explore our curated selection of wood-fired pizzas, handcrafted pastas, gourmet burgers &amp; artisanal brews.
          </p>

          <button
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3B261D] text-[#FAF7F2] font-semibold text-base shadow-warm-xl hover:bg-[#C86D51] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow cursor-pointer active:scale-95"
          >
            <span>Explore Menu</span>
            <ArrowDown className="w-5 h-5 text-[#FAF7F2] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Scroll Progress Bar at Bottom of Sticky Canvas */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#3B261D]/5">
          <div 
            className="h-full bg-[#C86D51] transition-all duration-75"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
}
