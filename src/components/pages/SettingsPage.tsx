import React from "react";

export function SettingsPage() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          System Settings
        </h2>
        <p className="text-gray-600">
          Configure system preferences and LP account settings
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Configuration
        </h3>
        <p className="text-gray-600">
          System configuration options will be available here.
        </p>
      </div>
    </>
  );
}
