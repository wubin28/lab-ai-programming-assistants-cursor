import OpenAI from "openai";
import { OptimizePromptRequest } from "../types/api";
import dotenv from "dotenv";
import { Response } from "express";

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
   * Optimize a prompt using DeepSeek API (non-streaming)
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

  /**
   * Optimize a prompt using DeepSeek API with streaming response
   */
  async optimizePromptStream(data: OptimizePromptRequest, res: Response): Promise<void> {
    try {
      const systemMessage = data.systemPrompt || "You are a helpful assistant.";
      
      // Set up SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      // Create streaming request to DeepSeek API
      const stream = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: data.prompt }
        ],
        model: "deepseek-chat",
        stream: true,
      });
      
      let completeResponse = "";
      
      console.log("Stream started");

      // Process each chunk from the stream
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          completeResponse += content;
          console.log(`Chunk received: ${content}`);
          
          // Send the chunk to the client
          res.write(`data: ${JSON.stringify({ chunk: content, complete: false })}\n\n`);
        }
      }
      
      console.log("Stream completed");
      
      // Send completion message
      res.write(`data: ${JSON.stringify({ chunk: "", complete: true, fullResponse: completeResponse })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error streaming from DeepSeek API:", error);
      
      // Send error to client
      res.write(`data: ${JSON.stringify({ error: "Error processing stream", complete: true })}\n\n`);
      res.end();
      
      throw error;
    }
  }
}

export default new DeepSeekService(); 