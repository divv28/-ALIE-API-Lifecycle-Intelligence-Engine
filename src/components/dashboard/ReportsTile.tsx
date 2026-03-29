import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardStats } from "@workspace/api-client-react/src/generated/api.schemas";

interface ReportsTileProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
  onNavigate: () => void;
}

export function ReportsTile({ stats, isLoading, onNavigate }: ReportsTileProps) {
  const rows = stats
    ? [
        { label: "Total Scans", value: "1,843", color: "text-foreground" },
        { label: "Threats Neutralized", value: stats.threatsBlocked.toLocaleString(), color: "text-primary" },
        { label: "Alerts Today", value: String(stats.alertsToday), color: "text-destructive" },
        { label: "Coverage", value: `${stats.coveragePercent}%`, color: "text-amber-400" },
      ]
    : [];

  return (
    <Card
      className="border-border/50 flex flex-col cursor-pointer group hover:border-primary/40 transition-colors"
      style={{ minHeight: 360 }}
      onClick={onNavigate}
    >
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-4 pb-4">
        {isLoading || !stats ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {rows.map(({ label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-3 py-2.5 bg-secondary/30 rounded-lg border border-border/40"
                >
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className={`text-sm font-bold font-mono ${color}`}>{value}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-primary/40 text-primary hover:bg-primary/10 group-hover:border-primary transition-colors"
              onClick={(e) => { e.stopPropagation(); onNavigate(); }}
            >
              View Reports
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
