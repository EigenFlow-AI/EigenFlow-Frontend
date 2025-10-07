import { create } from "zustand";
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

interface NavigationState {
  activeView: ViewType;
  currentPath: string;
  navigateToView: (view: ViewType) => void;
  setCurrentPath: (path: string) => void;
  setActiveView: (view: ViewType) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  activeView: "homepage",
  currentPath: "/homepage",

  navigateToView: (view: ViewType) => {
    const path = viewToPath[view];
    if (path) {
      // This will be handled by React Router
      set({ activeView: view, currentPath: path });
    }
  },

  setCurrentPath: (path: string) => {
    const view = pathToView[path] || "homepage";
    set({ currentPath: path, activeView: view });
  },

  setActiveView: (view: ViewType) => {
    const path = viewToPath[view];
    set({ activeView: view, currentPath: path });
  },
}));
