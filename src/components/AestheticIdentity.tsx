import React, { useState } from "react";
import { Compass, Sparkles, Paintbrush, ArrowRight, Layers, UserCheck } from "lucide-react";
import { AestheticIdentity, OutfitSuggestion, StylingReport } from "../types";
import { CURATED_AESTHETICS } from "../data";

interface AestheticIdentityProps {
  stylingReport: StylingReport;
  onOutfitGenerated: (outfit: OutfitSuggestion) => void;
  setActiveTab: (tab: string) => void;
}

export default function AestheticIdentityComponent({
  stylingReport,
  onOutfitGenerated,
  setActiveTab
}: AestheticIdentityProps) {
  
  const [selectedAesthetic, setSelectedAesthetic] = useState<AestheticIdentity>(CURATED_AESTHETICS[0]);
  const [generating, setGenerating] = useState(false);
  const [contextInput, setContextInput] = useState({
    occasion: "High-end art gallery opening",
    weather: "Cool, rain-brushed autumn twilight",
    mood: "Confident & deliberate",
    budget: "Mid-to-High custom drapes"
  });

  const handleGenerateOutfitFromAesthetic = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/generate-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: contextInput.occasion,
          weather: contextInput.weather,
          mood: contextInput.mood,
          vibe: selectedAesthetic.name,
          budget: contextInput.budget,
          stylingReport: stylingReport
        })
      });

      if (response.ok) {
        const outfit = await response.json();
        onOutfitGenerated(outfit);
        setActiveTab("cabinet"); // Redirect them to their closet with the active plan!
      } else {
        console.error("Failed to generate custom lookbook.");
      }
    } catch (err) {
      console.error("Failed to connect to outfit gen server:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="aesthetic-engine">
      
      {/* INTRO TITLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Style Taxonomy Engine</span>
          <h2 className="font-display text-2xl font-light text-white mt-1">
            Explore <span className="font-semibold">Aesthetic Identities</span>
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">Discard generic formal/casual categories. Embrace structural mood boards.</p>
        </div>
      </div>

      {/* HORIZONTAL SELECTION PILLS */}
      <div className="flex gap-2 overflow-x-auto pb-3 border-b border-neutral-800/60 scrollbar-none snap-x">
        {CURATED_AESTHETICS.map(aes => (
          <button
            key={aes.id}
            onClick={() => setSelectedAesthetic(aes)}
            className={`px-4 py-2 bg-neutral-950 capitalize rounded-lg border text-xs tracking-wide shrink-0 transition-all cursor-pointer snap-start ${selectedAesthetic.id === aes.id ? "bg-white border-white text-black font-semibold shadow-lg scale-102" : "border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"}`}
          >
            {aes.name}
          </button>
        ))}
      </div>

      {/* MAIN AESTHETIC VISUAL CARD */}
      <div className={`relative overflow-hidden rounded-3xl border border-neutral-800 bg-linear-to-b ${selectedAesthetic.bgGradient} p-6 md:p-10 lg:p-12 transition-all duration-700`}>
        {/* Soft glowing ambient orb matching the aesthetic background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white/5 blur-3xl opacity-30" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* TEXT SPECS (LEFT COLUMN) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{selectedAesthetic.tagline}</span>
              <h3 className="font-display text-3xl font-light text-white mt-2 md:text-4xl">
                {selectedAesthetic.name}
              </h3>
            </div>

            <p className="text-sm font-light leading-relaxed text-neutral-300 md:text-base">
              {selectedAesthetic.description}
            </p>

            {/* COLOR PALETTE PANEL */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Signature Color Spectrum</span>
              <div className="flex flex-wrap gap-3">
                {selectedAesthetic.colors.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800 bg-black/60">
                    <div className="h-3.5 w-3.5 rounded-full border border-black" style={{ backgroundColor: col.hex }} />
                    <span className="text-[10px] text-neutral-300 font-medium">{col.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE COMPILER COMPONENT */}
            <div className="rounded-2xl border border-white/5 bg-neutral-950/80 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Outfit Lookbook Compiler</h5>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wide">Context/Occasion</label>
                  <input 
                    type="text" 
                    value={contextInput.occasion}
                    onChange={e => setContextInput({...contextInput, occasion: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wide">Weather Backdrop</label>
                  <input 
                    type="text" 
                    value={contextInput.weather}
                    onChange={e => setContextInput({...contextInput, weather: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wide">Target Aura Mood</label>
                  <input 
                    type="text" 
                    value={contextInput.mood}
                    onChange={e => setContextInput({...contextInput, mood: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wide">Budget Outline</label>
                  <input 
                    type="text" 
                    value={contextInput.budget}
                    onChange={e => setContextInput({...contextInput, budget: e.target.value})}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  id="btn-aesthetic-compile"
                  onClick={handleGenerateOutfitFromAesthetic}
                  disabled={generating}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 px-5 py-3 text-[11px] font-bold tracking-wider text-black rounded-lg cursor-pointer transition-colors"
                >
                  {generating ? (
                    <>
                      <Sparkles className="h-3 w-3 animate-spin" />
                      COMPILING OUTFIT...
                    </>
                  ) : (
                    <>
                      COMPILE LOOKBOOK OUTFIT
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs italic font-light text-neutral-400">
              &ldquo;{selectedAesthetic.inspirationQuote}&rdquo;
            </p>

          </div>

          {/* CLASSIFICATION STATS (RIGHT COLUMN) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* HERO RENDER */}
            <div className="relative rounded-2xl overflow-hidden h-52 border border-white/10 group shadow-lg">
              <img 
                src={selectedAesthetic.heroImage} 
                alt={selectedAesthetic.name} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Cinematic Reference</span>
                <span className="block text-md font-semibold text-white mt-1">Aesthetic Model Studio Setup</span>
              </div>
            </div>

            {/* QUICK CATEGORY DETAILED LIST */}
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 space-y-4">
              
              {/* RECOMMENDED FITS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Structural Fits & Fabric</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAesthetic.recommendedFits.map((f, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-light rounded-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* RELEVANT HAIR OPTIONS */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Cohesive Hairstyles</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAesthetic.hairstyles.map((hair, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-light rounded-sm">
                      {hair}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACCESSORIES */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Core Accent Accessories</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAesthetic.accessories.map((acc, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-light rounded-sm">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>

              {/* FOOTWEAR */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Recommended Footwear</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAesthetic.footwear.map((foot, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-light rounded-sm">
                      {foot}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
