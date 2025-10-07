import { useNavigate, useLocation } from "react-router-dom";
import type { ViewType } from "@/types";

// Map ViewType to route paths
const viewToPath: Record<ViewType, string> = {
  homepage: "/homepage",
  "health-center": "/health-center",
  analytics: "/analytics",
  alerts: "/alerts",
  dashboard: "/dashboard",
};

// Map route paths to ViewType
const pathToView: Record<string, ViewType> = {
  "/homepage": "homepage",
  "/health-center": "health-center",
  "/analytics": "analytics",
  "/alerts": "alerts",
  "/dashboard": "dashboard",
};

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active view from pathname
  const activeView: ViewType = pathToView[location.pathname] || "homepage";

  // Navigate to a specific view
  const navigateToView = (view: ViewType) => {
    const path = viewToPath[view];
    if (path) {
      navigate(path);
    }
  };

  return {
    activeView,
    navigateToView,
    currentPath: location.pathname,
  };
}
