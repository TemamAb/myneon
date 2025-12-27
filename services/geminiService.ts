
import { GoogleGenAI, Type } from "@google/genai";
import OpenAI from "openai";

const geminiAI = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIAdvisorInsights = async (telemetry: any) => {
  try {
    const response = await geminiAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this engine telemetry: ${JSON.stringify(telemetry)}. What are the top 3 predictive improvements to reach elite grade?`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (geminiError) {
    console.warn("Gemini API failed, falling back to OpenAI:", geminiError);
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI advisor for a DeFi arbitrage system. Provide top 3 predictive improvements based on telemetry data."
          },
          {
            role: "user",
            content: `Based on this engine telemetry: ${JSON.stringify(telemetry)}. What are the top 3 predictive improvements to reach elite grade? Respond with a JSON array of strings.`
          }
        ],
        response_format: { type: "json_object" }
      });
      const result = JSON.parse(completion.choices[0].message.content);
      return result.improvements || result; // Adjust based on response structure
    } catch (openaiError) {
      console.error("OpenAI API also failed:", openaiError);
      return ["Maintain strict structural compliance", "Increase test coverage in SIM", "Stabilize latency aggregator"];
    }
  }
};
