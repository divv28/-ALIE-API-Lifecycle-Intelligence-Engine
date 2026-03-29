import { motion } from "framer-motion";
import { Cpu, Activity, ShieldAlert, Skull, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskMeter } from "@/components/ui/RiskMeter";
import type { DashboardStats } from "@workspace/api-client-react/src/generated/api.schemas";

interface RiskEngineCardProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
}

const METRICS = (stats: DashboardStats) => [
  { label: "Total APIs", value: String(stats.totalApis), color: "text-foreground", icon: <Activity className="w-4 h-4" /> },
  { label: "Shadow APIs", value: String(stats.shadowApis), color: "text-amber-400", icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
  { label: "Zombie APIs", value: String(stats.zombieApis), color: "text-destructive", icon: <Skull className="w-4 h-4 text-destructive" /> },
  { label: "Threats Blocked", value: stats.threatsBlocked.toLocaleString(), color: "text-primary", icon: <Shield className="w-4 h-4 text-primary" /> },
];

export function RiskEngineCard({ stats, isLoading }: RiskEngineCardProps) {
  return (
    <Card className="h-full border-primary/20 bg-gradient-to-br from-card to-card/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Cpu className="w-5 h-5 text-primary" />
            ALIE Core Risk Engine
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
              Active Defense Mode
            </Badge>
            <Badge variant="outline" className="bg-secondary text-muted-foreground border-border text-xs">
              0ms Latency Impact
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading || !stats ? (
          <div className="flex items-center justify-center h-48">
            <Skeleton className="w-48 h-48 rounded-full" />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-12">
            <RiskMeter score={stats.riskIndex} level={stats.riskLevel} />
            <div className="grid grid-cols-2 gap-3 flex-1 w-full">
              {METRICS(stats).map((m) => (
                <div
                  key={m.label}
                  className="bg-secondary/40 p-4 rounded-xl border border-border/50 flex flex-col gap-1"
                >
                  <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                    {m.icon} {m.label}
                  </span>
                  <span className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
