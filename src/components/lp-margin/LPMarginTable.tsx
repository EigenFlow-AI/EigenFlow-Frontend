import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface LPData {
  name: string;
  marginLevel: number;
  equity: number;
  marginUsed: number;
  status: "ok" | "warn" | "critical";
}

interface LPMarginTableProps {
  lps: LPData[];
}

export function LPMarginTable({ lps }: LPMarginTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        LP Margin Overview
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                LP
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Margin Level
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Equity
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Margin Used
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {lps.map((lp, index) => {
              const statusConfig = {
                ok: {
                  color: "text-green-600",
                  bg: "bg-green-100",
                  icon: CheckCircle,
                },
                warn: {
                  color: "text-yellow-600",
                  bg: "bg-yellow-100",
                  icon: AlertTriangle,
                },
                critical: {
                  color: "text-red-600",
                  bg: "bg-red-100",
                  icon: XCircle,
                },
              };
              const config = statusConfig[lp.status];
              const IconComponent = config.icon;

              return (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {lp.name}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{lp.marginLevel}%</span>
                      {lp.marginLevel > 80 ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : lp.marginLevel > 60 ? (
                        <TrendingUp className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    ${lp.equity.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    ${lp.marginUsed.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                      <IconComponent className="w-3 h-3" />
                      {lp.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
