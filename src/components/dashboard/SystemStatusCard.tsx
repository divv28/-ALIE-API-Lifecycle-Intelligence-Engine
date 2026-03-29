import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStats } from "@workspace/api-client-react/src/generated/api.schemas";
import type { ScanPhase } from "@/hooks/use-scan";

interface SystemStatusCardProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
  scanPhase: ScanPhase;
}

export function SystemStatusCard({ stats, isLoading, scanPhase }: SystemStatusCardProps) {
  const rows = stats
    ? [
        {
          label: "Last Full Scan",
          value: scanPhase === "scanning" ? "Running now…" : stats.lastScan,
          valueClass: scanPhase === "scanning" ? "text-primary animate-pulse" : "text-muted-foreground",
        },
        { label: "Coverage", value: `${stats.coveragePercent}%`, valueClass: "text-primary font-bold" },
        { label: "Alerts Today", value: String(stats.alertsToday), valueClass: "text-destructive font-bold" },
        {
          label: "Auto-Block",
          value: stats.autoBlockEnabled ? "ENABLED" : "DISABLED",
          valueClass: stats.autoBlockEnabled
            ? "text-primary font-bold uppercase text-xs"
            : "text-muted-foreground uppercase text-xs",
        },
        { label: "Avg Risk Score", value: String(stats.avgRiskScore), valueClass: "text-amber-400 font-bold" },
      ]
    : [];

  return (
    <Card className="h-[380px] border-border/50 flex flex-col">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center gap-3 py-4">
        {isLoading || !stats ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          rows.map(({ label, value, valueClass }) => (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 bg-secondary/30 rounded-xl border border-border/50"
            >
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className={`text-sm font-mono ${valueClass}`}>{value}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
