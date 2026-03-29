import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useGetDashboardStats,
  useGetTrafficData,
  useGetApis,
  useGetRecommendations,
} from "@workspace/api-client-react";

import { containerVars, itemVars } from "@/lib/animations";
import { useScan } from "@/hooks/use-scan";

import { RiskEngineCard } from "@/components/dashboard/RiskEngineCard";
import { ActionControlCard } from "@/components/dashboard/ActionControlCard";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { SystemStatusCard } from "@/components/dashboard/SystemStatusCard";
import { ApiHealthDonut } from "@/components/dashboard/ApiHealthDonut";
import { ReportsTile } from "@/components/dashboard/ReportsTile";
import { AiPreviewTile } from "@/components/dashboard/AiPreviewTile";
import { ApiDirectoryTable } from "@/components/dashboard/ApiDirectoryTable";
import { ScanButton } from "@/components/scan/ScanButton";
import { ScanResultPanel } from "@/components/scan/ScanResultPanel";

export default function CommandCenter() {
  const router = useRouter();

  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();
  const { data: traffic, isLoading: trafficLoading } = useGetTrafficData();
  const { data: apis, isLoading: apisLoading } = useGetApis();
  const { data: recommendations } = useGetRecommendations();

  const { scanPhase, scanResult, startScan, clearResult } = useScan();

  const [realtimeOn, setRealtimeOn] = useState<boolean | null>(null);
  const [autoKillOn, setAutoKillOn] = useState<boolean | null>(null);

  const effectiveRealtime = realtimeOn !== null ? realtimeOn : (stats?.realtimeInterception ?? true);
  const effectiveAutoKill = autoKillOn !== null ? autoKillOn : (stats?.autoKillMode ?? false);

  const topRecs = recommendations?.recommendations.slice(0, 3) ?? [];

  return (
    <>
      <motion.div
        className="space-y-6 pb-28"
        variants={containerVars}
        initial="hidden"
        animate="show"
      >
        {/* Row 1: Risk Engine + Action & Control */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVars} className="lg:col-span-2">
            <RiskEngineCard stats={stats} isLoading={statsLoading} />
          </motion.div>
          <motion.div variants={itemVars}>
            <ActionControlCard
              stats={stats}
              isLoading={statsLoading}
              realtimeOn={effectiveRealtime}
              autoKillOn={effectiveAutoKill}
              onRealtimeChange={setRealtimeOn}
              onAutoKillChange={setAutoKillOn}
            />
          </motion.div>
        </div>

        {/* Row 2: Traffic Chart + System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVars} className="lg:col-span-2">
            <TrafficChart
              traffic={traffic}
              isLoading={trafficLoading}
              scanPhase={scanPhase}
            />
          </motion.div>
          <motion.div variants={itemVars}>
            <SystemStatusCard
              stats={stats}
              isLoading={statsLoading}
              scanPhase={scanPhase}
            />
          </motion.div>
        </div>

        {/* Row 3: Donut + Reports + AI Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div variants={itemVars}>
            <ApiHealthDonut stats={stats} isLoading={statsLoading} />
          </motion.div>
          <motion.div variants={itemVars}>
            <ReportsTile
              stats={stats}
              isLoading={statsLoading}
              onNavigate={() => router.push("/reports")}
            />
          </motion.div>
          <motion.div variants={itemVars}>
            <AiPreviewTile
              recommendations={topRecs}
              isLoading={!recommendations}
              onNavigate={() => router.push("/ai-recommendations")}
            />
          </motion.div>
        </div>

        {/* Row 4: API Directory */}
        <motion.div variants={itemVars}>
          <ApiDirectoryTable
            apis={apis?.apis}
            isLoading={apisLoading}
            onNavigate={() => router.push("/reports")}
          />
        </motion.div>
      </motion.div>

      {/* Overlays (fixed position, outside scroll flow) */}
      <ScanResultPanel
        result={scanResult}
        onClose={clearResult}
        onViewRecs={() => { clearResult(); router.push("/ai-recommendations"); }}
      />
      <ScanButton phase={scanPhase} onClick={startScan} />
    </>
  );
}
