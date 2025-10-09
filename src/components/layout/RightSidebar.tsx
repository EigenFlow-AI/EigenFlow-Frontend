import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gift,
  Activity,
  Play,
  Pause,
} from "lucide-react";
import { useUIStore } from "@/stores";
import { useState } from "react";
import { motion } from "framer-motion";

export function RightSidebar() {
  const ui = useUIStore();
  const [isMonitoring, setIsMonitoring] = useState(false);
  return (
    <aside className="w-full flex flex-col p-3 lg:p-4 space-y-3 lg:space-y-4">
      {/* System Health Monitoring Card */}
      <motion.div
        className="relative overflow-hidden rounded-xl p-4 text-white cursor-pointer"
        style={{
          background: isMonitoring
            ? "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)"
            : "linear-gradient(135deg, #7c3aed, #8b5cf6)",
        }}
        animate={{
          background: isMonitoring
            ? [
                "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)",
                "linear-gradient(135deg, #a855f7, #c084fc, #8b5cf6, #a855f7)",
                "linear-gradient(135deg, #c084fc, #8b5cf6, #a855f7, #c084fc)",
                "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)",
                "linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7, #c084fc)",
                "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc, #8b5cf6)",
              ]
            : "linear-gradient(135deg, #7c3aed, #8b5cf6)",
        }}
        transition={{
          duration: 2,
          repeat: isMonitoring ? Infinity : 0,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setIsMonitoring(!isMonitoring);
          // Start monitoring alerts
          console.log("Starting system health monitoring...");
        }}>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={
                  isMonitoring
                    ? {
                        rotate: [0, 5, -5, 0],
                      }
                    : { scale: 1, rotate: 0 }
                }
                transition={{
                  duration: 1.5,
                  repeat: isMonitoring ? Infinity : 0,
                  ease: "easeInOut",
                }}>
                <Activity className="w-5 h-5 text-violet-200" />
              </motion.div>
              <h3 className="text-sm font-semibold">System Health</h3>
            </div>
            <motion.div
              animate={
                isMonitoring
                  ? {
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.7, 1],
                    }
                  : { scale: 1, opacity: 1 }
              }
              transition={{
                duration: 1,
                repeat: isMonitoring ? Infinity : 0,
                ease: "easeInOut",
              }}>
              {isMonitoring ? (
                <Pause className="w-4 h-4 text-violet-200" />
              ) : (
                <Play className="w-4 h-4 text-violet-200" />
              )}
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold mb-2">
              {isMonitoring ? "Monitoring Active" : "Start Health Monitoring"}
            </p>
            <p className="text-xs text-violet-200 hover:text-white transition-colors">
              {isMonitoring
                ? "Click to stop monitoring"
                : "Click to start monitoring"}
            </p>
          </div>
        </div>
      </motion.div>

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
        onClick={() => ui.setIsAlertsDrawerOpen(true)}
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
      {/* <ChatIcon isOpen={ui.isChatOpen} onClick={ui.toggleChat} /> */}
    </aside>
  );
}
