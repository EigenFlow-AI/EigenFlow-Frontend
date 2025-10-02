import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AlertMessage, StatusType } from "@/types";
import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { useUIStore, useAlertsStore } from "@/stores";

const getStatusIcon = (severity: StatusType) => {
  switch (severity) {
    case "ok":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "warn":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    case "critical":
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return <AlertTriangle className="w-5 h-5 text-gray-600" />;
  }
};

const getSeverityBadge = (severity: StatusType) => {
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

export function AlertCardDialog() {
  const ui = useUIStore();
  const alerts = useAlertsStore();

  if (!alerts.activeAlert) return null;

  const title = "LP Margin Alert";
  const timeText = alerts.activeAlert.timestamp || "";
  const statusLabel =
    alerts.activeAlert.severity === "critical"
      ? "CRITICAL"
      : alerts.activeAlert.severity === "warn"
      ? "WARNING"
      : "OK";

  return (
    <Dialog
      open={ui.isAlertDialogOpen}
      onOpenChange={() => ui.setIsAlertDialogOpen(false)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(alerts.activeAlert.severity)}
              <div>
                <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  {timeText}
                </DialogDescription>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityBadge(
                alerts.activeAlert.severity
              )}`}>
              {statusLabel}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* LP and metric line */}
          <div className="text-gray-900">
            <div className="font-medium">
              {alerts.activeAlert.lpName} Margin Level
              {typeof alerts.activeAlert.marginLevel === "number" &&
              typeof alerts.activeAlert.threshold === "number" ? (
                <>
                  {" "}
                  at {alerts.activeAlert.marginLevel}% (Threshold:{" "}
                  {alerts.activeAlert.threshold}%)
                </>
              ) : null}
            </div>
          </div>

          {/* AI Analysis & Suggestion */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="font-semibold mb-2">AI Analysis & Suggestion:</div>
            <div className="text-sm text-gray-800 whitespace-pre-line">
              {alerts.activeAlert.message ||
                "System detected elevated margin risk. Consider taking actions to reduce margin pressure."}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                console.log("Recheck from dialog", alerts.activeAlert.id);
                ui.setIsAlertDialogOpen(false);
              }}
              className="bg-violet-600 hover:bg-violet-700">
              I've Fixed This. Re-check
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                console.log("Details from dialog", alerts.activeAlert.id);
              }}>
              Details
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                alerts.setAlertMessages((prev) =>
                  prev.map((x) =>
                    x.id === alerts.activeAlert.id ? { ...x, isRead: true } : x
                  )
                );
                ui.setIsAlertDialogOpen(false);
              }}>
              Ignore
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
