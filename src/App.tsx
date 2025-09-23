import React from "react";
import "./index.css";
import {
  Header,
  Sidebar,
  RightSidebar,
  MobileBottomNav,
} from "./components/layout";
import { FloatingChatWindow } from "./components/chat";
import { DashboardPage } from "./components/pages/DashboardPage";
import HealthCenter from "./components/pages/HealthCenter";
import { AnalyticsPage } from "./components/pages/AnalyticsPage";
import { AlertsPage } from "./components/pages/AlertsPage";
import { SettingsPage } from "./components/pages/SettingsPage";
import { MarginReportModal } from "./components/app/MarginReportModal";
import { AlertCardDialog } from "./components/app/AlertCardDialog";
import { AlertMessagesDrawer } from "./components/app/AlertMessagesDrawer";
import { MarginCheckApi } from "./services/marginCheckApi";
import { mockAlertMessages } from "./data/mockData";
import type { ViewType, MarginReport, AlertMessage } from "./types";
import { useState } from "react";

function App() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Margin Check Modal State
  const [isMarginReportOpen, setIsMarginReportOpen] = useState(false);
  const [marginReport, setMarginReport] = React.useState<MarginReport | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Alert Messages Drawer State
  const [isAlertsDrawerOpen, setIsAlertsDrawerOpen] = React.useState(false);
  const [alertMessages, setAlertMessages] =
    React.useState<AlertMessage[]>(mockAlertMessages);
  const [activeAlert, setActiveAlert] = React.useState<AlertMessage | null>(
    null
  );
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const unreadAlertCount = React.useMemo(
    () => alertMessages.filter((a) => !a.isRead).length,
    [alertMessages]
  );
  const [latestSidebarAlert, setLatestSidebarAlert] =
    React.useState<AlertMessage | null>(null);
  const sidebarQueueRef = React.useRef<AlertMessage[]>([]);
  const intervalRef = React.useRef<number | null>(null);

  // Handle Quick Check
  const handleQuickCheck = async () => {
    setIsLoading(true);
    try {
      const report = await MarginCheckApi.performQuickCheck();
      setMarginReport(report);
      setIsMarginReportOpen(true);
    } catch (error) {
      console.error("Failed to perform quick check:", error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Action Click
  const handleActionClick = async (actionId: string) => {
    if (!marginReport) return;

    switch (actionId) {
      case "execute":
        try {
          const result = await MarginCheckApi.executeRecommendations(
            marginReport.cardId
          );
          console.log("Execute result:", result);
          // You could show a success message here
        } catch (error) {
          console.error("Failed to execute recommendations:", error);
        }
        break;
      case "simulate":
        try {
          const simulationReport = await MarginCheckApi.simulateChanges(
            marginReport.cardId
          );
          setMarginReport(simulationReport);
        } catch (error) {
          console.error("Failed to simulate changes:", error);
        }
        break;
      case "recheck":
        try {
          const updatedReport = await MarginCheckApi.recheckStatus(
            marginReport.cardId
          );
          setMarginReport(updatedReport);
        } catch (error) {
          console.error("Failed to recheck status:", error);
        }
        break;
      case "export":
        try {
          const result = await MarginCheckApi.exportToPDF(marginReport.cardId);
          if (result.success && result.downloadUrl) {
            // In a real app, you would trigger a download
            console.log("Export successful:", result.downloadUrl);
          }
        } catch (error) {
          console.error("Failed to export PDF:", error);
        }
        break;
      default:
        console.log("Unknown action:", actionId);
    }
  };

  // Handle Alert Actions
  const handleAlertAction = (alertId: string, actionId: string) => {
    const alert = alertMessages.find((a) => a.id === alertId) || null;
    if (actionId === "details") {
      setActiveAlert(alert);
      setIsAlertDialogOpen(true);
      return;
    }
    if (actionId === "recheck") {
      // For demo: simply log and mark as read
      console.log("Re-check triggered for", alertId);
      setActiveAlert(alert);
      setIsAlertDialogOpen(true);
      return;
    }
    if (actionId === "ignore") {
      setAlertMessages((prev) =>
        prev.map((a) => (a.id === alertId ? { ...a, isRead: true } : a))
      );
      return;
    }
    console.log(`Alert ${alertId} action ${actionId} clicked`);
  };

  // Handle Mark as Read
  const handleMarkAsRead = (alertId: string) => {
    setAlertMessages((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  // Handle Dismiss Sidebar Alert
  const handleDismissSidebarAlert = (id: string) => {
    // remove from center list if desired or just clear latest view
    setLatestSidebarAlert((curr) => (curr && curr.id === id ? null : curr));
    // optional: also mark read
    setAlertMessages((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
    // remove from queue head if matches
    sidebarQueueRef.current = sidebarQueueRef.current.filter(
      (a) => a.id !== id
    );
  };

  // Mock alert generation effect
  React.useEffect(() => {
    // start 10s mock push loop
    if (intervalRef.current) return;
    intervalRef.current = window.setInterval(() => {
      // generate a mock alert up to 10 items total in center
      setAlertMessages((prev) => {
        if (prev.length >= 10) return prev; // cap 10
        const id = `auto_${Date.now()}`;
        const ts = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const newAlert: AlertMessage = {
          id,
          lpId: ["LP_A", "LP_B", "LP_C"][Math.floor(Math.random() * 3)],
          lpName: "Auto",
          type: "margin_alert",
          severity:
            Math.random() > 0.6
              ? "critical"
              : Math.random() > 0.5
              ? "warn"
              : "ok",
          title: "LP Margin Alert",
          message:
            "Priority 1: Clear cross-LP hedge on EURUSD (80 lots) with LP_B. Expected to release $96k margin.",
          timestamp: ts,
          isRead: false,
          marginLevel: Math.floor(70 + Math.random() * 30),
          threshold: 90,
        };
        // push to sidebar latest
        sidebarQueueRef.current.push(newAlert);
        setLatestSidebarAlert(newAlert);
        return [...prev, newAlert];
      });
    }, 10000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);

  const handleChatSend = async (message: string) => {
    const intentPattern =
      /检查\s*([A-Za-z_-]+)\s*的?保证金|check\s+([A-Za-z_-]+)/i;
    const match = message.match(intentPattern);
    if (match) {
      const lp = (match[1] || match[2] || "").trim();
      if (lp) {
        const timeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 10000)
        );
        try {
          setIsLoading(true);
          const report = (await Promise.race([
            MarginCheckApi.getLPReport(lp),
            timeout,
          ])) as MarginReport;
          setMarginReport(report);
          setIsMarginReportOpen(true);
          // also push into chat stream via a custom event
          window.dispatchEvent(
            new CustomEvent("chat-report-ready", { detail: report })
          );
        } catch (e) {
          console.error("LP report fetch failed:", e);
        } finally {
          setIsLoading(false);
        }
        return;
      }
    }
    console.log("Message received:", message);
  };

  const renderPage = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardPage
            onQuickCheck={handleQuickCheck}
            onChatSend={handleChatSend}
          />
        );
      case "health-center":
        return <MarginCheckPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "alerts":
        return <AlertsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return (
          <DashboardPage
            onQuickCheck={handleQuickCheck}
            onChatSend={handleChatSend}
          />
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onQuickCheck={handleQuickCheck}
        isQuickCheckLoading={isLoading}
        onAlertsClick={() => setIsAlertsDrawerOpen(true)}
        unreadCount={unreadAlertCount}
      />

      <div className="flex flex-1 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          onViewChange={(view) => {
            setActiveView(view as ViewType);
            setIsMobileMenuOpen(false);
          }}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Main Content and Right Sidebar */}
        <div className="flex flex-1 min-h-0">
          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto max-w-full pb-20 lg:pb-6">
            <div className="max-w-7xl mx-auto">{renderPage()}</div>
          </main>

          {/* Right Sidebar - Responsive visibility */}
          <div className="hidden lg:block lg:w-72 xl:w-80">
            <RightSidebar
              isChatOpen={isChatOpen}
              onChatToggle={() => setIsChatOpen(!isChatOpen)}
              onOpenAlerts={() => setIsAlertsDrawerOpen(true)}
              latestAlert={latestSidebarAlert}
              onDismissAlert={handleDismissSidebarAlert}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        isChatOpen={isChatOpen}
        onChatToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Floating Chat Window */}
      <FloatingChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Margin Report Modal */}
      <MarginReportModal
        isOpen={isMarginReportOpen}
        onClose={() => setIsMarginReportOpen(false)}
        report={marginReport}
        onActionClick={handleActionClick}
      />

      {/* Alert Messages Drawer */}
      <AlertMessagesDrawer
        isOpen={isAlertsDrawerOpen}
        onClose={() => setIsAlertsDrawerOpen(false)}
        alerts={alertMessages}
        onAlertAction={handleAlertAction}
        onMarkAsRead={handleMarkAsRead}
      />

      {/* PRD Alert Card Dialog */}
      <AlertCardDialog
        isOpen={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        alert={activeAlert}
        onRecheck={(a) => {
          console.log("Recheck from dialog", a.id);
          setIsAlertDialogOpen(false);
        }}
        onDetails={(a) => {
          console.log("Details from dialog", a.id);
        }}
        onIgnore={(a) => {
          setAlertMessages((prev) =>
            prev.map((x) => (x.id === a.id ? { ...x, isRead: true } : x))
          );
          setIsAlertDialogOpen(false);
        }}
      />
    </div>
  );
}

export default App;
