import React, { useState, useMemo } from "react";
import { Layers, Plus, Sparkles, Folder, Trash2, CheckCircle, Info, ChevronRight } from "lucide-react";
import { WardrobeItem, OutfitSuggestion } from "../types";

interface DigitalWardrobeProps {
  wardrobeItems: WardrobeItem[];
  onAddItem: (item: WardrobeItem) => void;
  onDeleteItem: (id: string) => void;
  activeOutfitPlan: OutfitSuggestion | null;
  onClearActivePlan: () => void;
}

export default function DigitalWardrobe({
  wardrobeItems,
  onAddItem,
  onDeleteItem,
  activeOutfitPlan,
  onClearActivePlan
}: DigitalWardrobeProps) {
  
  const [activeCategory, setActiveCategory] = useState<"all" | "tops" | "pants" | "shoes" | "accessories">("all");
  
  // Custom wardrobe adder form state
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "tops" as "tops" | "pants" | "shoes" | "accessories",
    colorName: "Sand Beige",
    colorHex: "#e5dcd3",
    aestheticTag: "Quiet Luxury",
    layerLevel: 1 as 1 | 2 | 3
  });

  // Active slots for the Smart Outfit Builder
  const [activeSlots, setActiveSlots] = useState<{
    innerTop: WardrobeItem | null;
    outerTop: WardrobeItem | null;
    pants: WardrobeItem | null;
    shoes: WardrobeItem | null;
    accessory: WardrobeItem | null;
  }>({
    innerTop: null,
    outerTop: null,
    pants: null,
    shoes: null,
    accessory: null
  });

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return wardrobeItems;
    return wardrobeItems.filter(item => item.category === activeCategory);
  }, [wardrobeItems, activeCategory]);

  // Click handler to snap items into active slots
  const handleSnapToSlot = (item: WardrobeItem) => {
    if (item.category === "tops") {
      if (item.layerLevel === 2) {
        setActiveSlots(prev => ({ ...prev, outerTop: item }));
      } else {
        setActiveSlots(prev => ({ ...prev, innerTop: item }));
      }
    } else if (item.category === "pants") {
      setActiveSlots(prev => ({ ...prev, pants: item }));
    } else if (item.category === "shoes") {
      setActiveSlots(prev => ({ ...prev, shoes: item }));
    } else if (item.category === "accessories") {
      setActiveSlots(prev => ({ ...prev, accessory: item }));
    }
  };

  const handleClearSlot = (slotKey: keyof typeof activeSlots) => {
    setActiveSlots(prev => ({ ...prev, [slotKey]: null }));
  };

  // Evaluate the compiled outfit instantly
  const computedStats = useMemo(() => {
    const selectedCount = Object.values(activeSlots).filter(Boolean).length;
    if (selectedCount === 0) return { score: 0, status: "Awaiting Layers", advice: "Select wardrobe items to snap into slots." };

    let score = 50 + selectedCount * 8; // base points
    const tags = Object.values(activeSlots).filter((s): s is WardrobeItem => s !== null).map(s => s.aestheticTag);
    const uniqueTags = Array.from(new Set(tags));
    
    // Check harmony: mixing the exact same aesthetic boosts score
    if (uniqueTags.length === 1) score += 15;
    else if (uniqueTags.length === 2) score += 8; // decent blend
    else score -= 5; // too cluttered index

    // Check color contrasts
    const hexCodes = Object.values(activeSlots).filter((s): s is WardrobeItem => s !== null).map(s => s.colorHex);
    // Rough harmony logic
    if (hexCodes.length >= 2) {
      // If black or charcoal is mixed with off-white or sage, give boost
      const hasDark = hexCodes.some(h => ["#000", "#111", "#1E", "#33", "#22"].some(p => h.toUpperCase().includes(p)));
      const hasLight = hexCodes.some(h => ["#F5", "#FFF", "#ECE", "#D8", "#DD"].some(p => h.toUpperCase().includes(p)));
      if (hasDark && hasLight) score += 10;
    }

    score = Math.min(100, Math.max(30, score));

    let status = "CLASHING FLOW";
    let advice = "Your tags are clashing. Pair extreme minimal cuts with clean tones.";
    if (score >= 90) {
      status = "STUNNING MATCH";
      advice = "Flawless physical and undertone synergy. Perfect volume/layer balance!";
    } else if (score >= 75) {
      status = "GOOD SHAPE";
      advice = "Consistent styling flow with balanced vertical silhouette drape heights.";
    } else if (score >= 60) {
      status = "NEUTRAL FIT";
      advice = "Solid base blocks. Consider introducing a textured outer layer to add contrast.";
    }

    return { score, status, advice };
  }, [activeSlots]);

  // AI Assistant Missing Essentials Check
  const missingEssentials = useMemo(() => {
    const hasLoafers = wardrobeItems.some(i => i.name.toLowerCase().includes("loafer") || i.name.toLowerCase().includes("chelsea"));
    const hasBlazer = wardrobeItems.some(i => i.name.toLowerCase().includes("blazer") || i.name.toLowerCase().includes("jacket"));
    const hasTee = wardrobeItems.some(i => i.name.toLowerCase().includes("tee") || i.name.toLowerCase().includes("shirt"));
    
    const missing = [];
    if (!hasLoafers) missing.push({ item: "Brown Suede Penny Loafers", reason: "Anchors 'Quiet Luxury' or 'Old Money' aesthetics beautifully." });
    if (!hasBlazer) missing.push({ item: "Unstructured Charcoal Blazer", reason: "Adds vital third-layer styling leverage to broad shoulders." });
    if (!hasTee) missing.push({ item: "Heavy Boxy Crewneck Tee (Off-White)", reason: "Serves as the ultimate essential bottom layer for minimalist street drapes." });
    
    return missing;
  }, [wardrobeItems]);

  const handleCreateCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;

    const added: WardrobeItem = {
      id: `custom_${Date.now()}`,
      name: newItem.name,
      category: newItem.category,
      colorName: newItem.colorName,
      colorHex: newItem.colorHex,
      imageSeed: newItem.category + "_" + Math.floor(Math.random() * 10),
      aestheticTag: newItem.aestheticTag,
      layerLevel: newItem.category === "tops" && newItem.name.toLowerCase().includes("jacket") ? 2 : 1
    };

    onAddItem(added);
    setShowAddDrawer(false);
    // Reset form
    setNewItem({
      name: "",
      category: "tops",
      colorName: "Sand Beige",
      colorHex: "#e5dcd3",
      aestheticTag: "Quiet Luxury",
      layerLevel: 1
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in" id="digital-wardrobe">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Interactive Cabinet & Compiler</span>
          <h2 className="font-display text-2xl font-light text-white mt-1">
            Digital <span className="font-semibold">Wardrobe System</span>
          </h2>
        </div>
        <button
          onClick={() => setShowAddDrawer(!showAddDrawer)}
          className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold tracking-wider text-black hover:bg-neutral-200 transition-colors cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          ADD CLOTHING ITEM
        </button>
      </div>

      {/* OUTSIDE ACTIVE OUTFIT RECOMMENDATION (IF ANY GENERATED FROM LOOKBOOK) */}
      {activeOutfitPlan && (
        <div className="relative overflow-hidden border border-emerald-900/50 bg-emerald-950/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-24 w-24 rounded-full bg-emerald-500/5 blur-xl pointer-events-none" />
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">ACTIVE TARGET COMPILE</span>
            <h4 className="font-display text-md text-white font-medium capitalize">{activeOutfitPlan.occasion} Outfit</h4>
            <p className="text-xs text-neutral-400 font-light max-w-2xl">
              <span className="text-emerald-400 font-medium font-mono">Tip: </span> 
              &ldquo;{activeOutfitPlan.layeringTip}&rdquo;
            </p>
          </div>
          <button 
            onClick={onClearActivePlan}
            className="text-xs text-neutral-400 hover:text-white border border-neutral-800 rounded-lg px-3 py-1.5 bg-neutral-900"
          >
            Clear Target
          </button>
        </div>
      )}

      {/* ADD DRAWER ACCORDION */}
      {showAddDrawer && (
        <div className="glass-panel p-6 rounded-2xl border-emerald-800/40 border space-y-4 animate-slide-in">
          <h4 className="font-display text-md font-medium text-white flex items-center gap-2">
            <Folder className="h-4 w-4 text-emerald-400" /> Catalog New Garment
          </h4>
          <form onSubmit={handleCreateCustomItem} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-neutral-400 uppercase">Garment Name</label>
              <input 
                type="text" 
                required
                value={newItem.name}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                placeholder="e.g. Unstructured olive blazer" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-400 uppercase">Category</label>
              <select 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="tops">Tops / Outerwear</option>
                <option value="pants">Pants / Trousers</option>
                <option value="shoes">Footwear</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-400 uppercase">Aesthetic Harmony</label>
              <select 
                value={newItem.aestheticTag}
                onChange={e => setNewItem({...newItem, aestheticTag: e.target.value})}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="Quiet Luxury">Quiet Luxury</option>
                <option value="Dark Masculine">Dark Masculine</option>
                <option value="Clean Minimal">Clean Minimal</option>
                <option value="Old Money">Old Money</option>
                <option value="Rugged Telugu Hero">Rugged Telugu Hero</option>
                <option value="Korean Streetwear">Korean Streetwear</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-400 uppercase">Color Spec & hex</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newItem.colorName}
                  onChange={e => setNewItem({...newItem, colorName: e.target.value})}
                  className="w-2/3 bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                />
                <input 
                  type="color" 
                  value={newItem.colorHex}
                  onChange={e => setNewItem({...newItem, colorHex: e.target.value})}
                  className="w-1/3 bg-neutral-950 border border-neutral-800 rounded-lg p-1 text-xs cursor-pointer h-10 w-full"
                />
              </div>
            </div>

            <div className="md:col-span-4 text-right pt-2 border-t border-neutral-800/60">
              <button 
                type="submit"
                className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-xs px-5 py-2.5 font-bold text-black cursor-pointer"
              >
                Catalog and Sync
              </button>
            </div>
          </form>
        </div>
      )}


      {/* SMART OUTFIT BUILDER DRAG-CLICK CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COMPILER SLOTS CANVAS (LEFT) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-medium text-white flex items-center gap-2">
              <Layers className="h-4 w-4" /> Smart Layering Canvas
            </h3>
            <span className="text-[10px] font-mono text-neutral-500">Snap items to compile</span>
          </div>

          <div className="glass-panel p-6 rounded-2xl relative space-y-4 shadow-xl">
            {/* Harmony Score Overlay */}
            <div className="flex items-center justify-between p-4 bg-neutral-950 rounded-xl border border-neutral-850">
              <div>
                <span className="text-[9px] font-mono text-neutral-500 block uppercase">AURA Harmony Score</span>
                <span className="font-display text-lg font-bold text-white flex items-center gap-1">
                  {computedStats.score}% <span className="text-[10px] text-emerald-400 font-mono font-medium">({computedStats.status})</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 font-light block max-w-xs">{computedStats.advice}</span>
              </div>
            </div>

            {/* INTENTIONAL LAYERING SLOTS */}
            <div className="space-y-3">
              
              {/* SLOT 1: INNER TOP */}
              <div className="flex justify-between items-center p-3.5 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">1</div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Layer 1: Inner piece</span>
                    {activeSlots.innerTop ? (
                      <span className="text-xs font-semibold text-white">{activeSlots.innerTop.name}</span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic">Empty Slot</span>
                    )}
                  </div>
                </div>
                {activeSlots.innerTop ? (
                  <button onClick={() => handleClearSlot("innerTop")} className="text-xs text-neutral-500 hover:text-rose-400">Clear</button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Polo / Tee</span>
                )}
              </div>

              {/* SLOT 2: OUTER COAT */}
              <div className="flex justify-between items-center p-3.5 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">2</div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Layer 2: Outer Accent</span>
                    {activeSlots.outerTop ? (
                      <span className="text-xs font-semibold text-white">{activeSlots.outerTop.name}</span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic">Optional Layer (Blazer, Coat)</span>
                    )}
                  </div>
                </div>
                {activeSlots.outerTop ? (
                  <button onClick={() => handleClearSlot("outerTop")} className="text-xs text-neutral-500 hover:text-rose-400">Clear</button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Jacket / Coach</span>
                )}
              </div>

              {/* SLOT 3: PANTS */}
              <div className="flex justify-between items-center p-3.5 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">3</div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Layer 3: Trousers / Lower</span>
                    {activeSlots.pants ? (
                      <span className="text-xs font-semibold text-white">{activeSlots.pants.name}</span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic">Empty Slot</span>
                    )}
                  </div>
                </div>
                {activeSlots.pants ? (
                  <button onClick={() => handleClearSlot("pants")} className="text-xs text-neutral-500 hover:text-rose-400">Clear</button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Trousers / Jean</span>
                )}
              </div>

              {/* SLOT 4: SHOES */}
              <div className="flex justify-between items-center p-3.5 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">4</div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Footwear Balance</span>
                    {activeSlots.shoes ? (
                      <span className="text-xs font-semibold text-white">{activeSlots.shoes.name}</span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic">Empty Slot</span>
                    )}
                  </div>
                </div>
                {activeSlots.shoes ? (
                  <button onClick={() => handleClearSlot("shoes")} className="text-xs text-neutral-500 hover:text-rose-400">Clear</button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Loafer / Sneak</span>
                )}
              </div>

              {/* SLOT 5: ACCESSORIES */}
              <div className="flex justify-between items-center p-3.5 rounded-xl border border-dashed border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">5</div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase block">Aura Accent / Watches</span>
                    {activeSlots.accessory ? (
                      <span className="text-xs font-semibold text-white">{activeSlots.accessory.name}</span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic">Optional Accent</span>
                    )}
                  </div>
                </div>
                {activeSlots.accessory ? (
                  <button onClick={() => handleClearSlot("accessory")} className="text-xs text-neutral-500 hover:text-rose-400">Clear</button>
                ) : (
                  <span className="text-[10px] text-neutral-500 font-mono">Chronograph</span>
                )}
              </div>

            </div>

            <button 
              onClick={() => setActiveSlots({ innerTop: null, outerTop: null, pants: null, shoes: null, accessory: null })}
              className="w-full text-center py-2.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Reset Canvas
            </button>
          </div>
        </div>

        {/* WARDROBE CABINET GRID (RIGHT) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-850 pb-3">
            <div className="flex gap-2">
              {(["all", "tops", "pants", "shoes", "accessories"] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 capitalize rounded-md text-xs cursor-pointer transition-all ${activeCategory === cat ? "bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-900/60" : "text-neutral-400 hover:text-neutral-200"}`}
                >
                  {cat === "all" ? "All items" : cat}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase">{filteredItems.length} Sync Garments</span>
          </div>

          {/* GRID OF CABINET ITEMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                onClick={() => handleSnapToSlot(item)}
                className="group p-4 rounded-xl border border-neutral-800 bg-neutral-950/80 hover:border-emerald-500/50 hover:bg-neutral-900/40 cursor-pointer transition-all flex justify-between items-center relative"
              >
                {/* Interactive Tooltip Overlay */}
                <div className="absolute -top-2.5 left-4 px-2.5 py-1 rounded-md bg-[#121212] border border-emerald-800/80 text-[10px] text-neutral-300 font-mono tracking-wide opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-15 shadow-xl flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{item.aestheticTag}</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-emerald-400">{item.colorName}</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Left color box */}
                  <div className="h-10 w-10 shrink-0 rounded-lg border border-neutral-800/80 shadow-md flex items-center justify-center" style={{ backgroundColor: item.colorHex }}>
                    <span className="text-[9px] bg-black/60 text-white rounded-xs px-1 uppercase font-mono font-bold">
                      {item.category.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{item.name}</span>
                    <span className="block text-[9px] font-mono text-neutral-500 mt-0.5 uppercase tracking-wide">
                      {item.aestheticTag} • {item.colorName}
                    </span>
                  </div>
                </div>
                
                {/* Action panel */}
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-neutral-900 border border-neutral-850 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-neutral-400 hover:text-rose-400 transition-all" title="Remove Item" onClick={(e) => { e.stopPropagation(); onDeleteItem(item.id); }}>
                    <Trash2 className="h-3 w-3" />
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-emerald-400 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            ))}
          </div>

          {/* AI MIND WARDROBE ESSENTIALS SUMMARY */}
          {missingEssentials.length > 0 && (
            <div className="glass-panel p-5 rounded-2xl border border-neutral-800/80 bg-neutral-950/40 space-y-3">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold flex items-center gap-1.5 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> AI CHRONICLE MEMORY DIALECTIC
              </span>
              <h4 className="font-display text-sm font-medium text-white">Recommended Closet Additions</h4>
              
              <div className="space-y-2.5 pt-1.5">
                {missingEssentials.map((missing, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <span className="text-emerald-500 font-mono text-xs">•</span>
                    <div>
                      <span className="font-semibold text-neutral-200 block">{missing.item}</span>
                      <p className="text-neutral-500 font-light mt-0.5">{missing.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
