import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type StatusType } from "@/types";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import { useUIStore, useMarginCheckStore } from "@/stores";
import { StructuredReportRenderer } from "./StructuredReportRenderer";

const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case "ok":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "warn":
      return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    case "critical":
      return <XCircle className="w-5 h-5 text-red-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-600" />;
  }
};

const getStatusColor = (status: StatusType) => {
  switch (status) {
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

const getStatusText = (status: StatusType) => {
  switch (status) {
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

export function MarginReportModal() {
  const ui = useUIStore();
  const marginCheck = useMarginCheckStore();

  if (!marginCheck.marginReport) return null;

  return (
    <Dialog
      open={ui.isMarginReportOpen}
      onOpenChange={() => ui.setIsMarginReportOpen(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(marginCheck.marginReport.status)}
              <div>
                <DialogTitle className="text-xl font-bold">
                  {marginCheck.marginReport.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Generated at {marginCheck.marginReport.timestamp}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  marginCheck.marginReport.status
                )}`}>
                {getStatusText(marginCheck.marginReport.status)}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Accounts Detail (new) */}
          {marginCheck.marginReport.accountsDetail && (
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Accounts Detail
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(marginCheck.marginReport.accountsDetail).map(
                  ([account, percent]) => {
                    const value = parseFloat(String(percent).replace(/%/g, ""));
                    return (
                      <div
                        key={account}
                        className="rounded-lg border border-gray-100 p-3 bg-gray-50">
                        <div
                          className="text-xs text-gray-600 truncate mb-2"
                          title={account}>
                          {account}
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {percent}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              value >= 80
                                ? "bg-red-100 text-red-800"
                                : value >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                            {value >= 80 ? "High" : value >= 60 ? "Warn" : "OK"}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white rounded overflow-hidden border border-gray-200">
                          <div
                            className={`h-full ${
                              value >= 80
                                ? "bg-red-500"
                                : value >= 60
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(Math.max(value, 0), 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* Report Content */}
          <div className="space-y-4">
            {marginCheck.marginReport.sections.map((section) => (
              <div key={section.id}>
                {section.id === "report_content" ? (
                  <StructuredReportRenderer content={section.content} />
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <div className="text-gray-700 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {marginCheck.marginReport.actions.map((action) => (
              <Button
                key={action.id}
                onClick={() => marginCheck.handleActionClick(action.id)}
                variant={
                  action.type === "primary"
                    ? "default"
                    : action.type === "danger"
                    ? "destructive"
                    : "outline"
                }
                className={
                  action.type === "primary"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : ""
                }>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
