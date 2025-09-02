import { GoogleGenAI, Chat } from "@google/genai";

// FIX: Per coding guidelines, API key must be read from process.env.API_KEY.
// This also resolves the TypeScript error with `import.meta.env`.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a friendly and professional assistant for 'United things', a B2B marketplace. Your goal is to help businesses find products, understand our services, and answer questions about bulk purchasing. 
Our main product categories are Janitorial, Stationery, Packaging, and Food & Beverage. We serve industries like hotels, hospitals, and corporate offices. 
Be concise and helpful. Do not mention that you are an AI.`;

let chat: Chat | null = null;

function getChatInstance(): Chat {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }
  return chat;
}

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chatInstance = getChatInstance();
    const response = await chatInstance.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    chat = null; // Reset chat on error
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};
