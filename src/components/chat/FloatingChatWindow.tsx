import { Bot, XCircle } from "lucide-react";
import { ChatInterface } from "./ChatInterface";

interface FloatingChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FloatingChatWindow({
  isOpen,
  onClose,
}: FloatingChatWindowProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 sm:w-96 h-[400px] sm:h-[500px] bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-violet-600" />
          <h3 className="text-sm font-semibold text-gray-900">
            Risk Management AI
          </h3>
          <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
        <button
          onClick={onClose}
          title="Close chat window"
          aria-label="Close chat window"
          className="w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
          <XCircle className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Chat Content */}
      <div className="flex-1 p-4 min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
}
