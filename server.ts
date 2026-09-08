import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn("Could not initialize GoogleGenAI client:", e);
    }
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Crop benchmark reference data for intelligent estimation
interface BenchmarkData {
  baseMandi: number;
  expectedMin: number;
  expectedMax: number;
  demand: "High" | "Moderate" | "Surging" | "Stable";
  retailPrice: number;
  shelfLifeDays: number;
  primaryClusters: string[];
}

const CROP_BENCHMARKS: Record<string, BenchmarkData> = {
  tomato: { baseMandi: 28, expectedMin: 30, expectedMax: 33, demand: "High", retailPrice: 42, shelfLifeDays: 5, primaryClusters: ["Kanpur", "Nashik", "Kolar"] },
  potato: { baseMandi: 16, expectedMin: 18, expectedMax: 21, demand: "Stable", retailPrice: 28, shelfLifeDays: 45, primaryClusters: ["Agra", "Farrukhabad", "Hooghly"] },
  onion: { baseMandi: 24, expectedMin: 27, expectedMax: 30, demand: "Surging", retailPrice: 38, shelfLifeDays: 30, primaryClusters: ["Nashik", "Lasalgaon", "Pune"] },
  wheat: { baseMandi: 26, expectedMin: 28, expectedMax: 32, demand: "High", retailPrice: 40, shelfLifeDays: 180, primaryClusters: ["Ludhiana", "Karnal", "Indore"] },
  rice: { baseMandi: 34, expectedMin: 38, expectedMax: 44, demand: "Stable", retailPrice: 58, shelfLifeDays: 180, primaryClusters: ["Burdwan", "Karnal", "Thanjavur"] },
  chilli: { baseMandi: 48, expectedMin: 55, expectedMax: 62, demand: "High", retailPrice: 85, shelfLifeDays: 10, primaryClusters: ["Guntur", "Warangal", "Belgaum"] },
  mango: { baseMandi: 65, expectedMin: 75, expectedMax: 90, demand: "Surging", retailPrice: 130, shelfLifeDays: 7, primaryClusters: ["Ratnagiri", "Lucknow", "Malda"] },
  apple: { baseMandi: 85, expectedMin: 98, expectedMax: 115, demand: "High", retailPrice: 160, shelfLifeDays: 21, primaryClusters: ["Shimla", "Kullu", "Srinagar"] },
  cauliflower: { baseMandi: 20, expectedMin: 24, expectedMax: 27, demand: "Moderate", retailPrice: 38, shelfLifeDays: 6, primaryClusters: ["Sonipat", "Patna", "Ranchi"] },
};

function getBenchmarkForCrop(cropName: string): BenchmarkData {
  const normalized = (cropName || "").toLowerCase().trim();
  for (const [key, val] of Object.entries(CROP_BENCHMARKS)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return val;
    }
  }
  return { baseMandi: 30, expectedMin: 34, expectedMax: 38, demand: "High", retailPrice: 48, shelfLifeDays: 10, primaryClusters: ["National Hub"] };
}

// AI Price Recommendation Endpoint
app.post("/api/ai/price-recommendation", async (req, res) => {
  const { crop, quantity = 500, location = "Kanpur", harvestDate, expectedPrice } = req.body;
  const benchmark = getBenchmarkForCrop(crop);

  let recommendation = {
    crop: crop || "Tomato",
    quantity: Number(quantity) || 500,
    unit: "kg",
    location: location || "Kanpur APMC Hub",
    currentMarketPrice: benchmark.baseMandi,
    recommendedMinPrice: benchmark.expectedMin,
    recommendedMaxPrice: benchmark.expectedMax,
    retailPriceBenchmark: benchmark.retailPrice,
    demandLevel: benchmark.demand,
    confidenceScore: 94,
    optimalSellingWindow: "Next 48 to 72 hours",
    potentialEarningsIncrease: Math.round(((benchmark.expectedMin - benchmark.baseMandi) / benchmark.baseMandi) * 100),
    consumerSavingsPercent: Math.round(((benchmark.retailPrice - benchmark.expectedMax) / benchmark.retailPrice) * 100),
    factors: {
      mandiPriceTrend: `Current regional APMC baseline in ${location} is ₹${benchmark.baseMandi}/kg with an upward weekly momentum of +4.2%.`,
      demandSurge: `Direct consumer and institutional buyer orders for ${crop || "this crop"} in nearby urban belts are currently ${benchmark.demand}.`,
      transportOptimization: `Direct dispatch within a 65 km radius cuts ₹3.5/kg in multi-tier loading, unloading, and transit fees.`,
      historicalTrends: `Historical price records indicate strong procurement interest over the next 14 days before harvest volume peaks.`,
      spoilageRisk: `Perishability index is moderate; fast direct checkout mitigates the standard 18% post-harvest cold chain loss.`
    },
    buyerMatching: {
      activeBuyersCount: 18,
      verifiedRestaurants: 6,
      residentialSocieties: 9,
      fpoPartners: 3,
      topBuyerQuote: `₹${benchmark.expectedMax}/kg for bulk instant pickup`
    },
    aiSummary: `By bypassing local village aggregators and commission agents, DirectFarm guarantees you ₹${benchmark.expectedMin}–${benchmark.expectedMax}/kg compared to Mandi's ₹${benchmark.baseMandi}/kg, while consumers pay 20%+ less than supermarket rates.`
  };

  // If Gemini API is available, enhance with real LLM rationale
  const ai = getAIClient();
  if (ai) {
    try {
      const prompt = `You are DirectFarm's expert agricultural economist AI. 
Analyze pricing for this crop listing:
Crop: ${crop}
Quantity: ${quantity} kg
Location: ${location}
Mandi baseline: ₹${benchmark.baseMandi}/kg
Harvest date: ${harvestDate || "Today"}
User expected price: ₹${expectedPrice || "unspecified"}

Return a concise JSON object with:
{
  "recommendedMinPrice": number,
  "recommendedMaxPrice": number,
  "demandLevel": "High" | "Surging" | "Moderate",
  "confidenceScore": number (85-98),
  "mandiPriceTrend": "one concise sentence",
  "demandSurge": "one concise sentence",
  "transportOptimization": "one concise sentence",
  "aiSummary": "two crisp sentences explaining direct farmer benefit and transparent buyer savings"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        recommendation.recommendedMinPrice = parsed.recommendedMinPrice || recommendation.recommendedMinPrice;
        recommendation.recommendedMaxPrice = parsed.recommendedMaxPrice || recommendation.recommendedMaxPrice;
        recommendation.demandLevel = parsed.demandLevel || recommendation.demandLevel;
        recommendation.confidenceScore = parsed.confidenceScore || recommendation.confidenceScore;
        if (parsed.mandiPriceTrend) recommendation.factors.mandiPriceTrend = parsed.mandiPriceTrend;
        if (parsed.demandSurge) recommendation.factors.demandSurge = parsed.demandSurge;
        if (parsed.transportOptimization) recommendation.factors.transportOptimization = parsed.transportOptimization;
        if (parsed.aiSummary) recommendation.aiSummary = parsed.aiSummary;
      }
    } catch (err) {
      console.warn("Gemini generation fallback used:", err);
    }
  }

  res.json(recommendation);
});

// AI Market Insights & Supply Chain analytics
app.post("/api/ai/market-insights", async (req, res) => {
  const { region = "Uttar Pradesh / North Hub" } = req.body;
  res.json({
    region,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    highDemandCrops: [
      { crop: "Tomato (Hybrid)", demandScore: 96, priceChange: "+12%", avgMandi: 28, directPrice: 32 },
      { crop: "Onion (Nashik Red)", demandScore: 92, priceChange: "+8%", avgMandi: 24, directPrice: 28 },
      { crop: "Potato (Kufri Jyoti)", demandScore: 84, priceChange: "+3%", avgMandi: 16, directPrice: 20 },
      { crop: "Green Chilli (G4)", demandScore: 89, priceChange: "+15%", avgMandi: 48, directPrice: 58 },
      { crop: "Sharbati Wheat", demandScore: 91, priceChange: "+5%", avgMandi: 26, directPrice: 31 }
    ],
    supplyChainMetrics: {
      averageIntermediariesEliminated: 3.4,
      farmerIncomeLiftPercent: 38.5,
      consumerPriceReductionPercent: 24.2,
      farmToForkHours: 14,
      traditionalSupplyDays: 4.8,
      transitFoodWasteReductionPercent: 62
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DirectFarm Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
