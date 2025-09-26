import { CheckCircle, AlertTriangle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarginHealthCardProps {
  status: "ok" | "warn" | "critical";
  avgMarginLevel: number;
  lpCount: number;
  timestamp: string;
}

export function MarginHealthCard({
  status,
  avgMarginLevel,
  lpCount,
  timestamp,
}: MarginHealthCardProps) {
  const statusConfig = {
    ok: {
      color: "text-green-600",
      bg: "bg-green-100",
      icon: CheckCircle,
      label: "OK",
    },
    warn: {
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: AlertTriangle,
      label: "WARNING",
    },
    critical: {
      color: "text-red-600",
      bg: "bg-red-100",
      icon: XCircle,
      label: "CRITICAL",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          LP Margin Health
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color}`}>
            <IconComponent className="w-4 h-4 inline mr-1" />
            {config.label}
          </span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Avg. Margin Level</p>
          <p className="text-2xl font-bold text-gray-900">{avgMarginLevel}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">LP Count</p>
          <p className="text-2xl font-bold text-gray-900">{lpCount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {status === "ok" && "No critical risks detected."}
          {status === "warn" && "Some LPs approaching threshold limits."}
          {status === "critical" && "Immediate action required!"}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Eye className="w-4 h-4 mr-2" />
          View Report
        </Button>
      </div>
    </div>
  );
}
