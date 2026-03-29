import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, ShieldAlert, Info, ArrowRight } from "lucide-react";
import { CountUp } from "@/components/scan/CountUp";
import type { ScanResult } from "@/hooks/use-scan";

interface ScanResultPanelProps {
  result: ScanResult | null;
  onClose: () => void;
  onViewRecs: () => void;
}

const severities = [
  {
    key: "critical" as const,
    label: "Critical",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    Icon: AlertTriangle,
  },
  {
    key: "medium" as const,
    label: "Medium",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    Icon: ShieldAlert,
  },
  {
    key: "low" as const,
    label: "Low",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.25)",
    Icon: Info,
  },
];

export function ScanResultPanel({ result, onClose, onViewRecs }: ScanResultPanelProps) {
  return (
    <AnimatePresence>
      {result && (
        <motion.div
          key="scan-result-panel"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed bottom-28 right-8 z-50 w-[320px] rounded-2xl overflow-hidden"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid rgba(0,240,192,0.25)",
            boxShadow: "0 0 40px rgba(0,240,192,0.08), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="h-[3px] w-full"
            style={{ background: "linear-gradient(90deg, #00f0c0, #0ea5e9, transparent)" }}
          />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(0,240,192,0.12)", border: "1px solid rgba(0,240,192,0.3)" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-none">Scan Complete</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <CountUp target={result.total} duration={900} /> vulnerabilities detected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Severity rows */}
            <div className="space-y-2 mb-4">
              {severities.map(({ key, label, color, bg, border, Icon }) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-xs font-medium" style={{ color }}>{label}</span>
                  </div>
                  <span className="text-sm font-bold font-mono" style={{ color }}>
                    <CountUp target={result[key]} duration={800} />
                  </span>
                </div>
              ))}
            </div>

            {/* Stacked progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono mb-1.5">
                <span>Risk distribution</span>
                <span>{result.total} total</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden flex" style={{ background: "hsl(var(--secondary))" }}>
                {[
                  { count: result.critical, color: "#ef4444", delay: 0.3 },
                  { count: result.medium, color: "#f59e0b", delay: 0.5 },
                  { count: result.low, color: "#38bdf8", delay: 0.7 },
                ].map(({ count, color, delay }, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / result.total) * 100}%` }}
                    transition={{ duration: 0.8, delay, ease: "easeOut" }}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={onViewRecs}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: "rgba(0,240,192,0.1)",
                border: "1px solid rgba(0,240,192,0.3)",
                color: "#00f0c0",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,240,192,0.18)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(0,240,192,0.1)")}
            >
              View AI Recommendations
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
