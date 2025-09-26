import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type MarginReport, type StatusType } from "@/types";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";

interface MarginReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: MarginReport | null;
  onActionClick: (actionId: string) => void;
}

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

export function MarginReportModal({
  isOpen,
  onClose,
  report,
  onActionClick,
}: MarginReportModalProps) {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(report.status)}
              <div>
                <DialogTitle className="text-xl font-bold">
                  {report.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Generated at {report.timestamp}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  report.status
                )}`}>
                {getStatusText(report.status)}
              </span>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {report.avgMarginLevel}%
              </div>
              <div className="text-sm text-gray-600">Avg Margin Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {report.lpCount}
              </div>
              <div className="text-sm text-gray-600">LP Count</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {report.cardId}
              </div>
              <div className="text-sm text-gray-600">Report ID</div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="space-y-4">
            {report.sections.map((section) => (
              <div
                key={section.id}
                className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {section.title}
                </h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {report.actions.map((action) => (
              <Button
                key={action.id}
                onClick={() => onActionClick(action.id)}
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
