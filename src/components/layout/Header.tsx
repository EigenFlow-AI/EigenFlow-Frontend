import { Bell, Menu } from "lucide-react";
import logo from "@/assets/brand3-1.svg";
import { UserAvatar } from "@/components/ui/UserAvatar";
interface HeaderProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
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
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              9+
            </span>
          </div>

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
