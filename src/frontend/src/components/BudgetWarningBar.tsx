import { Link } from "@tanstack/react-router";
import { AlertTriangle, TrendingUp, X } from "lucide-react";
import type { CustomerBudget } from "../types";

interface BudgetWarningBarProps {
  budget: CustomerBudget;
  orderAmount?: number;
  onDismiss?: () => void;
}

export default function BudgetWarningBar({
  budget,
  orderAmount,
  onDismiss,
}: BudgetWarningBarProps) {
  const { monthlyBudget, currentMonthSpend, percentUsed } = budget;
  const projectedSpend = orderAmount
    ? currentMonthSpend + orderAmount
    : currentMonthSpend;
  const projectedPercent =
    monthlyBudget > 0 ? (projectedSpend / monthlyBudget) * 100 : 0;
  const isExceeded = percentUsed >= 100;
  const isWarning = percentUsed >= 80 || projectedPercent >= 100;

  if (!isWarning && !orderAmount) return null;
  return (
    <div
      className={`budget-warning ${
        isExceeded
          ? "bg-destructive/10 border-destructive text-destructive"
          : "bg-warning/10 border-warning text-foreground"
      }`}
      data-ocid="budget.warning_bar"
      role="alert"
    >
      <AlertTriangle
        className={`w-4 h-4 flex-shrink-0 ${isExceeded ? "text-destructive" : "text-warning"}`}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm">
            {isExceeded ? "Budget exceeded!" : "Budget warning"}
          </span>
          <span className="text-sm text-muted-foreground">
            Monthly ₹{monthlyBudget.toLocaleString("en-IN")} — ₹
            {currentMonthSpend.toLocaleString("en-IN")} used (
            {Math.round(percentUsed)}%)
            {orderAmount && projectedPercent > percentUsed && (
              <span className="ml-1 text-destructive">
                → ₹{projectedSpend.toLocaleString("en-IN")} after this order
              </span>
            )}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden w-full max-w-xs">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isExceeded ? "bg-destructive" : "bg-warning"
            }`}
            style={{ width: `${Math.min(projectedPercent, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link
          to="/subscriptions"
          className="text-xs underline hover:no-underline font-medium"
          data-ocid="budget.update_link"
        >
          <TrendingUp className="w-3.5 h-3.5 inline mr-1" />
          Update Budget
        </Link>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-0.5 rounded hover:bg-muted transition-colors"
            aria-label="Dismiss budget warning"
            data-ocid="budget.dismiss_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
