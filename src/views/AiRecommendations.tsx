import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { useGetRecommendations, useApplyRecommendation } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetRecommendationsQueryKey } from "@workspace/api-client-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { containerVars } from "@/lib/animations";
import { RecommendationCard } from "@/components/recommendations/RecommendationCard";

export default function AiRecommendations() {
  const { data, isLoading } = useGetRecommendations();
  const applyMutation = useApplyRecommendation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleApply = (id: string, title: string) => {
    applyMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "Fix Applied Successfully", description: `Applied: ${title}` });
          queryClient.invalidateQueries({ queryKey: getGetRecommendationsQueryKey() });
        },
        onError: () =>
          toast({ title: "Error", description: "Failed to apply fix", variant: "destructive" }),
      }
    );
  };

  return (
    <motion.div
      className="space-y-6 max-w-5xl mx-auto"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/10 border border-primary/40 flex items-center justify-center neon-border relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 animate-pulse" />
            <BrainCircuit className="w-8 h-8 text-primary relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              ALIE Intelligence
            </h1>
            <p className="text-primary text-sm font-medium tracking-wide">
              AUTONOMOUS REMEDIATION SUGGESTIONS
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-muted-foreground font-mono">Last analysis: 2 mins ago</p>
          <p className="text-xs text-muted-foreground font-mono">Confidence threshold: &gt;85%</p>
        </div>
      </div>

      {/* Recommendation cards */}
      {isLoading || !data ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {data.recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              rec={rec}
              isPending={applyMutation.isPending}
              pendingId={applyMutation.variables?.id}
              onApply={handleApply}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
