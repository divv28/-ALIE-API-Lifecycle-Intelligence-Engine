import { motion } from "framer-motion";
import { Download, Search, ShieldCheck, Database, Clock } from "lucide-react";
import { useGetReports } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { containerVars, itemVars } from "@/lib/animations";
import { StatCard } from "@/components/reports/StatCard";
import { ThreatChart } from "@/components/reports/ThreatChart";
import { ThreatLogsTable } from "@/components/reports/ThreatLogsTable";

export default function Reports() {
  const { data: reports, isLoading } = useGetReports();

  return (
    <motion.div className="space-y-6" variants={containerVars} initial="hidden" animate="show">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Security Reports & Analytics
          </h1>
          <p className="text-muted-foreground text-sm">
            Comprehensive view of your API security posture
          </p>
        </div>
        <Button className="bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-primary-foreground neon-border">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Summary stat cards */}
      <motion.div variants={itemVars}>
        {isLoading || !reports ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Scans"
              value={reports.summary.totalScans.toLocaleString()}
              Icon={Search}
            />
            <StatCard
              label="Threats Neutralized"
              value={reports.summary.threatsNeutralized.toLocaleString()}
              Icon={ShieldCheck}
              valueClass="text-primary neon-text"
            />
            <StatCard
              label="APIs Discovered"
              value={reports.summary.apisDiscovered.toLocaleString()}
              Icon={Database}
              iconClass="text-accent"
              iconBg="bg-accent/10 border-accent/20"
            />
            <StatCard
              label="System Uptime"
              value={`${reports.summary.uptime}%`}
              Icon={Clock}
              iconClass="text-green-500"
              iconBg="bg-green-500/10 border-green-500/20"
            />
          </div>
        )}
      </motion.div>

      {/* Historical bar chart */}
      <motion.div variants={itemVars}>
        <ThreatChart data={reports?.historical} isLoading={isLoading} />
      </motion.div>

      {/* Threat logs table */}
      <motion.div variants={itemVars}>
        <ThreatLogsTable logs={reports?.recentLogs} isLoading={isLoading} />
      </motion.div>
    </motion.div>
  );
}
