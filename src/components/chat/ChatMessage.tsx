import { Bot, User as UserIcon } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div
      className={`flex gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-3 h-3 text-violet-600" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`p-2 rounded-lg ${
            isUser ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-900"
          }`}>
          <p className="text-xs">{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{timestamp}</p>
      </div>
      {isUser && (
        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-3 h-3 text-gray-600" />
        </div>
      )}
    </div>
  );
}
