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
        {/* Two Stories Hero Section (Specialty Coffee & Kitchen) */}
        <HeroSection />

        {/* 100% Pure Veg 3D Menu Section with Category & Search Filters */}
        <MenuSection />

        {/* Atmosphere, Sizzlers & Pure Veg Kitchen Identity */}
        <div id="atmosphere">
          <CafeHighlights />
        </div>

        {/* Visit Two Stories & Interactive Map (Ulkanagari, Near Khinvansara Park) */}
        <VisitSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
