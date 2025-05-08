
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface OptimizedResultProps {
  optimizedPrompt: string | null;
}

const OptimizedResult: React.FC<OptimizedResultProps> = ({ optimizedPrompt }) => {
  const { toast } = useToast();

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
        {optimizedPrompt && (
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
        {optimizedPrompt ? (
          <Textarea 
            value={optimizedPrompt} 
            readOnly 
            className="prompt-form-textarea" 
          />
        ) : (
          <div className="text-gray-500 italic p-4 text-center">
            Your optimized prompt will be displayed here. Optimize your prompt now!
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedResult;
