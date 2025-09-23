import React from "react";
import {
  Sparkles,
  Send,
  MessageSquarePlus,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  reportHtml?: React.ReactNode;
}

interface AIChatAreaProps {
  suggestions: string[];
  selectedSuggestion?: string;
  onSuggestionSelect?: (suggestion: string) => void;
  onSendMessage?: (message: string) => void;
  messages?: ChatMessage[];
  onNewChat?: () => void;
  sessions?: Array<{ id: string; title: string; lastAt?: string }>;
  activeSessionId?: string;
  onSelectSession?: (id: string) => void;
}

export function AIChatArea({
  suggestions,
  selectedSuggestion,
  onSuggestionSelect,
  onSendMessage,
  messages = [],
  onNewChat,
  sessions = [],
  activeSessionId,
  onSelectSession,
}: AIChatAreaProps) {
  const [inputValue, setInputValue] = React.useState("");
  // removed collapse per request
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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

  const hasMessages = messages.length > 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-600" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            AI Assistant
          </h3>
          <span className="text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
            Demo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsSidebarOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title={isSidebarOpen ? "Hide history" : "Show history"}
            aria-label={isSidebarOpen ? "Hide history" : "Show history"}>
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4 text-gray-700" />
            ) : (
              <PanelLeftOpen className="w-4 h-4 text-gray-700" />
            )}
          </button>
          <button
            onClick={onNewChat}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            title="New chat"
            aria-label="New chat">
            <MessageSquarePlus className="w-4 h-4 text-gray-700" />
          </button>
          {hasMessages && <></>}
        </div>
      </div>

      <div className="flex min-h-[20vh]">
        {/* Left history sidebar */}
        {isSidebarOpen && (sessions.length > 0 || hasMessages) && (
          <aside className="w-48 border-r p-3 hidden sm:block">
            <div className="text-xs font-medium text-gray-500 mb-2">
              History
            </div>
            <div className="flex flex-col gap-1">
              {sessions.length === 0 && (
                <div className="text-xs text-gray-400">No sessions</div>
              )}
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onSelectSession?.(s.id)}
                  className={`text-left px-2 py-1.5 rounded border transition-colors text-sm truncate ${
                    s.id === activeSessionId
                      ? "border-violet-300 bg-violet-50 text-violet-700"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}>
                  <div className="truncate">{s.title}</div>
                  {s.lastAt && (
                    <div className="text-[11px] text-gray-400">{s.lastAt}</div>
                  )}
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* Main chat body */}
        <div className="flex-1 p-3">
          {!hasMessages && (
            <div className="flex flex-col gap-2 mb-2">
              <h4 className="text-sm font-medium text-gray-700">
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
          )}

          {hasMessages && (
            <div className="mb-3 max-h-[50vh] overflow-y-auto pr-1 space-y-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-[13px] leading-relaxed ${
                      m.role === "user"
                        ? "bg-violet-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}>
                    {m.reportHtml ? m.reportHtml : m.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 mt-12">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="For example: check LMAX or help me check all LPs"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <Button onClick={handleSend} size="sm" className="px-3">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
