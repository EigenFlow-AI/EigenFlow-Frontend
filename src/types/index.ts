// View types
export type ViewType =
  | "dashboard"
  | "health-center"
  | "analytics"
  | "alerts"
  | "settings";

// Status types
export type StatusType = "ok" | "warn" | "critical";

// Chat types
export interface Message {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatCardAction {
  label: string;
  type: string;
  onClick: () => void;
}

// LP Margin types
export interface LPData {
  id: string;
  marginLevel: number;
  status: StatusType;
  lastUpdate: string;
}

export interface LPTableData {
  name: string;
  marginLevel: number;
  equity: number;
  marginUsed: number;
  status: StatusType;
}

export interface MarginHealthData {
  status: StatusType;
  avgMarginLevel: number;
  lpCount: number;
  timestamp: string;
}

export interface Recommendation {
  id: string;
  type: string;
  description: string;
  priority: number;
}

export interface AlertData {
  lpId: string;
  marginLevel: number;
  threshold: number;
  recommendations: Array<{
    action: string;
    description: string;
  }>;
}

// Margin Report types
export interface MarginReport {
  cardId: string;
  status: StatusType;
  title: string;
  timestamp: string;
  avgMarginLevel: number;
  lpCount: number;
  sections: ReportSection[];
  actions: ReportAction[];
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  type: "summary" | "analysis" | "recommendation";
}

export interface ReportAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "danger";
  onClick: () => void;
}

export interface LPReportData {
  lpId: string;
  lpName: string;
  marginLevel: number;
  equity: number;
  marginUsed: number;
  status: StatusType;
  positions: PositionData[];
}

export interface PositionData {
  symbol: string;
  side: "long" | "short";
  size: number;
  margin: number;
  pnl: number;
}

export interface CrossPositionCandidate {
  id: string;
  symbol: string;
  lp1: string;
  lp2: string;
  size1: number;
  size2: number;
  potentialMarginRelease: number;
  priority: number;
}

// Alert Message types
export interface AlertMessage {
  id: string;
  lpId: string;
  lpName: string;
  type: "margin_alert" | "liquidation_risk" | "position_alert" | "system_alert";
  severity: StatusType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  marginLevel?: number;
  threshold?: number;
  actions?: AlertAction[];
}

export interface AlertAction {
  id: string;
  label: string;
  type: "primary" | "secondary" | "danger";
  onClick: () => void;
}
