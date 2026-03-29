import { Zap, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { DashboardStats } from "@workspace/api-client-react/src/generated/api.schemas";

interface ActionControlCardProps {
  stats: DashboardStats | undefined;
  isLoading: boolean;
  realtimeOn: boolean;
  autoKillOn: boolean;
  onRealtimeChange: (val: boolean) => void;
  onAutoKillChange: (val: boolean) => void;
}

export function ActionControlCard({
  stats,
  isLoading,
  realtimeOn,
  autoKillOn,
  onRealtimeChange,
  onAutoKillChange,
}: ActionControlCardProps) {
  const { toast } = useToast();

  return (
    <Card className="h-full border-border/50">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5 text-amber-400" />
          Action & Control
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        {isLoading || !stats ? (
          <div className="space-y-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50 hover:bg-secondary/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">Real-Time Interception</p>
                <p className="text-xs text-muted-foreground mt-0.5">Block known bad actors</p>
              </div>
              <Switch
                checked={realtimeOn}
                onCheckedChange={onRealtimeChange}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border/50 hover:bg-secondary/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">Auto Kill Mode</p>
                <p className="text-xs text-muted-foreground mt-0.5">Sever vulnerable endpoints</p>
              </div>
              <Switch
                checked={autoKillOn}
                onCheckedChange={onAutoKillChange}
                className="data-[state=checked]:bg-destructive"
              />
            </div>

            <div className="bg-secondary/20 rounded-xl border border-border/50 p-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-mono">Response Time</span>
              <span className="text-sm font-bold text-primary font-mono">{stats.responseTimeMs}ms</span>
            </div>

            <Button
              variant="destructive"
              className="w-full font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all h-12"
              onClick={() =>
                toast({
                  title: "Emergency Lockdown",
                  description: "All endpoints locked. Awaiting manual review.",
                  variant: "destructive",
                })
              }
            >
              <ShieldAlert className="w-5 h-5 mr-2" />
              Manual Kill Switch
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
