import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PromptForm from "../components/PromptForm";
import OptimizedResult from "../components/OptimizedResult";
import { Toaster } from "@/components/ui/toaster";

// Simulated optimization function
const simulateOptimization = (
  purpose: string,
  prompt: string,
): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is a placeholder. In a real application, this would call your API
      const optimized = `I am looking for the most effective and user-friendly tools for prompt optimization. Please provide a comprehensive list of popular prompt optimization tools available in 2025, including their key features, strengths, and potential use cases. For each tool, explain how it helps improve prompt clarity and effectiveness. Additionally, highlight which tools might be best suited for beginners versus advanced users.`;
      resolve(optimized);
    }, 3000); // Simulate 3 seconds of processing
  });
};

const Index = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);

  const handleOptimize = async (purpose: string, prompt: string) => {
    setIsOptimizing(true);
    try {
      const result = await simulateOptimization(purpose, prompt);
      setOptimizedPrompt(result);
    } catch (error) {
      console.error("Optimization failed:", error);
      // Handle error - in real app, would show error message
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Promptyoo-1</h1>
            <p className="text-gray-600">
              If you already know what to ask the AI and just want to make the
              prompt more fluent and clear, then the Promptyoo-1 (where 1 means
              you already have an initial prompt) web application will be more
              suitable for you. You only need to submit the original prompt to
              this application, and it will pass the prompt to DeepSeek,
              optimize it according to the RABPOC model (no need to answer 6
              questions), and then return the optimized prompt.
            </p>
          </div>

          <PromptForm onOptimize={handleOptimize} isOptimizing={isOptimizing} />

          <OptimizedResult optimizedPrompt={optimizedPrompt} />
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default Index;
