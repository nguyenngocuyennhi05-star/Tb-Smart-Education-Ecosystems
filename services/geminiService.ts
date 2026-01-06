
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async generateQuiz(topic: string, count: number = 5): Promise<QuizQuestion[]> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a professional educational quiz about "${topic}" with ${count} multiple choice questions. Return as JSON array of objects. Each object should have 'question', 'options' (array of 4 strings), and 'correctAnswer' (index 0-3).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.NUMBER }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text);
    } catch (e) {
      console.error("Failed to parse AI response", e);
      return [];
    }
  },

  async getPersonalizedFeedback(progressData: string): Promise<string> {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the following student performance data, provide a concise, motivational, and highly personalized learning path recommendation: ${progressData}`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "Continue your great work! Keep practicing to improve.";
  }
};
