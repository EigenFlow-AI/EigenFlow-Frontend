import React from "react";

export function AnalyticsPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analytics & Reports
        </h2>
        <p className="text-gray-600">
          Historical data analysis and performance metrics
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Coming Soon
        </h3>
        <p className="text-gray-600">
          Advanced analytics and reporting features will be available in the
          next release.
        </p>
      </div>
    </>
  );
}
