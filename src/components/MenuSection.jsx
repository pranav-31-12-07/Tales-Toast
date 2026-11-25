import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';
import MenuCard3D from './MenuCard3D';
import { ChevronDown, ChevronUp, Utensils, Sparkles, Filter, Search, Star, X } from 'lucide-react';

const INITIAL_VISIBLE_COUNT = 9;

export default function MenuSection() {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'must-try'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs for precise dynamic slider pill positioning
  const containerRef = useRef(null);
  const allBtnRef = useRef(null);
  const mustTryBtnRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({ left: 6, width: 70 });

  // Dynamically calculate slider position
  useEffect(() => {
    let target = null;
    if (filterMode === 'all') target = allBtnRef.current;
    else if (filterMode === 'must-try') target = mustTryBtnRef.current;

    if (target && containerRef.current) {
      setSliderStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
      });
    }
  }, [filterMode]);

  // Filtered menu items based on filterMode, category, and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Must Try mode filter
      if (filterMode === 'must-try' && !item.mustTry) {
        return false;
      }

      // 2. Category filter check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // 3. Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesTag = item.tagline?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [filterMode, selectedCategory, searchQuery]);

  // Items to display based on "See More" expansion
  const visibleItems = isExpanded
    ? filteredItems
    : filteredItems.slice(0, INITIAL_VISIBLE_COUNT);

  const remainingCount = Math.max(0, filteredItems.length - INITIAL_VISIBLE_COUNT);

  // Handlers
  const handleFilterModeChange = (mode) => {
    setFilterMode(mode);
    setIsExpanded(false);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsExpanded(false);
  };

  const toggleExpand = () => {
    if (isExpanded) {
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
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0E8DC] border border-[#3B261D]/10 text-xs font-bold uppercase tracking-widest text-[#3B261D] mb-4 shadow-warm-sm">
            <Utensils className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>100% Pure Vegetarian Coffee House &amp; Kitchen</span>
          </div>
          
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black text-[#3B261D] tracking-tight">
            Two Stories Menu
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#7E5745] font-normal leading-relaxed">
            Crafted entirely pure vegetarian with premium ingredients: manual French press &amp; pour-over brews, velvety ice blends, sizzling platters, 10-inch stone-baked pizzas, loaded nachos, and rich desserts.
          </p>
        </div>

        {/* Controls Row: Pure Veg Toggle / Must-Try Slider + Live Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 max-w-4xl mx-auto">
          
          {/* 1. Animated Sliding Pill Toggle: All Items | Must Try Specials */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E5745] mb-2 flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-[#C86D51]" />
              <span>Curated Selection</span>
            </div>

            <div 
              ref={containerRef}
              className="relative inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#FAF7F2] border border-[#3B261D]/15 shadow-warm-md"
            >
              {/* Sliding Pill Indicator */}
              <div
                className="absolute top-1.5 bottom-1.5 rounded-full bg-[#3B261D] shadow-sm transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${sliderStyle.left}px`,
                  width: `${sliderStyle.width}px`,
                }}
              />

              {/* Option 1: All Pure Veg */}
              <button
                ref={allBtnRef}
                onClick={() => handleFilterModeChange('all')}
                className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  filterMode === 'all'
                    ? 'text-[#FAF7F2]'
                    : 'text-[#644436] hover:text-[#3B261D]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>All Items ({MENU_ITEMS.length})</span>
              </button>

              {/* Option 2: Must Try Only */}
              <button
                ref={mustTryBtnRef}
                onClick={() => handleFilterModeChange('must-try')}
                className={`relative z-10 px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center gap-1.5 transition-colors duration-200 cursor-pointer ${
                  filterMode === 'must-try'
                    ? 'text-[#FAF7F2]'
                    : 'text-[#644436] hover:text-[#3B261D]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-[#C86D51] fill-[#C86D51]" />
                <span>Must Try Picks</span>
              </button>
            </div>
          </div>

          {/* 2. Search Bar for 100+ Menu Items */}
          <div className="w-full md:w-80">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7E5745] mb-2 flex items-center gap-1.5">
              <Search className="w-3 h-3 text-[#C86D51]" />
              <span>Search Coffee &amp; Food</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsExpanded(false);
                }}
                placeholder="Search Latte, Sizzler, Pasta, Shakes..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#FAF7F2] border border-[#3B261D]/15 text-xs sm:text-sm text-[#3B261D] placeholder:text-[#7E5745]/60 focus:outline-none focus:border-[#C86D51] focus:ring-2 focus:ring-[#C86D51]/20 shadow-warm-sm transition-all"
              />
              <Search className="w-4 h-4 text-[#7E5745] absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 p-0.5 rounded-full hover:bg-[#F0E8DC] text-[#7E5745]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* 3. Horizontal Category Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-2 px-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
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

        {/* 4. Responsive 3D Menu Grid */}
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
              No Dishes Found
            </h3>
            <p className="text-sm text-[#7E5745] mb-5">
              Try adjusting your search query or category filter.
            </p>
            <button
              onClick={() => {
                setFilterMode('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#3B261D] text-[#FAF7F2] text-xs font-bold hover:bg-[#C86D51] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 5. "See More Items" / "Show Less" Pagination Button */}
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
              Showing {visibleItems.length} of {filteredItems.length} vegetarian creations
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
