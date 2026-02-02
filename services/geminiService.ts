
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize GoogleGenAI with the API key from process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    }
  });
  return response.text;
};

export const chatWithGemini = async (history: { role: 'user' | 'model', message: string }[], newMessage: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    history: history.map(h => ({ role: h.role, parts: [{ text: h.message }] })),
    config: {
      systemInstruction: 'You are the intelligent concierge for Bliss III Admin Office. Your goal is to help residents with queries about Bliss III community services, maintenance, and administrative procedures. Be polite, community-focused, and efficient.',
    }
  });

  const response = await chat.sendMessage({ message: newMessage });
  return response.text;
};

export const extractReceiptData = async (base64Image: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: 'Extract total amount, date, and vendor from this receipt. Return as JSON.' }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          amount: { type: Type.NUMBER },
          date: { type: Type.STRING },
          vendor: { type: Type.STRING },
        },
        required: ['amount', 'date', 'vendor']
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
