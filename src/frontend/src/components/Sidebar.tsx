import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  BookMarked,
  BookOpen,
  Bot,
  Briefcase,
  Bus,
  Calendar,
  CheckCircle,
  Code2,
  CreditCard,
  Database,
  Factory,
  FileJson,
  FileText,
  GitBranch,
  Globe,
  GraduationCap,
  HandHeart,
  HeadphonesIcon,
  Heart,
  Home,
  Landmark,
  Languages,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Monitor,
  Package,
  Palette,
  Phone,
  Receipt,
  Send,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Stethoscope,
  Store,
  Tag,
  TerminalSquare,
  ToggleLeft,
  TrendingUp,
  Trophy,
  Truck,
  Umbrella,
  UploadCloud,
  UserPlus,
  Users,
  Users2,
  Vote,
  Wrench,
  X,
} from "lucide-react";
import {
  useActiveOrderCount,
  useAdhocJobStats,
  useMarketplaceItems,
  useModuleStatuses,
} from "../hooks/useBackend";

interface NavItem {
  label: string;
  path: string;
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  moduleKey?: string;
  adminOnly?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
  moduleKey?: string;
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Flow Agent",
    items: [
      {
        id: "flow-agent",
        label: "Flow Agent",
        path: "/flow-agent",
        icon: Bot,
      },
    ],
  },
  {
    title: "Core",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        id: "orders",
        label: "Orders",
        path: "/orders",
        icon: ShoppingCart,
        moduleKey: "Shopping",
      },
      { id: "users", label: "Users & Customers", path: "/users", icon: Users },
      {
        id: "merchants",
        label: "Merchants",
        path: "/merchants",
        icon: Store,
        moduleKey: "Shopping",
      },
      {
        id: "products",
        label: "Products",
        path: "/products",
        icon: Package,
        moduleKey: "Shopping",
      },
      {
        id: "restock-orders",
        label: "Restock Orders",
        path: "/restock-orders",
        icon: ShoppingBag,
        moduleKey: "Shopping",
      },
    ],
  },
  {
    title: "Chatbot",
    items: [
      {
        id: "chatbot",
        label: "Chatbot Simulator",
        path: "/chatbot",
        icon: MessageSquareText,
      },
      {
        id: "chat-simulator-multirole",
        label: "Multi-Role Simulator",
        path: "/chat-simulator-multirol",
        icon: Users,
      },
      {
        id: "whatsapp-config",
        label: "WhatsApp Config",
        path: "/whatsapp-config",
        icon: Settings,
      },
      {
        id: "telegram-config",
        label: "Telegram",
        path: "/telegram-config",
        icon: Send,
      },
      {
        id: "flow-designer",
        label: "Flow Designer",
        path: "/flow-designer",
        icon: GitBranch,
      },
      {
        id: "whatsapp-export",
        label: "WhatsApp Script",
        path: "/whatsapp-export",
        icon: FileJson,
      },
      {
        id: "telegram-script",
        label: "Telegram Script",
        path: "/telegram-script",
        icon: Send,
        moduleKey: "Telegram",
      },
      {
        id: "sms-script",
        label: "SMS Script",
        path: "/sms-script",
        icon: Phone,
        moduleKey: "SMS",
      },
      {
        id: "script-executor",
        label: "Script Executor",
        path: "/script-executor",
        icon: TerminalSquare,
      },
      {
        id: "bot-logs",
        label: "Bot Logs",
        path: "/bot-logs",
        icon: Activity,
      },
      {
        id: "sms-config",
        label: "SMS Configuration",
        path: "/sms-config",
        icon: Phone,
        moduleKey: "SMS",
      },
    ],
  },
  {
    title: "Marketplace",
    items: [
      {
        id: "jobs",
        label: "Jobs",
        path: "/jobs",
        icon: Briefcase,
        moduleKey: "Jobs",
      },
      {
        id: "adhoc-jobs",
        label: "Daily Jobs",
        path: "/adhoc-jobs",
        icon: Briefcase,
        moduleKey: "Jobs",
      },
      {
        id: "properties",
        label: "Properties",
        path: "/properties",
        icon: Home,
        moduleKey: "Property",
      },
      {
        id: "blogs",
        label: "Blogs",
        path: "/blogs",
        icon: BookOpen,
      },
      {
        id: "recipes",
        label: "Recipes",
        path: "/recipes",
        icon: BookOpen,
      },
      {
        id: "marketplace",
        label: "Old Items",
        path: "/marketplace",
        icon: Tag,
        moduleKey: "Shopping",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        id: "community",
        label: "Community Members",
        path: "/community",
        icon: Users2,
      },
      {
        id: "lending",
        label: "Lending",
        path: "/lending",
        icon: BookMarked,
        moduleKey: "lending",
      },
      {
        id: "family",
        label: "Family Groups",
        path: "/family",
        icon: Users,
        moduleKey: "Family",
      },
      {
        id: "events",
        label: "Events",
        path: "/events",
        icon: Calendar,
        moduleKey: "Events",
      },
      {
        id: "matrimony",
        label: "Matrimony Members",
        path: "/matrimony",
        icon: Heart,
        moduleKey: "Family",
      },
      {
        id: "donations",
        label: "Donations",
        path: "/donations",
        icon: HandHeart,
      },
    ],
  },
  {
    title: "Transport",
    items: [
      {
        id: "shuttle-routes",
        label: "Shuttle Routes",
        path: "/shuttle-routes",
        icon: Bus,
      },
    ],
  },
  {
    title: "Role Dashboards",
    items: [
      {
        id: "merchant-dashboard",
        label: "Merchant Dashboard",
        path: "/merchant-dashboard",
        icon: Store,
      },
      {
        id: "merchant-manufacturer-products",
        label: "Browse Mfr. Products",
        path: "/merchant-manufacturer-products",
        icon: Factory,
      },
      {
        id: "delivery-dashboard",
        label: "Delivery Dashboard",
        path: "/delivery-dashboard",
        icon: Truck,
      },
      {
        id: "customer-dashboard",
        label: "Customer Dashboard",
        path: "/customer-dashboard",
        icon: Users,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        id: "market-commodity",
        label: "Market & Commodity",
        path: "/market-commodity",
        icon: TrendingUp,
      },
      {
        id: "match-scores",
        label: "Today's Matches ⚽🏏",
        path: "/match-scores",
        icon: Trophy,
      },
      {
        id: "election-results",
        label: "Election Results 🗳️",
        path: "/election-results",
        icon: Vote,
      },
    ],
  },
  {
    title: "Services & Bookings",
    items: [
      {
        id: "healthcare",
        label: "Healthcare",
        path: "/healthcare",
        icon: Stethoscope,
        moduleKey: "Healthcare",
      },
      {
        id: "tours",
        label: "Tours & Travel",
        path: "/tours",
        icon: Umbrella,
        moduleKey: "Tours",
      },
      {
        id: "professional-services",
        label: "Professional Services",
        path: "/professional-services",
        icon: Wrench,
        moduleKey: "Professional",
      },
    ],
  },
  {
    title: "Manufacturer",
    items: [
      {
        id: "manufacturer-dashboard",
        label: "Mfr. Dashboard",
        path: "/manufacturer-dashboard",
        icon: Factory,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-registration",
        label: "Mfr. Registration",
        path: "/manufacturer-registration",
        icon: Factory,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-products",
        label: "Mfr. Products",
        path: "/manufacturer-products",
        icon: Package,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-distributors",
        label: "Distributor Network",
        path: "/manufacturer-distributors",
        icon: Users,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-returns",
        label: "Expiry Returns",
        path: "/manufacturer-returns",
        icon: ShoppingBag,
        badge: "Returns",
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-complaints",
        label: "Complaints",
        path: "/manufacturer-complaints",
        icon: ShieldAlert,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-ratings",
        label: "Ratings",
        path: "/manufacturer-ratings",
        icon: Tag,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-pos",
        label: "Manufacturer POS",
        path: "/manufacturer-pos",
        icon: Monitor,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-employees",
        label: "Employees",
        path: "/manufacturer-employees",
        icon: Users,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-inventory",
        label: "Inventory Register",
        path: "/manufacturer-inventory",
        icon: Package,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-sales",
        label: "Sales",
        path: "/manufacturer-sales",
        icon: TrendingUp,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-purchases",
        label: "Purchases & Restock",
        path: "/manufacturer-purchases",
        icon: ShoppingCart,
        moduleKey: "Manufacturer",
      },
      {
        id: "manufacturer-accounts",
        label: "Accounts & Bills",
        path: "/manufacturer-accounts",
        icon: Receipt,
        moduleKey: "Manufacturer",
      },
    ],
  },
  {
    title: "Fun Learning",
    moduleKey: "language_learning",
    items: [
      {
        id: "language-learning",
        label: "Courses",
        path: "/language-learning",
        icon: GraduationCap,
      },
      {
        id: "word-search",
        label: "Word Search",
        path: "/word-search",
        icon: Globe,
      },
      {
        id: "language-learning-approvals",
        label: "Course Approvals",
        path: "/admin/language-learning-approvals",
        icon: CheckCircle,
        adminOnly: true,
      },
      {
        id: "word-definitions",
        label: "Word Definitions",
        path: "/admin/word-definitions",
        icon: Languages,
        adminOnly: true,
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        id: "analytics",
        label: "Analytics",
        path: "/analytics",
        icon: BarChart3,
      },
      {
        id: "subscriptions",
        label: "Subscription Plans",
        path: "/subscriptions",
        icon: CreditCard,
      },
      {
        id: "subscription-dashboard",
        label: "Subscription Dashboard",
        path: "/subscription-dashboard",
        icon: BarChart3,
      },
      {
        id: "delivery-assignment",
        label: "Delivery Assignment",
        path: "/delivery-assignment",
        icon: Truck,
      },
      {
        id: "load-sample-data",
        label: "Load Sample Data",
        path: "/load-sample-data",
        icon: Database,
      },
      {
        id: "rate-cards",
        label: "Rate Cards",
        path: "/rate-cards",
        icon: Truck,
      },
      { id: "ondc", label: "ONDC Setup", path: "/ondc", icon: Globe },
      {
        id: "modules",
        label: "Module Toggle",
        path: "/modules",
        icon: ToggleLeft,
      },
      {
        id: "notifications",
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
      },
      {
        id: "role-management",
        label: "Role Management",
        path: "/role-management",
        icon: ShieldCheck,
      },
      {
        id: "import-export",
        label: "Import / Export",
        path: "/import-export",
        icon: UploadCloud,
      },
      {
        id: "api-panel",
        label: "API Panel",
        path: "/api-panel",
        icon: Code2,
      },
      {
        id: "data-explorer",
        label: "Data Explorer",
        path: "/data-explorer",
        icon: Database,
      },
      {
        id: "moderation",
        label: "AI Moderation",
        path: "/moderation",
        icon: ShieldAlert,
      },
      {
        id: "support-tickets",
        label: "Support Tickets",
        path: "/support-tickets",
        icon: HeadphonesIcon,
      },
      {
        id: "merchant-contacts",
        label: "Merchant Contacts",
        path: "/merchant-contacts",
        icon: UserPlus,
      },
      {
        id: "pos-merchant",
        label: "Merchant POS",
        path: "/merchant-pos",
        icon: Monitor,
      },
      {
        id: "pos-delivery",
        label: "Delivery POS",
        path: "/delivery-pos",
        icon: Truck,
      },
      {
        id: "paysprint-config",
        label: "PaySprint API",
        path: "/admin/paysprint-config",
        icon: Landmark,
        badge: "NEW",
      },
      {
        id: "customer-ratings",
        label: "Customer Ratings",
        path: "/customer-ratings",
        icon: Star,
      },
      {
        id: "branding",
        label: "Branding",
        path: "/branding",
        icon: Palette,
      },
      {
        id: "menu-repository",
        label: "Menu Repository",
        path: "/menu-repository",
        icon: BookMarked,
      },
      {
        id: "project-docs",
        label: "Project Documentation",
        path: "/admin/project-docs",
        icon: FileText,
      },
      {
        id: "advertisement",
        label: "Promotions",
        path: "/admin/advertisement",
        icon: Megaphone,
        adminOnly: true,
      },
    ],
  },
];

interface SidebarProps {
  onClose: () => void;
  permissions?: string[];
}

export default function Sidebar({ onClose, permissions }: SidebarProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: activeOrderCount } = useActiveOrderCount();
  const { data: moduleStatuses = {} } = useModuleStatuses();
  const { data: marketplaceItems = [] } = useMarketplaceItems();
  const { data: adhocJobStats } = useAdhocJobStats();
  const activeMarketplaceCount = marketplaceItems.filter(
    (i: { isActive: boolean }) => i.isActive,
  ).length;
  const adhocJobCount = adhocJobStats ? Number(adhocJobStats.totalActive) : 0;

  const hasPermissionFilter = permissions && permissions.length > 0;

  function isAllowed(item: NavItem): boolean {
    if (!hasPermissionFilter) return true;
    return permissions.includes(item.id) || permissions.includes(item.label);
  }

  function isModuleEnabled(item: NavItem): boolean {
    if (!item.moduleKey) return true;
    // If module statuses not loaded yet, default to enabled
    if (!(item.moduleKey in moduleStatuses)) return true;
    return moduleStatuses[item.moduleKey] !== false;
  }

  return (
    <div className="w-60 h-screen flex flex-col border-r border-border overflow-hidden bg-background text-foreground">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-tight text-foreground">
              LocalBazar Kart 🛒
            </p>
            <p className="text-[10px] leading-tight text-muted-foreground">
              Admin Dashboard
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1 rounded transition-colors hover:bg-muted text-muted-foreground"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto py-3 px-2"
        aria-label="Main navigation"
      >
        {NAV_SECTIONS.map((section) => {
          // Hide section if its moduleKey is explicitly disabled
          if (section.moduleKey) {
            const sectionModuleEnabled =
              !(section.moduleKey in moduleStatuses) ||
              moduleStatuses[section.moduleKey] !== false;
            if (!sectionModuleEnabled) return null;
          }
          const visibleItems = section.items.filter((item) => {
            if (!isAllowed(item)) return false;
            // adminOnly items only show when no permission filter (admin view) or explicitly permitted
            if (item.adminOnly && hasPermissionFilter) {
              return (
                permissions.includes(item.id) ||
                permissions.includes(item.label)
              );
            }
            return true;
          });
          if (visibleItems.length === 0) return null;
          return (
            <div key={section.title} className="mb-4">
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {visibleItems.map((item) => {
                  const isActive = currentPath === item.path;
                  const isChatbot = item.path === "/chatbot";
                  const moduleEnabled = isModuleEnabled(item);
                  const isOrderItem = item.id === "orders";
                  const isMarketplaceItem = item.id === "marketplace";
                  const isAdhocJobsItem = item.id === "adhoc-jobs";

                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onClose}
                        data-ocid={`nav.${item.id}`}
                        aria-disabled={!moduleEnabled}
                        className={[
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 relative group",
                          !moduleEnabled
                            ? "opacity-50 pointer-events-none text-muted-foreground"
                            : isActive
                              ? "bg-green-500 text-white font-medium"
                              : isChatbot
                                ? "text-green-400 font-medium hover:bg-muted"
                                : "text-foreground hover:bg-muted hover:text-foreground",
                        ].join(" ")}
                      >
                        <item.icon
                          className={[
                            "w-4 h-4 flex-shrink-0",
                            !moduleEnabled
                              ? "text-muted-foreground"
                              : isActive
                                ? "text-white"
                                : isChatbot
                                  ? "text-green-400"
                                  : "text-muted-foreground",
                          ].join(" ")}
                        />
                        <span className="flex-1 truncate">
                          {item.label}
                          {!moduleEnabled && (
                            <span className="ml-1 text-[9px] uppercase text-muted-foreground">
                              disabled
                            </span>
                          )}
                        </span>
                        {isOrderItem &&
                          !isActive &&
                          (activeOrderCount ?? 0) > 0 && (
                            <span className="text-[10px] rounded-full px-1.5 py-0.5 font-medium bg-green-500/20 text-green-400">
                              {activeOrderCount}
                            </span>
                          )}
                        {isMarketplaceItem &&
                          !isActive &&
                          activeMarketplaceCount > 0 && (
                            <span className="text-[10px] rounded-full px-1.5 py-0.5 font-medium bg-green-500/20 text-green-400">
                              {activeMarketplaceCount}
                            </span>
                          )}
                        {isAdhocJobsItem && !isActive && adhocJobCount > 0 && (
                          <span className="text-[10px] rounded-full px-1.5 py-0.5 font-medium bg-red-500/20 text-red-400">
                            {adhocJobCount}
                          </span>
                        )}
                        {isChatbot && !isActive && (
                          <span className="text-[9px] rounded px-1 py-0.5 font-bold uppercase bg-green-500 text-white">
                            LIVE
                          </span>
                        )}
                        {item.badge && !isActive && (
                          <span className="text-[9px] rounded px-1 py-0.5 font-bold uppercase bg-primary text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border flex-shrink-0">
        <p className="text-[10px] text-center text-muted-foreground">
          © {new Date().getFullYear()} LocalBazar Kart 🛒 ·{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "localbazarkart")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
