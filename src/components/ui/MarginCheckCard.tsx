import type { LucideIcon } from "lucide-react";

interface MarginCheckCardProps {
  title: string;
  description: string;
  status: "ok" | "warn" | "critical";
  icon: LucideIcon;
  value?: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function MarginCheckCard({
  title,
  description,
  status,
  icon: Icon,
  value,
  buttonText,
  onButtonClick,
}: MarginCheckCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "warn":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "critical":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ok":
        return "Healthy";
      case "warn":
        return "Warning";
      case "critical":
        return "Critical";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-purple-100 p-5 hover:shadow-lg hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200 h-full flex flex-col">
      {/* Header with icon and title */}
      <div className="flex items-start justify-start mb-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-purple-600" />
          </div>
          <h4 className="font-semibold text-slate-900 text-base leading-tight truncate">
            {title}
          </h4>
        </div>
      </div>

      {/* Status badge on its own line */}
      <div className="mb-3">
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            status
          )}`}>
          {getStatusText(status)}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow break-words line-clamp-3">
        {description}
      </p>

      {/* Value section */}
      {value && (
        <div className="mb-5">
          <div className="text-2xl font-bold text-slate-900 truncate">
            {value}
          </div>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={onButtonClick}
        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 active:from-purple-700 active:to-purple-800 transition-all duration-150 shadow-sm hover:shadow-md break-words">
        {buttonText}
      </button>
    </div>
  );
}
