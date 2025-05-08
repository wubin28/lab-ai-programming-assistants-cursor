# Promptyoo - AI Prompt Optimization Application

This application helps users optimize their AI prompts using DeepSeek's API.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js Express backend application that communicates with DeepSeek API

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Installation

1. Clone the repository

2. Install dependencies for both frontend and backend
```bash
npm run install:all
```

3. Configure DeepSeek API
   - Create a `.env` file in the `backend/` directory
   - Add your DeepSeek API key:
   ```
   PORT=5001
   DEEPSEEK_API_KEY=your_deepseek_api_key
   DEEPSEEK_API_BASE_URL=https://api.deepseek.com
   ```

### Running the Application

Start both frontend and backend concurrently:
```bash
npm run dev
```

Or run them individually:
```bash
# Frontend only
npm run frontend

# Backend only
npm run backend
```

## Frontend

- The frontend is built with React 18, TypeScript, and Tailwind CSS
- Available at http://localhost:5173

## Backend

- The backend is built with Node.js, Express, and TypeScript
- API available at http://localhost:5001
- Endpoints:
  - `POST /api/prompt/optimize` - Optimize a prompt using DeepSeek API
  - `GET /health` - Health check endpoint 