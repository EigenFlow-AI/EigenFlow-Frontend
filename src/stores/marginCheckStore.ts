import { create } from "zustand";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import type { MarginReport, StatusType } from "@/types";
import { useUIStore } from "./uiStore";
import { downloadJSON } from "@/utils/download";
import { BASE_URL } from "@/services/api";

// Create simple MarginReport from API response
const createReportFromApiResponse = (
  reportText: string,
  threadId: string,
  accountsDetail?: Record<string, string>
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
      hour12: true,
    }),
    avgMarginLevel: 0,
    lpCount: 0,
    threadId: threadId,
    accountsDetail,
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
  marginReport: MarginReport | null;
  isLoading: boolean;
  isRechecking: boolean;
  handleQuickCheck: () => Promise<void>;
  handleActionClick: (actionId: string) => Promise<void>;
  setMarginReport: (report: MarginReport | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useMarginCheckStore = create<MarginCheckState>((set, get) => ({
  marginReport: null,
  isLoading: false,
  isRechecking: false,

  handleQuickCheck: async () => {
    set({ isLoading: true });
    try {
      const requestBody = {
        thread_id: uuidv4(),
      };

      const response = await axios.post(
        `${BASE_URL}/agent/margin-check`,
        requestBody
      );
      const apiResponse = response.data;
      // download apiResponse to assets/margin_check_apiResponse.json
      console.log("margin check apiResponse", apiResponse);
      downloadJSON(apiResponse, "margin_check_apiResponse.json");

      // Handle different response types
      if (
        apiResponse.type === "interrupt" &&
        apiResponse.interrupt_data?.report
      ) {
        const report = createReportFromApiResponse(
          apiResponse.interrupt_data.report,
          apiResponse.thread_id,
          apiResponse.accounts_detail
        );
        set({ marginReport: report });
        // 使用 uiStore 来控制弹窗显示
        useUIStore.getState().setIsMarginReportOpen(true);
      } else if (apiResponse.type === "complete" && apiResponse.content) {
        const report = createReportFromApiResponse(
          apiResponse.content,
          apiResponse.thread_id
        );
        set({ marginReport: report });
        // 使用 uiStore 来控制弹窗显示
        useUIStore.getState().setIsMarginReportOpen(true);
      } else if (apiResponse.type === "error") {
        // 处理错误响应
        console.error("API returned error:", apiResponse);
        const errorMessage = apiResponse.error || "Unknown error occurred";

        // 创建错误报告
        const errorReport = createReportFromApiResponse(
          `错误: ${errorMessage}\n\n请检查:\n1. 后端服务是否正常运行\n2. 网络连接是否正常\n3. 端口 8001 是否可访问`,
          apiResponse.thread_id || uuidv4()
        );
        errorReport.status = "critical";
        set({ marginReport: errorReport });
        useUIStore.getState().setIsMarginReportOpen(true);
      } else {
        console.warn("Unexpected response format:", apiResponse);
        // 尝试处理其他可能的响应格式
        if (apiResponse.report || apiResponse.content || apiResponse.message) {
          const reportText =
            apiResponse.report || apiResponse.content || apiResponse.message;
          const report = createReportFromApiResponse(
            reportText,
            apiResponse.thread_id || uuidv4()
          );
          set({ marginReport: report });
          useUIStore.getState().setIsMarginReportOpen(true);
        } else {
          // 完全未知的响应格式
          const unknownReport = createReportFromApiResponse(
            "收到未知格式的响应，请检查后端服务状态",
            apiResponse.thread_id || uuidv4()
          );
          unknownReport.status = "warn";
          set({ marginReport: unknownReport });
          useUIStore.getState().setIsMarginReportOpen(true);
        }
      }
    } catch (error) {
      console.error("Failed to perform quick check:", error);

      // 创建网络错误报告
      let errorMessage = "网络连接失败";
      let errorDetails = "请检查网络连接和后端服务状态";

      if (axios.isAxiosError(error)) {
        if (
          error.code === "ECONNREFUSED" ||
          error.message.includes("Can't assign requested address")
        ) {
          errorMessage = "无法连接到后端服务";
          errorDetails = "请确保后端服务在 http://0.0.0.0:8001 上正常运行";
        } else if (error.code === "ENOTFOUND") {
          errorMessage = "服务器地址无法解析";
          errorDetails = "请检查服务器地址配置";
        } else if (error.code === "ETIMEDOUT") {
          errorMessage = "请求超时";
          errorDetails = "后端服务响应时间过长，请稍后重试";
        } else {
          errorMessage = `网络错误: ${error.message}`;
          errorDetails = "请检查网络连接";
        }
      }

      const networkErrorReport = createReportFromApiResponse(
        `${errorMessage}\n\n${errorDetails}\n\n错误详情: ${
          error instanceof Error ? error.message : String(error)
        }`,
        uuidv4()
      );
      networkErrorReport.status = "critical";
      set({ marginReport: networkErrorReport });
      useUIStore.getState().setIsMarginReportOpen(true);
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
          set({ isRechecking: true });
          const req_body = {
            thread_id: marginReport.threadId,
          };
          const response = await axios.post(
            `${BASE_URL}/agent/margin-check/recheck`,
            req_body
          );
          const apiResponse = response.data;
          console.log("Recheck status for:", marginReport.cardId);
          console.log("Recheck status apiResponse", apiResponse);

          if (
            apiResponse.type === "interrupt" &&
            apiResponse.interrupt_data?.report
          ) {
            const report = createReportFromApiResponse(
              apiResponse.interrupt_data.report,
              apiResponse.thread_id || marginReport.cardId,
              apiResponse.accounts_detail
            );
            set({ marginReport: report });
          } else if (apiResponse.type === "complete" && apiResponse.content) {
            const report = createReportFromApiResponse(
              apiResponse.content,
              apiResponse.thread_id || marginReport.cardId,
              apiResponse.accounts_detail
            );
            set({ marginReport: report });
          }
        } catch (error) {
          console.error("Failed to recheck status:", error);
        } finally {
          set({ isRechecking: false });
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

  setMarginReport: (report: MarginReport | null) =>
    set({ marginReport: report }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
