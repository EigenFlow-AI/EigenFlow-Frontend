import React from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIChatAreaProps {
  suggestions: string[];
  selectedSuggestion?: string;
  onSuggestionSelect?: (suggestion: string) => void;
  onSendMessage?: (message: string) => void;
}

export function AIChatArea({
  suggestions,
  selectedSuggestion,
  onSuggestionSelect,
  onSendMessage,
}: AIChatAreaProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-violet-600" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          Share your goal, meet your AI assistant
        </h3>
        <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
          Beta
        </span>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Suggestions for you
        </h4>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionSelect?.(suggestion)}
              className={`px-3 sm:px-4 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                selectedSuggestion === suggestion
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-gray-700 border-violet-200 hover:bg-violet-50 hover:border-violet-300"
              }`}>
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="How can AI help you with LP margin management today?"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
        <Button onClick={handleSend} size="sm" className="px-3">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
