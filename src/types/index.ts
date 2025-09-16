// View types
export type ViewType =
  | "dashboard"
  | "margin-check"
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
