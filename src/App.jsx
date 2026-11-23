import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MenuSection from './components/MenuSection';
import CafeHighlights from './components/CafeHighlights';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3B261D] font-sans selection:bg-[#C86D51] selection:text-white">
      {/* Aesthetic Floating Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Aesthetic Café Hero Section (with blurred floating orbs & animations) */}
        <HeroSection />

        {/* Interactive 3D Menu Section with Veg/Non-Veg Slider & Pagination */}
        <MenuSection />

        {/* Atmosphere & Café Identity */}
        <div id="atmosphere">
          <CafeHighlights />
        </div>

        {/* Visit Us & Custom Red-Pin Map (Zero Reservation Form) */}
        <VisitSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
