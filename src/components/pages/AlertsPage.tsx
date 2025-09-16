import React from "react";
import { XCircle, AlertTriangle } from "lucide-react";
import { MarginAlertCard } from "../lp-margin";
import { alertData } from "../../data/mockData";

export function AlertsPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Alert Management
        </h2>
        <p className="text-gray-600">
          Manage and configure margin alerts and notifications
        </p>
      </div>

      {/* Critical Alert Card */}
      <MarginAlertCard
        lp={alertData.lpId}
        marginLevel={alertData.marginLevel}
        threshold={alertData.threshold}
        recommendations={alertData.recommendations.map((rec, index) => ({
          id: `${alertData.lpId}-${index}`,
          type: rec.action,
          description: rec.description,
          priority: index + 1,
        }))}
        timestamp={new Date().toISOString()}
      />

      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Alert History
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
            <XCircle className="w-5 h-5 text-red-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">LP_A Critical Alert</p>
              <p className="text-sm text-gray-600">
                Margin level reached 90% - 2 minutes ago
              </p>
            </div>
            <span className="text-xs text-red-600 font-medium">CRITICAL</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">LP_C Warning Alert</p>
              <p className="text-sm text-gray-600">
                Margin level reached 72% - 15 minutes ago
              </p>
            </div>
            <span className="text-xs text-yellow-600 font-medium">WARNING</span>
          </div>
        </div>
      </div>
    </>
  );
}
