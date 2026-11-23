import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Flame, Check } from 'lucide-react';

export default function MenuCard3D({ item }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isCopied, setIsCopied] = useState(false);

  // Calculate 3D tilt coordinates on mouse move
  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 8 degrees
    const rotateX = -((y - centerY) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`,
      transition: 'transform 0.08s ease-out, box-shadow 0.08s ease-out',
    });

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  // Quick action: share or save item notice
  const handleQuickOrderHint = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isVeg = item.dietary === 'veg';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={transformStyle}
      className="group relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#3B261D]/10 shadow-warm-md hover:shadow-warm-xl transition-all flex flex-col justify-between overflow-hidden cursor-default transform-gpu"
    >
      {/* Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      />

      {/* Decorative Accent Background Glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#F0E8DC] rounded-full blur-2xl group-hover:bg-[#C86D51]/15 transition-colors duration-500 pointer-events-none" />

      {/* Top Header: Dietary Standard Symbol & Badges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            {/* Standard Indian Veg / Non-Veg Indicator Icon */}
            {isVeg ? (
              <div 
                className="w-5 h-5 rounded border-2 border-[#2E7D32] flex items-center justify-center p-0.5 bg-white shadow-xs" 
                title="100% Vegetarian"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
              </div>
            ) : (
              <div 
                className="w-5 h-5 rounded border-2 border-[#C62828] flex items-center justify-center p-0.5 bg-white shadow-xs" 
                title="Non-Vegetarian"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#C62828]" />
              </div>
            )}

            <span className={`text-[11px] font-bold uppercase tracking-wider ${isVeg ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
              {isVeg ? 'Pure Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Badges */}
          {item.badge ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#C86D51]/15 text-[#C86D51] border border-[#C86D51]/30">
              <Sparkles className="w-3 h-3" />
              {item.badge}
            </span>
          ) : item.isPopular ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#3B261D]/10 text-[#3B261D]">
              <Flame className="w-3 h-3 text-[#C86D51]" />
              Popular
            </span>
          ) : null}
        </div>

        {/* Tagline / Sub-note */}
        {item.tagline && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C86D51] mb-1">
            {item.tagline}
          </p>
        )}

        {/* Item Title */}
        <h3 className="font-editorial text-2xl font-bold text-[#3B261D] group-hover:text-[#C86D51] transition-colors leading-tight mb-2.5">
          {item.name}
        </h3>

        {/* Item Description */}
        <p className="text-sm text-[#644436] font-normal leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Footer: Price and Taste Note */}
      <div className="mt-6 pt-4 border-t border-[#3B261D]/10 flex items-center justify-between">
        <div>
          <span className="text-xs text-[#7E5745] font-medium block">Price</span>
          <span className="font-sans text-2xl font-extrabold text-[#3B261D] tracking-tight">
            ₹{item.price}
          </span>
        </div>

        <button
          onClick={handleQuickOrderHint}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0E8DC] hover:bg-[#3B261D] text-[#3B261D] hover:text-[#FAF7F2] text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span>Selected!</span>
            </>
          ) : (
            <span>Artisanal Pick</span>
          )}
        </button>
      </div>
    </div>
  );
}
