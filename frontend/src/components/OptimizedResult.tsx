import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

interface OptimizedResultProps {
  optimizedPrompt: string | null;
  error?: string | null;
  isStreaming?: boolean;
}

const OptimizedResult: React.FC<OptimizedResultProps> = ({
  optimizedPrompt,
  error,
  isStreaming = false,
}) => {
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of textarea when streaming new content
  useEffect(() => {
    if (isStreaming && textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [optimizedPrompt, isStreaming]);

  const handleCopy = () => {
    if (optimizedPrompt) {
      navigator.clipboard.writeText(optimizedPrompt);
      toast({
        title: "Copied to clipboard",
        description: "The optimized prompt has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Optimized Prompt</h3>
        {optimizedPrompt && !isStreaming && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleCopy}
          >
            <Copy size={14} />
            <span>Copy</span>
          </Button>
        )}
      </div>
      <div className="prompt-form-card">
        {error ? (
          <div className="text-red-500 p-4 text-center flex items-center justify-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        ) : optimizedPrompt ? (
          <Textarea
            ref={textareaRef}
            value={optimizedPrompt}
            readOnly
            className={`prompt-form-textarea ${isStreaming ? 'streaming-textarea' : ''}`}
          />
        ) : (
          <div className="text-gray-500 italic p-4 text-center">
            Your optimized prompt will be displayed here. Optimize your prompt
            now!
          </div>
        )}
      </div>
      {isStreaming && optimizedPrompt && (
        <div className="text-sm text-blue-500 mt-2 animate-pulse">
          Response streaming...
        </div>
      )}
    </div>
  );
};

export default OptimizedResult;
