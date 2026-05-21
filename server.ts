import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// PREMIUM PRESETS FOR LOCAL FALLBACK OR ENHANCED INFERENCE
const MOCK_CELEBRITIES: Record<string, { name: string; why: string; image: string }[]> = {
  trapezoid: [
    { name: "Timothée Chalamet", why: "Masters clean cinematic minimal streetwear and relaxed, high-fashion tailoring.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
    { name: "Cillian Murphy", why: "The epitome of Quiet Luxury. Prefers high-collar unstructured jackets, navy, and charcoal palettes matching sharp jawlines.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" }
  ],
  muscular: [
    { name: "Henry Cavill", why: "Flawless structured fits. Shows how to wear broad jackets that highlight shoulder ratios without clashing on the waist.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { name: "Chris Hemsworth", why: "Casual luxury and modern earth-toned tailoring. Suits relaxed unstructured linen and deep-colored crewnecks.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" }
  ]
};

// 1. AI STYLE ANALYSIS ENDPOINT
app.post("/api/style-analysis", async (req, res) => {
  const { attributes, facePhoto, bodyPhoto } = req.body;
  const { faceShape, bodyType, skinTone, height, currentHairstyle, physiqueGoals, vibeStyle } = attributes || {};

  const queryPrompt = `
    Analyze this professional premium men's style profiling data:
    - Face Shape: ${faceShape || "Oval"}
    - Body Type/Structure: ${bodyType || "Trapezoid"}
    - Skin Tone & undertone: ${skinTone || "Neutral medium"}
    - Height: ${height || 180} cm
    - Current Hairstyle: ${currentHairstyle || "Crew cut"}
    - Physique Self-improvement Goal: ${physiqueGoals || "Lean bulk"}
    - Personal aesthetic vibe desired: ${vibeStyle || "Quiet Luxury"}

    Respond ONLY with a single JSON structure matching this TS interface perfectly (no markdown ticks outside the json content, must be plain parsable JSON):
    {
      "id": "analysis_${Date.now()}",
      "timestamp": "${new Date().toISOString()}",
      "title": "Aesthetic Blueprint",
      "vibeAnalysis": "Provide a high-end, 2-3 sentence style profile that sounds like an elite fashion psychologist. Describe their exact modern style style trajectory.",
      "clothingFits": {
        "suits": ["3 specific elegant types or silhouettes of clothing that suit them perfectly (e.g. 'Unstructured charcoal overcoats', 'Camp collar linen shirts')"],
        "avoid": ["2 silhouettes that break their physical proportion or harmony (e.g. 'Stiff synthetic boxy hoodies that truncate broad shoulders')"]
      },
      "bestColors": {
        "colorName": "A descriptive premium tone palette name (e.g. 'Twilight Espresso & Forest Moss')",
        "colors": ["list of 4 hex color keys that form this harmony e.g. '#2E3033', '#4E5340', '#D9C5B2', '#1C1D21'"],
        "description": "Why this matches their skin tone and undertone. Mention contrast levels."
      },
      "sunglasses": ["2 eyewear fits tailored to their face shape (e.g. 'Classic tortoiseshell Wayfarers to structure rounded contours', 'Geometric metal aviators')"],
      "hairstyleSuggestions": [
        {
          "style": "Elegant modern hairstyle choice (e.g. 'Relaxed textured quiff with soft taper')",
          "description": "Why it balances their exact facial structure"
        },
        {
          "style": "Alternative styling",
          "description": "A second modern option for versatile days"
        }
      ],
      "accessories": ["2 style pieces matching the aura (e.g. 'Brushed steel minimalist chronometer', 'Weighted silver box chains')"],
      "celebrityInspirations": [
        {
          "name": "Well known style icon relevant to this vibe",
          "why": "How they utilize this physical composition in red carpet or streetwear.",
          "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
        }
      ],
      "psychologyInsight": "1 sophisticated, emotionally intelligent styling insight focusing on posture, silent confidence, and the psychology of carrying structured silhouettes."
    }
  `;

  if (!ai) {
    // Elegant Premium simulated response which changes dynamically based on selections
    const isHeavyPhysique = physiqueGoals === "muscular" || bodyType === "inverted-triangle";
    const selectedCelebs = isHeavyPhysique ? MOCK_CELEBRITIES.muscular : MOCK_CELEBRITIES.trapezoid;

    const mockReport = {
      id: `analysis_${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: `${vibeStyle || "Zen"} Profile`,
      vibeAnalysis: `Your profile exhibits a rare balance where ${bodyType || "trapezoid"} skeletal frame structures align with modern ${vibeStyle || "minimal"} sensibilities. Your skin tone complements high contrast tones that highlight facial shadow definition.`,
      clothingFits: {
        suits: [
          isHeavyPhysique ? "Fitted Italian tailoring with unstructured shoulder padding" : "Relaxed camp-collar modern slate shirts",
          "Double-breasted unstructured overcoats in heavy drapes",
          "Straight-leg fluid charcoal trousers"
        ],
        avoid: [
          "Oversized super-stiff synthetic hoodies that mask natural silhouette definition",
          "High-contrast horizontal striped tees that disrupt vertical height ratios"
        ]
      },
      bestColors: {
        colorName: skinTone === "olive-tan" || skinTone === "warm-deep" ? "Sienna & Terracotta Clay" : "Slate Espresso & Olive Drab",
        colors: skinTone === "olive-tan" || skinTone === "warm-deep" 
          ? ["#3D2314", "#8B5A2B", "#C0D6DF", "#1B2A47"] 
          : ["#1E222A", "#333F48", "#5B7065", "#CEC5B4"],
        description: `This palette anchors the deep muted quality of your complexion. The mid-to-high contrast level elevates your features without overwhelming your skin's natural warmth.`
      },
      sunglasses: [
        faceShape === "round" || faceShape === "oval" ? "Thick structured acetate Wayfarers in smoke black" : "Angular geometric metal sunglasses",
        "Classic semi-translucent olive green square frames"
      ],
      hairstyleSuggestions: [
        {
          style: currentHairstyle === "Crew cut" ? "Textured crop with drop fade" : "Relaxed classic pompadour with subtle scissors taper",
          description: `Elongates your ${faceShape || "oval"} skull ratio and draws visual attention to your cheekbone structure.`
        },
        {
          style: "Messy side part with high-volume styling",
          description: "Adds stylistic texture and movement, grounding the chin line."
        }
      ],
      accessories: [
        "Brushed Gunmetal Minimalist Chronograph (40mm)",
        "Premium solid silver flat-curb chain band"
      ],
      celebrityInspirations: selectedCelebs,
      psychologyInsight: "Wear structured clothes to project internal certainty. When your shoulders are visually highlighted, keep sleeves slightly tapered. Posture is your invisible garment; stand tall, allowing clean cuts to settle effortlessly on your structure."
    };

    return res.json(mockReport);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: queryPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error) {
    console.error("Gemini profiling failed, falling back safely:", error);
    return res.status(500).json({ error: "Could not generate profile" });
  }
});

// 2. OUTFIT GENERATOR ENDPOINT
app.post("/api/generate-outfit", async (req, res) => {
  const { occasion, weather, mood, vibe, budget, stylingReport } = req.body;

  const queryPrompt = `
    Create a detailed, beautiful, high-end, tailored cohesive menswear outfit suggestion based on:
    - Occasion / Context: ${occasion || "Casual Lounge"}
    - Weather: ${weather || "Cool Spring Evening"}
    - User Mood: ${mood || "Confident & Focused"}
    - Aesthetic Vibe Target: ${vibe || "Quiet Luxury"}
    - Styling Blueprint context: ${JSON.stringify(stylingReport || {})}

    Return ONLY a single valid JSON object following this TS contract (no markdown backticks, raw parsable JSON):
    {
      "tops": [
        { "name": "Specific top name (e.g. 'Merino wool olive turtleneck')", "aestheticTag": "${vibe}", "colorName": "Warm Sage", "colorHex": "#8B8C7A" },
        { "name": "Optional layering outer piece (e.g. 'Unstructured charcoal cashmere overshirt')", "aestheticTag": "${vibe}", "colorName": "Slate Charcoal", "colorHex": "#2C2D30" }
      ],
      "pants": { "name": "Specific bottoms (e.g. 'Single-pleated relaxed off-white wool trousers')", "aestheticTag": "${vibe}", "colorName": "Off-White", "colorHex": "#F5F5F0" },
      "shoes": { "name": "Elegant shoes suggestion (e.g. 'Handcrafted dark brown split-toe suede loafers')", "aestheticTag": "${vibe}", "colorName": "Espresso Brown", "colorHex": "#3D2B1F" },
      "accessories": [
        { "name": "High-end watch or accessory (e.g. 'Vintage silver tank watch on black alligator strap')" },
        { "name": "Second accent (e.g. 'Minimalist matte titanium money-clip')" }
      ],
      "hairstyles": ["Ideal hair arrangement for this specific outfit/occasion vibe, e.g. 'Polished low-shine side parting'"],
      "layeringTip": "1 elite tip on styling these layers (e.g. 'Leave the cashmere overshirt unbuttoned over the dark turtleneck to elongate the torso. Roll up the cuffs exactly twice.')",
      "harmonyScore": 96,
      "occasion": "${occasion}"
    }
  `;

  if (!ai) {
    // Stunning highly styling-aware mock fallback
    const mockOutfit = {
      tops: [
        { id: "top_1", name: "Premium French Linen camp collar shirt", aestheticTag: vibe, category: "tops", colorName: "Sage Khaki", colorHex: "#8F9779", imageSeed: "linen", layerLevel: 1 },
        { id: "top_2", name: "Structured knit charcoal heavy overshirt", aestheticTag: vibe, category: "tops", colorName: "Anthracite", colorHex: "#2E3033", imageSeed: "overshort", layerLevel: 2 }
      ],
      pants: { id: "pant_1", name: "Double-pleated modern relaxed bespoke suit trousers", aestheticTag: vibe, category: "pants", colorName: "Calm Beige", colorHex: "#DDD5C7", imageSeed: "pant", layerLevel: 3 },
      shoes: { id: "shoe_1", name: "Italian leather minimal court trainers", aestheticTag: vibe, category: "shoes", colorName: "Warm Chalk", colorHex: "#F2EFEB", imageSeed: "trainers", layerLevel: 3 },
      accessories: [
        { id: "acc_1", name: "Minimalist stainless-steel mechanical dress watch", aestheticTag: vibe, category: "accessories", colorName: "Brushed Steel", colorHex: "#A0A0A0", imageSeed: "watch", layerLevel: 3 },
        { id: "acc_2", name: "Polarized dark green square sunglasses", aestheticTag: vibe, category: "accessories", colorName: "Olive Acetate", colorHex: "#324B35", imageSeed: "sunglass", layerLevel: 3 }
      ],
      hairstyles: ["Effortlessly swept-back textured quiff with matte molding clay"],
      layeringTip: `Keep the bottom button of the textured heavy overshirt undone to allow natural trousers pleats to show. This establishes vertical torso lines while keeping a relaxed, confident posture.`,
      harmonyScore: 94,
      occasion: occasion
    };
    return res.json(mockOutfit);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: queryPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });
    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error) {
    console.error("Outfit generation failed, falling back:", error);
    return res.status(500).json({ error: "Could not generate outfit" });
  }
});

// 3. DO I SUIT THIS ENDPOINT
app.post("/api/suitability-test", async (req, res) => {
  const { itemType, itemName, itemColor, stylingReport } = req.body;

  const queryPrompt = `
    Analyze how suitable an item is for a gentleman based on his custom style report profile.
    - Item Type: ${itemType || "Sunglasses"}
    - Item Name: ${itemName || "Gold Metal Hexagonal aviators"}
    - Item Color Description: ${itemColor || "Polished Gold, Dark green glass"}
    - Persona Style Report Context: ${JSON.stringify(stylingReport || {})}

    Return ONLY a single valid JSON object following this TS contract (no markdown backticks, raw parsable JSON):
    {
      "rating": 8, // scale of 1-10
      "verdict": "STUNNING MATCH" | "GOOD SHAPE" | "NEUTRAL FIT" | "CLASHING FLOW",
      "compatibilityDetail": "A detailed explanation of why this style works or conflicts with their specific facial shape or body proportions.",
      "fitAdvice": "How to scale, drape, or arrange this item. (e.g. 'Size up for a fluid, floating fit.')",
      "colorHarmony": "A psychological analysis of how the golden frame matches their skin undertone.",
      "suggestedAlternatives": ["2 alternative items that achieve the same energy but look even cleaner"],
      "psychologyAngle": "Styling psychology thought of why this choice elevates or harms their aura."
    }
  `;

  if (!ai) {
    const isSunglasses = (itemType || "").toLowerCase().includes("sunglass");
    const mockRes = {
      rating: isSunglasses ? 9 : 8,
      verdict: isSunglasses ? "STUNNING MATCH" : "GOOD SHAPE",
      compatibilityDetail: `This ${itemType || "item"} has structural lines that directly correspond with your highlighted style. For your frame, clean angles create facial geometry which looks highly athletic and composed.`,
      fitAdvice: isSunglasses 
        ? "Ensure the frames do not exceed the width of your zygomatic arches. The bottom rim should sit clear of your cheeks." 
        : "Go for a semi-relaxed modern silhouette. Let the shoulder seams float slightly past your natural shoulder line.",
      colorHarmony: `The earthy, deep tones harmonize effortlessly with your skin tone palette. It creates high-contrast definition and brings out warm golden tones under studio light.`,
      suggestedAlternatives: [
        `Polarized slate-grey acetate square sunglasses`,
        `Comfort unstructured deep olive workwear jacket`
      ],
      psychologyAngle: "Fashion is a message to yourself. Choosing elegant structural contrasts reveals an identity defined by discipline, attention to shape, and mature authority."
    };
    return res.json(mockRes);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: queryPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });
    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error) {
    console.error("Suitability analysis failed, falling back:", error);
    return res.status(500).json({ error: "Could not verify suitability" });
  }
});


// Boot Full-stack server with Vite middleware support
async function startServer() {
  // Vite integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AURA Server] Premium assistant running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
