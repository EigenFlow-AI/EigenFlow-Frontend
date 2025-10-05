import { Bell, Menu, CheckCircle, Database } from "lucide-react";
import logo from "@/assets/brand3-1.svg";
import { UserAvatar } from "@/components/app/UserAvatar";
import { useUIStore, useMarginCheckStore, useUnreadAlertCount } from "@/stores";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import mockApiResponse from "@/assets/assets_margin_check_apiResponse.json";

export function Header() {
  const ui = useUIStore();
  const marginCheck = useMarginCheckStore();
  const unreadAlertCount = useUnreadAlertCount();

  const displayUnread = unreadAlertCount > 0 ? unreadAlertCount : 1;
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={ui.toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle mobile menu">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-2">
            <img src={logo} alt="EigenFlow" className="w-10 h-10" />
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              PulseDeskAI
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Check Button */}
          <button
            onClick={marginCheck.handleQuickCheck}
            disabled={marginCheck.isLoading}
            className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-200"
            aria-label="Quick Check">
            <CheckCircle
              className={`w-4 h-4 ${
                marginCheck.isLoading ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">
              {marginCheck.isLoading ? "Checking..." : "Quick Check"}
            </span>
          </button>

          {/* Mock Data Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                aria-label="View Mock Data">
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Mock Data</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>API Response Data</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Complete API Response */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    Complete API Response
                  </h3>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                    {JSON.stringify(mockApiResponse, null, 2)}
                  </pre>
                </div>

                {/* Report Content Only */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    Report Content
                  </h3>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto whitespace-pre-wrap">
                    {mockApiResponse.interrupt_data?.report ||
                      "No report content available"}
                  </pre>
                </div>

                {/* Interrupt Data */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    Interrupt Data
                  </h3>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                    {JSON.stringify(mockApiResponse.interrupt_data, null, 2)}
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => ui.setIsAlertsDrawerOpen(true)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="View alerts">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] leading-none rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center">
              {displayUnread > 99 ? "99+" : displayUnread}
            </span>
          </button>

          <UserAvatar
            userName="Avatar"
            userEmail="avtar@example.com"
            onSettingsClick={() => console.log("Settings clicked")}
            onLogoutClick={() => console.log("Logout clicked")}
          />
        </div>
      </div>
    </header>
  );
}
