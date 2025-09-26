import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { type AlertMessage, type StatusType } from "@/types";
import { Clock, TrendingUp, Wifi, Shield } from "lucide-react";

interface AlertMessagesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: AlertMessage[];
  onAlertAction: (alertId: string, actionId: string) => void;
  onMarkAsRead: (alertId: string) => void;
}

const getSeverityColor = (severity: StatusType) => {
  switch (severity) {
    case "ok":
      return "bg-green-100 text-green-800 border-green-200";
    case "warn":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "critical":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getAlertTypeIcon = (type: string) => {
  switch (type) {
    case "margin_alert":
      return <TrendingUp className="w-4 h-4 text-blue-600" />;
    case "liquidation_risk":
      return <Shield className="w-4 h-4 text-red-600" />;
    case "position_alert":
      return <TrendingUp className="w-4 h-4 text-purple-600" />;
    case "system_alert":
      return <Wifi className="w-4 h-4 text-orange-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const getSeverityText = (severity: StatusType) => {
  switch (severity) {
    case "ok":
      return "OK";
    case "warn":
      return "WARNING";
    case "critical":
      return "CRITICAL";
    default:
      return "UNKNOWN";
  }
};

export function AlertMessagesDrawer({
  isOpen,
  onClose,
  alerts,
  onAlertAction,
}: AlertMessagesDrawerProps) {
  const unreadCount = alerts.filter((alert) => !alert.isRead).length;

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        side="right"
        className="w-full sm:max-w-md h-full flex flex-col">
        <DrawerHeader className="border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-lg font-semibold">
                LP Margin Alerts
              </DrawerTitle>
              <DrawerDescription>
                {unreadCount > 0
                  ? `${unreadCount} unread alert${unreadCount > 1 ? "s" : ""}`
                  : "All alerts read"}
              </DrawerDescription>
            </div>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {unreadCount}
              </div>
            )}
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <div className="flex flex-col gap-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No alerts at this time</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => onAlertAction(alert.id, "details")}
                  className={`text-left w-full border rounded-lg p-4 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    alert.isRead
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-300 shadow-sm"
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertTypeIcon(alert.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header row: title + status/time */}
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900 truncate pr-2">
                          {alert.title}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getSeverityColor(
                              alert.severity
                            )}`}>
                            {getSeverityText(alert.severity)}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            {alert.timestamp}
                          </span>
                        </div>
                      </div>

                      {/* Meta row: LP name + unread dot */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">
                          {alert.lpName}
                        </span>
                        {!alert.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>

                      {/* Message preview */}
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {alert.message}
                      </p>

                      {/* Inline progress indicator (if any) */}
                      {alert.marginLevel && alert.threshold && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-[11px] text-gray-600 mb-1">
                            <span>Margin</span>
                            <span className="font-medium">
                              {alert.marginLevel}% (Thr: {alert.threshold}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            {/* eslint-disable-next-line react/forbid-dom-props */}
                            <div
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                alert.marginLevel >= alert.threshold
                                  ? "bg-red-500"
                                  : alert.marginLevel >= alert.threshold * 0.8
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={
                                {
                                  // @ts-ignore custom property for width
                                  "--progress-width": `${Math.min(
                                    alert.marginLevel || 0,
                                    100
                                  )}%`,
                                  width: "var(--progress-width)",
                                } as React.CSSProperties
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-2">
                        {alert.actions?.map((action) => (
                          <Button
                            key={action.id}
                            size="sm"
                            variant={
                              action.type === "primary"
                                ? "default"
                                : action.type === "danger"
                                ? "destructive"
                                : "outline"
                            }
                            onClick={(e) => {
                              e.stopPropagation();
                              onAlertAction(alert.id, action.id);
                            }}
                            className="text-xs">
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
