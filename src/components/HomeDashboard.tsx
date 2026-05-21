import React from "react";
import { Sparkles, TrendingUp, Watch, ChevronRight, User, Compass, Layers } from "lucide-react";
import { StylingReport, WardrobeItem } from "../types";
import { DEFAULT_STYLING_REPORT, DEFAULT_WARDROBE } from "../data";

interface HomeDashboardProps {
  userEmail?: string;
  stylingReport: StylingReport;
  wardrobeCount: number;
  activeMode: "bulk" | "cut" | "maintain";
  setActiveTab: (tab: string) => void;
  onQuickAnalyze: () => void;
}

export default function HomeDashboard({
  userEmail = "devahaasith@gmail.com",
  stylingReport = DEFAULT_STYLING_REPORT,
  wardrobeCount = DEFAULT_WARDROBE.length,
  activeMode = "bulk",
  setActiveTab,
  onQuickAnalyze
}: HomeDashboardProps) {
  
  // Format userName cleanly from devahaasith@gmail.com -> DEVAHAASITH or Devahaasith
  const userName = React.useMemo(() => {
    if (!userEmail) return "Aesthetic Self";
    const part = userEmail.split("@")[0];
    return part.charAt(0).toUpperCase() + part.slice(1);
  }, [userEmail]);

  // Premium styled sample outfit of the day
  const ootdItems = [
    { name: "Unstructured Sand Merino Wool Polo", brand: "AURA Tailored", type: "Tops" },
    { name: "Structured Knit Charcoal Heavy Overshirt", brand: "AURA Outerwear", type: "Layers" },
    { name: "Double-Pleated Wool Drape Trousers", brand: "Bespoke drape", type: "Pants" },
    { name: "Suede Penny Loafers", brand: "Handcrafted unlined", type: "Footwear" }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12" id="home-dashboard">
      {/* HEADER HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-linear-to-b from-neutral-900/90 to-neutral-950 p-8 md:p-12">
        {/* Soft glowing absolute orb background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-neutral-500/5 blur-3xl" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/30 px-3 py-1 text-xs font-medium tracking-wide text-emerald-400">
            <Sparkles className="h-3 w-3 animate-pulse" />
            <span>AI STYLIST ACTIVE</span>
          </div>
          <h1 className="font-display text-4xl font-light tracking-tight text-white md:text-5xl">
            Welcome back, <span className="font-medium text-emerald-400">{userName}</span>
          </h1>
          <p className="text-sm font-light leading-relaxed text-neutral-400 md:text-base">
            Your premium styling framework is synched. Today is optimal for <span className="text-white font-medium">high-contrast draping</span> matching your warm undertone and structured shoulders.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              id="btn-quick-analyze"
              onClick={onQuickAnalyze}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold tracking-wider text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              GENERATE AURA REPORT
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              id="btn-explore"
              onClick={() => setActiveTab("aesthetics")}
              className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 px-5 py-3 text-xs font-semibold tracking-wider text-neutral-300 hover:bg-neutral-800 transition-colors"
            >
              EXPLORE RECENT VIBES
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATUS STATS (BENTO-STYLE GRID) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* STATUS 1: STYLING HARMONY */}
        <div className="glass-panel p-6 rounded-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 bg-neutral-800/40 p-3 rounded-bl-xl border-l border-b border-neutral-800/80">
            <Layers className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">Current Profile</p>
          <h4 className="mt-2 font-display text-lg font-medium text-neutral-200">{stylingReport?.bestColors?.colorName || "Slate Matte"}</h4>
          <p className="mt-1 text-xs text-neutral-400 font-light line-clamp-2">{stylingReport?.vibeAnalysis}</p>
          
          {/* Quick Color Palette preview */}
          <div className="mt-4 flex items-center gap-2">
            {(stylingReport?.bestColors?.colors || ["#1E222A", "#333F48", "#5B7065", "#CEC5B4"]).map((cHex, idx) => (
              <div 
                key={idx} 
                className="h-6 w-12 rounded-xs border border-neutral-950 shadow-xs" 
                style={{ backgroundColor: cHex }}
                title={cHex}
              />
            ))}
          </div>
        </div>

        {/* STATUS 2: DIGITAL WARDROBE METER */}
        <div className="glass-panel p-6 rounded-2xl relative group overflow-hidden">
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">Cabinet Inventory</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-display font-semibold text-white">{wardrobeCount}</span>
            <span className="text-xs text-neutral-500">Premium Garments</span>
          </div>
          <div className="mt-3 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (wardrobeCount / 20) * 100)}%` }} />
          </div>
          <p className="mt-2 text-xs text-neutral-400 font-light flex items-center gap-1">
            <span>{wardrobeCount > 6 ? "Optimal variety for seasonal layers." : "Add 4 more basic items to unlock premium outfits."}</span>
          </p>
        </div>

        {/* STATUS 3: PHYSIQUE TRACKER MODE */}
        <div className="glass-panel p-6 rounded-2xl relative group overflow-hidden">
          <p className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">Glow-up System</p>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                {activeMode === "bulk" ? "Lean Bulk" : activeMode === "cut" ? "Cut Mode" : "Maintain"}
              </span>
              <p className="text-xs text-neutral-400 font-light mt-1">Symmetrical posture active</p>
            </div>
            <div className="h-12 w-12 rounded-full border border-neutral-800 bg-neutral-900/80 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          {/* Action indicator */}
          <div className="mt-4 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-800/60 pt-3">
            <span>Physique Goal Ratio</span>
            <span className="text-neutral-300 font-mono">1.618 Golden Ratio</span>
          </div>
        </div>
      </div>

      {/* CORE DISPLAY: OUTFIT OF THE DAY & PSYCHOLOGY TIMELINE */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT COLUMN: DAILY HARMONY CARDS */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-medium tracking-tight text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-neutral-400" />
              Outfit of the Day (OOTD)
            </h3>
            <span className="font-mono text-xs text-neutral-500">21 MAY 2026</span>
          </div>

          {/* OOTD CARD */}
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 md:p-8">
            <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-900/30">
              <div className="text-center">
                <span className="block text-lg font-bold text-emerald-400 font-mono leading-none">94</span>
                <span className="text-[8px] uppercase tracking-widest text-neutral-400">Match</span>
              </div>
            </div>

            <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest">Recommended Blend</p>
            <h4 className="mt-1 font-display text-2xl font-light text-white">Quiet Luxury Lounge</h4>
            <p className="mt-3 text-sm text-neutral-400 font-light leading-relaxed">
              Tailored for a temperature of 21°C. Designed to project subtle authority, using soft textures that anchor the jaw contours beautifully.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ootdItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700/80 transition-all group">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-neutral-800/50 flex items-center justify-center border border-neutral-700/50">
                    <span className="font-mono text-xs text-neutral-400">{idx + 1}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-neutral-500 uppercase">{item.type}</span>
                    <span className="block text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">{item.name}</span>
                    <span className="block text-[10px] text-neutral-500 font-light">{item.brand}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-neutral-950 p-4 border border-neutral-800/50">
              <span className="block text-xs font-mono text-emerald-400 uppercase tracking-wider">Stylist Layering Recommendation</span>
              <p className="mt-1 text-xs text-neutral-400 leading-relaxed font-light">
                Leave the charcoal overshirt entirely unbuttoned in front. Push back the sleeves marginally on your forearm of choice to reveal the watch alignment. This elongates the chest lines.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STYLING PSYCHOLOGY COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-display text-xl font-medium tracking-tight text-white flex items-center gap-2">
            <Watch className="h-5 w-5 text-neutral-400" />
            Style Psychology
          </h3>

          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Confidence Directive</span>
              <h5 className="font-display text-md text-white font-medium">The Power of Soft Tailoring</h5>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Stiff clothing acts as visual armor, indicating anxiety. Unstructured premium drapes (like wool-linen or cashmere) show that you are entirely at ease with your physical presence. Let your shoulders move naturally.
              </p>
            </div>

            <div className="h-px bg-neutral-800/60" />

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Self-Improvement Insight</span>
              <h5 className="font-display text-md text-white font-medium">Visual Symmetry Rule</h5>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                If your face shape has round curves, never wear round sunglasses. Complement the curves with angular geometric frames to construct sharp, classic light angles across your jaw.
              </p>
            </div>

            <div className="h-px bg-neutral-800/60" />

            <div className="rounded-xl bg-emerald-950/20 p-4 border border-emerald-900/30">
              <span className="text-xs font-semibold text-emerald-400 block mb-1">Glow-Up Mantra</span>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light italic">
                &ldquo;You do not wear clothes to hide your framework. You wear clothes to describe your discipline.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
