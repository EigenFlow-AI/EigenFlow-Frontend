import React from "react";
import "./index.css";
import {
  Header,
  Sidebar,
  RightSidebar,
  MobileBottomNav,
} from "./components/layout";
import { FloatingChatWindow } from "./components/chat";
import {
  DashboardPage,
  MarginCheckPage,
  AnalyticsPage,
  AlertsPage,
  SettingsPage,
} from "./components/pages";
import { MarginReportModal } from "./components/app/MarginReportModal";
import { AlertCardDialog } from "./components/app/AlertCardDialog";
import { AlertMessagesDrawer } from "./components/app/AlertMessagesDrawer";
import { MarginCheckApi } from "./services/marginCheckApi";
import { mockAlertMessages } from "./data/mockData";
import type { ViewType, MarginReport, AlertMessage } from "./types";

function App() {
  const [activeView, setActiveView] = React.useState<ViewType>("dashboard");
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Margin Check Modal State
  const [isMarginReportOpen, setIsMarginReportOpen] = React.useState(false);
  const [marginReport, setMarginReport] = React.useState<MarginReport | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

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

  const renderPage = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage onQuickCheck={handleQuickCheck} />;
      case "margin-check":
        return <MarginCheckPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "alerts":
        return <AlertsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage onQuickCheck={handleQuickCheck} />;
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
            setActiveView(view);
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
