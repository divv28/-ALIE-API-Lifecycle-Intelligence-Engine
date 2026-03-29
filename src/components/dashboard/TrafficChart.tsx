import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { COLORS } from "@/lib/constants";
import type { TrafficDataResponse } from "@workspace/api-client-react/src/generated/api.schemas";
import type { ScanPhase } from "@/hooks/use-scan";

interface TrafficChartProps {
  traffic: TrafficDataResponse | undefined;
  isLoading: boolean;
  scanPhase: ScanPhase;
}

export function TrafficChart({ traffic, isLoading, scanPhase }: TrafficChartProps) {
  const isActive = scanPhase === "scanning" || scanPhase === "boost";

  return (
    <div className="relative">
      {/* Sweep-line scan overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="scan-overlay"
            className="absolute inset-0 z-10 rounded-xl pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, transparent, ${COLORS.teal}, transparent)` }}
              initial={{ y: 0 }}
              animate={{ y: [0, 380, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 rounded-xl" style={{ background: "rgba(0,240,192,0.02)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="h-[380px] border-border/50 flex flex-col">
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CardTitle className="text-lg">Real-Time API Traffic</CardTitle>
              {scanPhase === "scanning" && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(0,240,192,0.12)",
                    color: COLORS.teal,
                    border: "1px solid rgba(0,240,192,0.3)",
                  }}
                >
                  LIVE SCAN
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS.teal }} />
                Requests
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-destructive inline-block" />
                Threats
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 min-w-0 p-0 pt-2 relative">
          {isLoading || !traffic ? (
            <div className="w-full h-full flex items-center justify-center p-6">
              <Skeleton className="w-full h-full" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={traffic.data} margin={{ top: 10, right: 24, left: -8, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={8}
                  interval={4}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dx={-4}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke={COLORS.teal}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: COLORS.teal, stroke: "hsl(var(--background))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="threats"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
