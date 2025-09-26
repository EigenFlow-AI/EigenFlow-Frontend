import { Button } from "@/components/ui/button";

interface ChatCardAction {
  label: string;
  type: string;
  onClick: () => void;
}

interface ChatCardProps {
  title: string;
  content: string;
  actions?: ChatCardAction[];
}

export function ChatCard({ title, content, actions }: ChatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-700 mb-2">{content}</p>
      {actions && (
        <div className="flex gap-1">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.type === "primary" ? "default" : "outline"}
              size="sm"
              className={`text-xs px-2 py-1 ${
                action.type === "primary"
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300"
              }`}
              onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
