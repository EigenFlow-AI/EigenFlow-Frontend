import React from "react";
import type { MarginReport, StatusType } from "@/types";

interface ChatReportCardProps {
  report: MarginReport;
  onActionClick?: (actionId: string) => void;
}

const badgeClass = (status: StatusType) => {
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

export function ChatReportCard({ report, onActionClick }: ChatReportCardProps) {
  return (
    <div className="w-full border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="text-sm font-semibold text-gray-900 truncate pr-2">
          {report.title}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass(
              report.status
            )}`}>
            {report.status.toUpperCase()}
          </span>
          <span className="text-[11px] text-gray-500 whitespace-nowrap">
            {report.timestamp}
          </span>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-gray-700">
          <div>
            <div className="text-base font-bold text-gray-900">
              {report.avgMarginLevel}%
            </div>
            <div className="text-gray-500">Avg ML</div>
          </div>
          <div>
            <div className="text-base font-bold text-gray-900">
              {report.lpCount}
            </div>
            <div className="text-gray-500">LPs</div>
          </div>
          <div>
            <div className="text-xs font-medium text-gray-900 truncate">
              {report.cardId}
            </div>
            <div className="text-gray-500">Report ID</div>
          </div>
        </div>
        {report.sections.slice(0, 2).map((s) => (
          <div key={s.id} className="text-sm text-gray-800">
            <div className="font-semibold mb-1">{s.title}</div>
            <div className="text-[13px] whitespace-pre-line line-clamp-4">
              {s.content}
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {report.actions.slice(0, 3).map((a) => (
            <button
              key={a.id}
              onClick={() => onActionClick?.(a.id)}
              className={`px-2.5 py-1 rounded text-xs border transition-colors ${
                a.type === "primary"
                  ? "bg-violet-600 text-white hover:bg-violet-700 border-transparent"
                  : a.type === "danger"
                  ? "text-red-700 border-red-300 hover:bg-red-50"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
