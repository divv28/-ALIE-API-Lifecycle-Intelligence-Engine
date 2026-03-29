import { motion } from "framer-motion";
import {
  AlertTriangle, CheckCircle2, Clock, TrendingDown, Wand2, Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { itemVars } from "@/lib/animations";
import { SEVERITY_CLASSES } from "@/lib/constants";
import type { Recommendation } from "@workspace/api-client-react/src/generated/api.schemas";

interface RecommendationCardProps {
  rec: Recommendation;
  isPending: boolean;
  pendingId: string | undefined;
  onApply: (id: string, title: string) => void;
}

export function RecommendationCard({ rec, isPending, pendingId, onApply }: RecommendationCardProps) {
  const priorityClass = SEVERITY_CLASSES[rec.priority] ?? "";

  return (
    <motion.div variants={itemVars}>
      <Card
        className={`border-border/50 overflow-hidden relative backdrop-blur-md transition-all duration-300 ${
          rec.applied
            ? "opacity-60 bg-secondary/10"
            : "bg-card/80 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.05)]"
        }`}
      >
        {/* Applied overlay */}
        {rec.applied && (
          <div className="absolute inset-0 bg-background/50 z-20 flex items-center justify-center backdrop-blur-[2px]">
            <Badge className="text-lg py-2 px-4 bg-green-500/20 text-green-400 border-green-500/50">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Remediation Applied
            </Badge>
          </div>
        )}

        {/* Priority accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent opacity-50" />

        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: details */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`capitalize font-semibold tracking-wider ${priorityClass}`}>
                  {rec.priority === "critical" && <AlertTriangle className="w-3 h-3 mr-1.5" />}
                  {rec.priority} Priority
                </Badge>
                <Badge variant="outline" className="bg-secondary text-muted-foreground border-border">
                  {rec.confidencePercent}% Confidence
                </Badge>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">{rec.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{rec.description}</p>
              </div>

              <div className="bg-secondary/30 p-4 rounded-xl border border-border/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Affected Endpoints
                </h4>
                <div className="flex flex-wrap gap-2">
                  {rec.endpoints.map((ep) => (
                    <span
                      key={ep}
                      className="px-2.5 py-1 rounded bg-background border border-border font-mono text-xs text-foreground"
                    >
                      {ep}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: metrics + CTA */}
            <div className="w-full md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/50 pt-6 md:pt-0 md:pl-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <TrendingDown className="w-3.5 h-3.5" /> Risk Reduction
                  </p>
                  <p className="text-2xl font-display font-bold text-green-400">-{rec.riskReductionPercent}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" /> Est. Time to Fix
                  </p>
                  <p className="text-lg font-medium text-foreground">{rec.estimatedTimeMin} min</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Expected Impact
                  </p>
                  <p className="text-sm font-medium text-foreground">{rec.impact}</p>
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                onClick={() => onApply(rec.id, rec.title)}
                disabled={rec.applied || isPending}
              >
                {isPending && pendingId === rec.id ? (
                  "Applying…"
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Auto-Fix Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
