# Promptyoo Backend

This is the backend service for the Promptyoo application, which provides an API for optimizing prompts using the DeepSeek API.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5001
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_API_BASE_URL=https://api.deepseek.com
```

3. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Optimize Prompt
- **URL**: `/api/prompt/optimize`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "prompt": "Your prompt to optimize",
    "systemPrompt": "Optional system prompt to guide the optimization"
  }
  ```
- **Response**:
  ```json
  {
    "optimizedPrompt": "The optimized prompt from DeepSeek"
  }
  ```

### Health Check
- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ``` 