import type { LucideIcon } from "lucide-react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  iconColor?: string;
  iconBg?: string;
  loading?: boolean;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  loading = false,
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl p-5 shadow-card">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-3.5 w-24 bg-muted animate-pulse rounded" />
            <div className="h-7 w-16 bg-muted animate-pulse rounded" />
            <div className="h-3 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1 mr-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
            {title}
          </p>
          <p className="mt-1 text-2xl font-display font-bold text-foreground tabular-nums">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-1.5">
              {isPositive && (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              )}
              {isNegative && (
                <TrendingDown className="w-3.5 h-3.5 text-destructive flex-shrink-0" />
              )}
              {!isPositive && !isNegative && (
                <Minus className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              )}
              <span
                className={`text-xs font-medium ${
                  isPositive
                    ? "text-emerald-600"
                    : isNegative
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-muted-foreground truncate">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
