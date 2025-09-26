import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AnalyticsPage() {
  const [isAddAlertOpen, setIsAddAlertOpen] = useState(false);
  const [selectedAlertType, setSelectedAlertType] = useState<string>("");
  const [alertThreshold, setAlertThreshold] = useState<string>("");
  const [activeAlerts, setActiveAlerts] = useState<
    Array<{
      id: string;
      type: string;
      name: string;
      threshold: string;
      status: "active" | "triggered" | "paused";
      createdAt: Date;
    }>
  >([]);

  const alertTypes = [
    {
      id: "pnl_loss",
      name: "P&L Loss Alert",
      description: "Alert when P&L drops below threshold",
      unit: "USD",
      placeholder: "e.g. -5000",
    },
    {
      id: "exposure_limit",
      name: "Exposure Limit Alert",
      description: "Alert when exposure exceeds limit",
      unit: "USD",
      placeholder: "e.g. 100000",
    },
    {
      id: "position_size",
      name: "Position Size Alert",
      description: "Alert when position size is too large",
      unit: "Lots",
      placeholder: "e.g. 10",
    },
    {
      id: "margin_call",
      name: "Margin Call Alert",
      description: "Alert when margin requirements are not met",
      unit: "%",
      placeholder: "e.g. 80",
    },
    {
      id: "volatility",
      name: "Volatility Alert",
      description: "Alert when market volatility is high",
      unit: "%",
      placeholder: "e.g. 5",
    },
  ];

  const handleAddAlert = () => {
    if (!selectedAlertType || !alertThreshold.trim()) {
      return;
    }

    const selectedAlert = alertTypes.find(
      (alert) => alert.id === selectedAlertType
    );
    if (selectedAlert) {
      const newAlert = {
        id: Date.now().toString(),
        type: selectedAlertType,
        name: selectedAlert.name,
        threshold: alertThreshold,
        status: "active" as const,
        createdAt: new Date(),
      };
      setActiveAlerts((prev) => [...prev, newAlert]);
    }

    // Reset form
    setSelectedAlertType("");
    setAlertThreshold("");
    setIsAddAlertOpen(false);
  };

  const handleRemoveAlert = (alertId: string) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
  };

  const handleToggleAlert = (alertId: string) => {
    setActiveAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: alert.status === "active" ? "paused" : "active",
            }
          : alert
      )
    );
  };

  const tradingData = [
    {
      symbol: "XAUUSD",
      long: 0.01,
      short: 0.0,
      netLot: 0.01,
      exposure: "3,653.05",
      dailyNet: -3800.79,
      unrealizedEOD: 19.21,
      realizedEOD: "-3,820.00",
      unrealizedMT: 5.14,
      realizedMT: "-3,820.00",
      longVWAP: "3647.91",
      shortVWAP: "0.00",
    },
  ];

  const booksData = [
    { book: "UNKNOWN_A", npnl: 0.0, cpnl: 0.0, fpnl: 0.0 },
    { book: "UNKNOWN_B", npnl: 0.0, cpnl: 0.0, fpnl: 0.0 },
    { book: "S", npnl: -5512.42, cpnl: 1298.34, fpnl: -552041.21 },
    { book: "B", npnl: -3800.79, cpnl: -3820.0, fpnl: 19.21 },
    { book: "Test", npnl: 11385.83, cpnl: 6806.31, fpnl: 4579.54 },
    { book: "Rebate", npnl: 0.0, cpnl: 0.0, fpnl: 0.0 },
    { book: "Hedge", npnl: 0.0, cpnl: 0.0, fpnl: 0.0 },
    { book: "Broker_Hedge", npnl: 0.0, cpnl: 0.0, fpnl: 0.0 },
  ];

  const formatNumber = (num: number | string) => {
    if (typeof num === "string") return num;
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const getCellColor = (value: number | string) => {
    if (typeof value === "string") {
      const numValue = parseFloat(value.replace(/,/g, ""));
      if (!isNaN(numValue)) {
        if (numValue > 0) return "text-emerald-600 dark:text-emerald-400";
        if (numValue < 0) return "text-red-600 dark:text-red-400";
      }
      return "text-gray-900 dark:text-gray-100";
    }
    if (typeof value === "number") {
      if (value > 0) return "text-emerald-600 dark:text-emerald-400";
      if (value < 0) return "text-red-600 dark:text-red-400";
    }
    return "text-gray-900 dark:text-gray-100";
  };

  return (
    <div className="space-y-8  min-h-screen">
      {/* Welcome Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-3">
          Book Monitor & Risk Alert
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
          Live book overview and real-time risk signals with comprehensive
          analytics
        </p>

        {/* Action Menu */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
          {/* Left side - Key metrics */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800">
                Unrealized: <span className="font-bold ml-1">+19.21</span>
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                Realized: <span className="font-bold ml-1">-3,820.00</span>
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                Daily Net: <span className="font-bold ml-1">-3,800.79</span>
              </span>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-3">
            {/* Add Alert Dialog */}
            <Dialog open={isAddAlertOpen} onOpenChange={setIsAddAlertOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Alert
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Add New Alert
                  </DialogTitle>
                  <DialogDescription>
                    Choose an alert type and set the threshold value to monitor
                    your trading positions and risk levels.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Alert Type Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">Alert Type</Label>
                    <div className="grid gap-3">
                      {alertTypes.map((alert) => (
                        <button
                          key={alert.id}
                          onClick={() => setSelectedAlertType(alert.id)}
                          className={`p-4 text-left border rounded-lg transition-colors group ${
                            selectedAlertType === alert.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          }`}>
                          <div className="flex items-center gap-3">
                            {alert.id === "pnl_loss" && (
                              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20 group-hover:bg-red-200 dark:group-hover:bg-red-900/40">
                                <svg
                                  className="w-5 h-5 text-red-600 dark:text-red-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                                  />
                                </svg>
                              </div>
                            )}
                            {alert.id === "exposure_limit" && (
                              <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/20 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40">
                                <svg
                                  className="w-5 h-5 text-orange-600 dark:text-orange-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                              </div>
                            )}
                            {alert.id === "position_size" && (
                              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40">
                                <svg
                                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                  />
                                </svg>
                              </div>
                            )}
                            {alert.id === "margin_call" && (
                              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40">
                                <svg
                                  className="w-5 h-5 text-purple-600 dark:text-purple-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                  />
                                </svg>
                              </div>
                            )}
                            {alert.id === "volatility" && (
                              <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/40">
                                <svg
                                  className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                  />
                                </svg>
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">
                                {alert.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {alert.description}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Threshold Input */}
                  {selectedAlertType && (
                    <div className="space-y-3">
                      <Label
                        htmlFor="threshold"
                        className="text-base font-medium">
                        Threshold Value
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="threshold"
                          type="number"
                          value={alertThreshold}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAlertThreshold(e.target.value)
                          }
                          placeholder={
                            alertTypes.find((a) => a.id === selectedAlertType)
                              ?.placeholder
                          }
                          className="flex-1"
                        />
                        <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border text-sm font-medium text-gray-600 dark:text-gray-400">
                          {
                            alertTypes.find((a) => a.id === selectedAlertType)
                              ?.unit
                          }
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Set the threshold value that will trigger this alert.
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedAlertType("");
                        setAlertThreshold("");
                        setIsAddAlertOpen(false);
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddAlert}
                      disabled={!selectedAlertType || !alertThreshold.trim()}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Add Alert
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* More Options Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>View Options</DropdownMenuLabel>
                <DropdownMenuItem>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 3.31 4 7 4s7-1.79 7-4V7c0-2.21-3.31-4-7-4S4 4.79 4 7z"
                    />
                  </svg>
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Display Settings</DropdownMenuLabel>
                <DropdownMenuItem>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Column Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                    />
                  </svg>
                  Auto-refresh
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear All Alerts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Active Alerts Section */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Active Alerts ({activeAlerts.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activeAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`relative overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-all duration-200 ${
                  alert.type === "pnl_loss"
                    ? "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                    : alert.type === "exposure_limit"
                    ? "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10"
                    : alert.type === "position_size"
                    ? "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    : alert.type === "margin_call"
                    ? "border-l-purple-500 bg-purple-50 dark:bg-purple-900/10"
                    : alert.type === "volatility"
                    ? "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10"
                    : "border-l-gray-500 bg-gray-50 dark:bg-gray-900/10"
                }`}>
                <CardContent className="p-4">
                  {/* Header row with title and actions */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base text-gray-900 dark:text-gray-100 leading-tight">
                        {alert.name.replace(" Alert", "")}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title={alert.status === "active" ? "暂停" : "开始"}>
                        {alert.status === "active" ? (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v6m4-6v6"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleRemoveAlert(alert.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove alert">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="space-y-3">
                    {/* Login info */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Login
                      </div>
                      <div className="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
                        MT5:60{Math.floor(Math.random() * 1000)}
                      </div>
                    </div>

                    {/* Name info */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Name
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {alert.type === "pnl_loss"
                          ? "P&L Monitor"
                          : alert.type === "exposure_limit"
                          ? "Exposure Tracker"
                          : alert.type === "position_size"
                          ? "Position Monitor"
                          : alert.type === "margin_call"
                          ? "Margin Watch"
                          : alert.type === "volatility"
                          ? "Vol Monitor"
                          : "Alert Monitor"}
                      </div>
                    </div>

                    {/* Symbol/Books info */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {alert.type === "pnl_loss" ||
                        alert.type === "volatility"
                          ? "Symbol"
                          : "Books"}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {alert.type === "pnl_loss" ||
                        alert.type === "volatility"
                          ? "XAUUSD"
                          : "B"}
                      </div>
                    </div>

                    {/* Threshold info */}
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Threshold
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {alert.threshold}{" "}
                        {alertTypes.find((a) => a.id === alert.type)?.unit}
                      </div>
                    </div>

                    {/* Additional info based on type */}
                    {(alert.type === "pnl_loss" ||
                      alert.type === "exposure_limit") && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Current Value
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {alert.type === "pnl_loss"
                            ? "-3,800.79 USD"
                            : "3,653.05 USD"}
                        </div>
                      </div>
                    )}

                    {alert.type === "position_size" && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Current Size
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          0.01 Lots
                        </div>
                      </div>
                    )}

                    {alert.type === "margin_call" && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Current Margin
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {(Math.random() * 100).toFixed(1)}%
                        </div>
                      </div>
                    )}

                    {alert.type === "volatility" && (
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Current Volatility
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {(Math.random() * 10).toFixed(2)}%
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          alert.status === "active"
                            ? "bg-green-500"
                            : alert.status === "triggered"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {alert.status.charAt(0).toUpperCase() +
                          alert.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {alert.createdAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Trading Position Table - Takes up 2/3 of the width */}
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    Trading Positions
                  </CardTitle>
                  <p className="text-blue-100 text-sm mt-1">
                    Symbol-level PnL and exposures snapshot
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                      <TableHead className="text-left font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        Symbol
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[80px]">
                        Long
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[80px]">
                        Short
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[90px]">
                        Net Lot
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[110px]">
                        Exposure
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        Daily Net
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[120px]">
                        Unrealized (EOD)
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[110px]">
                        Realized (EOD)
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[120px]">
                        Unrealized (MT)
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[110px]">
                        Realized (MT)
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        Long VWAP
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        Short VWAP
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradingData.map((row, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors border-b border-slate-100 dark:border-slate-700">
                        <TableCell className="font-bold text-slate-900 dark:text-slate-100 text-left px-4 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium whitespace-nowrap">
                            {row.symbol}
                          </span>
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300 px-4 py-4 whitespace-nowrap">
                          {formatNumber(row.long)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300 px-4 py-4 whitespace-nowrap">
                          {formatNumber(row.short)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300 px-4 py-4 whitespace-nowrap">
                          {formatNumber(row.netLot)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-semibold text-slate-900 dark:text-slate-100 px-4 py-4 whitespace-nowrap">
                          {row.exposure}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            row.dailyNet
                          )}`}>
                          {formatNumber(row.dailyNet)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            row.unrealizedEOD
                          )}`}>
                          {formatNumber(row.unrealizedEOD)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            row.realizedEOD
                          )}`}>
                          {row.realizedEOD}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            row.unrealizedMT
                          )}`}>
                          {formatNumber(row.unrealizedMT)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            row.realizedMT
                          )}`}>
                          {row.realizedMT}
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300 px-4 py-4 whitespace-nowrap">
                          {row.longVWAP}
                        </TableCell>
                        <TableCell className="text-right font-mono text-slate-700 dark:text-slate-300 px-4 py-4 whitespace-nowrap">
                          {row.shortVWAP}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Books Summary Table - Takes up 1/3 of the width */}
        <div className="xl:col-span-1">
          <Card className="shadow-xl border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm h-fit">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">
                    All Books Summary
                  </CardTitle>
                  <p className="text-indigo-100 text-sm mt-1">
                    PnL overview across books
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
                      <TableHead className="text-left font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[120px]">
                        Book
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        NPNL
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        CPNL
                      </TableHead>
                      <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-200 px-4 py-3 min-w-[100px]">
                        FPNL
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {booksData.map((book, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors border-b border-slate-100 dark:border-slate-700">
                        <TableCell className="font-semibold text-slate-900 dark:text-slate-100 text-left px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium">
                            {book.book}
                          </span>
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            book.npnl
                          )}`}>
                          {formatNumber(book.npnl)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            book.cpnl
                          )}`}>
                          {formatNumber(book.cpnl)}
                        </TableCell>
                        <TableCell
                          className={`text-right font-mono font-bold px-4 py-4 whitespace-nowrap ${getCellColor(
                            book.fpnl
                          )}`}>
                          {formatNumber(book.fpnl)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
