import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import MenuCard3D from './MenuCard3D';
import { ChevronDown, ChevronUp, Utensils, Sparkles, Filter } from 'lucide-react';

const INITIAL_VISIBLE_COUNT = 6;

export default function MenuSection() {
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs for precise dynamic slider pill positioning
  const containerRef = useRef(null);
  const allBtnRef = useRef(null);
  const vegBtnRef = useRef(null);
  const nonVegBtnRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 6, width: 56 });

  // Dynamically calculate slider position and reduce width from right side for 'All'
  useEffect(() => {
    let target = null;
    if (dietaryFilter === 'all') target = allBtnRef.current;
    else if (dietaryFilter === 'veg') target = vegBtnRef.current;
    else if (dietaryFilter === 'non-veg') target = nonVegBtnRef.current;

    if (target && containerRef.current) {
      // Reduce width from the right side so it never crowds or touches the Veg green circle
      const rightPaddingReduction = dietaryFilter === 'all' ? 7 : 0;
      setSliderStyle({
        left: target.offsetLeft,
        width: Math.max(20, target.offsetWidth - rightPaddingReduction),
      });
    }
  }, [dietaryFilter]);

  // Filtered menu items based on dietary and category selection
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Dietary filter check
      const matchesDietary =
        dietaryFilter === 'all' ? true : item.dietary === dietaryFilter;

      // 2. Category filter check
      const matchesCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      return matchesDietary && matchesCategory;
    });
  }, [dietaryFilter, selectedCategory]);

  // Items to display based on "See More" expansion
  const visibleItems = isExpanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_COUNT);

  const remainingCount = Math.max(0, filteredItems.length - INITIAL_VISIBLE_COUNT);

  // Reset expansion when switching filters to keep layout neat
  const handleDietaryChange = (filter) => {
    setDietaryFilter(filter);
    setIsExpanded(false);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsExpanded(false);
  };

  const toggleExpand = () => {
    if (isExpanded) {
      // Smoothly scroll back to top of menu header when collapsing
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-[#F0E8DC]/40 border-t border-[#3B261D]/10">
      {/* Decorative Warm Ambient Background Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-72 bg-gradient-to-b from-[#C86D51]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10 text-xs font-bold uppercase tracking-widest text-[#3B261D] mb-4 shadow-warm-sm">
            <Utensils className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Artisanal Kitchen &amp; Brew Bar</span>
          </div>
          
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#3B261D] tracking-tight">
            Curated Menu
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#7E5745] font-normal leading-relaxed">
            Every dish is made to order using cold-pressed olive oils, stone-milled grains, house sauces, and freshly roasted single-origin coffees.
          </p>
        </div>

        {/* 1. Animated Sliding Pill Dietary Toggle Slider with Reduced Right Width */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#7E5745] mb-2.5 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Dietary Preference</span>
          </div>

          <div 
            ref={containerRef}
            className="relative inline-flex items-center gap-2 p-1.5 rounded-full bg-[#FAF7F2] border border-[#3B261D]/15 shadow-warm-md"
          >
            {/* Sliding Pill Indicator (Width neatly reduced on the right side) */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-[#3B261D] shadow-sm transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${sliderStyle.left}px`,
                width: `${sliderStyle.width}px`,
              }}
            />

            {/* Option 1: All */}
            <button
              ref={allBtnRef}
              onClick={() => handleDietaryChange('all')}
              className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors duration-200 cursor-pointer ${
                dietaryFilter === 'all'
                  ? 'text-[#FAF7F2]'
                  : 'text-[#644436] hover:text-[#3B261D]'
              }`}
            >
              All
            </button>

            {/* Option 2: Veg */}
            <button
              ref={vegBtnRef}
              onClick={() => handleDietaryChange('veg')}
              className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                dietaryFilter === 'veg'
                  ? 'text-[#FAF7F2]'
                  : 'text-[#644436] hover:text-[#3B261D]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] ring-2 ring-white/60 shrink-0" />
              <span>Veg</span>
            </button>

            {/* Option 3: Non-Veg */}
            <button
              ref={nonVegBtnRef}
              onClick={() => handleDietaryChange('non-veg')}
              className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                dietaryFilter === 'non-veg'
                  ? 'text-[#FAF7F2]'
                  : 'text-[#644436] hover:text-[#3B261D]'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C62828] ring-2 ring-white/60 shrink-0" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>

        {/* 2. Horizontal Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-2 px-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#C86D51] text-white shadow-warm-md -translate-y-0.5'
                    : 'bg-[#FAF7F2] text-[#3B261D] hover:bg-[#F0E8DC] border border-[#3B261D]/10'
                }`}
              >
                <span>{cat.label}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Responsive 3D Menu Grid */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 perspective-container">
            {visibleItems.map((item) => (
              <MenuCard3D key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#FAF7F2] rounded-3xl border border-[#3B261D]/10 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-[#C86D51] mx-auto mb-3" />
            <h3 className="font-editorial text-2xl font-bold text-[#3B261D] mb-1">
              No Items Found
            </h3>
            <p className="text-sm text-[#7E5745] mb-5">
              Try switching your dietary or category filter.
            </p>
            <button
              onClick={() => {
                setDietaryFilter('all');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-full bg-[#3B261D] text-[#FAF7F2] text-xs font-bold hover:bg-[#C86D51] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 4. "See More Items" / "Show Less" Pagination Button */}
        {filteredItems.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-14 text-center">
            <button
              onClick={toggleExpand}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-[#3B261D] text-[#3B261D] hover:text-[#FAF7F2] border-2 border-[#3B261D]/15 hover:border-[#3B261D] font-bold text-sm shadow-warm-md hover:shadow-warm-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>
                {isExpanded
                  ? 'Show Less Items'
                  : `See More Items (${remainingCount} more)`}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#C86D51] group-hover:text-[#FAF7F2] transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#C86D51] group-hover:text-[#FAF7F2] transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
            <p className="text-xs text-[#7E5745] mt-2 font-medium">
              Showing {visibleItems.length} of {filteredItems.length} curated delights
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
