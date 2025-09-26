import { XCircle, Play, Activity, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  type: string;
  description: string;
  priority: number;
}

interface MarginAlertCardProps {
  lp: string;
  marginLevel: number;
  threshold: number;
  recommendations: Recommendation[];
  timestamp: string;
}

export function MarginAlertCard({
  lp,
  marginLevel,
  threshold,
  recommendations,
  timestamp,
}: MarginAlertCardProps) {
  return (
    <div className="bg-white border border-red-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">LP Margin Alert</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
            <XCircle className="w-4 h-4 inline mr-1" />
            CRITICAL
          </span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {lp} Margin Level at {marginLevel}% (Threshold: {threshold}%)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: `${Math.min(marginLevel, 100)}%` }}></div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">
          AI Analysis & Suggestions:
        </h4>
        {recommendations.map((rec) => (
          <div key={rec.id} className="mb-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900">
                Priority {rec.priority}:
              </span>
              <span className="text-sm text-gray-600">{rec.type}</span>
            </div>
            <p className="text-sm text-gray-700">{rec.description}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Play className="w-4 h-4 mr-2" />
          Execute Hedge Clearance
        </Button>
        <Button
          variant="outline"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Activity className="w-4 h-4 mr-2" />
          Simulate
        </Button>
        <Button
          variant="outline"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Eye className="w-4 h-4 mr-2" />
          Details
        </Button>
      </div>
    </div>
  );
}
