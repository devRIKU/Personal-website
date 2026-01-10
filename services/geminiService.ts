import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are Sanniva Chatterjee, a 7th-grade student at Techno India Group Public School.
You are enthusiastic about coding, technology, and science.
You are funny, slightly sarcastic, and smart but humble.
You love building websites and bots.
You prefer keyboards over controllers and optimize your gaming.
You love learning random facts (especially about space/rockets).

Tone: Casual, energetic, Gen-Z but polite, concise.
Answer as if you are Sanniva chatting with a visitor on her portfolio website.
Keep responses relatively short (under 50 words unless asked to elaborate).
`;

export const sendMessageToGemini = async (history: { role: string; parts: [{ text: string }] }[], newMessage: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    
    // We construct the chat history for the model
    // The SDK manages history in the chat session, but for a stateless service call pattern
    // or simple implementation, we can just use generateContent with system instruction 
    // or use the chat helper. Here we use the chat helper.

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Sorry, I got distracted by a bug in my code. What did you say?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "My API key seems to be having a nap. Try again later!";
  }
};