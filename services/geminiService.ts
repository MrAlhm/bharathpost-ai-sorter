
import { GoogleGenAI, Type } from "@google/genai";
import { SortingResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeEnvelope(base64Image: string): Promise<SortingResult> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze this envelope image containing Indian postal addresses.
    1. Extract all visible text accurately, especially the destination address.
    2. Identify and extract the valid 6-digit Indian PIN code.
    3. If multiple numbers exist, select the most probable destination PIN code (usually at the end of the address).
    4. Provide a confidence level for the extraction.
    5. Ignore postage stamps, seals, and logos.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          extracted_text: {
            type: Type.STRING,
            description: "The full extracted address text from the envelope."
          },
          pin_code: {
            type: Type.STRING,
            description: "The 6-digit Indian PIN code identified."
          },
          confidence: {
            type: Type.STRING,
            enum: ["High", "Medium", "Low"],
            description: "The confidence level of the extraction."
          }
        },
        required: ["extracted_text", "pin_code", "confidence"]
      }
    }
  });

  const result = JSON.parse(response.text || '{}');
  return {
    ...result,
    timestamp: Date.now()
  };
}
