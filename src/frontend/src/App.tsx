import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import {
  Suspense,
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from "react";
import type { AuthState } from "./types";

// Auth context
const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  isAdmin: false,
  principal: null,
  username: null,
  login: () => false,
  logout: () => {},
  setIdentityAuth: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("wc_auth") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("wc_is_admin") === "true";
  });
  const [principal, setPrincipal] = useState<string | null>(() => {
    return localStorage.getItem("wc_principal");
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("wc_username");
  });

  // Sync II identity into auth state — called from LoginPage on II success
  function setIdentityAuth(principalId: string) {
    localStorage.setItem("wc_auth", "true");
    localStorage.setItem("wc_is_admin", "true");
    localStorage.setItem("wc_principal", principalId);
    localStorage.setItem("wc_username", "admin");
    setIsAuthenticated(true);
    setIsAdmin(true);
    setPrincipal(principalId);
    setUsername("admin");
  }

  // Legacy login: password "admin123" grants admin, "pos123" grants POS (merchant/delivery)
  function login(user: string, password: string): boolean {
    if (password === "admin123") {
      localStorage.setItem("wc_auth", "true");
      localStorage.setItem("wc_is_admin", "true");
      localStorage.setItem("wc_username", user);
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUsername(user);
      return true;
    }
    if (password === "pos123") {
      localStorage.setItem("wc_auth", "true");
      localStorage.setItem("wc_username", user);
      localStorage.setItem("wc_pos_role", user);
      setIsAuthenticated(true);
      setUsername(user);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("wc_auth");
    localStorage.removeItem("wc_is_admin");
    localStorage.removeItem("wc_principal");
    localStorage.removeItem("wc_username");
    localStorage.removeItem("wc_pos_role");
    setIsAuthenticated(false);
    setIsAdmin(false);
    setPrincipal(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        principal,
        username,
        login,
        logout,
        setIdentityAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Lazy-loaded pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Layout = lazy(() => import("./components/Layout"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const MerchantsPage = lazy(() => import("./pages/MerchantsPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ChatbotSimulatorPage = lazy(() => import("./pages/ChatbotSimulatorPage"));
const ChatSimulatorMultiRolePage = lazy(
  () => import("./pages/ChatSimulatorMultiRolePage"),
);
const WhatsAppConfigPage = lazy(() => import("./pages/WhatsAppConfigPage"));
const JobsPage = lazy(() => import("./pages/JobsPage"));
const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SubscriptionsPage = lazy(() => import("./pages/SubscriptionsPage"));
const RateCardsPage = lazy(() => import("./pages/RateCardsPage"));
const OndcPage = lazy(() => import("./pages/OndcPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const RoleManagementPage = lazy(() => import("./pages/RoleManagementPage"));
const ImportExportPage = lazy(() => import("./pages/ImportExportPage"));
const ApiPanelPage = lazy(() => import("./pages/ApiPanelPage"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
const FamilyPage = lazy(() => import("./pages/FamilyPage"));
const PromotionsPage = lazy(() => import("./pages/PromotionsPage"));
const FlowDesignerPage = lazy(() => import("./pages/FlowDesignerPage"));
const WhatsAppExportPage = lazy(() => import("./pages/WhatsAppExportPage"));
const DataExplorerPage = lazy(() => import("./pages/DataExplorerPage"));
const ModulesPage = lazy(() => import("./pages/ModulesPage"));
const CityModuleTogglePage = lazy(() => import("./pages/CityModuleTogglePage"));
// MerchantPOSPage and DeliveryPOSPage are merged into their unified dashboards
const ModerationPage = lazy(() => import("./pages/ModerationPage"));
const SupportTicketsPage = lazy(() => import("./pages/SupportTicketsPage"));
const MerchantContactsPage = lazy(() => import("./pages/MerchantContactsPage"));
const RecipesPage = lazy(() => import("./pages/RecipesPage"));
const ShuttleRoutesPage = lazy(() => import("./pages/ShuttleRoutesPage"));
const RestockOrdersPage = lazy(() => import("./pages/RestockOrdersPage"));
const ScriptExecutorPage = lazy(() => import("./pages/ScriptExecutorPage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const AdhocJobsPage = lazy(() => import("./pages/AdhocJobsPage"));
const SubscriptionDashboardPage = lazy(
  () => import("./pages/SubscriptionDashboardPage"),
);
const TelegramConfigPage = lazy(() => import("./pages/TelegramConfigPage"));
const BotLogsPage = lazy(() => import("./pages/BotLogsPage"));
const SMSConfigPage = lazy(() => import("./pages/SMSConfigPage"));
const TelegramScriptPage = lazy(() => import("./pages/TelegramScriptPage"));
const SMSScriptPage = lazy(() => import("./pages/SMSScriptPage"));
const FlowAgentPage = lazy(() => import("./pages/FlowAgentPage"));
const MerchantDashboardPage = lazy(
  () => import("./pages/MerchantDashboardPage"),
);
const DeliveryDashboardPage = lazy(
  () => import("./pages/DeliveryDashboardPage"),
);
const CustomerDashboardPage = lazy(
  () => import("./pages/CustomerDashboardPage"),
);
const HealthcarePage = lazy(() => import("./pages/HealthcarePage"));
const ToursPage = lazy(() => import("./pages/ToursPage"));
const ProfessionalServicesPage = lazy(
  () => import("./pages/ProfessionalServicesPage"),
);
const MatrimonyPage = lazy(() => import("./pages/MatrimonyPage"));
const DonationsPage = lazy(() => import("./pages/DonationsPage"));
const MarketCommodityPage = lazy(() => import("./pages/MarketCommodityPage"));
const TodayMatchScoresPage = lazy(() => import("./pages/TodayMatchScoresPage"));
const ElectionResultsPage = lazy(() => import("./pages/ElectionResultsPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const LendingPage = lazy(() => import("./pages/LendingPage"));
const PaySprintConfigPage = lazy(() => import("./pages/PaySprintConfigPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const CustomerRatingsPage = lazy(() => import("./pages/CustomerRatingsPage"));
const BrandingPage = lazy(() => import("./pages/BrandingPage"));
const MenuRepositoryPage = lazy(() => import("./pages/MenuRepositoryPage"));
const ProjectDocumentationPage = lazy(
  () => import("./pages/ProjectDocumentationPage"),
);
const AdvertisementManagementPage = lazy(
  () => import("./pages/AdvertisementManagementPage"),
);
const LoadSampleDataPage = lazy(() => import("./pages/LoadSampleDataPage"));
const DeliveryAssignmentPage = lazy(
  () => import("./pages/DeliveryAssignmentPage"),
);

// Route guards
function ProtectedLayout() {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <Suspense fallback={<PageLoader />}>
      <Layout />
    </Suspense>
  );
}

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-background">
        <div className="text-center max-w-sm px-6">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center mx-auto mb-4">
            <span className="text-amber-600 text-xl">🔒</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Admin Access Required
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            This page is locked to admin users only. Log in with your Internet
            Identity admin account to access it.
          </p>
          <Navigate to="/login" />
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

// II-aware login handler — runs at root level to pick up II auth
function IIAuthSync() {
  const { identity, isLoginSuccess } = useInternetIdentity();
  const { setIdentityAuth, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (isLoginSuccess && identity && !isAuthenticated) {
      const principalId = identity.getPrincipal().toText();
      setIdentityAuth(principalId);
    }
  }, [isLoginSuccess, identity, isAuthenticated, setIdentityAuth]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Routes
const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <IIAuthSync />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/dashboard" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoginPage />
    </Suspense>
  ),
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedLayout,
});

const posRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "pos",
  component: ProtectedLayout,
});
void posRoute; // kept for potential future use

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});
const ordersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OrdersPage />
    </Suspense>
  ),
});
const usersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/users",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <UsersPage />
    </Suspense>
  ),
});
const merchantsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/merchants",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MerchantsPage />
    </Suspense>
  ),
});
const productsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProductsPage />
    </Suspense>
  ),
});
const chatbotRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/chatbot",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChatbotSimulatorPage />
    </Suspense>
  ),
});
const whatsappConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/whatsapp-config",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WhatsAppConfigPage />
    </Suspense>
  ),
});
const jobsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/jobs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <JobsPage />
    </Suspense>
  ),
});
const propertiesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/properties",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PropertiesPage />
    </Suspense>
  ),
});
const analyticsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AnalyticsPage />
    </Suspense>
  ),
});
const subscriptionsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/subscriptions",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SubscriptionsPage />
    </Suspense>
  ),
});
const rateCardsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/rate-cards",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RateCardsPage />
    </Suspense>
  ),
});
const ondcRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/ondc",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <OndcPage />
    </Suspense>
  ),
});
const notificationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/notifications",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <NotificationsPage />
    </Suspense>
  ),
});
const rolesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/role-management",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RoleManagementPage />
    </Suspense>
  ),
});
const importExportRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/import-export",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ImportExportPage />
    </Suspense>
  ),
});
const apiPanelRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/api-panel",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ApiPanelPage />
    </Suspense>
  ),
});
const eventsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/events",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <EventsPage />
    </Suspense>
  ),
});
const familyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/family",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FamilyPage />
    </Suspense>
  ),
});
const promotionsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/promotions",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PromotionsPage />
    </Suspense>
  ),
});
const flowDesignerRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/flow-designer",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FlowDesignerPage />
    </Suspense>
  ),
});
const whatsappExportRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/whatsapp-export",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WhatsAppExportPage />
    </Suspense>
  ),
});
const modulesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/modules",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ModulesPage />
    </Suspense>
  ),
});
const dataExplorerRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/data-explorer",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DataExplorerPage />
    </Suspense>
  ),
});

const moderationRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/moderation",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ModerationPage />
    </Suspense>
  ),
});

const supportTicketsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/support-tickets",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SupportTicketsPage />
    </Suspense>
  ),
});

const merchantContactsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/merchant-contacts",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MerchantContactsPage />
    </Suspense>
  ),
});

const recipesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/recipes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RecipesPage />
    </Suspense>
  ),
});

const shuttleRoutesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/shuttle-routes",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ShuttleRoutesPage />
    </Suspense>
  ),
});

const restockOrdersRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/restock-orders",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <RestockOrdersPage />
    </Suspense>
  ),
});

const scriptExecutorRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/script-executor",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ScriptExecutorPage />
    </Suspense>
  ),
});

const marketplaceRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/marketplace",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MarketplacePage />
    </Suspense>
  ),
});

const adhocJobsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/adhoc-jobs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdhocJobsPage />
    </Suspense>
  ),
});

const subscriptionDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/subscription-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SubscriptionDashboardPage />
    </Suspense>
  ),
});

const telegramConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/telegram-config",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TelegramConfigPage />
    </Suspense>
  ),
});

const botLogsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/bot-logs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BotLogsPage />
    </Suspense>
  ),
});

const smsConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/sms-config",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SMSConfigPage />
    </Suspense>
  ),
});

const telegramScriptRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/telegram-script",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TelegramScriptPage />
    </Suspense>
  ),
});

const smsScriptRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/sms-script",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <SMSScriptPage />
    </Suspense>
  ),
});

const flowAgentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/flow-agent",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FlowAgentPage />
    </Suspense>
  ),
});

const merchantDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/merchant-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MerchantDashboardPage />
    </Suspense>
  ),
});

const deliveryDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/delivery-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DeliveryDashboardPage />
    </Suspense>
  ),
});

const customerDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/customer-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CustomerDashboardPage />
    </Suspense>
  ),
});

const healthcareRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/healthcare",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HealthcarePage />
    </Suspense>
  ),
});

const toursRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/tours",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ToursPage />
    </Suspense>
  ),
});

const professionalServicesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/professional-services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProfessionalServicesPage />
    </Suspense>
  ),
});
const matrimonyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/matrimony",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MatrimonyPage />
    </Suspense>
  ),
});

const donationsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/donations",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DonationsPage />
    </Suspense>
  ),
});

const marketCommodityRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/market-commodity",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MarketCommodityPage />
    </Suspense>
  ),
});

const matchScoresRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/match-scores",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TodayMatchScoresPage />
    </Suspense>
  ),
});

const electionResultsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/election-results",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ElectionResultsPage />
    </Suspense>
  ),
});

const communityRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/community",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CommunityPage />
    </Suspense>
  ),
});

const lendingRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/lending",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LendingPage />
    </Suspense>
  ),
});

const paySprintConfigRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/paysprint-config",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PaySprintConfigPage />
    </Suspense>
  ),
});

const blogsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/blogs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogsPage />
    </Suspense>
  ),
});

const blogDetailRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/blogs/$blogId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <BlogDetailPage />
    </Suspense>
  ),
});

const customerRatingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/customer-ratings",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <CustomerRatingsPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});

const brandingRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/branding",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <BrandingPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});

const menuRepositoryRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/menu-repository",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <MenuRepositoryPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});
const projectDocumentationRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/project-docs",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ProjectDocumentationPage />
    </Suspense>
  ),
});

// Manufacturer pages
const ManufacturerDashboardPage = lazy(
  () => import("./pages/ManufacturerDashboardPage"),
);
const ManufacturerRegistrationPage = lazy(
  () => import("./pages/ManufacturerRegistrationPage"),
);
const ManufacturerProductsPage = lazy(
  () => import("./pages/ManufacturerProductsPage"),
);
const ManufacturerDistributorNetworkPage = lazy(
  () => import("./pages/ManufacturerDistributorNetworkPage"),
);
const ManufacturerReturnsPage = lazy(
  () => import("./pages/ManufacturerReturnsPage"),
);
const ManufacturerComplaintsPage = lazy(
  () => import("./pages/ManufacturerComplaintsPage"),
);
const ManufacturerRatingsPage = lazy(
  () => import("./pages/ManufacturerRatingsPage"),
);
const ManufacturerPOSPage = lazy(() => import("./pages/ManufacturerPOSPage"));
const MerchantManufacturerProductsPage = lazy(
  () => import("./pages/MerchantManufacturerProductsPage"),
);
const ManufacturerEmployeesPage = lazy(
  () => import("./pages/ManufacturerEmployeesPage"),
);
const ManufacturerInventoryPage = lazy(
  () => import("./pages/ManufacturerInventoryPage"),
);
const ManufacturerSalesPage = lazy(
  () => import("./pages/ManufacturerSalesPage"),
);
const ManufacturerPurchasesPage = lazy(
  () => import("./pages/ManufacturerPurchasesPage"),
);
const ManufacturerAccountsPage = lazy(
  () => import("./pages/ManufacturerAccountsPage"),
);

const MerchantProductReviewsPage = lazy(
  () => import("./pages/MerchantProductReviewsPage"),
);
const merchantProductReviewsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/merchant-product-reviews",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MerchantProductReviewsPage />
    </Suspense>
  ),
});
const manufacturerDashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-dashboard",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerDashboardPage />
    </Suspense>
  ),
});
const manufacturerRegistrationRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-registration",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerRegistrationPage />
    </Suspense>
  ),
});
const manufacturerProductsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerProductsPage />
    </Suspense>
  ),
});
const manufacturerDistributorsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-distributors",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerDistributorNetworkPage />
    </Suspense>
  ),
});
const manufacturerReturnsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-returns",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerReturnsPage />
    </Suspense>
  ),
});
const manufacturerComplaintsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-complaints",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerComplaintsPage />
    </Suspense>
  ),
});
const manufacturerRatingsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-ratings",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerRatingsPage />
    </Suspense>
  ),
});
const manufacturerPOSRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-pos",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerPOSPage />
    </Suspense>
  ),
});
const merchantManufacturerProductsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/merchant-manufacturer-products",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MerchantManufacturerProductsPage />
    </Suspense>
  ),
});
const manufacturerEmployeesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-employees",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerEmployeesPage />
    </Suspense>
  ),
});
const manufacturerInventoryRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-inventory",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerInventoryPage />
    </Suspense>
  ),
});
const manufacturerSalesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-sales",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerSalesPage />
    </Suspense>
  ),
});
const manufacturerPurchasesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-purchases",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerPurchasesPage />
    </Suspense>
  ),
});
const manufacturerAccountsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/manufacturer-accounts",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ManufacturerAccountsPage />
    </Suspense>
  ),
});
const chatSimulatorMultiRoleRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/chat-simulator-multirol",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ChatSimulatorMultiRolePage />
    </Suspense>
  ),
});

// Redirects for old POS URLs — merged into unified dashboards
const merchantPOSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/merchant-pos",
  component: () => <Navigate to="/merchant-dashboard" />,
});
const deliveryPOSRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/delivery-pos",
  component: () => <Navigate to="/delivery-dashboard" />,
});

const LanguageLearningPage = lazy(() => import("./pages/LanguageLearningPage"));
const WordSearchPage = lazy(() => import("./pages/WordSearchPage"));
const MyLearningPage = lazy(() => import("./pages/MyLearningPage"));
const CourseDetailPage = lazy(() => import("./pages/CourseDetailPage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const AdminCourseApprovalsPage = lazy(
  () => import("./pages/AdminCourseApprovalsPage"),
);
const AdminWordDefinitionsPage = lazy(
  () => import("./pages/AdminWordDefinitionsPage"),
);
const CustomerTransportBookingPage = lazy(
  () => import("./pages/CustomerTransportBookingPage"),
);
const CustomerBillPaymentsPage = lazy(
  () => import("./pages/CustomerBillPaymentsPage"),
);

const customerTransportRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/customer/transport-booking",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CustomerTransportBookingPage />
    </Suspense>
  ),
});

const customerBillPaymentsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/customer/bill-payments",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CustomerBillPaymentsPage />
    </Suspense>
  ),
});

const languageLearningRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/language-learning",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LanguageLearningPage />
    </Suspense>
  ),
});

const wordSearchRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/word-search",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <WordSearchPage />
    </Suspense>
  ),
});

const myLearningRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/my-learning",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyLearningPage />
    </Suspense>
  ),
});

const courseDetailRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/course/$courseId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CourseDetailPage />
    </Suspense>
  ),
});

const lessonRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/lesson/$lessonId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LessonPage />
    </Suspense>
  ),
});

const adminCourseApprovalsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/language-learning-approvals",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminCourseApprovalsPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});

const adminWordDefinitionsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/word-definitions",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminWordDefinitionsPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});

const advertisementRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/admin/advertisement",
  component: () => (
    <ProtectedAdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdvertisementManagementPage />
      </Suspense>
    </ProtectedAdminRoute>
  ),
});

const loadSampleDataRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/load-sample-data",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LoadSampleDataPage />
    </Suspense>
  ),
});

const deliveryAssignmentRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/delivery-assignment",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <DeliveryAssignmentPage />
    </Suspense>
  ),
});

const cityModulesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/city-modules",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CityModuleTogglePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  merchantPOSRoute,
  deliveryPOSRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    ordersRoute,
    usersRoute,
    merchantsRoute,
    productsRoute,
    chatbotRoute,
    whatsappConfigRoute,
    jobsRoute,
    propertiesRoute,
    analyticsRoute,
    subscriptionsRoute,
    rateCardsRoute,
    ondcRoute,
    notificationsRoute,
    rolesRoute,
    importExportRoute,
    apiPanelRoute,
    eventsRoute,
    familyRoute,
    promotionsRoute,
    flowDesignerRoute,
    whatsappExportRoute,
    modulesRoute,
    dataExplorerRoute,
    moderationRoute,
    supportTicketsRoute,
    merchantContactsRoute,
    recipesRoute,
    shuttleRoutesRoute,
    restockOrdersRoute,
    scriptExecutorRoute,
    marketplaceRoute,
    adhocJobsRoute,
    subscriptionDashboardRoute,
    telegramConfigRoute,
    botLogsRoute,
    smsConfigRoute,
    telegramScriptRoute,
    smsScriptRoute,
    flowAgentRoute,
    merchantDashboardRoute,
    deliveryDashboardRoute,
    customerDashboardRoute,
    healthcareRoute,
    toursRoute,
    professionalServicesRoute,
    matrimonyRoute,
    donationsRoute,
    marketCommodityRoute,
    matchScoresRoute,
    electionResultsRoute,
    communityRoute,
    lendingRoute,
    paySprintConfigRoute,
    blogsRoute,
    blogDetailRoute,
    customerRatingsRoute,
    brandingRoute,
    menuRepositoryRoute,
    projectDocumentationRoute,
    manufacturerDashboardRoute,
    manufacturerRegistrationRoute,
    manufacturerProductsRoute,
    manufacturerDistributorsRoute,
    manufacturerReturnsRoute,
    manufacturerComplaintsRoute,
    manufacturerRatingsRoute,
    manufacturerPOSRoute,
    merchantManufacturerProductsRoute,
    manufacturerEmployeesRoute,
    manufacturerInventoryRoute,
    manufacturerSalesRoute,
    manufacturerPurchasesRoute,
    manufacturerAccountsRoute,
    chatSimulatorMultiRoleRoute,
    merchantProductReviewsRoute,
    languageLearningRoute,
    wordSearchRoute,
    myLearningRoute,
    courseDetailRoute,
    lessonRoute,
    customerTransportRoute,
    customerBillPaymentsRoute,
    adminCourseApprovalsRoute,
    adminWordDefinitionsRoute,
    advertisementRoute,
    loadSampleDataRoute,
    deliveryAssignmentRoute,
    cityModulesRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
