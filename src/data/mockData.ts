import type {
  MarginHealthData,
  AlertData,
  LPData,
  MarginReport,
  LPReportData,
  CrossPositionCandidate,
  AlertMessage,
} from "../types";

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

// Mock Margin Report Data
export const mockMarginReport: MarginReport = {
  cardId: "report_001",
  status: "critical",
  title: "LP Margin Health Check",
  timestamp: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
  avgMarginLevel: 65,
  lpCount: 4,
  sections: [
    {
      id: "summary",
      title: "Executive Summary",
      content:
        "Critical margin levels detected across multiple LPs. Immediate action required to prevent potential liquidation events.",
      type: "summary",
    },
    {
      id: "analysis",
      title: "Risk Analysis",
      content:
        "LP_A is at 92% margin level (threshold: 90%), indicating high risk. Cross-LP hedge opportunities identified that could release $96k in margin.",
      type: "analysis",
    },
    {
      id: "recommendations",
      title: "AI Recommendations",
      content:
        "1. (P0) Clear cross-LP hedge on EURUSD (80 lots) with LP_B. Expected to release $96k margin.\n2. (P1) Consider moving 20 lots of EURUSD from LP_A to LP_C.\n3. (P2) Monitor GBPUSD positions for additional optimization opportunities.",
      type: "recommendation",
    },
  ],
  actions: [
    {
      id: "execute",
      label: "Execute Recommendations",
      type: "primary",
      onClick: () => console.log("Execute clicked"),
    },
    {
      id: "simulate",
      label: "Simulate Changes",
      type: "secondary",
      onClick: () => console.log("Simulate clicked"),
    },
    {
      id: "recheck",
      label: "Re-check Status",
      type: "secondary",
      onClick: () => console.log("Re-check clicked"),
    },
    {
      id: "export",
      label: "Export PDF",
      type: "secondary",
      onClick: () => console.log("Export clicked"),
    },
  ],
};

export const mockLPReportData: LPReportData[] = [
  {
    lpId: "LP_A",
    lpName: "LMAX",
    marginLevel: 92,
    equity: 1250000,
    marginUsed: 1150000,
    status: "critical",
    positions: [
      { symbol: "EURUSD", side: "long", size: 100, margin: 200000, pnl: 15000 },
      { symbol: "GBPUSD", side: "short", size: 50, margin: 150000, pnl: -5000 },
    ],
  },
  {
    lpId: "LP_B",
    lpName: "OneZero",
    marginLevel: 45,
    equity: 800000,
    marginUsed: 360000,
    status: "ok",
    positions: [
      { symbol: "EURUSD", side: "short", size: 80, margin: 160000, pnl: 8000 },
      { symbol: "USDJPY", side: "long", size: 30, margin: 90000, pnl: 2000 },
    ],
  },
  {
    lpId: "LP_C",
    lpName: "CFH",
    marginLevel: 72,
    equity: 600000,
    marginUsed: 432000,
    status: "warn",
    positions: [
      { symbol: "AUDUSD", side: "long", size: 40, margin: 120000, pnl: -3000 },
      { symbol: "USDCAD", side: "short", size: 25, margin: 75000, pnl: 1000 },
    ],
  },
];

export const mockCrossPositionCandidates: CrossPositionCandidate[] = [
  {
    id: "cross_001",
    symbol: "EURUSD",
    lp1: "LP_A",
    lp2: "LP_B",
    size1: 100,
    size2: 80,
    potentialMarginRelease: 96000,
    priority: 1,
  },
  {
    id: "cross_002",
    symbol: "GBPUSD",
    lp1: "LP_A",
    lp2: "LP_C",
    size1: 50,
    size2: 30,
    potentialMarginRelease: 45000,
    priority: 2,
  },
];

// Mock Alert Messages
export const mockAlertMessages: AlertMessage[] = [
  {
    id: "alert_001",
    lpId: "LP_A",
    lpName: "LMAX",
    type: "margin_alert",
    severity: "critical",
    title: "Critical Margin Level Alert",
    message:
      "LP_A margin level has reached 92% (threshold: 90%). Immediate action required to prevent liquidation risk.",
    timestamp: "2 minutes ago",
    isRead: false,
    marginLevel: 92,
    threshold: 90,
    actions: [
      {
        id: "quick_check",
        label: "Quick Check",
        type: "primary",
        onClick: () => console.log("Quick check clicked"),
      },
      {
        id: "view_details",
        label: "View Details",
        type: "secondary",
        onClick: () => console.log("View details clicked"),
      },
    ],
  },
  {
    id: "alert_002",
    lpId: "LP_C",
    lpName: "CFH",
    type: "margin_alert",
    severity: "warn",
    title: "Margin Level Warning",
    message:
      "LP_C margin level is at 72% and approaching warning threshold. Monitor closely for potential issues.",
    timestamp: "15 minutes ago",
    isRead: false,
    marginLevel: 72,
    threshold: 75,
    actions: [
      {
        id: "monitor",
        label: "Monitor",
        type: "secondary",
        onClick: () => console.log("Monitor clicked"),
      },
    ],
  },
  {
    id: "alert_003",
    lpId: "LP_B",
    lpName: "OneZero",
    type: "position_alert",
    severity: "ok",
    title: "Position Optimization Available",
    message:
      "Cross-LP hedge opportunity detected on EURUSD. Clearing this position could release $96k in margin.",
    timestamp: "1 hour ago",
    isRead: true,
    actions: [
      {
        id: "optimize",
        label: "Optimize",
        type: "primary",
        onClick: () => console.log("Optimize clicked"),
      },
      {
        id: "dismiss",
        label: "Dismiss",
        type: "secondary",
        onClick: () => console.log("Dismiss clicked"),
      },
    ],
  },
  {
    id: "alert_004",
    lpId: "LP_D",
    lpName: "XTX",
    type: "system_alert",
    severity: "warn",
    title: "Connection Latency Warning",
    message:
      "High latency detected on LP_D connection. Response time increased to 150ms. Consider failover options.",
    timestamp: "2 hours ago",
    isRead: true,
    actions: [
      {
        id: "check_connection",
        label: "Check Connection",
        type: "secondary",
        onClick: () => console.log("Check connection clicked"),
      },
    ],
  },
  {
    id: "alert_005",
    lpId: "LP_A",
    lpName: "LMAX",
    type: "liquidation_risk",
    severity: "critical",
    title: "Liquidation Risk Detected",
    message:
      "Multiple large positions on LP_A showing high correlation risk. Consider position diversification.",
    timestamp: "3 hours ago",
    isRead: true,
    actions: [
      {
        id: "diversify",
        label: "Diversify Positions",
        type: "primary",
        onClick: () => console.log("Diversify clicked"),
      },
      {
        id: "reduce_risk",
        label: "Reduce Risk",
        type: "danger",
        onClick: () => console.log("Reduce risk clicked"),
      },
    ],
  },
  {
    id: "alert_006",
    lpId: "LP_E",
    lpName: "Goldman Sachs",
    type: "margin_alert",
    severity: "warn",
    title: "Margin Level Approaching Threshold",
    message:
      "LP_E margin level is at 78% and approaching the 80% warning threshold. Consider reducing position sizes.",
    timestamp: "4 hours ago",
    isRead: true,
    marginLevel: 78,
    threshold: 80,
    actions: [
      {
        id: "reduce_positions",
        label: "Reduce Positions",
        type: "secondary",
        onClick: () => console.log("Reduce positions clicked"),
      },
    ],
  },
  {
    id: "alert_007",
    lpId: "LP_F",
    lpName: "JPMorgan",
    type: "system_alert",
    severity: "ok",
    title: "System Health Check Passed",
    message:
      "All systems on LP_F are operating normally. Connection latency is within acceptable limits.",
    timestamp: "5 hours ago",
    isRead: true,
    actions: [
      {
        id: "acknowledge",
        label: "Acknowledge",
        type: "secondary",
        onClick: () => console.log("Acknowledge clicked"),
      },
    ],
  },
  {
    id: "alert_008",
    lpId: "LP_A",
    lpName: "LMAX",
    type: "position_alert",
    severity: "warn",
    title: "Large Position Detected",
    message:
      "EURUSD position on LP_A has grown to 150 lots. Consider position diversification to reduce risk.",
    timestamp: "6 hours ago",
    isRead: true,
    actions: [
      {
        id: "diversify",
        label: "Diversify",
        type: "primary",
        onClick: () => console.log("Diversify clicked"),
      },
      {
        id: "monitor",
        label: "Monitor",
        type: "secondary",
        onClick: () => console.log("Monitor clicked"),
      },
    ],
  },
  {
    id: "alert_009",
    lpId: "LP_G",
    lpName: "Citadel",
    type: "margin_alert",
    severity: "critical",
    title: "Critical Margin Alert",
    message:
      "LP_G margin level has reached 95% (threshold: 90%). Immediate action required to prevent liquidation.",
    timestamp: "7 hours ago",
    isRead: true,
    marginLevel: 95,
    threshold: 90,
    actions: [
      {
        id: "emergency_action",
        label: "Emergency Action",
        type: "danger",
        onClick: () => console.log("Emergency action clicked"),
      },
      {
        id: "add_collateral",
        label: "Add Collateral",
        type: "primary",
        onClick: () => console.log("Add collateral clicked"),
      },
    ],
  },
  {
    id: "alert_010",
    lpId: "LP_H",
    lpName: "Virtu",
    type: "liquidation_risk",
    severity: "warn",
    title: "Correlation Risk Warning",
    message:
      "High correlation detected between positions on LP_H. Consider hedging strategies to reduce risk exposure.",
    timestamp: "8 hours ago",
    isRead: true,
    actions: [
      {
        id: "hedge_positions",
        label: "Hedge Positions",
        type: "primary",
        onClick: () => console.log("Hedge positions clicked"),
      },
      {
        id: "review_strategy",
        label: "Review Strategy",
        type: "secondary",
        onClick: () => console.log("Review strategy clicked"),
      },
    ],
  },
];
