import { useEffect, useState, useCallback } from "react";
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAlertCardsStore } from "@/stores/alertCardsStore";
import { useUIStore } from "@/stores/uiStore";
import { toast } from "sonner";
import axios from "axios";
import { ALERT_URL } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AlertCard {
  id: string;
  lp: string;
  status: string;
  margin_level: number;
  created_at: string;
  updated_at: string;
  ignore_until: string | null;
}

interface AlertCardDetail {
  id: string;
  lp: string;
  status: string;
  threshold: number;
  hysteresis_threshold: number;
  margin_level: number;
  created_at: string;
  updated_at: string;
  ignore_until: string | null;
  thread_id: string;
  last_notified_at: string;
  notifications_sent: number;
  last_margin_snapshot: {
    LP: string;
    Credit: number;
    Equity: number;
    Margin: number;
    Balance: number;
    updated_at: string;
    "Free Margin": number;
    "Unrealized P&L": number;
    "Margin Utilization %": number;
  };
}

export function AlertCardsStatus() {
  const { cards, isLoading, error, fetchCards } = useAlertCardsStore();
  const { isMonitoring } = useUIStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [alertCardDetail, setAlertCardDetail] =
    useState<AlertCardDetail | null>(null);
  const [processedAlerts, setProcessedAlerts] = useState<Set<string>>(
    new Set()
  );

  const handleManualRefresh = async () => {
    if (isRefreshing || isLoading) return;
    setIsRefreshing(true);
    try {
      await fetchCards();
      // Check margin alerts after manual refresh if monitoring is active
      if (isMonitoring && cards.length > 0) {
        await checkMarginAlerts();
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000); // debounce 1s
    }
  };

  // Check for margin level alerts
  const checkMarginAlerts = useCallback(async () => {
    const threshold = 10;
    const alertCards = cards.filter((card) => card.margin_level > threshold);

    for (const card of alertCards) {
      // Skip if we already processed this alert in the current minute
      if (processedAlerts.has(card.id)) {
        continue;
      }

      try {
        const response = await axios.get(`${ALERT_URL}/alert/cards/${card.id}`);
        const cardDetail: AlertCardDetail = response.data;

        // Mark this alert as processed
        setProcessedAlerts((prev) => new Set(prev).add(card.id));

        // Show persistent toast notification
        const id = toast.error("Margin Alert", {
          description: `${card.lp} margin level is ${card.margin_level.toFixed(
            2
          )}% (threshold: ${threshold}%)`,
          duration: Infinity, // Persistent until dismissed
          dismissible: true, // Allow clicking X to dismiss
          action: {
            label: "View Details",
            onClick: () => {
              setAlertCardDetail(cardDetail);
              setAlertDialogOpen(true);
              toast.dismiss(id);
            },
          },
        });
      } catch (error) {
        console.error(
          `Failed to fetch alert details for card ${card.id}:`,
          error
        );
      }
    }
  }, [cards, processedAlerts]);

  useEffect(() => {
    // Initial fetch
    console.log("AlertCardsStatus: Initial fetch triggered");
    fetchCards();
  }, [fetchCards]);

  // Set up polling when monitoring is active
  useEffect(() => {
    console.log("AlertCardsStatus: Monitoring state changed:", isMonitoring);
    if (!isMonitoring) return;

    console.log("AlertCardsStatus: Setting up polling interval");
    const interval = setInterval(async () => {
      console.log("AlertCardsStatus: Polling interval triggered");
      await fetchCards();
      // Check margin alerts after fetching cards
      const currentCards = useAlertCardsStore.getState().cards;
      console.log(
        "AlertCardsStatus: Current cards count:",
        currentCards.length
      );
      if (currentCards.length > 0) {
        await checkMarginAlerts();
      }
    }, 60000); // 60 seconds = 1 minute

    // Cleanup interval on component unmount or when monitoring stops
    return () => {
      console.log("AlertCardsStatus: Cleaning up polling interval");
      clearInterval(interval);
    };
  }, [isMonitoring, fetchCards, checkMarginAlerts]);

  // Clear processed alerts every minute to allow re-processing
  useEffect(() => {
    const clearProcessedInterval = setInterval(() => {
      setProcessedAlerts(new Set());
    }, 60000); // Clear every minute

    return () => clearInterval(clearProcessedInterval);
  }, []);

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
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing || isLoading}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors border ${
                isRefreshing || isLoading
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-700 border-transparent"
              }`}>
              {isRefreshing || isLoading ? "Refreshing..." : "Refresh"}
            </button>
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

      {/* Alert Detail Dialog */}
      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Margin Alert Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the margin alert
            </DialogDescription>
          </DialogHeader>

          {alertCardDetail && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    LP Account
                  </label>
                  <p className="text-sm text-gray-900">{alertCardDetail.lp}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <p className="text-sm text-gray-900">
                    {alertCardDetail.status}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Margin Level
                  </label>
                  <p className="text-sm text-red-600 font-semibold">
                    {alertCardDetail.margin_level.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Threshold
                  </label>
                  <p className="text-sm text-gray-900">
                    {alertCardDetail.threshold}%
                  </p>
                </div>
              </div>

              {/* Margin Snapshot */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Last Margin Snapshot
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Equity
                      </label>
                      <p className="text-sm text-gray-900">
                        $
                        {alertCardDetail.last_margin_snapshot.Equity.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Balance
                      </label>
                      <p className="text-sm text-gray-900">
                        $
                        {alertCardDetail.last_margin_snapshot.Balance.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Margin Used
                      </label>
                      <p className="text-sm text-gray-900">
                        $
                        {alertCardDetail.last_margin_snapshot.Margin.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Free Margin
                      </label>
                      <p className="text-sm text-gray-900">
                        $
                        {alertCardDetail.last_margin_snapshot[
                          "Free Margin"
                        ].toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Unrealized P&L
                      </label>
                      <p
                        className={`text-sm font-semibold ${
                          alertCardDetail.last_margin_snapshot[
                            "Unrealized P&L"
                          ] >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}>
                        $
                        {alertCardDetail.last_margin_snapshot[
                          "Unrealized P&L"
                        ].toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Margin Utilization
                      </label>
                      <p className="text-sm text-red-600 font-semibold">
                        {alertCardDetail.last_margin_snapshot[
                          "Margin Utilization %"
                        ].toFixed(2)}
                        %
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <label className="text-sm font-medium text-gray-700">
                      Last Updated
                    </label>
                    <p className="text-sm text-gray-600">
                      {new Date(
                        alertCardDetail.last_margin_snapshot.updated_at
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alert Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Alert Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Notifications Sent
                    </label>
                    <p className="text-sm text-gray-900">
                      {alertCardDetail.notifications_sent}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Last Notified
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(
                        alertCardDetail.last_notified_at
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Thread ID
                    </label>
                    <p className="text-sm text-gray-600 font-mono">
                      {alertCardDetail.thread_id}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Hysteresis Threshold
                    </label>
                    <p className="text-sm text-gray-900">
                      {alertCardDetail.hysteresis_threshold}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
