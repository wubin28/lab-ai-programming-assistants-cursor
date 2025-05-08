import { Request, Response } from 'express';
import deepseekService from '../services/deepseek.service';
import { OptimizePromptRequest } from '../types/api';

export class PromptController {
  /**
   * Handle the request to optimize a prompt
   */
  async optimizePrompt(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as OptimizePromptRequest;
      
      if (!data.prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }
      
      const optimizedPrompt = await deepseekService.optimizePrompt(data);
      
      res.status(200).json({ optimizedPrompt });
    } catch (error: any) {
      console.error('Error in prompt optimization:', error);
      
      const statusCode = error.status || 500;
      const message = error.message || 'An error occurred while optimizing the prompt';
      
      res.status(statusCode).json({
        error: message,
        optimizedPrompt: null
      });
    }
  }

  /**
   * Handle streaming request to optimize a prompt
   */
  async streamOptimizePrompt(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as OptimizePromptRequest;
      
      if (!data.prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }
      
      console.log('Starting stream optimization for prompt');
      await deepseekService.optimizePromptStream(data, res);
      // Note: The response is handled within the service
      
    } catch (error: any) {
      console.error('Error in stream prompt optimization:', error);
      
      // If headers haven't been sent yet, send a JSON error
      if (!res.headersSent) {
        const statusCode = error.status || 500;
        const message = error.message || 'An error occurred while streaming the prompt optimization';
        
        res.status(statusCode).json({
          error: message,
          optimizedPrompt: null
        });
      }
    }
  }
}

export default new PromptController(); 