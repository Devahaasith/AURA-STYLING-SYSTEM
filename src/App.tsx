import React, { useState } from "react";
import { 
  Home, 
  Compass, 
  Sparkles, 
  Layers, 
  Gauge, 
  Dumbbell, 
  Split, 
  Sparkle,
  Image as ImageIcon 
} from "lucide-react";

import { PhysicalAttributes, StylingReport, WardrobeItem, OutfitSuggestion } from "./types";
import { DEFAULT_WARDROBE, DEFAULT_STYLING_REPORT } from "./data";

// Component imports
import HomeDashboard from "./components/HomeDashboard";
import AIStylist from "./components/AIStylist";
import AestheticIdentityComponent from "./components/AestheticIdentity";
import DigitalWardrobe from "./components/DigitalWardrobe";
import PhysiqueGlowUp from "./components/PhysiqueGlowUp";
import SuitabilityTest from "./components/SuitabilityTest";
import VisualizeGlowUp from "./components/VisualizeGlowUp";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Main high-performance styling registers
  const [attributes, setAttributes] = useState<PhysicalAttributes>({
    faceShape: "oval",
    bodyType: "trapezoid",
    skinTone: "neutral-medium",
    height: 180,
    currentHairstyle: "Low scissor crop taper",
    physiqueGoals: "lean-bulk",
    vibeStyle: "Quiet Luxury"
  });

  const [stylingReport, setStylingReport] = useState<StylingReport>(DEFAULT_STYLING_REPORT);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>(DEFAULT_WARDROBE);
  const [activeMode, setActiveMode] = useState<"bulk" | "cut" | "maintain">("bulk");
  const [activeOutfitPlan, setActiveOutfitPlan] = useState<OutfitSuggestion | null>(null);

  // Wardrobe callbacks
  const handleAddItem = (item: WardrobeItem) => {
    setWardrobeItems(prev => [item, ...prev]);
  };

  const handleDeleteItem = (id: string) => {
    setWardrobeItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateReport = (report: StylingReport) => {
    setStylingReport(report);
  };

  const handleUpdateAttributes = (attrs: PhysicalAttributes) => {
    setAttributes(attrs);
  };

  const handleOutfitGenerated = (outfit: OutfitSuggestion) => {
    setActiveOutfitPlan(outfit);
  };

  const handleClearActivePlan = () => {
    setActiveOutfitPlan(null);
  };

  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans relative flex flex-col overflow-x-hidden selection:bg-emerald-500/25 selection:text-white" id="aura-app-wrapper">
      
      {/* GLOWING ABSOLUTE AMBIENCE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.03),transparent_60%)] pointer-events-none z-0" />

      {/* STICKY TOP MINIMALIST HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-900/60 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("home")} id="brand-logo">
            <div className="h-8 w-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-teal-500 opacity-20 group-hover:scale-110 transition-transform" />
              <Sparkle className="h-4 w-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="font-display text-lg tracking-[0.25em] font-light text-white">AURA</span>
              <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest block -mt-1 font-bold">Styling System</span>
            </div>
          </div>

          {/* Connected User Badge */}
          <div className="hidden sm:flex items-center gap-3 bg-neutral-900/60 border border-neutral-850 px-4 py-2 rounded-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider font-light">
              devahaasith@gmail.com
            </span>
          </div>

        </div>
      </header>

      {/* CORE DISPLAY STAGE CONTAINER */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {activeTab === "home" && (
          <HomeDashboard 
            userEmail="devahaasith@gmail.com"
            stylingReport={stylingReport}
            wardrobeCount={wardrobeItems.length}
            activeMode={activeMode}
            setActiveTab={setActiveTab}
            onQuickAnalyze={() => setActiveTab("stylist")}
          />
        )}

        {activeTab === "aesthetics" && (
          <AestheticIdentityComponent
            stylingReport={stylingReport}
            onOutfitGenerated={handleOutfitGenerated}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "stylist" && (
          <AIStylist
            stylingReport={stylingReport}
            onUpdateReport={handleUpdateReport}
            attributes={attributes}
            onUpdateAttributes={handleUpdateAttributes}
          />
        )}

        {activeTab === "cabinet" && (
          <DigitalWardrobe
            wardrobeItems={wardrobeItems}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            activeOutfitPlan={activeOutfitPlan}
            onClearActivePlan={handleClearActivePlan}
          />
        )}

        {activeTab === "suitability" && (
          <SuitabilityTest stylingReport={stylingReport} />
        )}

        {activeTab === "physique" && (
          <PhysiqueGlowUp
            stylingReport={stylingReport}
            activeMode={activeMode}
            onUpdateMode={setActiveMode}
          />
        )}

        {activeTab === "visuals" && (
          <VisualizeGlowUp />
        )}
      </main>

      {/* FLOATING BOT NAV DOCK */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[calc(100%-2rem)] h-16 rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-2xl flex items-center justify-around px-4" id="floating-bottom-nav">
        
        {/* TAB 1: HOME */}
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "home" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Home Dashboard"
        >
          <Home className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Dashboard</span>
        </button>

        {/* TAB 2: EXPLORE AESTHETICS */}
        <button
          onClick={() => setActiveTab("aesthetics")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "aesthetics" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Aesthetic Identity Engine"
        >
          <Compass className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Aesthetics</span>
        </button>

        {/* TAB 3: STYLIST ARCHITECTURE */}
        <button
          onClick={() => setActiveTab("stylist")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "stylist" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="AI Stylist Blueprint"
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Stylist</span>
        </button>

        {/* TAB 4: CABINET */}
        <button
          onClick={() => setActiveTab("cabinet")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "cabinet" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Digital Wardrobe"
        >
          <Layers className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Cabinet</span>
        </button>

        {/* TAB 5: DO I SUIT THIS ? */}
        <button
          onClick={() => setActiveTab("suitability")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "suitability" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Do i suit this"
        >
          <Gauge className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Suitability</span>
        </button>

        {/* TAB 6: PHYSIQUE FASHION */}
        <button
          onClick={() => setActiveTab("physique")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "physique" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Physique and gym glow up"
        >
          <Dumbbell className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Physique</span>
        </button>

        {/* TAB 7: GLOW-UP COMPARATOR */}
        <button
          onClick={() => setActiveTab("visuals")}
          className={`flex flex-col items-center justify-center p-2 text-center rounded-xl cursor-pointer transition-all ${activeTab === "visuals" ? "text-emerald-400 scale-105" : "text-neutral-500 hover:text-neutral-300"}`}
          title="Before and After Visualizer"
        >
          <Split className="h-5 w-5" />
          <span className="text-[8px] uppercase tracking-wider font-semibold mt-1">Visuals</span>
        </button>

      </nav>

    </div>
  );
}
