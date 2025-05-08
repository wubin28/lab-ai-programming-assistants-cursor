// Request and response types for the DeepSeek API integration

export interface OptimizePromptRequest {
  purpose?: string;
  prompt: string;
  systemPrompt?: string;
}

export interface OptimizePromptResponse {
  optimizedPrompt: string;
  error?: string;
}

export interface DeepSeekError {
  statusCode: number;
  message: string;
  error: string;
} 