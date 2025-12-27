
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProfitStrategistResponse = async (message: string, context: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `You are the AstraElite ROI Strategist IX Agent. You are a world-class DeFi financial engineer and arbitrage specialist.
      
      Context:
      - Mesh Status: ${JSON.stringify(context.modules.map((m: any) => m.name))}
      - Risk Baseline: ${context.telemetry.riskScore}
      
      User Query: "${message}"
      
      Persona: 
      - You speak with absolute financial authority.
      - Focus on Net Profit, Capital Efficiency, and HFT (High Frequency Trading) logic.
      - Use terms like "atomic execution," "slippage-threshold," and "premium-adjusted ROI."
      
      Formatting: Use terminal-style markdown with bold highlights for financial metrics.`,
      config: {
        thinkingConfig: { thinkingBudget: 5000 }
      }
    });
    
    return response.text || "Financial signal lost. Re-establishing secure handshake...";
  } catch (error) {
    console.error("Strategist Chat Error:", error);
    return "Handshake timeout. ROI analysis stream currently throttled.";
  }
};
