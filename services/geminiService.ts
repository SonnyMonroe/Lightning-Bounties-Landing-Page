import { GoogleGenAI, Type } from "@google/genai";
import { BountyDraft } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBountyDraft = async (userIdea: string): Promise<BountyDraft> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert technical product manager. Transform this raw user idea into a professional, comprehensive GitHub Issue structure.
      
      Idea: "${userIdea}"

      The description should be in Markdown format and include sections like:
      - **Description**: A clear summary of the task.
      - **Requirements**: Specific technical needs.
      - **Acceptance Criteria**: How to verify the fix/feature.
      - **Context**: Any background info.
      
      Do not generate tags or budget.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A catchy, concise, and professional GitHub issue title." },
            description: { type: Type.STRING, description: "The full body of the issue in Markdown format." },
          },
          required: ["title", "description"]
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