import { create } from "zustand";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { MarginReport, StatusType } from "@/types";

// Create simple MarginReport from API response
const createReportFromApiResponse = (
  reportText: string,
  threadId: string
): MarginReport => {
  // Determine status based on content
  let status: StatusType = "ok";
  if (reportText.includes("无法连接") || reportText.includes("认证失败")) {
    status = "critical";
  } else if (reportText.includes("警告") || reportText.includes("WARN")) {
    status = "warn";
  }

  return {
    cardId: threadId,
    status,
    title: "Margin Check Report",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    avgMarginLevel: 0,
    lpCount: 0,
    sections: [
      {
        id: "report_content",
        title: "Report",
        content: reportText,
        type: "analysis" as const,
      },
    ],
    actions: [
      {
        id: "recheck",
        label: "Re-check Status",
        type: "primary" as const,
        onClick: () => {},
      },
      {
        id: "export",
        label: "Export PDF",
        type: "secondary" as const,
        onClick: () => {},
      },
    ],
  };
};

interface MarginCheckState {
  isMarginReportOpen: boolean;
  marginReport: MarginReport | null;
  isLoading: boolean;
  handleQuickCheck: () => Promise<void>;
  handleActionClick: (actionId: string) => Promise<void>;
  setIsMarginReportOpen: (open: boolean) => void;
  setMarginReport: (report: MarginReport | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useMarginCheckStore = create<MarginCheckState>((set, get) => ({
  isMarginReportOpen: false,
  marginReport: null,
  isLoading: false,

  handleQuickCheck: async () => {
    set({ isLoading: true });
    try {
      const requestBody = {
        thread_id: uuidv4(),
      };

      const response = await axios.post(
        "http://0.0.0.0:8001/agent/margin-check",
        requestBody
      );
      const apiResponse = response.data;
      console.log("Margin Check API Response:", apiResponse);

      // Handle different response types
      if (
        apiResponse.type === "interrupt" &&
        apiResponse.interrupt_data?.report
      ) {
        const report = createReportFromApiResponse(
          apiResponse.interrupt_data.report,
          apiResponse.thread_id
        );
        set({ marginReport: report, isMarginReportOpen: true });
      } else if (apiResponse.type === "complete" && apiResponse.content) {
        const report = createReportFromApiResponse(
          apiResponse.content,
          apiResponse.thread_id
        );
        set({ marginReport: report, isMarginReportOpen: true });
      } else {
        console.warn("Unexpected response format:", apiResponse);
      }
    } catch (error) {
      console.error("Failed to perform quick check:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  handleActionClick: async (actionId: string) => {
    const { marginReport } = get();
    if (!marginReport) return;

    switch (actionId) {
      case "execute":
        try {
          // TODO: Implement execute recommendations API call
          console.log("Execute recommendations for:", marginReport.cardId);
        } catch (error) {
          console.error("Failed to execute recommendations:", error);
        }
        break;
      case "simulate":
        try {
          // TODO: Implement simulate changes API call
          console.log("Simulate changes for:", marginReport.cardId);
        } catch (error) {
          console.error("Failed to simulate changes:", error);
        }
        break;
      case "recheck":
        try {
          // TODO: Implement recheck status API call
          console.log("Recheck status for:", marginReport.cardId);
        } catch (error) {
          console.error("Failed to recheck status:", error);
        }
        break;
      case "export":
        try {
          // TODO: Implement export PDF API call
          console.log("Export PDF for:", marginReport.cardId);
        } catch (error) {
          console.error("Failed to export PDF:", error);
        }
        break;
      default:
        console.log("Unknown action:", actionId);
    }
  },

  setIsMarginReportOpen: (open: boolean) => set({ isMarginReportOpen: open }),
  setMarginReport: (report: MarginReport | null) =>
    set({ marginReport: report }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
