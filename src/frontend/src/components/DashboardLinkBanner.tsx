import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Link2 } from "lucide-react";
import { useState } from "react";

interface DashboardLinkBannerProps {
  dashboardUrl: string;
  roleLabel: string;
  accentClass?: string; // e.g. "border-amber-300 dark:border-amber-700/50"
  iconBgClass?: string; // e.g. "bg-amber-100 dark:bg-amber-900/30"
  iconColorClass?: string; // e.g. "text-amber-600"
}

export default function DashboardLinkBanner({
  dashboardUrl,
  roleLabel,
  accentClass = "border-primary/30 dark:border-primary/20",
  iconBgClass = "bg-primary/10 dark:bg-primary/20",
  iconColorClass = "text-primary",
}: DashboardLinkBannerProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(dashboardUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className={`bg-card border ${accentClass} rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3`}
      data-ocid="dashboard.link-banner"
    >
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div
          className={`w-7 h-7 rounded-lg ${iconBgClass} flex items-center justify-center`}
        >
          <Link2 className={`w-3.5 h-3.5 ${iconColorClass}`} />
        </div>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-foreground">
            Your {roleLabel} Dashboard Link
          </p>
          <p className="text-[11px] text-muted-foreground">
            Share this link to open your dashboard directly
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Input
          readOnly
          value={dashboardUrl}
          className="h-8 text-xs font-mono bg-muted/40 border-input cursor-text select-all min-w-0"
          onFocus={(e) => e.target.select()}
          data-ocid="dashboard.link-banner.url_input"
        />
        <Button
          size="sm"
          variant="outline"
          className="h-8 flex-shrink-0 gap-1.5 text-xs min-w-[88px] transition-colors"
          onClick={handleCopy}
          data-ocid="dashboard.link-banner.copy_button"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
