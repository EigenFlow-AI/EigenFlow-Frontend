import { Bot } from "lucide-react";

interface ChatIconProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatIcon({ isOpen, onClick }: ChatIconProps) {
  return (
    <div className="flex justify-center">
      <button
        onClick={onClick}
        title="Open Risk Management AI Chat"
        className="relative w-10 h-10 lg:w-12 lg:h-12 bg-violet-600 hover:bg-violet-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group">
        <Bot className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
        {/* Tooltip */}
        <div className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Risk Management AI
        </div>
      </button>
    </div>
  );
}
