import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { COLORS } from "@/lib/constants";
import type { DashboardStats } from "@workspace/api-client-react/src/generated/api.schemas";

interface ApiHealthDonutProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
}

const DonutTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm shadow-lg">
      <span style={{ color: d.payload.color }} className="font-semibold">{d.name}</span>
      <span className="text-foreground ml-2 font-mono font-bold">{d.value}</span>
    </div>
  );
};

export function ApiHealthDonut({ stats, isLoading }: ApiHealthDonutProps) {
  const healthData = stats
    ? [
        { name: "Verified", value: stats.verifiedApis, color: COLORS.teal },
        { name: "Shadow", value: stats.shadowApis, color: COLORS.amber },
        { name: "Zombie", value: stats.zombieApis, color: COLORS.red },
        { name: "Monitoring", value: stats.monitoringApis, color: COLORS.blue },
      ]
    : [];

  return (
    <Card className="border-border/50 flex flex-col" style={{ minHeight: 360 }}>
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          API Health Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-between pt-4 pb-4">
        {isLoading || !stats ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <Skeleton className="w-44 h-44 rounded-full" />
            <div className="space-y-2 w-full">
              {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-5 w-full" />)}
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-full flex justify-center" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={healthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={64}
                    outerRadius={86}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    isAnimationActive
                    animationBegin={0}
                    animationDuration={900}
                  >
                    {healthData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.92} />
                    ))}
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Centre overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[28px] font-bold leading-none font-mono text-foreground">
                  {stats.totalApis}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                  Total APIs
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="w-full space-y-2 mt-2">
              {healthData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm px-1">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    {d.name}
                  </span>
                  <span className="font-mono font-semibold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
