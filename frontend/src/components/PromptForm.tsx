import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingIndicator from "./LoadingIndicator";

interface PromptFormProps {
  onOptimize: (purpose: string, prompt: string) => void;
  isOptimizing: boolean;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onOptimize,
  isOptimizing,
}) => {
  const [purpose, setPurpose] = useState(
    "Find popular prompt optimization tools",
  );
  const [prompt, setPrompt] = useState(
    "Recommend some prompt optimization tools",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (purpose.trim() && prompt.trim()) {
      onOptimize(purpose, prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="prompt-form-card">
        <div className="space-y-6">
          <div>
            <label htmlFor="purpose" className="block text-sm font-medium mb-2">
              What Purpose you want AI to help you achieve?
            </label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Example: Find popular prompt optimization tools"
              disabled={isOptimizing}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Provide us the prompt you are using currently for the purpose
              above
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Recommend some prompt optimization tools"
              disabled={isOptimizing}
              className="prompt-form-textarea"
            />
          </div>

          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={isOptimizing || !purpose.trim() || !prompt.trim()}
          >
            {isOptimizing ? <LoadingIndicator /> : "Optimize Prompt"}
          </Button>

          {isOptimizing && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>
                Prompt optimization can take up to 1 minute. Please don't reload
                the page.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
