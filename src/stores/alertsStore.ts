import { create } from "zustand";
import { mockAlertMessages } from "@/data/mockData";
import type { AlertMessage } from "@/types";

interface AlertsState {
  alertMessages: AlertMessage[];
  activeAlert: AlertMessage | null;
  isAlertDialogOpen: boolean;
  latestSidebarAlert: AlertMessage | null;
  handleAlertAction: (alertId: string, actionId: string) => void;
  handleMarkAsRead: (alertId: string) => void;
  handleDismissSidebarAlert: (id: string) => void;
  setIsAlertDialogOpen: (open: boolean) => void;
  setAlertMessages: (
    messages: AlertMessage[] | ((prev: AlertMessage[]) => AlertMessage[])
  ) => void;
  startMockAlerts: () => void;
  stopMockAlerts: () => void;
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alertMessages: mockAlertMessages,
  activeAlert: null,
  isAlertDialogOpen: false,
  latestSidebarAlert: null,

  handleAlertAction: (alertId: string, actionId: string) => {
    const { alertMessages } = get();
    const alert = alertMessages.find((a) => a.id === alertId) || null;

    if (actionId === "details") {
      set({ activeAlert: alert, isAlertDialogOpen: true });
      return;
    }
    if (actionId === "recheck") {
      console.log("Re-check triggered for", alertId);
      set({ activeAlert: alert, isAlertDialogOpen: true });
      return;
    }
    if (actionId === "ignore") {
      set((state) => ({
        alertMessages: state.alertMessages.map((a) =>
          a.id === alertId ? { ...a, isRead: true } : a
        ),
      }));
      return;
    }
    console.log(`Alert ${alertId} action ${actionId} clicked`);
  },

  handleMarkAsRead: (alertId: string) => {
    set((state) => ({
      alertMessages: state.alertMessages.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      ),
    }));
  },

  handleDismissSidebarAlert: (id: string) => {
    set((state) => ({
      latestSidebarAlert:
        state.latestSidebarAlert?.id === id ? null : state.latestSidebarAlert,
      alertMessages: state.alertMessages.map((a) =>
        a.id === id ? { ...a, isRead: true } : a
      ),
    }));
  },

  setIsAlertDialogOpen: (open: boolean) => set({ isAlertDialogOpen: open }),

  setAlertMessages: (messages) => {
    if (typeof messages === "function") {
      set((state) => ({ alertMessages: messages(state.alertMessages) }));
    } else {
      set({ alertMessages: messages });
    }
  },

  startMockAlerts: () => {
    const intervalId = window.setInterval(() => {
      set((state) => {
        if (state.alertMessages.length >= 10) return state;

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

        return {
          alertMessages: [...state.alertMessages, newAlert],
          latestSidebarAlert: newAlert,
        };
      });
    }, 10000);

    // Store interval ID for cleanup
    (get() as any).intervalId = intervalId;
  },

  stopMockAlerts: () => {
    const intervalId = (get() as any).intervalId;
    if (intervalId) {
      clearInterval(intervalId);
      (get() as any).intervalId = null;
    }
  },
}));

// Selector for unread count - computed on demand
export const useUnreadAlertCount = () => {
  return useAlertsStore(
    (state) => state.alertMessages.filter((a) => !a.isRead).length
  );
};
