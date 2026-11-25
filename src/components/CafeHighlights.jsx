import React from 'react';
import { Coffee, Flame, HeartHandshake, Sparkles, Clock, Compass, UtensilsCrossed } from 'lucide-react';

export default function CafeHighlights() {
  const highlights = [
    {
      icon: Coffee,
      title: "Artisanal Specialty Coffee",
      subtitle: "Pour Over & French Press",
      desc: "From manual French press and slow pour-overs to velvety D-day lattes, Vietnamese iced coffee, and indulgent Java chip ice blends."
    },
    {
      icon: Flame,
      title: "Sizzlers, Pizzas & Pastas",
      subtitle: "100% Pure Vegetarian Kitchen",
      desc: "Mexican and Asian sizzling platters, 10-inch stone-baked pizzas, Genovese pesto aglio-e-olio, and cheesy loaded nachos freshly prepared."
    },
    {
      icon: Compass,
      title: "Aesthetic Ulkanagari Sanctuary",
      subtitle: "Near Khinvansara Park",
      desc: "Tucked inside Sai Heritage, Shrikrishna Nagar — an earthy, ambient corner crafted with warm latte tones, cozy seating, and unhurried charm."
    },
    {
      icon: HeartHandshake,
      title: "Late-Night Lounge",
      subtitle: "Open Till 2:15 AM",
      desc: "Whether unwinding over an after-dinner dessert, enjoying family dining, or gathering friends for late-night coffee, our doors stay open late."
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0E8DC] text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Two Stories Experience</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl font-extrabold text-[#3B261D] tracking-tight leading-tight">
            Cozy Ambience Meets Vegetarian Craft
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#7E5745] font-normal leading-relaxed">
            We built Two Stories Coffee &amp; Kitchen around a simple conviction: the best memories begin with great conversations, steaming cups of specialty coffee, and comforting, soul-satisfying pure vegetarian food.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-[#F0E8DC]/40 hover:bg-[#FAF7F2] border border-[#3B261D]/10 hover:border-[#C86D51]/40 shadow-warm-sm hover:shadow-warm-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-13 h-13 rounded-2xl bg-[#3B261D] text-[#FAF7F2] flex items-center justify-center mb-6 group-hover:bg-[#C86D51] transition-colors shadow-warm-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#3B261D] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#644436] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#3B261D]/10 text-xs font-semibold text-[#7E5745] flex items-center justify-between">
                  <span>Two Stories standard</span>
                  <span className="w-2 h-2 rounded-full bg-[#C86D51]/50 group-hover:bg-[#C86D51] transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
