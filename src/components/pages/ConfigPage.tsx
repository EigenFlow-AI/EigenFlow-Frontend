import { useState } from "react";
import { Plus, RotateCcw, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SymbolMapping {
  id: string;
  lpName: string;
  lpApiName: string;
  symbol: string;
  pkName: string;
  multiplier: number;
  createdAt: string;
  updatedAt: string;
}

interface Alert {
  id: string;
  type: string;
  name: string;
  status: "active" | "triggered" | "paused";
  createdAt: Date;
}

export function ConfigPage() {
  const [activeTab, setActiveTab] = useState("MAPPING");
  const [isAddAlertOpen, setIsAddAlertOpen] = useState(false);
  const [configAlerts, setConfigAlerts] = useState<Alert[]>([]);

  // Mock data based on the image
  const symbolMappings: SymbolMapping[] = [
    {
      id: "1309",
      lpName: "[GBEGLOBAL]GBEGLOBAL1",
      lpApiName: "EURGBPC",
      symbol: "EURGBPC",
      pkName: "EURGBP",
      multiplier: 1,
      createdAt: "2025-08-01 01:09:42",
      updatedAt: "2025-08-01 01:09:42",
    },
    {
      id: "1310",
      lpName: "[GBEGLOBAL]GBEGLOBAL1",
      lpApiName: "XAUUSDC",
      symbol: "XAUUSDC",
      pkName: "XAUUSD",
      multiplier: 1,
      createdAt: "2025-08-01 01:09:53",
      updatedAt: "2025-08-01 01:09:53",
    },
    {
      id: "1320",
      lpName: "[GBEGLOBAL]GBEGLOBAL1",
      lpApiName: "XAGUSDC",
      symbol: "XAGUSDC",
      pkName: "XAGUSD",
      multiplier: 1,
      createdAt: "2025-08-21 22:05:59",
      updatedAt: "2025-08-21 22:05:59",
    },
    {
      id: "1323",
      lpName: "[GBEGLOBAL]GBEGLOBAL1",
      lpApiName: "XPTUSDC",
      symbol: "XPTUSDC",
      pkName: "XPTUSD",
      multiplier: 1,
      createdAt: "2025-08-23 00:13:27",
      updatedAt: "2025-08-23 00:13:27",
    },
    {
      id: "1508",
      lpName: "[CFH] MAJESTIC FIN TRADE",
      lpApiName: "AAPL.xnas",
      symbol: "AAPL.xnas",
      pkName: "AAPL.OQ",
      multiplier: 1,
      createdAt: "2025-08-23 14:31:59",
      updatedAt: "2025-08-23 14:31:59",
    },
    {
      id: "1509",
      lpName: "[CFH] MAJESTIC FIN TRADE",
      lpApiName: "AMD.xnas",
      symbol: "AMD.xnas",
      pkName: "AMD.OQ",
      multiplier: 1,
      createdAt: "2025-08-23 14:31:59",
      updatedAt: "2025-08-23 14:31:59",
    },
    {
      id: "1510",
      lpName: "[CFH] MAJESTIC FIN TRADE",
      lpApiName: "AMZN.xnas",
      symbol: "AMZN.xnas",
      pkName: "AMZN.OQ",
      multiplier: 1,
      createdAt: "2025-08-23 14:32:00",
      updatedAt: "2025-08-23 14:32:00",
    },
    {
      id: "1511",
      lpName: "[CFH] MAJESTIC FIN TRADE",
      lpApiName: "AUDCAD",
      symbol: "AUDCAD",
      pkName: "AUDCAD",
      multiplier: 1,
      createdAt: "2025-08-23 14:32:00",
      updatedAt: "2025-08-23 14:32:00",
    },
  ];

  const alertTypes = [
    { value: "config_change", label: "Config Change Alert" },
    { value: "mapping_error", label: "Mapping Error Alert" },
    { value: "account_status", label: "Account Status Alert" },
    { value: "connection_issue", label: "Connection Issue Alert" },
    { value: "data_sync", label: "Data Sync Alert" },
  ];

  const handleAddAccount = () => {
    console.log("Add account clicked");
  };

  const handleRefresh = () => {
    console.log("Refresh clicked");
  };

  const handleEdit = (id: string) => {
    console.log("Edit mapping:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete mapping:", id);
  };

  const handleAddAlert = (alertType: string) => {
    const alertTypeData = alertTypes.find((type) => type.value === alertType);
    if (alertTypeData) {
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: alertType,
        name: alertTypeData.label,
        status: "active",
        createdAt: new Date(),
      };
      setConfigAlerts([...configAlerts, newAlert]);
      setIsAddAlertOpen(false);
    }
  };

  const handleRemoveAlert = (alertId: string) => {
    setConfigAlerts(configAlerts.filter((alert) => alert.id !== alertId));
  };

  const handleToggleAlert = (alertId: string) => {
    setConfigAlerts(
      configAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: alert.status === "active" ? "paused" : "active",
            }
          : alert
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          LP Account Configuration
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage LP account mappings and symbol configurations
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("LP_ACCOUNT")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "LP_ACCOUNT"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            LP ACCOUNT
          </button>
          <button
            onClick={() => setActiveTab("POSITION_REC")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "POSITION_REC"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            POSITION REC
          </button>
          <button
            onClick={() => setActiveTab("MAPPING")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "MAPPING"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}>
            MAPPING
          </button>
        </nav>
      </div>

      {/* Symbol Mapping Content */}
      {activeTab === "MAPPING" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Symbol Mapping
            </h2>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                ALL
              </Button>
              <Button
                onClick={handleAddAccount}
                size="sm"
                className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Account
              </Button>
              <Dialog open={isAddAlertOpen} onOpenChange={setIsAddAlertOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white ">
                    <Plus className="w-4 h-4" />
                    Add Alert
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Alert</DialogTitle>
                    <DialogDescription>
                      Select an alert type to monitor this configuration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {alertTypes.map((alertType) => (
                      <Button
                        key={alertType.value}
                        onClick={() => handleAddAlert(alertType.value)}
                        variant="outline"
                        className="justify-start h-auto p-4">
                        <div className="text-left">
                          <div className="font-medium">{alertType.label}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Active Alerts Section */}
          {configAlerts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Active Alerts ({configAlerts.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {configAlerts.map((alert) => (
                  <Card
                    key={alert.id}
                    className={`relative overflow-hidden border-l-4 shadow-sm hover:shadow-md transition-all duration-200 ${
                      alert.type === "config_change"
                        ? "border-l-blue-500 bg-blue-50 dark:bg-blue-900/10"
                        : alert.type === "mapping_error"
                        ? "border-l-red-500 bg-red-50 dark:bg-red-900/10"
                        : alert.type === "account_status"
                        ? "border-l-green-500 bg-green-50 dark:bg-green-900/10"
                        : alert.type === "connection_issue"
                        ? "border-l-orange-500 bg-orange-50 dark:bg-orange-900/10"
                        : alert.type === "data_sync"
                        ? "border-l-purple-500 bg-purple-50 dark:bg-purple-900/10"
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
                        {/* Type info */}
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Type
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                            {alert.type.replace("_", " ")}
                          </div>
                        </div>

                        {/* Target info */}
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Target
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            Config Page
                          </div>
                        </div>

                        {/* Status description */}
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Description
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {alert.type === "config_change"
                              ? "Monitor configuration changes"
                              : alert.type === "mapping_error"
                              ? "Track symbol mapping errors"
                              : alert.type === "account_status"
                              ? "Monitor account status changes"
                              : alert.type === "connection_issue"
                              ? "Detect connection problems"
                              : alert.type === "data_sync"
                              ? "Monitor data synchronization"
                              : "General alert monitoring"}
                          </div>
                        </div>
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

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="w-16 text-center">ID</TableHead>
                      <TableHead className="min-w-[250px]">LP Name</TableHead>
                      <TableHead className="min-w-[150px]">
                        LP(API) Name
                      </TableHead>
                      <TableHead className="min-w-[120px]">Symbol</TableHead>
                      <TableHead className="min-w-[120px]">PK Name</TableHead>
                      <TableHead className="w-24 text-center">
                        Multiplier
                      </TableHead>
                      <TableHead className="min-w-[140px]">
                        Created At
                      </TableHead>
                      <TableHead className="min-w-[140px]">
                        Updated At
                      </TableHead>
                      <TableHead className="w-24 text-center">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {symbolMappings.map((mapping) => (
                      <TableRow
                        key={mapping.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <TableCell className="text-center font-mono text-sm">
                          {mapping.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {mapping.lpName}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {mapping.lpApiName}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {mapping.symbol}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {mapping.pkName}
                        </TableCell>
                        <TableCell className="text-center">
                          {mapping.multiplier}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {mapping.createdAt}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {mapping.updatedAt}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              onClick={() => handleEdit(mapping.id)}
                              variant="ghost"
                              size="sm"
                              className="p-2 h-8 w-8">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(mapping.id)}
                              variant="ghost"
                              size="sm"
                              className="p-2 h-8 w-8 text-red-600 hover:text-red-700">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other tab contents */}
      {activeTab === "LP_ACCOUNT" && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            LP Account configuration coming soon...
          </p>
        </div>
      )}

      {activeTab === "POSITION_REC" && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Position REC configuration coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
