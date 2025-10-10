import { useEffect } from "react";
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAlertCardsStore } from "@/stores/alertCardsStore";

interface AlertCard {
  id: string;
  lp: string;
  status: string;
  margin_level: number;
  created_at: string;
  updated_at: string;
  ignore_until: string | null;
}

export function AlertCardsStatus() {
  const { cards, isLoading, error, fetchCards } = useAlertCardsStore();

  useEffect(() => {
    // Initial fetch
    fetchCards();

    // Set up interval to fetch every minute
    const interval = setInterval(() => {
      fetchCards();
    }, 60000); // 60 seconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [fetchCards]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "awaiting_hitl":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      case "ignored":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "awaiting_hitl":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "critical":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "ignored":
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMarginLevelColor = (marginLevel: number) => {
    if (marginLevel < 20) return "text-red-600";
    if (marginLevel < 50) return "text-yellow-600";
    return "text-green-600";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Alert Cards Status
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            <span className="ml-3 text-gray-600">Loading alert cards...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Alert Cards Status
            </h3>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-600 font-medium">
                Failed to load alert cards
              </p>
              <p className="text-gray-500 text-sm mt-1">{error}</p>
              <button
                onClick={fetchCards}
                className="mt-3 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                Retry Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Alert Cards Status
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {cards.length} Accounts
            </span>
            <span className="text-xs text-gray-400">Auto-refresh: 1min</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {cards.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No alert cards found</p>
            <p className="text-gray-500 text-sm mt-1">
              All systems are operating normally
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card: AlertCard) => (
              <div
                key={card.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900">{card.lp}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        card.status
                      )}`}>
                      {card.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(card.status)}
                    <span className="text-xs text-gray-500">
                      {formatDate(card.updated_at)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Margin Level</span>
                      <span
                        className={`font-medium ${getMarginLevelColor(
                          card.margin_level
                        )}`}>
                        {card.margin_level.toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          card.margin_level < 20
                            ? "bg-red-500"
                            : card.margin_level < 50
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        // eslint-disable-next-line react/forbid-dom-props
                        style={{
                          width: `${Math.min(card.margin_level, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Created:</span>
                      <span className="ml-2 font-medium">
                        {formatDate(card.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Updated:</span>
                      <span className="ml-2 font-medium">
                        {formatDate(card.updated_at)}
                      </span>
                    </div>
                  </div>

                  {card.ignore_until && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Ignored until: {formatDate(card.ignore_until)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  {card.status === "awaiting_hitl" && (
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                      Take Action
                    </button>
                  )}
                  {card.status === "critical" && (
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                      Resolve
                    </button>
                  )}
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
