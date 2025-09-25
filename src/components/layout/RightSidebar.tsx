import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gift,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { ChatIcon } from "../chat";

interface RightSidebarProps {
  isChatOpen: boolean;
  onChatToggle: () => void;
  onOpenAlerts?: () => void;
  latestAlert?: any;
  onDismissAlert?: (id: string) => void;
}

export function RightSidebar({
  isChatOpen,
  onChatToggle,
  onOpenAlerts,
  latestAlert,
  onDismissAlert,
}: RightSidebarProps) {
  return (
    <aside className="w-full flex flex-col p-3 lg:p-4 space-y-3 lg:space-y-4">
      {/* Profile Strength Card */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-3 lg:p-4 text-white">
        <h3 className="text-xs lg:text-sm font-semibold mb-2">
          Your profile strength
        </h3>
        <div className="flex items-center gap-2 mb-2 lg:mb-3">
          <span className="text-base lg:text-lg font-bold">Youngling</span>
          <Leaf className="w-3 h-3 lg:w-4 lg:h-4 text-green-300" />
        </div>
        <div className="w-full bg-white/20 rounded-full h-1.5 lg:h-2 mb-2 lg:mb-3">
          <div
            className="bg-green-300 h-1.5 lg:h-2 rounded-full"
            style={{ width: "30%" }}></div>
        </div>
        <button className="flex items-center gap-1 text-xs lg:text-sm hover:text-violet-200 transition-colors">
          <span>View profile</span>
          <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
        </button>
      </div>

      {/* Calendar Widget */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 lg:p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-2 lg:mb-3">
          <span className="text-xs lg:text-sm font-medium text-gray-900">
            09 Feb - 15 Feb
          </span>
          <div className="flex items-center gap-1">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              title="Previous week"
              aria-label="Previous week">
              <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              title="Next week"
              aria-label="Next week">
              <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-0.5 lg:gap-1 mb-2 lg:mb-3 text-xs">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className="text-center text-gray-500 py-0.5 lg:py-1 text-[10px] lg:text-xs">
              {day}
            </div>
          ))}
          {[9, 10, 11, 12, 13, 14, 15].map((date) => (
            <div
              key={date}
              className={`text-center py-0.5 lg:py-1 rounded text-[10px] lg:text-xs ${
                date === 13
                  ? "bg-violet-600 text-white"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}>
              {date}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 lg:gap-2 mb-2 lg:mb-3 text-xs lg:text-sm text-gray-600">
          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden lg:inline">
            You have no upcoming sessions
          </span>
          <span className="lg:hidden">No sessions</span>
        </div>

        <button className="w-full bg-violet-600 text-white py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium hover:bg-violet-700 transition-colors">
          Book a session
        </button>
      </div>

      {/* Invites Card */}
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 lg:p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <span className="text-xs lg:text-sm font-medium text-gray-900">
            You have 3 invites
          </span>
          <button className="text-xs lg:text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1">
            <Gift className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden lg:inline">Gift invite</span>
            <span className="lg:hidden">Gift</span>
          </button>
        </div>
      </div>

      {/* PRD: Alert Preview Card (click to open header alerts drawer) */}
      <button
        onClick={onOpenAlerts}
        className="text-left bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 lg:p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-1 lg:mb-2">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-900">
            LP Margin Alert
          </h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-semibold border bg-red-100 text-red-800 border-red-200">
            CRITICAL
          </span>
        </div>
        <div className="text-[10px] lg:text-xs text-gray-600 mb-2">
          10:05 AM
        </div>
        <div className="text-[11px] lg:text-xs text-gray-800 mb-2">
          <span className="font-medium">LP_A</span> Margin Level at 91%
          (Threshold: 90%)
        </div>
        <div className="text-[11px] lg:text-xs text-gray-800">
          <span className="font-semibold">AI Analysis & Suggestion:</span>
          <div className="mt-1">
            Priority 1: Clear cross-LP hedge on EURUSD (80 lots) with LP_B.
            Expected to release $96k margin.
          </div>
        </div>
      </button>

      {/* AI Chat Icon */}
      {/* <ChatIcon isOpen={isChatOpen} onClick={onChatToggle} /> */}
    </aside>
  );
}
