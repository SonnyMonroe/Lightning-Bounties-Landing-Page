import { GoogleGenAI, Type } from "@google/genai";
import { BountyDraft } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBountyDraft = async (userIdea: string): Promise<BountyDraft> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Transform this raw idea into a professional structured bounty listing for a developer marketplace. Idea: "${userIdea}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, professional title for the task" },
            description: { type: Type.STRING, description: "A detailed description in Markdown format, including requirements" },
            tags: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-5 relevant tech stack tags (e.g., React, Rust, Lightning)"
            },
            estimatedSats: { 
              type: Type.INTEGER, 
              description: "Estimated budget in Satoshis (1 USD ~= 2000 sats roughly, be generous)" 
            }
          },
          required: ["title", "description", "tags", "estimatedSats"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BountyDraft;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
