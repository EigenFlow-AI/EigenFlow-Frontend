import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { ChatCard } from "./ChatCard";

interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      message:
        "Hello! I'm your Risk Management AI assistant. I can help you analyze LP margin levels, identify risks, and provide actionable recommendations. You can ask me: 'Check LP_A margin level' or 'What's the status of all LPs?'",
      isUser: false,
      timestamp: "10:00 AM",
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      message: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        message: "正在分析LP保证金数据...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Example interactive card */}
        {messages.length > 2 && (
          <ChatCard
            title="LP_A 保证金分析报告"
            content="检测到LP_A保证金水平为90%，超过85%的临界阈值。建议优先清理与LP_B的EURUSD交叉头寸，预计可释放$96k保证金。"
            actions={[
              {
                label: "执行清理",
                type: "primary",
                onClick: () => console.log("Execute"),
              },
              {
                label: "模拟操作",
                type: "secondary",
                onClick: () => console.log("Simulate"),
              },
              {
                label: "查看详情",
                type: "secondary",
                onClick: () => console.log("Details"),
              },
            ]}
          />
        )}
      </div>

      <div className="mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about LP margin levels..."
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent"
          />
          <Button onClick={handleSend} size="sm" className="px-2 py-1.5">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
