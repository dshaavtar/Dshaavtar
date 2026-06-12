import { useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useAuth } from "../App";
import type { PipelineEnv } from "./PipelineSelector";
import PipelineSelector from "./PipelineSelector";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/orders": "Orders",
  "/users": "Users",
  "/merchants": "Merchants",
  "/products": "Products",
  "/chatbot": "Chatbot Simulator",
  "/whatsapp-config": "WhatsApp Configuration",
  "/whatsapp-export": "WhatsApp Script Export",
  "/flow-designer": "Flow Designer",
  "/jobs": "Job Listings",
  "/properties": "Property Listings",
  "/analytics": "Analytics",
  "/subscriptions": "Subscription Plans",
  "/rate-cards": "Delivery Rate Cards",
  "/ondc": "ONDC Enrollment",
  "/notifications": "Notifications",
};

interface HeaderProps {
  onMenuClick: () => void;
  onEnvChange?: (env: PipelineEnv) => void;
}

export default function Header({ onMenuClick, onEnvChange }: HeaderProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const title = PAGE_TITLES[currentPath] ?? "LocalBazar Kart 🛒";
  const { username, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <header className="bg-card border-b border-border px-4 md:px-6 h-14 flex items-center gap-4 flex-shrink-0 shadow-xs">
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="font-display font-semibold text-foreground text-base truncate">
        {title}
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 w-48 lg:w-64">
        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          data-ocid="header-search"
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      {/* Pipeline selector */}
      <PipelineSelector onEnvChange={onEnvChange} />

      {/* Dark mode toggle */}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        data-ocid="header-theme-toggle"
        className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Notification bell */}
      <button
        type="button"
        data-ocid="header-notifications"
        className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
      </button>

      {/* User dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          data-ocid="header-user-menu"
          className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted transition-colors"
          aria-label="User menu"
          aria-expanded={dropdownOpen}
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-primary-foreground uppercase">
              {username?.charAt(0) ?? "A"}
            </span>
          </div>
          <span className="hidden md:block text-sm font-medium text-foreground capitalize">
            {username ?? "Admin"}
          </span>
          <ChevronDown
            className={`hidden md:block w-3.5 h-3.5 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {dropdownOpen && (
          <>
            <button
              type="button"
              className="fixed inset-0 z-10 cursor-default w-full h-full border-0 bg-transparent"
              onClick={() => setDropdownOpen(false)}
              aria-label="Close dropdown"
            />
            <div className="absolute right-0 top-full mt-1 w-44 bg-popover border border-border rounded-lg shadow-elevated z-20 py-1 animate-slide-up">
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-foreground capitalize">
                  {username ?? "Admin"}
                </p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
                data-ocid="header-logout"
                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
