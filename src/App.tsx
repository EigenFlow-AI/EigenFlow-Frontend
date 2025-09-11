import React from "react";
import "./index.css";
import {
  Home,
  Search,
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  FileText,
  Eye,
  TrendingUp,
  TrendingDown,
  Activity,
  Send,
  Bot,
  User as UserIcon,
  Settings,
  BarChart3,
  Shield,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

// AI Chat Components
function ChatMessage({
  message,
  isUser,
  timestamp,
}: {
  message: string;
  isUser: boolean;
  timestamp: string;
}) {
  return (
    <div
      className={`flex gap-2 mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-3 h-3 text-violet-600" />
        </div>
      )}
      <div className={`max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`p-2 rounded-lg ${
            isUser ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-900"
          }`}>
          <p className="text-xs">{message}</p>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{timestamp}</p>
      </div>
      {isUser && (
        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-3 h-3 text-gray-600" />
        </div>
      )}
    </div>
  );
}

function ChatCard({
  title,
  content,
  actions,
}: {
  title: string;
  content: string;
  actions?: Array<{ label: string; type: string; onClick: () => void }>;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
      <h4 className="text-sm font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-700 mb-2">{content}</p>
      {actions && (
        <div className="flex gap-1">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.type === "primary" ? "default" : "outline"}
              size="sm"
              className={`text-xs px-2 py-1 ${
                action.type === "primary"
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300"
              }`}
              onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

function ChatInterface() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      message:
        "您好！我是PulseDeskAI助手，可以帮助您监控LP保证金水平。您可以问我：'帮我检查LP_A的保证金水平' 或 '所有LP的状态如何？'",
      isUser: false,
      timestamp: "10:00 AM",
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      message: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        message: "正在分析LP保证金数据...",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-violet-600" />
          <h3 className="text-sm font-semibold text-gray-900">AI Assistant</h3>
          <span className="ml-auto text-xs text-violet-600 bg-violet-100 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-3">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            isUser={msg.isUser}
            timestamp={msg.timestamp}
          />
        ))}

        {/* Example interactive card */}
        {messages.length > 2 && (
          <ChatCard
            title="LP_A 保证金分析报告"
            content="检测到LP_A保证金水平为90%，超过85%的临界阈值。建议优先清理与LP_B的EURUSD交叉头寸，预计可释放$96k保证金。"
            actions={[
              {
                label: "执行清理",
                type: "primary",
                onClick: () => console.log("Execute"),
              },
              {
                label: "模拟操作",
                type: "secondary",
                onClick: () => console.log("Simulate"),
              },
              {
                label: "查看详情",
                type: "secondary",
                onClick: () => console.log("Details"),
              },
            ]}
          />
        )}
      </div>

      <div className="mt-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入您的问题..."
            className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent"
          />
          <Button onClick={handleSend} size="sm" className="px-2 py-1.5">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// LP Margin Check Components
function MarginHealthCard({
  status,
  avgMarginLevel,
  lpCount,
  timestamp,
}: {
  status: "ok" | "warn" | "critical";
  avgMarginLevel: number;
  lpCount: number;
  timestamp: string;
}) {
  const statusConfig = {
    ok: {
      color: "text-green-600",
      bg: "bg-green-100",
      icon: CheckCircle,
      label: "OK",
    },
    warn: {
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      icon: AlertTriangle,
      label: "WARNING",
    },
    critical: {
      color: "text-red-600",
      bg: "bg-red-100",
      icon: XCircle,
      label: "CRITICAL",
    },
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          LP Margin Health
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.color}`}>
            <IconComponent className="w-4 h-4 inline mr-1" />
            {config.label}
          </span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Avg. Margin Level</p>
          <p className="text-2xl font-bold text-gray-900">{avgMarginLevel}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">LP Count</p>
          <p className="text-2xl font-bold text-gray-900">{lpCount}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {status === "ok" && "No critical risks detected."}
          {status === "warn" && "Some LPs approaching threshold limits."}
          {status === "critical" && "Immediate action required!"}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Eye className="w-4 h-4 mr-2" />
          View Report
        </Button>
      </div>
    </div>
  );
}

function MarginAlertCard({
  lp,
  marginLevel,
  threshold,
  recommendations,
  timestamp,
}: {
  lp: string;
  marginLevel: number;
  threshold: number;
  recommendations: Array<{
    id: string;
    type: string;
    description: string;
    priority: number;
  }>;
  timestamp: string;
}) {
  return (
    <div className="bg-white border border-red-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">LP Margin Alert</h3>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600">
            <XCircle className="w-4 h-4 inline mr-1" />
            CRITICAL
          </span>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">
          {lp} Margin Level at {marginLevel}% (Threshold: {threshold}%)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: `${Math.min(marginLevel, 100)}%` }}></div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">
          AI Analysis & Suggestions:
        </h4>
        {recommendations.map((rec) => (
          <div key={rec.id} className="mb-2 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900">
                Priority {rec.priority}:
              </span>
              <span className="text-sm text-gray-600">{rec.type}</span>
            </div>
            <p className="text-sm text-gray-700">{rec.description}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Play className="w-4 h-4 mr-2" />
          Execute Hedge Clearance
        </Button>
        <Button
          variant="outline"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Activity className="w-4 h-4 mr-2" />
          Simulate
        </Button>
        <Button
          variant="outline"
          className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
          <Eye className="w-4 h-4 mr-2" />
          Details
        </Button>
      </div>
    </div>
  );
}

function LPMarginTable({
  lps,
}: {
  lps: Array<{
    name: string;
    marginLevel: number;
    equity: number;
    marginUsed: number;
    status: "ok" | "warn" | "critical";
  }>;
}) {
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

function Icon({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl text-foreground cursor-pointer hover:bg-foreground/8 transition-colors ${
          className === "active" ? "bg-violet-100 text-violet-600" : ""
        }`}>
        {children}
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

function App() {
  const [activeView, setActiveView] = React.useState<
    "dashboard" | "margin-check" | "analytics" | "alerts" | "settings"
  >("dashboard");

  // Button interaction states
  const [isCheckingLPs, setIsCheckingLPs] = React.useState(false);
  const [isRunningAnalysis, setIsRunningAnalysis] = React.useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = React.useState(false);
  const [riskLevel, setRiskLevel] = React.useState("High Risk");
  const [notification, setNotification] = React.useState<string | null>(null);

  // Button click handlers
  const handleCheckAllLPs = async () => {
    setIsCheckingLPs(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsCheckingLPs(false);
    // Update risk level based on check results
    setRiskLevel("Medium Risk");
    setNotification("LP check completed. Risk level updated to Medium Risk.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRunAnalysis = async () => {
    setIsRunningAnalysis(true);
    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRunningAnalysis(false);
    // Update risk level
    setRiskLevel("Low Risk");
    setNotification("Analysis completed. Risk level updated to Low Risk.");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsGeneratingReport(false);
    setNotification("Report generated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRiskLevelClick = () => {
    // Cycle through risk levels
    const riskLevels = ["High Risk", "Medium Risk", "Low Risk"];
    const currentIndex = riskLevels.indexOf(riskLevel);
    const nextIndex = (currentIndex + 1) % riskLevels.length;
    setRiskLevel(riskLevels[nextIndex]);
  };

  // Demo data for LP Margin Check
  const marginHealthData = {
    status:
      riskLevel === "High Risk"
        ? ("critical" as const)
        : riskLevel === "Medium Risk"
        ? ("warn" as const)
        : ("ok" as const),
    avgMarginLevel:
      riskLevel === "High Risk" ? 78 : riskLevel === "Medium Risk" ? 65 : 45,
    lpCount: 4,
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const alertData = {
    lp: "LP_A",
    marginLevel: 90,
    threshold: 85,
    recommendations: [
      {
        id: "rec1",
        type: "CLEAR_CROSS",
        description:
          "Clear cross-LP hedge on EURUSD (80 lots) with LP_B. Expected to release $96k margin.",
        priority: 1,
      },
      {
        id: "rec2",
        type: "MOVE",
        description:
          "Move 50 lots EURUSD from LP_A to LP_C to reduce margin pressure.",
        priority: 2,
      },
    ],
    timestamp: "10:05 AM",
  };

  const lpData = [
    {
      name: "LP_A",
      marginLevel: 90,
      equity: 1250000,
      marginUsed: 1125000,
      status: "critical" as const,
    },
    {
      name: "LP_B",
      marginLevel: 65,
      equity: 980000,
      marginUsed: 637000,
      status: "ok" as const,
    },
    {
      name: "LP_C",
      marginLevel: 72,
      equity: 750000,
      marginUsed: 540000,
      status: "warn" as const,
    },
    {
      name: "LP_D",
      marginLevel: 45,
      equity: 1200000,
      marginUsed: 540000,
      status: "ok" as const,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Notification */}
      {notification && (
        <div className="bg-violet-100 border border-violet-400 text-violet-700 px-4 py-3 rounded relative mx-6 mt-2">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">PulseDeskAI</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg min-w-[300px]">
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Search LP accounts</span>
              </div>
            </div>
          </div>

          {/* Risk Level and Quick Actions */}
          <div className="flex items-center gap-4">
            {/* Risk Level */}
            <button
              onClick={handleRiskLevelClick}
              className={`rounded-lg px-3 py-2 transition-colors hover:opacity-80 ${
                riskLevel === "High Risk"
                  ? "bg-gradient-to-r from-violet-600 to-purple-600"
                  : riskLevel === "Medium Risk"
                  ? "bg-gradient-to-r from-violet-500 to-purple-500"
                  : "bg-gradient-to-r from-violet-400 to-purple-400"
              } text-white`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-semibold">{riskLevel}</span>
              </div>
            </button>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunAnalysis}
                disabled={isRunningAnalysis}
                className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
                {isRunningAnalysis ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4 mr-2" />
                )}
                {isRunningAnalysis ? "Analyzing..." : "Run Analysis"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateReport}
                disabled={isGeneratingReport}
                className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
                {isGeneratingReport ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                {isGeneratingReport ? "Generating..." : "Generate Report"}
              </Button>
            </div>

            {/* Notifications and Main Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCheckAllLPs}
                disabled={isCheckingLPs}
                className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isCheckingLPs ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Activity className="w-4 h-4" />
                )}
                {isCheckingLPs ? "Checking..." : "Check All LPs"}
              </button>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <aside className="w-20 bg-white border-r border-gray-200 py-6 px-3">
          <div className="flex flex-col items-center gap-6">
            <div
              onClick={() => setActiveView("dashboard")}
              className="cursor-pointer">
              <Icon
                className={activeView === "dashboard" ? "active" : ""}
                label="Dashboard">
                <Home className="w-5 h-5" />
              </Icon>
            </div>
            <div
              onClick={() => setActiveView("margin-check")}
              className="cursor-pointer">
              <Icon
                className={activeView === "margin-check" ? "active" : ""}
                label="Margin Check">
                <Shield className="w-5 h-5" />
              </Icon>
            </div>
            <div
              onClick={() => setActiveView("analytics")}
              className="cursor-pointer">
              <Icon
                className={activeView === "analytics" ? "active" : ""}
                label="Analytics">
                <BarChart3 className="w-5 h-5" />
              </Icon>
            </div>
            <div
              onClick={() => setActiveView("alerts")}
              className="cursor-pointer">
              <Icon
                className={activeView === "alerts" ? "active" : ""}
                label="Alerts">
                <Bell className="w-5 h-5" />
              </Icon>
            </div>
            <div
              onClick={() => setActiveView("settings")}
              className="cursor-pointer">
              <Icon
                className={activeView === "settings" ? "active" : ""}
                label="Settings">
                <Settings className="w-5 h-5" />
              </Icon>
            </div>
          </div>
        </aside>

        {/* Resizable Main Content and Chat */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Main Content */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <main className="h-full p-6 overflow-y-auto">
              {activeView === "dashboard" && (
                <>
                  {/* Welcome Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      LP Margin Check Dashboard
                    </h2>
                    <p className="text-gray-600">
                      Real-time monitoring and risk management for LP accounts
                    </p>
                  </div>

                  {/* Margin Health Card */}
                  <MarginHealthCard {...marginHealthData} />

                  {/* Critical Alert Card */}
                  <MarginAlertCard {...alertData} />

                  {/* LP Margin Table */}
                  <LPMarginTable lps={lpData} />
                </>
              )}

              {activeView === "margin-check" && (
                <>
                  {/* Welcome Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Margin Check Tools
                    </h2>
                    <p className="text-gray-600">
                      Advanced margin analysis and risk assessment tools
                    </p>
                  </div>

                  {/* Margin Health Card */}
                  <MarginHealthCard {...marginHealthData} />

                  {/* LP Margin Table */}
                  <LPMarginTable lps={lpData} />
                </>
              )}

              {activeView === "analytics" && (
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

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Coming Soon
                    </h3>
                    <p className="text-gray-600">
                      Advanced analytics and reporting features will be
                      available in the next release.
                    </p>
                  </div>
                </>
              )}

              {activeView === "alerts" && (
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
                  <MarginAlertCard {...alertData} />

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Alert History
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            LP_A Critical Alert
                          </p>
                          <p className="text-sm text-gray-600">
                            Margin level reached 90% - 2 minutes ago
                          </p>
                        </div>
                        <span className="text-xs text-red-600 font-medium">
                          CRITICAL
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            LP_C Warning Alert
                          </p>
                          <p className="text-sm text-gray-600">
                            Margin level reached 72% - 15 minutes ago
                          </p>
                        </div>
                        <span className="text-xs text-yellow-600 font-medium">
                          WARNING
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeView === "settings" && (
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

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Configuration
                    </h3>
                    <p className="text-gray-600">
                      System configuration options will be available here.
                    </p>
                  </div>
                </>
              )}
            </main>
          </ResizablePanel>

          {/* Resizable Handle */}
          <ResizableHandle withHandle />

          {/* AI Chat Panel */}
          <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
            <div className="h-full bg-white border-l border-gray-200 flex flex-col">
              {/* AI Chat Section */}
              <div className="flex-1 p-4 min-h-0">
                <ChatInterface />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default App;
