import { AestheticIdentity, WardrobeItem, StylingReport } from "./types";

// 1. CURATED PREMIUM MENSWEAR AESTHETICS
export const CURATED_AESTHETICS: AestheticIdentity[] = [
  {
    id: "quiet_luxury",
    name: "Quiet Luxury",
    tagline: "Unlabeled masterpiece of texture and drape.",
    description: "The peak of understated confidence. No loud logos—just immaculate fits, fine knitwear, and structured drapery. Built on premium heavy materials, soft tailoring, and deep neutral hues.",
    vibeExplanation: "Speaks soft and slow. Focuses on cashmere, wool, fine linen, and silk-blends. Characterized by tailored jackets, clean-fitting knit polos, pleated trousers, and supple leather loafers.",
    colors: [
      { name: "Cream Cashmere", hex: "#F3EDE2" },
      { name: "Taupe Melange", hex: "#8A7E72" },
      { name: "Navy Navy", hex: "#1D2731" },
      { name: "Charcoal Slate", hex: "#323B44" }
    ],
    hairstyles: [
      "Classic layered scissor cut with low-shine cream",
      "Soft sweep part with taper"
    ],
    accessories: [
      "Vintage gold tank mechanical watch on black crocodile leather",
      "Sartorial silk woven pocket square",
      "Solid platinum thin bands"
    ],
    recommendedFits: [
      "Double-breasted unstructured wool blazer",
      "Fine-gauge merino mock-neck sweater",
      "Single-pleated vintage linen drape trousers"
    ],
    footwear: [
      "Handcrafted unlined suede penny loafers",
      "Glove-leather chelsea boots in espresso brown",
      "Minimalist chalk-colored calfskin trainers"
    ],
    inspirationQuote: "Money talks, wealth whispers. Let precision tailoring carry your silence.",
    bgGradient: "from-amber-950/20 via-neutral-900 to-neutral-950",
    heroImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dark_masculine",
    name: "Dark Masculine",
    tagline: "Architectural shadows, sharp lines, commanding حضور.",
    description: "Imposing, deep-tone visual framework prioritizing hardware, heavy leather, matte black, and structured shoulders. Perfect for evening visual weight.",
    vibeExplanation: "Defined by sharp contrast, architectural cuts, utility detailing, and dark charcoal overlaying deep black base garments. Highly confidence-boosting.",
    colors: [
      { name: "Matte Void Black", hex: "#0E0E10" },
      { name: "Obsidian Slate", hex: "#22252A" },
      { name: "Smoked Crimson", hex: "#3D2424" },
      { name: "Brushed Gunmetal", hex: "#5C6065" }
    ],
    hairstyles: [
      "High-taper textured fringe with texturizing clay",
      "Slick back undercut with low wet shine"
    ],
    accessories: [
      "Oxidized sterling-silver solid signet ring",
      "Heavy combat stainless-steel link bracelet",
      "Matte black acetate rectangular optical glasses"
    ],
    recommendedFits: [
      "Thick lambskin motorcycle jacket or asymmetric utility coat",
      "Premium heavy-ounce combed cotton drop-shoulder tee",
      "Raw selvage black denim jeans in relaxed slim fit"
    ],
    footwear: [
      "Combat-soled polished calfskin boots",
      "Double-strap monk shoes in matte obsidian",
      "Textured triple-black technical runner"
    ],
    inspirationQuote: "Embrace the shadows of visual geometry to cast an imposing, decisive silhouette.",
    bgGradient: "from-neutral-950 via-neutral-900 to-red-950/10",
    heroImage: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "clean_minimal",
    name: "Clean Minimal",
    tagline: "Maximized breathing room, functional block cuts.",
    description: "Scandinavian and Swiss school influence. High negative space, zero clutter, functional fabrics, monochromatic coordination. Focuses heavily on boxy cropped t-shirts and straight cropped pants.",
    vibeExplanation: "The absolute reduction of unnecessary noise. Aesthetic leverage is generated purely from fabric weight, stitch quality, and simple parallel lines.",
    colors: [
      { name: "Chalk White", hex: "#F9F9FB" },
      { name: "Concrete Grey", hex: "#BCBDBF" },
      { name: "Muted Sand", hex: "#E3DFD5" },
      { name: "Asphalt Dark", hex: "#2B2D2F" }
    ],
    hairstyles: [
      "Sharp skin-fade buzz-cut",
      "Modern curtain crop with neat middle part"
    ],
    accessories: [
      "Apple Watch with titanium Link Bracelet",
      "Ultra-thin matte steel neck-wire",
      "Raw canvas flat-fold minimalist carrier"
    ],
    recommendedFits: [
      "Heavyweight dry-hand boxy crop tee (280GSM)",
      "Technical nylon shell popover anorak",
      "Drawstring cropped straight-leg tech trousers"
    ],
    footwear: [
      "Platformed court canvas trainers in off-white",
      "Neoprene technical slide sandals",
      "Minimalist black leather cup-sole shoes"
    ],
    inspirationQuote: "Simplicity is not the absence of clutter, but the presence of clarity.",
    bgGradient: "from-neutral-950 via-neutral-900 to-zinc-900",
    heroImage: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "old_money",
    name: "Old Money",
    tagline: "Heritage prep and coastal leisure styling.",
    description: "Nantucket, Lake Como and Riviera classic look. Relaxed linen shirts, cables, cream chinos, smart blazers, suede caps. Gives off an aura of generational comfort and effortless sport.",
    vibeExplanation: "Casual tailoring meets active leisure. Structured cable knits tied loosely over shoulders, crisp linen button-downs, light pastel palettes balanced by rich leather belts and clean watch faces.",
    colors: [
      { name: "Ivory", hex: "#FAF9F5" },
      { name: "Oxford Blue", hex: "#4C6B8B" },
      { name: "Tennis Club Green", hex: "#1A4329" },
      { name: "Sunwashed Tan", hex: "#DCC39F" }
    ],
    hairstyles: [
      "Classic side part with natural feathering",
      "Medium taper wavy hair with soft pomade"
    ],
    accessories: [
      "Brown woven saddle-leather belt",
      "Polarized tortoiseshell retro clubmaster sunglasses",
      "Gold signet ring with crest"
    ],
    recommendedFits: [
      "Chunky knit cable sweater in heritage ivory",
      "Tailored linen club collar shirt with gold buttons",
      "Slim-tailored stretch cotton field chinos"
    ],
    footwear: [
      "White canvas yacht shoes with rubber deck soles",
      "Tassel loafers in chestnut suede",
      "Traditional English brogues in tanned calfskin"
    ],
    inspirationQuote: "Classics exist because they cannot be improved. Heritage is carried in the posture.",
    bgGradient: "from-green-950/20 via-neutral-900 to-neutral-950",
    heroImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rugged_telugu_hero",
    name: "Rugged Telugu Hero",
    tagline: "Sartorial bravado, heavy fabrics, magnetic aura.",
    description: "Inspired by cinema's iconic alphas. High-octane styling built on rich heavy denims, utility khaki cargo jackets, aviators, dark untamed hairstyles, and linen shirts with rolled sleeves.",
    vibeExplanation: "An unbridled expression of high test confidence. It values robust boots, earthy shades, and open-collar shirts styled with chest posture and commanding charisma.",
    colors: [
      { name: "Raw Ochre", hex: "#A05A2C" },
      { name: "Utility Olive", hex: "#4A5240" },
      { name: "Copper Bronze", hex: "#B87333" },
      { name: "Midnight Charcoal", hex: "#1A1C1E" }
    ],
    hairstyles: [
      "Mane-like heavy waves with disconnected beard",
      "Wavy textured slick quiff with raw sideburns"
    ],
    accessories: [
      "Classic solid gold/bronze pilot aviators",
      "Rugged broad leather cuff watch",
      "Amulet cord or copper hand-forged band"
    ],
    recommendedFits: [
      "Raw linen field shirt in burnt sienna, top 3 buttons open",
      "Tough heavy utility cotton military fatigue shirt jacket",
      "Washed robust cargo denim with knee panel detailing"
    ],
    footwear: [
      "Heavy-duty distressed leather chelsea boots in dark tobacco",
      "Steel-toe engineer utility lace boot",
      "Full grain leather rough loafers"
    ],
    inspirationQuote: "Charisma isn't worn on the sleeve. It's built through raw canvas, unyielding boots, and heavy shoulders.",
    bgGradient: "from-amber-900/10 via-neutral-900 to-neutral-950",
    heroImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "korean_streetwear",
    name: "Korean Streetwear",
    tagline: "Oversized flow, architectural layers.",
    description: "Avant-garde flowing tailoring meeting street culture. Dropped shoulders, super wide trousers, long-sleeve turtlenecks, and high-fashion chunk sneakers.",
    vibeExplanation: "Effortless drapey coordinates. Leverages extreme silhouettes—wide fits that taper beautifully at the ankles and stacked fabrics that suggest creative intelligence.",
    colors: [
      { name: "Pale Alabaster", hex: "#EEEDE8" },
      { name: "Ash Melange", hex: "#A5A6AF" },
      { name: "Charcoal Shadow", hex: "#292A2D" },
      { name: "Earthy Sage", hex: "#626E60" }
    ],
    hairstyles: [
      "Korean two-block haircut with volume perm",
      "Textured dandy crop with soft drop fringe"
    ],
    accessories: [
      "Silver curb block-chain lanyard necklace",
      "Structured soft crescent reporter bag",
      "Thin-frame silver circular readers"
    ],
    recommendedFits: [
      "Super-oversized drop shoulder heavy knit loopback sweater",
      "Boxy cropped double-breast utility trench coat",
      "Extreme wide-leg relaxed skater trousers with drape pools"
    ],
    footwear: [
      "Split-sole chunky minimalist sneaker",
      "Square-toe thick platform leather slip-ons",
      "High top cream canvas legacy sneakers"
    ],
    inspirationQuote: "Contrast the wide drape with sharp grooming to build high-comfort creative authority.",
    bgGradient: "from-blue-950/10 via-neutral-900 to-neutral-950",
    heroImage: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80"
  }
];

// 2. DEFAULT SYSTEM WARDROBE (INITIAL GARMENTS FOR PLUGGING & USER PLAYING)
export const DEFAULT_WARDROBE: WardrobeItem[] = [
  {
    id: "ward_1",
    name: "280GSM Heavy boxy-fit tee",
    category: "tops",
    colorName: "Chalk Cream",
    colorHex: "#ECE9E2",
    imageSeed: "heavy_tee",
    aestheticTag: "Clean Minimal",
    layerLevel: 1
  },
  {
    id: "ward_2",
    name: "Unstructured sand merino wool knit polo",
    category: "tops",
    colorName: "Sand Beige",
    colorHex: "#D8CDBA",
    imageSeed: "polo",
    aestheticTag: "Quiet Luxury",
    layerLevel: 1
  },
  {
    id: "ward_3",
    name: "Perfect lambskin biker jacket",
    category: "tops",
    colorName: "Matte Black",
    colorHex: "#111112",
    imageSeed: "leather_jack",
    aestheticTag: "Dark Masculine",
    layerLevel: 2
  },
  {
    id: "ward_4",
    name: "Single-button knitted charcoal overcoat",
    category: "tops",
    colorName: "Charcoal",
    colorHex: "#35383B",
    imageSeed: "overcoat",
    aestheticTag: "Quiet Luxury",
    layerLevel: 2
  },
  {
    id: "ward_5",
    name: "Double-pleated wool drape trousers",
    category: "pants",
    colorName: "Taupe Slate",
    colorHex: "#6D6864",
    imageSeed: "trouser_pleat",
    aestheticTag: "Quiet Luxury",
    layerLevel: 3
  },
  {
    id: "ward_6",
    name: "Straight technical nylon crop pants",
    category: "pants",
    colorName: "Asphalt Black",
    colorHex: "#1A1A1B",
    imageSeed: "tech_pants",
    aestheticTag: "Clean Minimal",
    layerLevel: 3
  },
  {
    id: "ward_7",
    name: "Handcrafted unlined suede penny loafers",
    category: "shoes",
    colorName: "Snuff Suede Brown",
    colorHex: "#61493B",
    imageSeed: "loafer",
    aestheticTag: "Quiet Luxury",
    layerLevel: 3
  },
  {
    id: "ward_8",
    name: "Triple-black heavy stacked trail runners",
    category: "shoes",
    colorName: "Black Noir",
    colorHex: "#0D0D0E",
    imageSeed: "runners",
    aestheticTag: "Dark Masculine",
    layerLevel: 3
  },
  {
    id: "ward_9",
    name: "Titanium automatic watch with oyster strap",
    category: "accessories",
    colorName: "Polished Silver",
    colorHex: "#C0C0C0",
    imageSeed: "watch_automatic",
    aestheticTag: "Quiet Luxury",
    layerLevel: 3
  },
  {
    id: "ward_10",
    name: "Thick black acetate 50s square sunglasses",
    category: "accessories",
    colorName: "Smoke Black",
    colorHex: "#1C1C1D",
    imageSeed: "acetate_sun",
    aestheticTag: "Dark Masculine",
    layerLevel: 3
  }
];

// 3. SAMPLE STYLING REPORT (FOR OUT OF THE BOX GLOW APPS)
export const DEFAULT_STYLING_REPORT: StylingReport = {
  id: "sample_aura",
  timestamp: new Date().toISOString(),
  title: "Bespoke Aesthetic Blueprint",
  vibeAnalysis: "Your visual profile reflects a compelling fusion of structural symmetry and quiet authority. Your athletic shoulders and diamond facial architecture benefit from clean vertical lines, medium drape weight, and matte neutral shadow layouts.",
  clothingFits: {
    suits: [
      "Structured heavy linen overshirts",
      "Single-pleated high-rise modern trousers",
      "Unstructured tailored grey cashmere blazers"
    ],
    avoid: [
      "Tight spandex crewnecks that truncate natural collarbones",
      "Oversized drop-hem hoodies in bright neon prints"
    ]
  },
  bestColors: {
    colorName: "Slate Espresso & Olive Drab",
    colors: ["#1E222A", "#333F48", "#5B7065", "#CEC5B4"],
    description: "Muted earth tones and graphite grays anchor the cool medium undertones of your skin. This creates high levels of head-turning contrast without overwhelming."
  },
  sunglasses: [
    "Thick structured acetate Wayfarers in smoke black",
    "Minimalist matte silver wire frame hexagon lenses"
  ],
  hairstyleSuggestions: [
    {
      style: "Textured scissor-cut crop with low taper",
      description: "Creates linear flow at your temple line to widen diamond face cheekbone definitions."
    },
    {
      style: "Relaxed classic pompadour with soft scissors partition",
      description: "Adds soft vertical height which highlights balanced jawlines under ambient lighting."
    }
  ],
  accessories: [
    "Minimalist brushed gunmetal metal-link chronograph (40mm)",
    "Solid sterling-silver flat-curb finger ring"
  ],
  celebrityInspirations: [
    {
      name: "Cillian Murphy",
      why: "Masters quiet sophistication and high-collar structured visual layers matching sharp jaw structures.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Henry Cavill",
      why: "The textbook anchor for athletic broad shoulder draping without waist pooling.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    }
  ],
  psychologyInsight: "Styling is communication without vocal effort. When you wear balanced, clean silhouettes, your physical carriage aligns with a silent internal certainty. Standing with solid spine posture allows these high-end cuts to fall beautifully."
};
