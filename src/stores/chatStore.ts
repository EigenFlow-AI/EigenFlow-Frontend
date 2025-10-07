import { create } from "zustand";
import { MarginCheckApi } from "@/services/marginCheckApi";
import type { MarginReport } from "@/types";

interface ChatState {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  handleChatSend: (message: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  isChatOpen: false,

  setIsChatOpen: (open: boolean) => set({ isChatOpen: open }),

  handleChatSend: async (message: string) => {
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
          // TODO: Integrate with margin check store for loading state
          const report = (await Promise.race([
            MarginCheckApi.getLPReport(lp),
            timeout,
          ])) as MarginReport;

          // TODO: Integrate with margin check store to set report
          console.log("LP Report generated:", report);

          // also push into chat stream via a custom event
          window.dispatchEvent(
            new CustomEvent("chat-report-ready", { detail: report })
          );
        } catch (e) {
          console.error("LP report fetch failed:", e);
        }
        return;
      }
    }
    console.log("Message received:", message);
  },
}));
