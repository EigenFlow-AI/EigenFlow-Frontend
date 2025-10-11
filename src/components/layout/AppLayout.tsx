import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Sidebar, RightSidebar, MobileBottomNav } from "./index";
import { FloatingChatWindow } from "../chat";
import { MarginReportModal } from "../margin-check/MarginReportModal";
import { AlertCardDialog } from "../app/AlertCardDialog";
import { AlertMessagesDrawer } from "../app/AlertMessagesDrawer";
import { AppRoutes } from "../router/AppRoutes";
import { useAlertsStore, useUIStore, useNavigationStore } from "../../stores";
import { Toaster } from "../ui/sonner";
import type { ViewType } from "../../types";

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get store values
  const alerts = useAlertsStore();
  const ui = useUIStore();
  const navigation = useNavigationStore();

  // Sync navigation store with current location
  useEffect(() => {
    navigation.setCurrentPath(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Remove navigation from dependencies to avoid infinite loop

  // Start mock alerts on mount
  useEffect(() => {
    alerts.startMockAlerts();
    return () => {
      alerts.stopMockAlerts();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove alerts from dependencies to avoid infinite loop

  // Navigation handler
  const handleViewChange = (view: ViewType) => {
    // Map ViewType to route paths
    const viewToPath: Record<ViewType, string> = {
      homepage: "/homepage",
      "health-center": "/health-center",
      analytics: "/analytics",
      alerts: "/alerts",
      dashboard: "/dashboard",
    };

    const path = viewToPath[view];
    if (path) {
      navigate(path);
    }
    ui.closeMobileMenu();
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1 min-h-0">
        {/* Mobile Sidebar Overlay */}
        {ui.isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={ui.closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          activeView={navigation.activeView}
          onViewChange={handleViewChange}
          isMobileMenuOpen={ui.isMobileMenuOpen}
        />

        {/* Main Content and Right Sidebar */}
        <div className="flex flex-1 min-h-0">
          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto max-w-full pb-20 lg:pb-6">
            <div className="w-full mx-auto">
              <AppRoutes />
            </div>
          </main>

          {/* Right Sidebar - Responsive visibility */}
          <div className="hidden lg:block lg:w-72 xl:w-80">
            <RightSidebar />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Floating Chat Window */}
      <FloatingChatWindow />

      {/* Margin Report Modal */}
      <MarginReportModal />

      {/* Alert Messages Drawer */}
      <AlertMessagesDrawer />

      {/* PRD Alert Card Dialog */}
      <AlertCardDialog />

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        richColors
        duration={3000}
        theme="light"
        closeButton
      />
    </div>
  );
}
