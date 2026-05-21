import React, { useState, useMemo } from "react";
import { TrendingUp, Sparkles, Scale, Heart, History, Plus, AlertCircle, Dumbbell } from "lucide-react";
import { PhysiqueLog, StylingReport } from "../types";

interface PhysiqueGlowUpProps {
  stylingReport: StylingReport;
  activeMode: "bulk" | "cut" | "maintain";
  onUpdateMode: (mode: "bulk" | "cut" | "maintain") => void;
}

export default function PhysiqueGlowUp({
  stylingReport,
  activeMode,
  onUpdateMode
}: PhysiqueGlowUpProps) {

  // Progression metrics state
  const [logs, setLogs] = useState<PhysiqueLog[]>([
    { id: "log_1", date: "2026-05-10", weight: 78.5, waist: 82, chest: 104, notes: "Feeling symmetrical. Workwear fits well." },
    { id: "log_2", date: "2026-05-20", weight: 79.2, waist: 81, chest: 106, notes: "Deltoid volume grew. Tight shirts are slightly pulling." }
  ]);

  const [updaterInput, setUpdaterInput] = useState({
    weight: 79.5,
    waist: 81,
    chest: 107,
    notes: ""
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: PhysiqueLog = {
      id: `log_${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      weight: updaterInput.weight,
      waist: updaterInput.waist || undefined,
      chest: updaterInput.chest || undefined,
      notes: updaterInput.notes || "Recorded progress sync."
    };
    
    setLogs([newLog, ...logs]);
    setUpdaterInput({ ...updaterInput, notes: "" });
  };

  // Golden Ratio calculations (ideal V-taper chest/waist is 1.618)
  const lastLog = logs[0] || null;
  const currentRatio = useMemo(() => {
    if (!lastLog || !lastLog.chest || !lastLog.waist) return 0;
    return parseFloat((lastLog.chest / lastLog.waist).toFixed(3));
  }, [lastLog]);

  // Specific bespoke bodybuilding / athletic styling psychology guidelines
  const physiqueAdvices = [
    {
      type: "Slim / Slender physique",
      fitRule: "Relaxed fluid silhouettes",
      description: "Avoid skin-tight compression fits which emphasize bony features. Carry boxy heavyweight tees (240GSM+) which create artificial frame structure, combined with tapered trousers.",
      imageSeed: "slim"
    },
    {
      type: "Broad / Athletic shape",
      fitRule: "Structured shoulders with relaxed waist draping",
      description: "Your frame inherently stretches fabric. Unstructured blazers allow natural shoulder curves to float. Use vertical pleats on trousers to map balanced vertical height dimensions.",
      imageSeed: "broad"
    },
    {
      type: "Muscular / Bulking lines",
      fitRule: "Fitted deltoids with fluid waist release",
      description: "Buy shirts that fit the shoulders, but allow room around the ribcage. Stiff fabrics will bunch up awkwardly in motion. Opt for fluid merino fine knits or heavy cotton loops.",
      imageSeed: "muscular"
    }
  ];

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="physique-glowup">
      
      {/* HEADER SPECS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Sartorial Biomechanics mapping</span>
          <h2 className="font-display text-2xl font-light text-white mt-1">
            Physique & <span className="font-semibold">Fashion System</span>
          </h2>
          <p className="text-xs text-neutral-400 font-light mt-1">Design around your physical coordinates. Clothes should reveal frame discipline, not choke it.</p>
        </div>
      </div>

      {/* MODE BLOCK SYSTEM & ATHLETIC MEASUREMENT DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MODE CONTROLLER AND RATIO STATUS (LEFT) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neutral-900/60 p-4 rounded-bl-2xl border-l border-b border-neutral-800">
              <Dumbbell className="h-4 w-4 text-emerald-400" />
            </div>

            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">Symmetry Goal Configuration</span>
            <h3 className="font-display text-xl text-white font-medium mt-1">Active Athletics Mode</h3>
            
            {/* TOGGLE SELECTOR */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              {(["bulk", "cut", "maintain"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => onUpdateMode(mode)}
                  className={`py-3 rounded-xl border border-neutral-800 text-xs tracking-wider font-semibold cursor-pointer transition-all ${activeMode === mode ? "bg-white border-white text-black shadow-md" : "bg-neutral-950 text-neutral-400 hover:text-neutral-200"}`}
                >
                  {mode === "bulk" ? "LEAN BULK" : mode === "cut" ? "CUT / SHRED" : "MAINTAIN"}
                </button>
              ))}
            </div>

            {/* RATIO ANALYTICS DISPLAY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 mt-6 border-t border-neutral-800/60">
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Golden Ratio index</span>
                  <span className="font-display text-2xl font-bold text-white block mt-1">
                    {currentRatio ? `${currentRatio} / 1` : "N/A"}
                  </span>
                  <span className="text-[9px] text-neutral-400 font-light mt-0.5">V-Taper chest to waist proportion</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-medium text-emerald-400 block">Target Index</span>
                  <span className="text-sm font-bold text-white block mt-0.5">1.618</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-900 flex-col justify-center">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Active Silhouette Drape Dialect</span>
                <span className="text-xs text-neutral-200 font-medium block mt-1">
                  {activeMode === "bulk" ? "Decompress drapes & heavy fabrics" : "Fitted contours & high collar lines"}
                </span>
                <p className="text-[10px] text-neutral-500 font-light mt-1">
                  Corrects vertical posture offset by creating broad structured shoulder grids.
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVE ADVICE SERIES */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium text-white">Biomechanical Styling Directives</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {physiqueAdvices.map((adv, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-xl space-y-3 border-neutral-850">
                  <p className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-bold">Rule {idx + 1}</p>
                  <div>
                    <h5 className="font-display text-sm font-semibold text-white">{adv.type}</h5>
                    <span className="text-[11px] font-mono text-neutral-400 block italic mt-0.5">{adv.fitRule}</span>
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-relaxed font-light">{adv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* METRIC UPDATER AND PROGRESSION LOGS (RIGHT) */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="font-display text-lg font-medium text-white flex items-center gap-2">
            <History className="h-4 w-4" /> Gym Progress Logger
          </h3>

          {/* UPDATER FORM */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <form onSubmit={handleAddLog} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={updaterInput.weight}
                    onChange={e => setUpdaterInput({ ...updaterInput, weight: parseFloat(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase">Waist (cm)</label>
                  <input
                    type="number"
                    value={updaterInput.waist}
                    onChange={e => setUpdaterInput({ ...updaterInput, waist: parseInt(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-neutral-400 uppercase">Chest (cm)</label>
                  <input
                    type="number"
                    value={updaterInput.chest}
                    onChange={e => setUpdaterInput({ ...updaterInput, chest: parseInt(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-neutral-400 uppercase">Energy Observations</label>
                <input
                  type="text"
                  value={updaterInput.notes}
                  onChange={e => setUpdaterInput({ ...updaterInput, notes: e.target.value })}
                  placeholder="Notes (e.g., Posture level)"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-bold rounded-lg cursor-pointer"
              >
                Log Metrics Sync
              </button>
            </form>

            <div className="h-px bg-neutral-800/80 my-4" />

            {/* REAL PROGRESS LOG LIST */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {logs.map(log => (
                <div key={log.id} className="p-3 bg-neutral-950 border border-neutral-900 rounded-xl space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                    <span>{log.date}</span>
                    <span className="text-emerald-400 font-semibold">{log.weight} kg</span>
                  </div>
                  {(log.chest || log.waist) && (
                    <div className="flex gap-4 text-[10px] text-neutral-400 font-mono">
                      {log.chest && <span>Chest: {log.chest}cm</span>}
                      {log.waist && <span>Waist: {log.waist}cm</span>}
                    </div>
                  )}
                  <p className="text-neutral-500 text-[11px] font-light italic mt-1">&ldquo;{log.notes}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
