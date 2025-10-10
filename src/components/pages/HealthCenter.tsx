import React from "react";
import {
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { AlertCardsStatus } from "@/components/alert/AlertCardsStatus";

interface PositionBreak {
  id: string;
  symbol: string;
  takerVolume: number;
  makerVolume: number;
  breakVolume: number;
  breakPercentage: number;
  status: "ok" | "warning" | "critical";
  lastChecked: string;
  possibleCauses: string[];
  recommendedActions: string[];
}

interface TakerMakerPosition {
  symbol: string;
  contractSize: number;
  multiplier: number;
  taker: {
    pkPosition: number; // in lots
    book: string;
  };
  maker: {
    lp1Position: number;
    lp2Position: number;
    lp3Position: number;
    totalPosition: number;
  };
  expectedMakerPosition: number;
  actualBreak: number;
  breakStatus: "ok" | "warning" | "critical";
}

export default function HealthCenter() {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState("24h");
  const [showDetailedPanel, setShowDetailedPanel] = React.useState(true);

  // Mock Position Break Data
  const positionBreaks: PositionBreak[] = [
    {
      id: "break1",
      symbol: "EURUSD",
      takerVolume: 125.5,
      makerVolume: 120.0,
      breakVolume: 5.5,
      breakPercentage: 4.4,
      status: "warning",
      lastChecked: "2 min ago",
      possibleCauses: [
        "LP order execution delay",
        "Bridge routing configuration",
        "Network latency during peak hours",
      ],
      recommendedActions: [
        "Manual hedge 5.5 lots on LMAX",
        "Check bridge order logs",
        "Verify LP connectivity",
      ],
    },
    {
      id: "break2",
      symbol: "GBPUSD",
      takerVolume: 89.2,
      makerVolume: 95.0,
      breakVolume: -5.8,
      breakPercentage: -6.5,
      status: "critical",
      lastChecked: "1 min ago",
      possibleCauses: [
        "Failed order cancellation on LP side",
        "Symbol mapping misconfiguration",
        "API timeout during order submission",
      ],
      recommendedActions: [
        "Close 5.8 lots immediately on CFH",
        "Review symbol mapping settings",
        "Restart bridge connection",
      ],
    },
    {
      id: "break3",
      symbol: "USDJPY",
      takerVolume: 67.1,
      makerVolume: 67.1,
      breakVolume: 0,
      breakPercentage: 0,
      status: "ok",
      lastChecked: "1 min ago",
      possibleCauses: [],
      recommendedActions: [],
    },
  ];

  // Mock Taker/Maker Position Data
  const takerMakerPositions: TakerMakerPosition[] = [
    {
      symbol: "EURUSD",
      contractSize: 100000,
      multiplier: 1,
      taker: {
        pkPosition: 125.5,
        book: "STP_BOOK_A",
      },
      maker: {
        lp1Position: 50.0, // LMAX
        lp2Position: 45.0, // CFH
        lp3Position: 25.0, // OneZero
        totalPosition: 120.0,
      },
      expectedMakerPosition: 125.5,
      actualBreak: 5.5,
      breakStatus: "warning",
    },
    {
      symbol: "GBPUSD",
      contractSize: 100000,
      multiplier: 1,
      taker: {
        pkPosition: 89.2,
        book: "STP_BOOK_B",
      },
      maker: {
        lp1Position: 35.0,
        lp2Position: 40.0,
        lp3Position: 20.0,
        totalPosition: 95.0,
      },
      expectedMakerPosition: 89.2,
      actualBreak: -5.8,
      breakStatus: "critical",
    },
    {
      symbol: "USDJPY",
      contractSize: 100000,
      multiplier: 1,
      taker: {
        pkPosition: 67.1,
        book: "STP_BOOK_A",
      },
      maker: {
        lp1Position: 25.0,
        lp2Position: 22.1,
        lp3Position: 20.0,
        totalPosition: 67.1,
      },
      expectedMakerPosition: 67.1,
      actualBreak: 0,
      breakStatus: "ok",
    },
    {
      symbol: "AUDUSD",
      contractSize: 100000,
      multiplier: 1,
      taker: {
        pkPosition: 45.3,
        book: "STP_BOOK_C",
      },
      maker: {
        lp1Position: 18.0,
        lp2Position: 15.3,
        lp3Position: 12.0,
        totalPosition: 45.3,
      },
      expectedMakerPosition: 45.3,
      actualBreak: 0,
      breakStatus: "ok",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
      case "good":
        return "text-green-600 bg-green-50 border-green-200";
      case "warn":
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Center</h2>
        <p className="text-gray-600">
          Comprehensive margin monitoring and risk management dashboard
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Timeframe:
            </span>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
              title="Select timeframe">
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Position Reconciliation Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Position Reconciliation
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-gray-500">
                  Last Check: {new Date().toLocaleTimeString()}
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Alert View
                  </span>
                  <Switch
                    checked={showDetailedPanel}
                    onCheckedChange={setShowDetailedPanel}
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors">
                  Run Check
                </button>
              </div>
            </div>
          </div>

          {/* Position Breaks Summary */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            {showDetailedPanel && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    Total Symbols
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {takerMakerPositions.length}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">No Break</div>
                  <div className="text-2xl font-bold text-green-600">
                    {positionBreaks.filter((p) => p.status === "ok").length}
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Warnings</div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {
                      positionBreaks.filter((p) => p.status === "warning")
                        .length
                    }
                  </div>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Critical</div>
                  <div className="text-2xl font-bold text-red-600">
                    {
                      positionBreaks.filter((p) => p.status === "critical")
                        .length
                    }
                  </div>
                </div>
              </div>
            )}

            {!showDetailedPanel && (
              /* Simplified Summary View */
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3 sm:mb-4">
                  Account Check Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Overall Status
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ATTENTION REQUIRED
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {
                        positionBreaks.filter((p) => p.status === "critical")
                          .length
                      }{" "}
                      critical and{" "}
                      {
                        positionBreaks.filter((p) => p.status === "warning")
                          .length
                      }{" "}
                      warning issues detected
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Position Accuracy
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {Math.round(
                          (positionBreaks.filter((p) => p.status === "ok")
                            .length /
                            positionBreaks.length) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {positionBreaks.filter((p) => p.status === "ok").length}{" "}
                      of {positionBreaks.length} symbols have perfect
                      reconciliation
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Total Break Volume
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {positionBreaks
                          .reduce((acc, p) => acc + Math.abs(p.breakVolume), 0)
                          .toFixed(1)}{" "}
                        lots
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Combined absolute break volume across all symbols
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        LP Connections
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ALL ACTIVE
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      All LP accounts are connected and operational
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Last Reconciliation
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        RECENT
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Completed at {new Date().toLocaleTimeString()} with{" "}
                      {positionBreaks.filter((p) => p.status !== "ok").length}{" "}
                      issues found
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Next Check
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        AUTO SCHEDULED
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Automatic reconciliation in{" "}
                      {Math.floor(Math.random() * 5 + 1)} minutes
                    </p>
                  </div>
                </div>

                {(positionBreaks.filter((p) => p.status === "critical").length >
                  0 ||
                  positionBreaks.filter((p) => p.status === "warning").length >
                    0) && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        Immediate Attention Required
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      The following symbols require immediate action to resolve
                      position breaks:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {positionBreaks
                        .filter((p) => p.status !== "ok")
                        .map((breakItem) => (
                          <span
                            key={breakItem.id}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              breakItem.status === "critical"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {breakItem.symbol} (
                            {breakItem.breakVolume > 0 ? "+" : ""}
                            {breakItem.breakVolume} lots)
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {showDetailedPanel && (
            <>
              {/* Position Breaks Details - Only show when detailed panel is open */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="space-y-4">
                  {positionBreaks
                    .filter((p) => p.status !== "ok")
                    .map((breakItem) => (
                      <div
                        key={breakItem.id}
                        className={`border rounded-lg p-4 ${
                          breakItem.status === "critical"
                            ? "border-red-200 bg-red-50"
                            : "border-yellow-200 bg-yellow-50"
                        }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">
                              {breakItem.symbol}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                breakItem.status === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {breakItem.status.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {breakItem.lastChecked}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-600">
                              Taker Volume
                            </div>
                            <div className="font-medium">
                              {breakItem.takerVolume} lots
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Maker Volume
                            </div>
                            <div className="font-medium">
                              {breakItem.makerVolume} lots
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              Break Volume
                            </div>
                            <div
                              className={`font-medium ${
                                breakItem.breakVolume > 0
                                  ? "text-red-600"
                                  : "text-orange-600"
                              }`}>
                              {breakItem.breakVolume > 0 ? "+" : ""}
                              {breakItem.breakVolume} lots (
                              {breakItem.breakPercentage > 0 ? "+" : ""}
                              {breakItem.breakPercentage}%)
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Possible Causes:
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {breakItem.possibleCauses.map((cause, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2">
                                  <span className="text-gray-400">•</span>
                                  <span>{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Recommended Actions:
                            </div>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {breakItem.recommendedActions.map(
                                (action, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2">
                                    <span className="text-gray-400">•</span>
                                    <span>{action}</span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                            View Details
                          </button>
                          <button
                            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                              breakItem.status === "critical"
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "bg-yellow-600 hover:bg-yellow-700 text-white"
                            }`}>
                            Take Action
                          </button>
                          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                            Export Report
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Detailed Position Table */}
              <div className="p-4 sm:p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-3 sm:mb-4">
                  Taker vs Maker Position Details
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700">
                          Symbol
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700 hidden sm:table-cell">
                          MT4/MT5
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700 hidden lg:table-cell">
                          LP1
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700 hidden lg:table-cell">
                          LP2
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700 hidden lg:table-cell">
                          LP3
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700">
                          Total
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700">
                          Break
                        </th>
                        <th className="text-left py-2 sm:py-3 px-1 sm:px-2 font-medium text-gray-700">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {takerMakerPositions.map((position) => (
                        <tr
                          key={position.symbol}
                          className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium">
                            {position.symbol}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 hidden sm:table-cell">
                            {position.taker.pkPosition}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 hidden lg:table-cell">
                            {position.maker.lp1Position}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 hidden lg:table-cell">
                            {position.maker.lp2Position}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 hidden lg:table-cell">
                            {position.maker.lp3Position}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2 font-medium">
                            {position.maker.totalPosition}
                          </td>
                          <td
                            className={`py-2 sm:py-3 px-1 sm:px-2 font-medium ${
                              position.actualBreak === 0
                                ? "text-green-600"
                                : Math.abs(position.actualBreak) > 3
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}>
                            {position.actualBreak === 0
                              ? "0"
                              : (position.actualBreak > 0 ? "+" : "") +
                                position.actualBreak}
                          </td>
                          <td className="py-2 sm:py-3 px-1 sm:px-2">
                            <span
                              className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                position.breakStatus
                              )}`}>
                              {position.breakStatus.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Alert Cards Status and Risk Alerts */}
        <div className="flex flex-col gap-6">
          {/* Alert Cards Status */}
          <AlertCardsStatus />

          {/* Risk Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Active Risk Alerts
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">
                      GBPUSD Position Break
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    Critical break detected: -5.8 lots gap between taker and
                    maker positions
                  </p>
                  <div className="mt-3">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Fix Break
                    </button>
                  </div>
                </div>

                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">
                      CFH Margin Critical
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    Margin level at 92%, exceeding 90% threshold
                  </p>
                  <div className="mt-3">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Take Action
                    </button>
                  </div>
                </div>

                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      EURUSD Position Warning
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Position break detected: +5.5 lots gap, possible LP
                    execution delay
                  </p>
                  <div className="mt-3">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Monitor
                    </button>
                  </div>
                </div>

                <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">
                      LMAX Margin Warning
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Margin level at 85%, approaching 90% threshold
                  </p>
                  <div className="mt-3">
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Monitor
                    </button>
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">
                      Bridge Connection
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Monitoring bridge latency - may affect position
                    reconciliation timing
                  </p>
                  <div className="mt-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Review
                    </button>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      Auto-Hedge Active
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    S-book positions are being automatically hedged across all
                    LP accounts
                  </p>
                  <div className="mt-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
