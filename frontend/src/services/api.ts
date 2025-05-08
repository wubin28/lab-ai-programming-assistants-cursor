// API service for interacting with the backend

const API_BASE_URL = 'http://localhost:5001/api';

export interface OptimizePromptRequest {
  prompt: string;
  purpose?: string;
  systemPrompt?: string;
}

export interface OptimizePromptResponse {
  optimizedPrompt: string;
  error?: string;
}

export const optimizePrompt = async (data: OptimizePromptRequest): Promise<OptimizePromptResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/prompt/optimize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to optimize prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('API Error:', error);
    return {
      optimizedPrompt: '',
      error: error.message || 'DeepSeek did not respond'
    };
  }
}; 