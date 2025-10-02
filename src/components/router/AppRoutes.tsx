import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import HealthCenter from "../pages/HealthCenter";
import { AnalyticsPage } from "../pages/MonitorPage";
import { ConfigPage } from "../pages/ConfigPage";
import Dashboard from "../pages/DashboardPage";

interface AppRoutesProps {
  onQuickCheck: () => void;
  onChatSend: (message: string) => void;
}

export function AppRoutes({ onQuickCheck, onChatSend }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/homepage" replace />} />
      <Route
        path="/homepage"
        element={
          <HomePage onQuickCheck={onQuickCheck} onChatSend={onChatSend} />
        }
      />
      <Route path="/health-center" element={<HealthCenter />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/alerts" element={<ConfigPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Catch all route - redirect to homepage */}
      <Route path="*" element={<Navigate to="/homepage" replace />} />
    </Routes>
  );
}
