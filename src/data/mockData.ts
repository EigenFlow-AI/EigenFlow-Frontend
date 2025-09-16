import { MarginHealthData, AlertData, LPData } from "../types";

export const marginHealthData: MarginHealthData = {
  status: "warn" as const,
  avgMarginLevel: 65,
  lpCount: 4,
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export const alertData: AlertData = {
  lpId: "LP_A",
  marginLevel: 92,
  threshold: 85,
  recommendations: [
    {
      action: "Execute Hedge Clearance",
      description: "Clear hedged positions to reduce margin pressure",
    },
    {
      action: "Increase Collateral",
      description: "Add additional collateral to improve margin ratio",
    },
    {
      action: "Close High-Risk Positions",
      description: "Liquidate positions with highest risk exposure",
    },
  ],
};

export const lpData: LPData[] = [
  {
    id: "LP_A",
    marginLevel: 92,
    status: "critical",
    lastUpdate: "2 min ago",
  },
  { id: "LP_B", marginLevel: 45, status: "ok", lastUpdate: "5 min ago" },
  { id: "LP_C", marginLevel: 72, status: "warn", lastUpdate: "1 min ago" },
  { id: "LP_D", marginLevel: 38, status: "ok", lastUpdate: "3 min ago" },
];
