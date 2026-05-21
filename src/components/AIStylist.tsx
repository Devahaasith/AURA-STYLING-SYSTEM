import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw, Upload, Shield, Eye, Info, User, HelpCircle } from "lucide-react";
import { PhysicalAttributes, StylingReport } from "../types";
import { DEFAULT_STYLING_REPORT } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface AIStylistProps {
  stylingReport: StylingReport;
  onUpdateReport: (report: StylingReport) => void;
  attributes: PhysicalAttributes;
  onUpdateAttributes: (attrs: PhysicalAttributes) => void;
}

const PARSING_STAGES = [
  "Mapping biomechanical shoulder proportions...",
  "Running pixel-level skin undertone chromatic diagnostics...",
  "Analyzing facial bone symmetry and optical geometry...",
  "Consulting style psychology matrices for quiet luxury pairing...",
  "Bundling bespoke premium wardrobe recommended configurations..."
];

export default function AIStylist({
  stylingReport = DEFAULT_STYLING_REPORT,
  onUpdateReport,
  attributes,
  onUpdateAttributes
}: AIStylistProps) {
  
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [activeTab, setActiveTab] = useState<"input" | "blueprint">("input");
  const [faceFile, setFaceFile] = useState<string | null>(null);
  const [bodyFile, setBodyFile] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Selector choices for user state
  const faceShapes = [
    { value: "oval", label: "Oval", desc: "Balanced, rounded forehead & narrow chin" },
    { value: "square", label: "Square", desc: "Broad forehead, sharp defined jawline" },
    { value: "round", label: "Round", desc: "Equal width and length, soft contouring" },
    { value: "diamond", label: "Diamond", desc: "Wide cheekbones, narrow mouth & chin" },
    { value: "oblong", label: "Oblong", desc: "Elongated facial features, tidy narrow jaw" }
  ];

  const bodyTypes = [
    { value: "trapezoid", label: "Trapezoid (Highly Cohesive)", desc: "Broad shoulders, medium waist. Easiest to style." },
    { value: "inverted-triangle", label: "Inverted Triangle (Athletic)", desc: "Very wide shoulders, narrow waist." },
    { value: "rectangle", label: "Rectangle (Slender)", desc: "Shoulders and waist are roughly equal width." },
    { value: "triangle", label: "Triangle (Slight Hips)", desc: "Shoulders narrower than waist/pelvis." },
    { value: "oval-body", label: "Oval (Robust)", desc: "Rounded midsection, soft shoulders." }
  ];

  const skinTones = [
    { value: "cool-fair", label: "Cool Fair", hexClass: "bg-[#FFF4E8]", desc: "Very light, rosy blueish veins" },
    { value: "warm-pale", label: "Warm Pale", hexClass: "bg-[#F9E2C6]", desc: "Fair skin with golden honey undertones" },
    { value: "neutral-medium", label: "Neutral Medium", hexClass: "bg-[#E6BE94]", desc: "Balanced gold/olive undertone" },
    { value: "olive-tan", label: "Olive Tan", hexClass: "bg-[#D3A370]", desc: "Warm mediterranean greenish shades" },
    { value: "warm-deep", label: "Warm Deep", hexClass: "bg-[#8A5229]", desc: "Deep rich skin, warm amber shadows" },
    { value: "cool-dark", label: "Cool Dark", hexClass: "bg-[#4E2B15]", desc: "Rich deep cocoa, blue-bronze undertones" }
  ];

  const physiqueGoals = [
    { value: "lean-bulk", label: "Lean Bulk", desc: "Adding clean symmetry and visual weight" },
    { value: "muscular", label: "Muscular Athletic", desc: "Structuring fabrics over robust shoulders" },
    { value: "slim-fit", label: "Sleek Slim Fit", desc: "Sharp tailored cuts, vertical drapes" },
    { value: "toning", label: "Aesthetic Shred", desc: "High contrast outline, slim waist drapes" }
  ];

  const handleAttributeChange = (key: keyof PhysicalAttributes, value: any) => {
    onUpdateAttributes({
      ...attributes,
      [key]: value
    });
  };

  const simulateLoading = (callback: () => void) => {
    setLoading(true);
    setLoadingStage(0);
    
    const interval = setInterval(() => {
      setLoadingStage(prev => {
        if (prev < PARSING_STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          callback();
          return prev;
        }
      });
    }, 1300);
  };

  const handleGenerateReport = async () => {
    simulateLoading(async () => {
      try {
        const response = await fetch("/api/style-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            attributes,
            facePhoto: faceFile ? "user_upload" : null,
            bodyPhoto: bodyFile ? "user_upload" : null
          })
        });

        if (response.ok) {
          const report = await response.json();
          // Update the parent state
          onUpdateReport(report);
          setActiveTab("blueprint");
        } else {
          console.error("Failed to generate styling blueprint.");
        }
      } catch (err) {
        console.error("Error communicating with stylist server:", err);
      } finally {
        setLoading(false);
      }
    });
  };

  // Upload simulation helper
  const handleMockUpload = (type: "face" | "body") => {
    if (type === "face") {
      setFaceFile("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80");
    } else {
      setBodyFile("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80");
    }
  };

  return (
    <div className="space-y-8 pb-12" id="ai-stylist">
      
      {/* SECTION TABS */}
      <div className="flex border-b border-neutral-800/80">
        <button
          onClick={() => setActiveTab("input")}
          className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors border-b-2 ${activeTab === "input" ? "border-emerald-500 text-white" : "border-transparent text-neutral-400 hover:text-neutral-200"}`}
        >
          1. PHYSICAL INPUTS & PHOTOS
        </button>
        <button
          onClick={() => setActiveTab("blueprint")}
          className={`px-6 py-3 text-sm font-medium tracking-wider transition-colors border-b-2 ${activeTab === "blueprint" ? "border-emerald-500 text-white" : "border-transparent text-neutral-400 hover:text-neutral-200"}`}
        >
          2. BESPOKE AESTHETIC BLUEPRINT
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          /* NEURAL LOADING SCREEN */
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col items-center justify-center p-12 min-h-[450px] border border-neutral-800 rounded-3xl bg-neutral-950/40 relative overflow-hidden"
            id="stylist-loader"
          >
            {/* Parallax Layer 1: Dot grid mesh pattern */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-10 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
              style={{
                x: mousePos.x * 20,
                y: mousePos.y * 20,
              }}
              transition={{ type: "spring", stiffness: 85, damping: 25 }}
            />

            {/* Parallax Layer 2: Muted Amber/Olive chromatic highlight blur ball */}
            <motion.div
              className="absolute -inset-10 pointer-events-none opacity-30 z-0 blur-3xl bg-[radial-gradient(circle_at_center,rgba(90,90,64,0.22)_0%,transparent_60%)]"
              style={{
                x: mousePos.x * -40,
                y: mousePos.y * -40,
              }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            />

            {/* Parallax Layer 3: Tech crosshair / lens guide details */}
            <motion.div
              className="absolute top-1/2 left-1/2 -ml-32 -mt-32 w-64 h-64 rounded-full border border-neutral-800/30 pointer-events-none z-0 flex items-center justify-center"
              style={{
                x: mousePos.x * 12,
                y: mousePos.y * 12,
              }}
              transition={{ type: "spring", stiffness: 110, damping: 28 }}
            >
              <div className="w-48 h-48 rounded-full border border-dashed border-neutral-800/10" />
            </motion.div>

            {/* Centered Dynamic Scanning HUD elements */}
            <div className="relative z-10 text-center max-w-lg space-y-6">
              <div className="mx-auto h-16 w-16 rounded-full border-t-2 border-emerald-500 border-r-2 border-transparent animate-spin flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="font-display text-xl font-medium text-white tracking-wide">
                  AURA AI Styling Matrix Active
                </h3>
                
                {/* Micro-animating parsed stage texts to avoid jumpiness */}
                <div className="h-8 flex items-center justify-center relative overflow-hidden select-none">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={loadingStage}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="font-mono text-xs text-neutral-400 uppercase tracking-widest text-center"
                    >
                      {PARSING_STAGES[loadingStage]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Premium Spring-Animated indicator bar */}
              <div className="h-1.5 w-full bg-neutral-900/60 rounded-full overflow-hidden p-[2px]">
                <motion.div 
                  className="h-full bg-emerald-500 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((loadingStage + 1) / PARSING_STAGES.length) * 100}%` }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">
                Phase {loadingStage + 1} of {PARSING_STAGES.length}
              </span>
            </div>
          </motion.div>
        ) : activeTab === "input" ? (
          
          /* INPUT PANEL SCREEN */
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 gap-8 lg:grid-cols-12"
            id="stylist-input"
          >
          
          {/* PHOTO UPLOADS COLUMN (LEFT) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display text-lg font-medium text-white flex items-center gap-2">
              <Upload className="h-4 w-4" /> Visual Scans (Required)
            </h3>

            {/* FACE SELFIE */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4">
              <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">Face Architecture</span>
              {faceFile ? (
                <div className="relative rounded-xl overflow-hidden h-40 border border-neutral-800">
                  <img src={faceFile} alt="Face Upload" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setFaceFile(null)} 
                    className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-full text-xs text-neutral-400 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => handleMockUpload("face")}
                  className="h-40 rounded-xl border border-dashed border-neutral-800 hover:border-emerald-500 bg-neutral-950 flex flex-col items-center justify-center cursor-pointer transition-all group"
                >
                  <User className="h-8 w-8 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-xs text-neutral-400 mt-2 font-medium">Capture or Load Portrait</span>
                  <span className="text-[10px] text-neutral-600 font-light mt-1">Detects cheekbone, facial asymmetry</span>
                </div>
              )}
            </div>

            {/* FULL BODY PREVIEW */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4">
              <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider">Skeletal Frame Scan</span>
              {bodyFile ? (
                <div className="relative rounded-xl overflow-hidden h-40 border border-neutral-800">
                  <img src={bodyFile} alt="Body Silhouette" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setBodyFile(null)} 
                    className="absolute top-2 right-2 p-1.5 bg-black/80 rounded-full text-xs text-neutral-400 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => handleMockUpload("body")}
                  className="h-40 rounded-xl border border-dashed border-neutral-800 hover:border-emerald-500 bg-neutral-950 flex flex-col items-center justify-center cursor-pointer transition-all group"
                >
                  <Sparkles className="h-8 w-8 text-neutral-600 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-xs text-neutral-400 mt-2 font-medium">Capture or Load Body Shape</span>
                  <span className="text-[10px] text-neutral-600 font-light mt-1">Measures shoulder vs waist offset</span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-emerald-950/40 bg-emerald-950/10 p-4 flex gap-3 text-xs text-emerald-400">
              <Shield className="h-5 w-5 shrink-0" />
              <div>
                <span className="font-semibold block mb-0.5">Privacy Lock Engaged</span>
                <p className="font-light text-neutral-400 leading-relaxed">
                  Your uploaded images are only parsed locally in memory using sandboxed computer vision models and never preserved on long-term databases.
                </p>
              </div>
            </div>
          </div>

          {/* PHYSICAL ATTRIBUTE SELECTION (RIGHT) */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display text-lg font-medium text-white flex items-center gap-2">
              <Info className="h-4 w-4" /> Somatometric Specifications
            </h3>

            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-8">
              
              {/* FACE SHAPE SELECT */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">Face Shape</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {faceShapes.map(f => (
                    <button
                      key={f.value}
                      onClick={() => handleAttributeChange("faceShape", f.value)}
                      className={`text-left p-3 rounded-xl border transition-all text-xs cursor-pointer ${attributes.faceShape === f.value ? "bg-white border-white text-black font-semibold shadow-md" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                    >
                      <span className="block capitalize">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* BODY TYPE SELECT */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">Body Frame Structure</label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {bodyTypes.map(b => (
                    <button
                      key={b.value}
                      onClick={() => handleAttributeChange("bodyType", b.value)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-center ${attributes.bodyType === b.value ? "bg-white border-white text-black" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                    >
                      <span className="block text-xs font-semibold capitalize">{b.label}</span>
                      <span className="block text-[10px] text-neutral-500 font-light mt-1">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SKIN TONE SELECT */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">Skin Tone & undertone Harmony</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {skinTones.map(s => (
                    <button
                      key={s.value}
                      onClick={() => handleAttributeChange("skinTone", s.value)}
                      className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer ${attributes.skinTone === s.value ? "bg-white border-white text-black" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                    >
                      <div className={`h-4 w-4 rounded-full border border-neutral-800 shadow-xs ${s.hexClass}`} />
                      <div>
                        <span className="block text-[11px] font-semibold">{s.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* HEIGHT SLIDER */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Height Dimension</label>
                    <span className="font-mono text-sm text-emerald-400">{attributes.height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    value={attributes.height}
                    onChange={(e) => handleAttributeChange("height", parseInt(e.target.value))}
                    className="w-full accent-emerald-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* CURRENT HAIRSTYLE */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Current Hair Architecture</label>
                  <input
                    type="text"
                    value={attributes.currentHairstyle}
                    onChange={(e) => handleAttributeChange("currentHairstyle", e.target.value)}
                    placeholder="e.g. Rough wave quiff"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-800 bg-neutral-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* PHYSIQUE GOALS */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300 block">Physique Glow-Up Direction</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {physiqueGoals.map(p => (
                    <button
                      key={p.value}
                      onClick={() => handleAttributeChange("physiqueGoals", p.value)}
                      className={`text-left p-3 rounded-xl border transition-all text-xs cursor-pointer ${attributes.physiqueGoals === p.value ? "bg-white border-white text-black font-semibold" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"}`}
                    >
                      <span className="block capitalize">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* DESIRED VIBE / BRAND ARCHITECTURE */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">Desired Aura Style Vibe</label>
                  <select
                    value={attributes.vibeStyle}
                    onChange={(e) => handleAttributeChange("vibeStyle", e.target.value)}
                    className="w-full p-3 rounded-xl border border-neutral-800 bg-neutral-950 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Quiet Luxury">Quiet Luxury (Unlabeled Wealth)</option>
                    <option value="Dark Masculine">Dark Masculine (Structural Shadow)</option>
                    <option value="Clean Minimal">Clean Minimal (Industrial Block)</option>
                    <option value="Old Money">Old Money (Coastal Generation)</option>
                    <option value="Rugged Telugu Hero">Rugged Telugu Hero (High Attitude)</option>
                    <option value="Korean Streetwear">Korean Streetwear (Oversized Drift)</option>
                  </select>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4 border-t border-neutral-800/60 text-right">
                <button
                  id="btn-trigger-ai"
                  onClick={handleGenerateReport}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors px-6 py-4 text-xs font-bold tracking-wider text-black cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  INITIATE AI COGNITIVE PROFILING
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

        </motion.div>
      ) : (
        
        /* BLUEPRINT SCREEN */
        <motion.div
          key="blueprint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
          id="stylist-blueprint"
        >
          {/* HEADER ROW */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Active Aesthetic Matrix</span>
              <h3 className="font-display text-2xl font-light text-white mt-1">
                Your Bespoke <span className="font-semibold">Style Blueprint</span>
              </h3>
            </div>
            <button
              onClick={() => setActiveTab("input")}
              className="flex items-center gap-2 text-xs font-mono border border-neutral-800 bg-neutral-900/60 rounded-xl px-4 py-2 hover:bg-neutral-800 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Adjust Metrics
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT DETAILS COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* PRIMARY PSYCHOLOGICAL PROFILE SUMMARY */}
              <div className="relative overflow-hidden p-6 md:p-8 border border-neutral-800 bg-neutral-900/40 rounded-2xl">
                <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl" />
                <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase">Stylist Vibe Analysis</span>
                <p className="mt-2 text-md leading-relaxed text-neutral-200 font-light">
                  {stylingReport?.vibeAnalysis}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-[2px] bg-emerald-500 w-12" />
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">Self Mastery Statement</span>
                </div>
              </div>

              {/* OUTWARD SILHOUETTES MAP: SUITS vs AVOID */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* WHAT SUITS THEM */}
                <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-3 py-1 rounded-full">
                    <span>SUITS YOUR OUTLINE</span>
                  </div>
                  <ul className="space-y-3">
                    {stylingReport?.clothingFits?.suits?.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-neutral-300 font-light">
                        <span className="font-mono text-emerald-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WHAT TO AVOID */}
                <div className="glass-panel p-6 rounded-2xl space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-950/20 border border-rose-900/40 px-3 py-1 rounded-full">
                    <span>AVOID (CLASHES PROPORIONS)</span>
                  </div>
                  <ul className="space-y-3">
                    {stylingReport?.clothingFits?.avoid?.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-neutral-300 font-light">
                        <span className="font-mono text-rose-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* CORE COLOR HARMONY CHART */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-4">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">Color Contrast Harmony Index</span>
                <div>
                  <h4 className="font-display text-lg font-medium text-white">{stylingReport?.bestColors?.colorName}</h4>
                  <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                    {stylingReport?.bestColors?.description}
                  </p>
                </div>
                
                {/* Visualizer colors */}
                <div className="grid grid-cols-4 gap-3 pt-3">
                  {stylingReport?.bestColors?.colors?.map((h, i) => (
                    <div key={i} className="group relative overflow-hidden h-16 rounded-xl border border-neutral-950 shadow-md">
                      <div className="h-full w-full" style={{ backgroundColor: h }} />
                      <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1.5 text-center transition-opacity">
                        <span className="font-mono text-[10px] text-neutral-300 block">{h}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OPTICAL EYEWEAR & ACCESSORIES */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* SUNGLASSES ARCHITECTURE */}
                <div className="glass-panel p-6 rounded-2xl space-y-3">
                  <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">Sunglasses & Vision wear</span>
                  <div className="space-y-3">
                    {stylingReport?.sunglasses?.map((sun, idx) => (
                      <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                        <span className="font-semibold text-white block">{sun}</span>
                        <span className="text-[10px] text-neutral-500 mt-0.5 block">Matches facial bone projection</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* HARMONIOUS ACCENTS */}
                <div className="glass-panel p-6 rounded-2xl space-y-3">
                  <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">Selected Aura Accents</span>
                  <div className="space-y-3">
                    {stylingReport?.accessories?.map((ac, idx) => (
                      <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-300">
                        {ac}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT HAIR & PSYCHOLOGY COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* HAIR RECOMMENDATION MATRIX */}
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">Hairstyle suitability</span>
                {stylingReport?.hairstyleSuggestions?.map((hair, i) => (
                  <div key={i} className="space-y-1 pb-3 last:pb-0 border-b border-neutral-800/60 last:border-0">
                    <span className="text-xs text-emerald-400 font-semibold block">{hair.style}</span>
                    <p className="text-[11px] text-neutral-400 font-light leading-relaxed">{hair.description}</p>
                  </div>
                ))}
              </div>

              {/* CELEBRITY STYLE ALIGNMENT */}
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase block">Celebrity style benchmarks</span>
                <div className="space-y-4">
                  {stylingReport?.celebrityInspirations?.map((cel, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-neutral-800 shrink-0">
                        <img src={cel.image} alt={cel.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white">{cel.name}</span>
                        <p className="text-[10px] text-neutral-400 font-light mt-0.5 leading-relaxed">{cel.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CORE STYLING PSYCHOLOGY */}
              <div className="rounded-2xl border border-emerald-900/40 bg-zinc-950 p-6 space-y-3 relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 h-20 w-20 bg-emerald-500/5 rounded-full blur-2xl" />
                <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase">MIND DIRECTIVE</span>
                <h5 className="font-display text-sm font-medium text-white">Posture Framework</h5>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  {stylingReport?.psychologyInsight}
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
}
