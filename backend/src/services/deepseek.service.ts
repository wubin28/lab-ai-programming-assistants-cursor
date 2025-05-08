import OpenAI from "openai";
import { OptimizePromptRequest } from "../types/api";
import dotenv from "dotenv";

dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_BASE_URL = process.env.DEEPSEEK_API_BASE_URL || 'https://api.deepseek.com';

if (!DEEPSEEK_API_KEY) {
  console.error("DEEPSEEK_API_KEY is not set in environment variables");
  process.exit(1);
}

// Initialize OpenAI client with DeepSeek configuration
const openai = new OpenAI({
  baseURL: DEEPSEEK_API_BASE_URL,
  apiKey: DEEPSEEK_API_KEY,
});

export class DeepSeekService {
  /**
   * Optimize a prompt using DeepSeek API
   */
  async optimizePrompt(data: OptimizePromptRequest): Promise<string> {
    try {
      const systemMessage = data.systemPrompt || "You are a helpful assistant.";
      
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: data.prompt }
        ],
        model: "deepseek-chat",
      });

      return completion.choices[0].message.content || "No response from DeepSeek";
    } catch (error) {
      console.error("Error calling DeepSeek API:", error);
      throw error;
    }
  }
}

export default new DeepSeekService(); 