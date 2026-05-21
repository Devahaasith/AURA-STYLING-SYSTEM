import React, { useState } from "react";
import { Gauge, Sparkles, AlertCircle, RefreshCw, Star, Compass, HelpCircle, ArrowRight } from "lucide-react";
import { SuitabilityResponse, StylingReport } from "../types";

interface SuitabilityTestProps {
  stylingReport: StylingReport;
}

export default function SuitabilityTest({ stylingReport }: SuitabilityTestProps) {
  
  const [analyzing, setAnalyzing] = useState(false);
  const [testResult, setTestResult] = useState<SuitabilityResponse | null>(null);
  
  // Custom suitability form
  const [testForm, setTestForm] = useState({
    itemType: "Sunglasses",
    itemName: "Jacques Marie Mage angular thick acetate frames",
    itemColor: "Polished Gold rim with Forest Green mineral lenses"
  });

  const handleRunTest = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/suitability-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: testForm.itemType,
          itemName: testForm.itemName,
          itemColor: testForm.itemColor,
          stylingReport: stylingReport
        })
      });

      if (response.ok) {
        const result = await response.json();
        setTestResult(result);
      } else {
        console.error("Suitability testing failed on server.");
      }
    } catch (err) {
      console.error("Failed to connect to suitability test server:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  // Quick Preset Selector lists to facilitate frictionless play
  const presets = [
    { type: "Sunglasses", name: "Classic 1950s Tortoiseshell Wayfarers", color: "Honey amber acetate frame with deep smoke lens" },
    { type: "Clothing", name: "High-comfort Oversized Heavy Bouclé Knit Sweater", color: "Muted Sand Beige melange" },
    { type: "Shoes", name: "Hand-finished English Oxford Leather Brogues", color: "Deep Mahogany Calfskin" },
    { type: "Hairstyle", name: "Slick side parting with natural scissor taper", color: "Medium length feather trim matte look" }
  ];

  const handleApplyPreset = (pre: typeof presets[0]) => {
    setTestForm({
      itemType: pre.type,
      itemName: pre.name,
      itemColor: pre.color
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="suitability-analytics">
      
      {/* HEADER SPECS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Aesthetic Alignment Diagnostics</span>
          <h2 className="font-display text-2xl font-light text-white mt-1">
            &ldquo;Do I Suit <span className="font-semibold">This?&rdquo; Widget</span>
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">Gauge color harmony, skeletal proportion, and vibe consistency prior to purchasing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* HARMONY CALCULATOR CRITERION (LEFT) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-display text-lg font-medium text-white">Item Specification Specs</h3>
          
          <div className="glass-panel p-6 rounded-2xl space-y-6">
            <div className="space-y-4">
              
              {/* ITEM TYPE */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block">Item Classification</label>
                <select
                  value={testForm.itemType}
                  onChange={e => setTestForm({ ...testForm, itemType: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="Sunglasses">Eyewear / Sunglasses</option>
                  <option value="Clothing">Clothing / Knits / Blazer</option>
                  <option value="Shoes">Footwear / Loafers</option>
                  <option value="Hairstyle">Hairstyle Concept</option>
                </select>
              </div>

              {/* ITEM NAME */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block">Item Designer Model / Sillhouette</label>
                <input
                  type="text"
                  value={testForm.itemName}
                  onChange={e => setTestForm({ ...testForm, itemName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. Vintage linen double breasted jacket"
                />
              </div>

              {/* ITEM COLOR */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block">Color & Fabric Texture</label>
                <input
                  type="text"
                  value={testForm.itemColor}
                  onChange={e => setTestForm({ ...testForm, itemColor: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white"
                  placeholder="e.g. Muted Moss Green split-suede"
                />
              </div>

            </div>

            {/* QUICK PRESETS IN-APP */}
            <div className="space-y-2 border-t border-neutral-800/60 pt-4">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">Quick Select Presets</span>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((pre, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleApplyPreset(pre)}
                    className="p-2.5 text-left bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 rounded-lg transition-all cursor-pointer text-[10px] uppercase truncate text-neutral-400 hover:text-white"
                  >
                    {pre.name}
                  </button>
                ))}
              </div>
            </div>

            {/* INITIATE BUTTON */}
            <button
              id="btn-trigger-suitability"
              onClick={handleRunTest}
              disabled={analyzing}
              className="w-full rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold py-3.5 tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-black" />
                  INITIATING GEOMETRIC LENS SCAN...
                </>
              ) : (
                <>
                  <Gauge className="h-4 w-4 text-black" />
                  ANALYZE HARMONY COMPATIBILITY
                </>
              )}
            </button>
          </div>
        </div>

        {/* RESULTS FEEDBACK OR MOCK CAROUSEL (RIGHT) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-display text-lg font-medium text-white">Aesthetic Scan Result</h3>
          
          {analyzing ? (
            /* CAM CAPTURE ANIMATION SCANNER */
            <div className="h-[385px] border border-dashed border-emerald-900/60 rounded-2xl bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden" id="suitability-capture">
              <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%) animate-pulse" />
              {/* Pulsing horizontal laser line */}
              <div className="absolute inset-x-0 h-0.5 bg-emerald-500/40 shadow-xs animate-bounce" style={{ top: "40%" }} />
              <div className="text-center relative z-10 space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full border border-emerald-600 animate-pulse flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-400 animate-spin" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-semibold animate-pulse">Scanning Silhouette Contrast</span>
                  <p className="text-[10px] text-neutral-500 font-light mt-1">Cross-analyzing with styling report algorithms...</p>
                </div>
              </div>
            </div>
          ) : testResult ? (
            /* COMPREHENSIVE STYLE SCORECARD */
            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6 animate-fade-in" id="suitability-scorecard">
              
              <div className="flex justify-between items-center bg-neutral-950 p-4 rounded-xl border border-neutral-850">
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Compatibility Rating</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-3xl font-display font-black text-white">{testResult.rating}</span>
                    <span className="text-xs text-neutral-500 font-mono">/ 10</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Verdict Outline</span>
                  <span className="text-xs font-semibold uppercase px-3 py-1 bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded-full inline-block mt-1">
                    {testResult.verdict}
                  </span>
                </div>
              </div>

              {/* DETAILS PANEL GRID */}
              <div className="space-y-4 text-xs font-light leading-relaxed">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block font-semibold">Proportion compatibility</span>
                  <p className="text-neutral-300">{testResult.compatibilityDetail}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block font-semibold">Sartorial Fit Advice</span>
                  <p className="text-neutral-300">{testResult.fitAdvice}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block font-semibold">Undertone Color Harmony</span>
                  <p className="text-neutral-300">{testResult.colorHarmony}</p>
                </div>
              </div>

              {/* RECOMMENDED ALTERNATIVES BLOCK */}
              <div className="rounded-xl bg-neutral-950 p-4 border border-neutral-900 space-y-3">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block font-bold">Recommended Alternatives</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {testResult.suggestedAlternatives?.map((alt, idx) => (
                    <div key={idx} className="p-2.5 bg-neutral-900 border border-neutral-850 rounded-lg text-xs font-medium text-neutral-200">
                      {alt}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-neutral-400 font-light italic border-t border-neutral-800/60 pt-4">
                &ldquo;{testResult.psychologyAngle}&rdquo;
              </p>

            </div>
          ) : (
            /* EMPTY INITIAL LOOK */
            <div className="h-[385px] border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/50 flex flex-col items-center justify-center text-center p-6">
              <Compass className="h-10 w-10 text-neutral-700 mb-3" />
              <h4 className="text-sm font-semibold text-neutral-400">Scan Canvas Idle</h4>
              <p className="text-xs text-neutral-600 font-light mt-1 max-w-sm">Provide an item class, design model and color parameters to check how it meshes with your facial structure/undertones.</p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
