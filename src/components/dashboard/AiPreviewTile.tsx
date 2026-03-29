import { BrainCircuit, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEVERITY_CLASSES } from "@/lib/constants";
import type { Recommendation } from "@workspace/api-client-react/src/generated/api.schemas";

interface AiPreviewTileProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  onNavigate: () => void;
}

export function AiPreviewTile({ recommendations, isLoading, onNavigate }: AiPreviewTileProps) {
  return (
    <Card
      className="border-border/50 flex flex-col cursor-pointer group hover:border-primary/40 transition-colors"
      style={{ minHeight: 360 }}
      onClick={onNavigate}
    >
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-base flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-4 pb-4">
        <div className="space-y-3">
          {isLoading || recommendations.length === 0
            ? [1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)
            : recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 bg-secondary/30 rounded-lg border border-border/40 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-foreground truncate">{rec.title}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] flex-shrink-0 ${SEVERITY_CLASSES[rec.priority] ?? ""}`}
                    >
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{rec.description}</p>
                </div>
              ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4 border-primary/40 text-primary hover:bg-primary/10 group-hover:border-primary transition-colors"
          onClick={(e) => { e.stopPropagation(); onNavigate(); }}
        >
          View AI Recommendations
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
