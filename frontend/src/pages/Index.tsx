import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import PromptForm from "../components/PromptForm";
import OptimizedResult from "../components/OptimizedResult";
import { Toaster } from "@/components/ui/toaster";
import { optimizePrompt } from "../services/api";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleOptimize = async (purpose: string, prompt: string) => {
    console.log("Optimize button clicked", { purpose, prompt });
    setIsOptimizing(true);
    setOptimizedPrompt(null);
    setErrorMessage(null);

    try {
      // The exact content as specified in the requirements
      const promptForDeepSeekAPI = `As a prompt engineering expert, please generate an English prompt based on the answers to the 1 question and 1 original prompt below, targeting AI beginners. The prompt must incorporate the content from all the answer and the original prompt to help formulate high-quality questions for AI. Please provide only the prompt itself, without any additional content.

What Purpose you want AI to help you achieve? Find popular prompt optimization tools.

Provide us the prompt you are using currently for the purpose above (original prompt): Recommend some prompt optimization tools.

请按以下步骤优化原始提示词：

1. 若原始提示词未指定AI角色，添加"你是该内容（original prompt）领域的专家"

2. 若原始提示词未说明输出格式，添加要求提供主要观点的网页链接

3. 若原始提示词未提及交互顾虑，添加"如遇不确定信息，会如实告知，不会编造"

4. 确保优化后的提示词清晰流畅

5. 仅提供优化后的提示词，不附带其他说明`;

      const result = await optimizePrompt({
        prompt: promptForDeepSeekAPI,
        purpose: purpose
      });

      if (result.error) {
        setErrorMessage(result.error);
        toast({
          title: "Optimization Error",
          description: result.error,
          variant: "destructive"
        });
      } else {
        setOptimizedPrompt(result.optimizedPrompt);
      }
    } catch (error: any) {
      console.error("Optimization failed:", error);
      setErrorMessage("Failed to optimize prompt: " + error.message);
      toast({
        title: "Optimization Failed",
        description: error.message || "DeepSeek didn't respond",
        variant: "destructive"
      });
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

          <OptimizedResult optimizedPrompt={optimizedPrompt} error={errorMessage} />
        </div>
      </main>

      <Toaster />
    </div>
  );
};

export default Index;
