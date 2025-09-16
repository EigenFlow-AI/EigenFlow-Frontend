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
import type { ViewType } from "./types";

function App() {
  const [activeView, setActiveView] = React.useState<ViewType>("dashboard");
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderPage = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardPage />;
      case "margin-check":
        return <MarginCheckPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "alerts":
        return <AlertsPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
    </div>
  );
}

export default App;
