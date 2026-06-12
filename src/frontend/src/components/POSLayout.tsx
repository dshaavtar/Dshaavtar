import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Outlet } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import {
  Building2,
  ChevronDown,
  LogOut,
  MessageCircle,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../App";
import { useMerchantBranches } from "../hooks/useBackend";

export default function POSLayout() {
  const { username, logout } = useAuth();
  const merchantId: string = "";
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const { data: branches = [] } = useMerchantBranches(merchantId);

  const isPOSMerchant = !username?.includes("delivery");
  const roleLabel = isPOSMerchant ? "Merchant POS" : "Delivery POS";

  function handleLogout() {
    logout();
    navigate({ to: "/login" });
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* POS Header */}
      <header
        className="pos-header shadow-subtle flex-shrink-0"
        data-ocid="pos.header"
      >
        <div className="flex items-center gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-sm leading-tight">
                WhatsCart
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {roleLabel}
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-border mx-1" />

          {/* Branch Switcher — only for merchant POS */}
          {isPOSMerchant && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="branch-switcher"
                  data-ocid="pos.branch_selector"
                >
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {selectedBranch === "all"
                      ? "All Branches"
                      : (branches.find((b) => b.branchId === selectedBranch)
                          ?.name ?? "Select Branch")}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem
                  onClick={() => setSelectedBranch("all")}
                  data-ocid="pos.branch_option.all"
                >
                  All Branches
                </DropdownMenuItem>
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.branchId}
                    onClick={() => setSelectedBranch(branch.branchId)}
                    data-ocid={`pos.branch_option.${branch.branchId}`}
                  >
                    {branch.name}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {branch.address}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Delivery POS badge */}
          {!isPOSMerchant && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-md">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Delivery Partner View
              </span>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-muted-foreground">{roleLabel}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2 text-muted-foreground hover:text-foreground"
            data-ocid="pos.logout_button"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main POS content */}
      <main className="flex-1 overflow-auto bg-background p-4">
        <Outlet />
      </main>
    </div>
  );
}
