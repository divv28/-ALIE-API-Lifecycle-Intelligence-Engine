import { motion } from "framer-motion";
import { Target, Radar, ShieldBan, Zap } from "lucide-react";
import { useGetTraps, useSimulateAttack } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetTrapsQueryKey } from "@workspace/api-client-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { containerVars, itemVars } from "@/lib/animations";
import { TrapStatCard } from "@/components/traps/TrapStatCard";
import { OperatorConsole } from "@/components/traps/OperatorConsole";
import { TrapCard } from "@/components/traps/TrapCard";

export default function ZombieTraps() {
  const { data, isLoading } = useGetTraps();
  const simulateMutation = useSimulateAttack();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSimulate = (endpoint: string) => {
    simulateMutation.mutate(
      { data: { endpoint, intensity: 5 } },
      {
        onSuccess: () => {
          toast({ title: "Simulation Started", description: `Simulating attack on ${endpoint}` });
          queryClient.invalidateQueries({ queryKey: getGetTrapsQueryKey() });
        },
      }
    );
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-destructive/20 border border-destructive/50 flex items-center justify-center neon-border shadow-[0_0_15px_rgba(255,50,100,0.3)]">
          <Target className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Honeypots & Zombie Traps
          </h1>
          <p className="text-muted-foreground text-sm">
            Deploy deceptive endpoints to catch attackers scanning for vulnerabilities.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <motion.div variants={itemVars}>
        {isLoading || !data ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-full col-span-4" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrapStatCard
              label="Active Traps"
              value={data.stats.activeTraps}
              Icon={Radar}
            />
            <TrapStatCard
              label="IP Bans Issued"
              value={data.stats.ipBans}
              Icon={ShieldBan}
              iconClass="text-destructive"
              iconBg="bg-destructive/10 border-destructive/20"
            />
            <TrapStatCard
              label="Threats Caught"
              value={data.stats.threatsCaught}
              Icon={Target}
              iconClass="text-orange-400"
              iconBg="bg-orange-400/10 border-orange-400/20"
            />
            <TrapStatCard
              label="Avg Response"
              value={`${data.stats.avgResponseMs}ms`}
              Icon={Zap}
              iconClass="text-accent"
              iconBg="bg-accent/10 border-accent/20"
            />
          </div>
        )}
      </motion.div>

      {/* Operator console */}
      <motion.div variants={itemVars}>
        <OperatorConsole />
      </motion.div>

      {/* Deployed traps grid */}
      <motion.div variants={itemVars}>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Deployed Traps</h3>
        {isLoading || !data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.traps.map((trap) => (
              <TrapCard
                key={trap.id}
                trap={trap}
                isSimulating={simulateMutation.isPending}
                onSimulate={handleSimulate}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
