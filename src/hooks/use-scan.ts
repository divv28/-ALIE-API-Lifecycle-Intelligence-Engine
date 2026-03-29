import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getGetDashboardStatsQueryKey,
  getGetTrafficDataQueryKey,
  getGetApisQueryKey,
} from "@workspace/api-client-react";

export type ScanPhase = "idle" | "boost" | "scanning" | "result";

export interface ScanResult {
  total: number;
  critical: number;
  medium: number;
  low: number;
}

function makeScanResult(): ScanResult {
  const critical = Math.floor(Math.random() * 4) + 1;
  const medium = Math.floor(Math.random() * 6) + 2;
  const low = Math.floor(Math.random() * 8) + 3;
  return { total: critical + medium + low, critical, medium, low };
}

export function useScan() {
  const queryClient = useQueryClient();
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);

  const startScan = useCallback(() => {
    if (scanPhase !== "idle") return;

    setScanPhase("boost");

    setTimeout(() => {
      setScanPhase("scanning");

      setTimeout(() => {
        const result = makeScanResult();
        setScanResult(result);
        setScanPhase("result");

        queryClient.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTrafficDataQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetApisQueryKey() });

        setTimeout(() => setScanPhase("idle"), 2000);
      }, 3200);
    }, 350);
  }, [scanPhase, queryClient]);

  const clearResult = useCallback(() => setScanResult(null), []);

  return { scanPhase, scanResult, startScan, clearResult };
}
