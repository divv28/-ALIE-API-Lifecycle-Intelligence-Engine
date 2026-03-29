import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, CheckCircle2 } from "lucide-react";
import { COLORS } from "@/lib/constants";
import type { ScanPhase } from "@/hooks/use-scan";

interface ScanButtonProps {
  phase: ScanPhase;
  onClick: () => void;
}

export function ScanButton({ phase, onClick }: ScanButtonProps) {
  const isIdle = phase === "idle";
  const isBoost = phase === "boost";
  const isScanning = phase === "scanning";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      {/* Idle breathing ring */}
      <AnimatePresence>
        {isIdle && (
          <motion.span
            key="idle-ring"
            className="absolute rounded-full"
            style={{ inset: -12, border: `1.5px solid ${COLORS.teal}`, opacity: 0.35 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Boost shockwave rings */}
      <AnimatePresence>
        {isBoost &&
          [0, 1].map((i) => (
            <motion.span
              key={`boost-${i}`}
              className="absolute rounded-full"
              style={{ inset: 0, border: `2px solid ${COLORS.teal}` }}
              initial={{ scale: 1, opacity: 0.9 }}
              animate={{ scale: 2.8 + i * 0.8, opacity: 0 }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Scanning concentric sonar rings */}
      <AnimatePresence>
        {isScanning &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={`scan-ring-${i}`}
              className="absolute rounded-full"
              style={{ inset: -8 * (i + 1), border: `1px solid ${COLORS.blue}` }}
              animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.6, delay: i * 0.38, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
      </AnimatePresence>

      {/* Button face */}
      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.button
            key="idle"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            onClick={onClick}
            className="relative flex items-center gap-2.5 px-5 h-12 rounded-full font-semibold text-sm cursor-pointer select-none"
            style={{
              background: `linear-gradient(135deg, ${COLORS.teal}, #0ea5e9)`,
              color: "#050f1a",
              boxShadow: `0 0 18px rgba(0,240,192,0.4), 0 4px 18px rgba(0,0,0,0.5)`,
            }}
          >
            <ScanLine className="w-4 h-4 flex-shrink-0" />
            Start Scan
          </motion.button>
        )}

        {phase === "boost" && (
          <motion.div
            key="boost"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-2.5 px-5 h-12 rounded-full font-semibold text-sm select-none"
            style={{
              background: `linear-gradient(135deg, #fff, ${COLORS.teal})`,
              color: "#050f1a",
              boxShadow: `0 0 40px rgba(0,240,192,0.75), 0 0 80px rgba(0,240,192,0.3)`,
            }}
          >
            <ScanLine className="w-4 h-4 flex-shrink-0" />
            Initiating…
          </motion.div>
        )}

        {phase === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-2.5 px-5 h-12 rounded-full font-semibold text-sm select-none"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              color: "#fff",
              boxShadow: `0 0 28px rgba(14,165,233,0.55), 0 4px 18px rgba(0,0,0,0.5)`,
            }}
          >
            <motion.span
              className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white flex-shrink-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "linear" }}
            />
            Scanning…
          </motion.div>
        )}

        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="flex items-center gap-2.5 px-5 h-12 rounded-full font-semibold text-sm select-none"
            style={{
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              color: "#fff",
              boxShadow: `0 0 22px rgba(34,197,94,0.5)`,
            }}
          >
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            Complete
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
