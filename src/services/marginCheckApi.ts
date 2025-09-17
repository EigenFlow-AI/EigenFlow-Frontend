import type { MarginReport } from "@/types";
import { mockMarginReport } from "@/data/mockData";
import { mockLPReportData } from "@/data/mockData";

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
   * 获取指定LP的保证金报告（基于mock数据）
   */
  static async getLPReport(lpNameOrId: string): Promise<MarginReport> {
    await delay(800);
    const term = lpNameOrId.trim().toLowerCase();
    const match = mockLPReportData.find(
      (lp) => lp.lpName.toLowerCase() === term || lp.lpId.toLowerCase() === term
    );

    // 基于mockMarginReport生成一份LP专属报告
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (match) {
      const status = match.status;
      const sections = [
        {
          id: "summary",
          title: `${match.lpName} Margin Summary`,
          content: `${match.lpName} margin level at ${
            match.marginLevel
          }% with equity $${match.equity.toLocaleString()} and margin used $${match.marginUsed.toLocaleString()}.`,
          type: "summary" as const,
        },
        {
          id: "analysis",
          title: "Risk Analysis",
          content: `Positions: ${match.positions
            .map((p) => `${p.symbol} ${p.side} ${p.size} lots`)
            .join("; ")}.`,
          type: "analysis" as const,
        },
        {
          id: "recommendations",
          title: "AI Recommendations",
          content:
            status === "critical"
              ? "(P0) Reduce high-risk exposure and consider clearing cross-LP hedges."
              : status === "warn"
              ? "(P1) Monitor margin closely and optimize positions if pressure increases."
              : "(P2) Margin is healthy. Continue monitoring.",
          type: "recommendation" as const,
        },
      ];

      return {
        ...mockMarginReport,
        cardId: `lp_${match.lpId}_${Date.now()}`,
        title: `${match.lpName} Margin Report`,
        timestamp: now,
        status,
        avgMarginLevel: match.marginLevel,
        lpCount: 1,
        sections,
      };
    }

    // 未匹配时返回通用报告
    return {
      ...mockMarginReport,
      cardId: `lp_unknown_${Date.now()}`,
      title: `Margin Report`,
      timestamp: now,
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
