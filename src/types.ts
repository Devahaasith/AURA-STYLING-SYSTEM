export interface PhysicalAttributes {
  faceShape: "oval" | "square" | "round" | "diamond" | "oblong";
  bodyType: "trapezoid" | "inverted-triangle" | "rectangle" | "triangle" | "oval-body";
  skinTone: "warm-pale" | "neutral-medium" | "cool-fair" | "olive-tan" | "cool-dark" | "warm-deep";
  height: number; // in cm
  currentHairstyle: string;
  physiqueGoals: "lean-bulk" | "muscular" | "slim-fit" | "powerlifter" | "toning";
  vibeStyle: string; // e.g., "Minimalist", "Cinematic", "Streetwear"
}

export interface StylingReport {
  id: string;
  timestamp: string;
  title: string;
  vibeAnalysis: string;
  clothingFits: {
    suits: string[];
    avoid: string[];
  };
  bestColors: {
    colorName: string;
    colors: string[]; // hex codes for palette
    description: string;
  };
  sunglasses: string[];
  hairstyleSuggestions: {
    style: string;
    description: string;
  }[];
  accessories: string[];
  celebrityInspirations: {
    name: string;
    why: string;
    image: string;
  }[];
  psychologyInsight: string;
}

export interface AestheticIdentity {
  id: string;
  name: string;
  description: string;
  tagline: string;
  vibeExplanation: string;
  colors: { name: string; hex: string }[];
  hairstyles: string[];
  accessories: string[];
  recommendedFits: string[];
  footwear: string[];
  inspirationQuote: string;
  bgGradient: string; // Tailwind gradient classes
  heroImage: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  category: "tops" | "pants" | "shoes" | "accessories";
  colorName: string;
  colorHex: string;
  imageSeed: string; // String identifier for picsum/placeholder rendering
  aestheticTag: string; // e.g., "Quiet Luxury", "Dark Masculine"
  layerLevel: 1 | 2 | 3; // for outfit generator layering check (1: inner top/shirt, 2: outer/jacket, 3: pants/footwear)
}

export interface OutfitSuggestion {
  tops: WardrobeItem[];
  pants: WardrobeItem;
  shoes: WardrobeItem;
  accessories: WardrobeItem[];
  hairstyles: string[];
  layeringTip: string;
  harmonyScore: number; // 0 - 100
  occasion: string;
}

export interface SuitabilityResponse {
  rating: number; // 1-10
  verdict: "STUNNING MATCH" | "GOOD SHAPE" | "NEUTRAL FIT" | "CLASHING FLOW";
  compatibilityDetail: string;
  fitAdvice: string;
  colorHarmony: string;
  suggestedAlternatives: string[];
  psychologyAngle: string;
}

export interface PhysiqueLog {
  id: string;
  date: string;
  weight: number; // kg
  waist?: number; // cm
  chest?: number; // cm
  notes: string;
}
