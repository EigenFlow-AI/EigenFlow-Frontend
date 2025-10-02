import { Bot } from "lucide-react";
import { useUIStore } from "@/stores";

export function MobileBottomNav() {
  const ui = useUIStore();
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <div className="text-red-600 font-semibold">1</div>
            <div className="text-gray-500 text-xs">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-600 font-semibold">1</div>
            <div className="text-gray-500 text-xs">Warning</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-semibold">2</div>
            <div className="text-gray-500 text-xs">Healthy</div>
          </div>
        </div>

        {/* AI Chat Button */}
        <button
          onClick={ui.toggleChat}
          className="relative w-12 h-12 bg-violet-600 hover:bg-violet-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200">
          <Bot className="w-6 h-6 text-white" />
          {!ui.isChatOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </button>
      </div>
    </div>
  );
}
