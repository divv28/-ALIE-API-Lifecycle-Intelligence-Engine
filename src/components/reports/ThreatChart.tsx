import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { HistoricalDataPoint } from "@workspace/api-client-react/src/generated/api.schemas";

interface ThreatChartProps {
  data: HistoricalDataPoint[] | undefined;
  isLoading: boolean;
}

export function ThreatChart({ data, isLoading }: ThreatChartProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Historical Threat Detection</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading || !data ? (
          <Skeleton className="h-[350px] w-full" />
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--secondary) / 0.5)" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="threats" name="Total Threats" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shadowApis" name="Shadow APIs" fill="hsl(35 100% 55%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="zombieApis" name="Zombie APIs" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
