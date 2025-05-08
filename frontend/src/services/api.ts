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

export interface StreamChunk {
  chunk: string;
  complete: boolean;
  fullResponse?: string;
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

export const optimizePromptStream = (
  data: OptimizePromptRequest,
  onChunk: (chunk: StreamChunk) => void
): { abort: () => void } => {
  const controller = new AbortController();
  const { signal } = controller;

  (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/prompt/optimize/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to optimize prompt');
      }

      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }
        
        // Decode the chunk and add it to our buffer
        buffer += decoder.decode(value, { stream: true });
        
        // Process complete SSE messages in the buffer
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ''; // The last line might be incomplete
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5));
              onChunk(data);
              
              if (data.complete || data.error) {
                return;
              }
            } catch (e) {
              console.error('Error parsing SSE message:', e);
            }
          }
        }
      }

      // Process any remaining data in the buffer
      if (buffer.startsWith('data: ')) {
        try {
          const data = JSON.parse(buffer.slice(5));
          onChunk(data);
        } catch (e) {
          console.error('Error parsing final SSE message:', e);
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('API Stream Error:', error);
        onChunk({
          chunk: '',
          complete: true,
          error: error.message || 'DeepSeek streaming failed'
        });
      }
    }
  })();

  return {
    abort: () => controller.abort()
  };
}; 