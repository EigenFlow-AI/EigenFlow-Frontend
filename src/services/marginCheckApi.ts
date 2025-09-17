import type { MarginReport } from "@/types";
import { mockMarginReport } from "@/data/mockData";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MarginCheckApi {
  /**
   * 执行一键检查，返回保证金报告
   */
  static async performQuickCheck(): Promise<MarginReport> {
    // Simulate API call delay
    await delay(1500);

    // In a real implementation, this would call the backend API
    // For now, we return mock data
    return {
      ...mockMarginReport,
      cardId: `report_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  /**
   * 重新检查状态
   */
  static async recheckStatus(cardId: string): Promise<MarginReport> {
    await delay(1000);

    // Simulate updated data
    return {
      ...mockMarginReport,
      cardId,
      status: "warn", // Simulate improvement
      avgMarginLevel: 75, // Simulate improvement
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sections: [
        ...mockMarginReport.sections.slice(0, 2),
        {
          id: "recommendations",
          title: "AI Recommendations",
          content:
            "1. (P1) Margin level improved but still requires monitoring.\n2. (P2) Consider additional position optimization.\n3. (P3) Continue monitoring GBPUSD positions.",
          type: "recommendation",
        },
      ],
    };
  }

  /**
   * 执行建议操作
   */
  static async executeRecommendations(
    cardId: string
  ): Promise<{ success: boolean; message: string }> {
    await delay(2000);

    // Simulate execution
    console.log(`Executing recommendations for card: ${cardId}`);
    return {
      success: true,
      message:
        "Recommendations executed successfully. Margin level improved to 75%.",
    };
  }

  /**
   * 模拟操作
   */
  static async simulateChanges(cardId: string): Promise<MarginReport> {
    await delay(1000);

    // Simulate simulation results
    return {
      ...mockMarginReport,
      cardId,
      status: "ok",
      avgMarginLevel: 85,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sections: [
        {
          id: "summary",
          title: "Simulation Results",
          content:
            "Simulation shows that executing the recommended actions would improve margin levels to 85% and resolve all critical alerts.",
          type: "summary",
        },
        {
          id: "analysis",
          title: "Projected Impact",
          content:
            "Clearing cross-LP hedges would release $96k in margin, bringing LP_A from 92% to 78% margin level.",
          type: "analysis",
        },
      ],
    };
  }

  /**
   * 导出PDF报告
   */
  static async exportToPDF(
    cardId: string
  ): Promise<{ success: boolean; downloadUrl?: string }> {
    await delay(1000);

    // Simulate PDF generation
    return {
      success: true,
      downloadUrl: `/api/reports/${cardId}/export.pdf`,
    };
  }
}
