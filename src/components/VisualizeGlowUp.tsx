import React, { useState } from "react";
import { Sparkles, Image, RefreshCw, Layers, Compass, HelpCircle } from "lucide-react";

export default function VisualizeGlowUp() {
  const [activeCategory, setActiveCategory] = useState<"hair" | "eyewear" | "outfit">("hair");
  const [prompt, setPrompt] = useState("Generate a textured crop fade with soft scissor tapers, shot on Hasselblad 80mm with low ambient light");
  const [rendering, setRendering] = useState(false);
  
  // Custom slider percentage state for Before vs After comparisons
  const [sliderVal, setSliderVal] = useState(50);

  // Curated transformation preset image links
  const visualPresets = {
    hair: {
      title: "Textured Taper Crop transformation",
      before: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      stats: { faceSuitability: "96%", lighting: "Studio Rembrandt", volume: "High density" }
    },
    eyewear: {
      title: "Angular Smoked Hex Acetate shade",
      before: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
      stats: { faceSuitability: "92%", lighting: "Sunset Rim", Volume: "N/A" }
    },
    outfit: {
      title: "Quiet Luxury winter layered drapes",
      before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      after: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
      stats: { faceSuitability: "94%", lighting: "Cinematic Side-light", volume: "Dual drapes" }
    }
  };

  const handleTriggerRender = () => {
    setRendering(true);
    setTimeout(() => {
      setRendering(false);
    }, 2500);
  };

  const handleCategorySelect = (cat: "hair" | "eyewear" | "outfit") => {
    setActiveCategory(cat);
    if (cat === "hair") {
      setPrompt("Generate a textured crop fade with soft scissor tapers, shot on Hasselblad 80mm with low ambient light");
    } else if (cat === "eyewear") {
      setPrompt("Overlay classic thick-rim tortoiseshell shades conforming fully to facial structure shadows");
    } else {
      setPrompt("Drape an unstructured cashmere slate coat over raw beige knit t-shirt with cinematic studio lighting");
    }
  };

  const activePreset = visualPresets[activeCategory];

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="visuals-glowup">
      
      {/* HEADER SPECS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Generative Visualizer Engine</span>
          <h2 className="font-display text-2xl font-light text-white mt-1">
            Glow-Up <span className="font-semibold">Visualizer</span>
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">Simulate changes to hairstyles, outfits or accessories under cinematic lighting profiles.</p>
        </div>
      </div>

      {/* CORE CONTROL SHEET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* BEFORE VS AFTER INTEGRAL SLIDER PANEL (LEFT) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center bg-neutral-950 px-4 py-2 rounded-xl border border-neutral-850">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{activePreset.title}</span>
            <div className="flex gap-4 text-[10px] text-neutral-500 font-mono">
              <span className="text-neutral-300">← Before</span>
              <span>After →</span>
            </div>
          </div>

          {/* SLIDER WRAPPER */}
          {rendering ? (
            /* RENDERING NEURAL LOADER PANEL */
            <div className="h-[430px] rounded-3xl border border-neutral-850 bg-neutral-950 flex flex-col items-center justify-center space-y-4">
              <div className="h-10 w-10 rounded-full border-2 border-t-emerald-500 border-r-transparent animate-spin flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-center">
                <span className="text-xs text-white uppercase font-mono tracking-widest block font-bold">RECONFIGURING OPTICAL RENDER</span>
                <p className="text-[10px] text-neutral-500 font-light mt-1">Smoothing lighting lines & overlaying accessories...</p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden h-[430px] border border-neutral-800 bg-neutral-950 shadow-xl select-none" id="splitslider-canvas">
              {/* After image background */}
              <img 
                src={activePreset.after} 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Before image overlay clip-path container */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderVal}%` }}
              >
                <img 
                  src={activePreset.before} 
                  className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none pointer-events-none"
                  style={{ width: "100%", height: "100%", minWidth: "100%", maxWidth: "none" }}
                  alt="Before"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Slider boundary separating bar */}
              <div 
                className="absolute inset-y-0 w-0.5 bg-white/70 shadow-md pointer-events-none"
                style={{ left: `${sliderVal}%` }}
              >
                {/* Visual marker knob */}
                <div className="absolute top-1/2 -mt-4 -ml-4 h-8 w-8 rounded-full bg-white/90 border border-neutral-800 shadow-lg flex items-center justify-center text-black font-bold text-xs uppercase font-mono select-none">
                  ↔
                </div>
              </div>

              {/* Custom Range controller overlay */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={e => setSliderVal(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize accent-transparent"
              />
              
              {/* Corner identifiers */}
              <div className="absolute bottom-4 left-4 bg-black/75 px-3 py-1.5 border border-white/10 rounded-lg pointer-events-none">
                <span className="font-mono text-[9px] text-neutral-300 uppercase">Interactive slider</span>
              </div>
            </div>
          )}
        </div>

        {/* CONTROLLERS GRID PANEL (RIGHT) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display text-lg font-medium text-white">Visualizer Inputs</h3>

          {/* CHOOSE TOPIC CATEGORY */}
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Choose Overlay Concept</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleCategorySelect("hair")}
                  className={`py-3 px-1 rounded-xl border border-neutral-850 text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${activeCategory === "hair" ? "bg-white border-white text-black" : "bg-neutral-950 text-neutral-400 hover:text-white"}`}
                >
                  HAIRSTYLE MAP
                </button>
                <button
                  onClick={() => handleCategorySelect("eyewear")}
                  className={`py-3 px-1 rounded-xl border border-neutral-850 text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${activeCategory === "eyewear" ? "bg-white border-white text-black" : "bg-neutral-950 text-neutral-400 hover:text-white"}`}
                >
                  SHADES OVERLAY
                </button>
                <button
                  onClick={() => handleCategorySelect("outfit")}
                  className={`py-3 px-1 rounded-xl border border-neutral-850 text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${activeCategory === "outfit" ? "bg-white border-white text-black" : "bg-neutral-950 text-neutral-400 hover:text-white"}`}
                >
                  OUTFIT RENDER
                </button>
              </div>
            </div>

            {/* AI PROMPT INPUT BOX */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Prompt Customization</span>
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-300 leading-relaxed focus:outline-hidden focus:border-emerald-500 h-28"
              />
              <span className="text-[9px] text-neutral-500 font-light block leading-relaxed">
                Tip: Mention camera focal length (e.g., Hasselblad 80mm) and studio rim side-lighting parameters for ultra premium output results.
              </span>
            </div>

            {/* SYNC METRICS CHATTER */}
            <div className="space-y-2 border-t border-neutral-800 pt-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Neural rendering specs</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-900">
                  <span className="block text-[8px] font-mono text-neutral-500 uppercase">Face Alignment suitability</span>
                  <span className="text-xs font-semibold text-white mt-1 block">{activePreset.stats.faceSuitability}</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-900">
                  <span className="block text-[8px] font-mono text-neutral-500 uppercase">Lighting Map profile</span>
                  <span className="text-xs font-semibold text-white mt-1 block">{activePreset.stats.lighting}</span>
                </div>
              </div>
            </div>

            {/* RE-RENDER SUBMIT */}
            <button
              id="btn-trigger-visualizer"
              onClick={handleTriggerRender}
              disabled={rendering}
              className="w-full rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold py-3.5 tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${rendering ? 'animate-spin' : ''}`} />
              RE-GENERATE VISUAL OVERLAY
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}
