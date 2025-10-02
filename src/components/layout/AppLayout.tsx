import { useState, useEffect } from "react";
import { Header, Sidebar, RightSidebar, MobileBottomNav } from "./index";
import { FloatingChatWindow } from "../chat";
import { MarginReportModal } from "../app/MarginReportModal";
import { AlertCardDialog } from "../app/AlertCardDialog";
import { AlertMessagesDrawer } from "../app/AlertMessagesDrawer";
import { AppRoutes } from "../router/AppRoutes";
import { useNavigation } from "../../hooks/useNavigation";
import {
  useMarginCheckStore,
  useAlertsStore,
  useChatStore,
} from "../../stores";
import type { ViewType } from "../../types";

export function AppLayout() {
  const { activeView, navigateToView } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get store values
  const marginCheck = useMarginCheckStore();
  const alerts = useAlertsStore();
  const chat = useChatStore();

  // Start mock alerts on mount
  useEffect(() => {
    alerts.startMockAlerts();
    return () => {
      alerts.stopMockAlerts();
    };
  }, [alerts]);

  // Navigation handler
  const handleViewChange = (view: string) => {
    navigateToView(view as ViewType);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onQuickCheck={marginCheck.handleQuickCheck}
        isQuickCheckLoading={marginCheck.isLoading}
        onAlertsClick={() => alerts.setIsAlertsDrawerOpen(true)}
        unreadCount={alerts.unreadAlertCount}
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
          onViewChange={handleViewChange}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Main Content and Right Sidebar */}
        <div className="flex flex-1 min-h-0">
          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto max-w-full pb-20 lg:pb-6">
            <div className="w-full mx-auto">
              <AppRoutes
                onQuickCheck={marginCheck.handleQuickCheck}
                onChatSend={chat.handleChatSend}
              />
            </div>
          </main>

          {/* Right Sidebar - Responsive visibility */}
          <div className="hidden lg:block lg:w-72 xl:w-80">
            <RightSidebar
              isChatOpen={chat.isChatOpen}
              onChatToggle={() => chat.setIsChatOpen(!chat.isChatOpen)}
              onOpenAlerts={() => alerts.setIsAlertsDrawerOpen(true)}
              latestAlert={alerts.latestSidebarAlert}
              onDismissAlert={alerts.handleDismissSidebarAlert}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        isChatOpen={chat.isChatOpen}
        onChatToggle={() => chat.setIsChatOpen(!chat.isChatOpen)}
      />

      {/* Floating Chat Window */}
      <FloatingChatWindow
        isOpen={chat.isChatOpen}
        onClose={() => chat.setIsChatOpen(false)}
      />

      {/* Margin Report Modal */}
      <MarginReportModal
        isOpen={marginCheck.isMarginReportOpen}
        onClose={() => marginCheck.setIsMarginReportOpen(false)}
        report={marginCheck.marginReport}
        onActionClick={marginCheck.handleActionClick}
      />

      {/* Alert Messages Drawer */}
      <AlertMessagesDrawer
        isOpen={alerts.isAlertsDrawerOpen}
        onClose={() => alerts.setIsAlertsDrawerOpen(false)}
        alerts={alerts.alertMessages}
        onAlertAction={alerts.handleAlertAction}
        onMarkAsRead={alerts.handleMarkAsRead}
      />

      {/* PRD Alert Card Dialog */}
      <AlertCardDialog
        isOpen={alerts.isAlertDialogOpen}
        onClose={() => alerts.setIsAlertDialogOpen(false)}
        alert={alerts.activeAlert}
        onRecheck={(a) => {
          console.log("Recheck from dialog", a.id);
          alerts.setIsAlertDialogOpen(false);
        }}
        onDetails={(a) => {
          console.log("Details from dialog", a.id);
        }}
        onIgnore={(a) => {
          alerts.setAlertMessages((prev) =>
            prev.map((x) => (x.id === a.id ? { ...x, isRead: true } : x))
          );
          alerts.setIsAlertDialogOpen(false);
        }}
      />
    </div>
  );
}
