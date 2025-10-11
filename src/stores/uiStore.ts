import { create } from "zustand";

interface UIState {
  // Mobile menu state
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;

  // Chat state
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;

  // Monitoring state
  isMonitoring: boolean;
  setIsMonitoring: (monitoring: boolean) => void;

  // Modal states
  isMarginReportOpen: boolean;
  isAlertsDrawerOpen: boolean;
  isAlertDialogOpen: boolean;

  // Modal actions
  setIsMarginReportOpen: (open: boolean) => void;
  setIsAlertsDrawerOpen: (open: boolean) => void;
  setIsAlertDialogOpen: (open: boolean) => void;

  // Combined actions
  closeAllModals: () => void;
  closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Mobile menu state
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Chat state
  isChatOpen: false,
  setIsChatOpen: (open: boolean) => set({ isChatOpen: open }),
  toggleChat: () => set((state) => ({ isChatOpen: !state.isChatOpen })),

  // Monitoring state
  isMonitoring: false,
  setIsMonitoring: (monitoring: boolean) => set({ isMonitoring: monitoring }),

  // Modal states
  isMarginReportOpen: false,
  isAlertsDrawerOpen: false,
  isAlertDialogOpen: false,

  // Modal actions
  setIsMarginReportOpen: (open: boolean) => set({ isMarginReportOpen: open }),
  setIsAlertsDrawerOpen: (open: boolean) => set({ isAlertsDrawerOpen: open }),
  setIsAlertDialogOpen: (open: boolean) => set({ isAlertDialogOpen: open }),

  // Combined actions
  closeAllModals: () =>
    set({
      isMarginReportOpen: false,
      isAlertsDrawerOpen: false,
      isAlertDialogOpen: false,
    }),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));
