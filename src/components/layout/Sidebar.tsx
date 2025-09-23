import React from "react";
import {
  Home,
  Shield,
  BarChart3,
  Bell,
  Settings,
  MoreHorizontal,
} from "lucide-react";

interface SidebarProps {
  activeView:
    | "dashboard"
    | "health-center"
    | "analytics"
    | "alerts"
    | "settings";
  onViewChange: (
    view: "dashboard" | "health-center" | "analytics" | "alerts" | "settings"
  ) => void;
  isMobileMenuOpen?: boolean;
}

interface IconProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  badge?: string;
}

function Icon({ children, className, label, badge }: IconProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-xl text-foreground cursor-pointer hover:bg-foreground/8 transition-colors relative ${
          className === "active" ? "bg-green-100 text-green-600" : ""
        }`}>
        {children}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded-full text-[10px]">
            {badge}
          </span>
        )}
      </div>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
}

export function Sidebar({
  activeView,
  onViewChange,
  isMobileMenuOpen,
}: SidebarProps) {
  return (
    <aside
      className={`
      fixed lg:static inset-y-0 left-0 z-50
      w-20 lg:w-20
      bg-white border-r border-gray-200 
      py-6 px-3
      transform transition-transform duration-300 ease-in-out
      ${
        isMobileMenuOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }
    `}>
      <div className="flex flex-col items-center gap-6">
        <div
          onClick={() => onViewChange("dashboard")}
          className="cursor-pointer">
          <Icon
            className={activeView === "dashboard" ? "active" : ""}
            label="Home">
            <Home className="w-5 h-5" />
          </Icon>
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(
              "Health Center clicked, calling onViewChange with health-center"
            );
            // alert("Health Center clicked!"); // 添加弹窗测试
            onViewChange("health-center");
          }}
          className="cursor-pointer text-center"
          style={{ pointerEvents: "auto" }}>
          <Icon
            className={activeView === "health-center" ? "active" : ""}
            label="Health Center">
            <Shield className="w-5 h-5" />
          </Icon>
        </div>
        <div
          onClick={() => onViewChange("analytics")}
          className="cursor-pointer">
          <Icon
            className={activeView === "analytics" ? "active" : ""}
            label="Monitor">
            <BarChart3 className="w-5 h-5" />
          </Icon>
        </div>
        <div onClick={() => onViewChange("alerts")} className="cursor-pointer">
          <Icon
            className={activeView === "alerts" ? "active" : ""}
            label="Alerts">
            <Bell className="w-5 h-5" />
          </Icon>
        </div>
        <div
          onClick={() => onViewChange("settings")}
          className="cursor-pointer">
          <Icon
            className={activeView === "settings" ? "active" : ""}
            label="Settings">
            <Settings className="w-5 h-5" />
          </Icon>
        </div>
        <div className="cursor-pointer">
          <Icon label="More">
            <MoreHorizontal className="w-5 h-5" />
          </Icon>
        </div>
      </div>
    </aside>
  );
}
