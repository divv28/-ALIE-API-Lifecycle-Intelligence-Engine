import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scaleVars } from "@/lib/animations";
import type { Trap } from "@workspace/api-client-react/src/generated/api.schemas";

const STATUS_BADGE: Record<string, string> = {
  armed: "bg-primary/20 text-primary hover:bg-primary/30",
  triggered: "bg-destructive text-white hover:bg-destructive/90 animate-pulse",
  disabled: "bg-muted text-muted-foreground hover:bg-muted/80",
};

interface TrapCardProps {
  trap: Trap;
  isSimulating: boolean;
  onSimulate: (endpoint: string) => void;
}

export function TrapCard({ trap, isSimulating, onSimulate }: TrapCardProps) {
  return (
    <motion.div variants={scaleVars}>
      <Card
        className={`border-border/50 overflow-hidden relative group hover:border-primary/50 transition-colors ${
          trap.status === "triggered" ? "border-destructive/50 bg-destructive/5" : ""
        }`}
      >
        {/* Status bar */}
        {trap.status === "triggered" && (
          <div className="absolute top-0 left-0 w-full h-1 bg-destructive animate-pulse" />
        )}
        {trap.status === "armed" && (
          <div className="absolute top-0 left-0 w-full h-1 bg-primary/50" />
        )}

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="font-mono text-xs bg-secondary/50 border-border">
              {trap.endpoint}
            </Badge>
            <Badge className={`capitalize ${STATUS_BADGE[trap.status] ?? ""}`}>
              {trap.status}
            </Badge>
          </div>
          <CardTitle className="text-base mt-2">{trap.description}</CardTitle>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Total Hits</p>
              <p className="font-mono font-medium text-foreground">{trap.hits}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Unique IPs</p>
              <p className="font-mono font-medium text-foreground">{trap.uniqueIps}</p>
            </div>
            <div className="col-span-2">
              <p className="text-muted-foreground text-xs">Last Triggered</p>
              <p className="font-mono font-medium text-foreground text-xs">
                {trap.lastTriggered ? new Date(trap.lastTriggered).toLocaleString() : "Never"}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 border-t border-border/50 bg-secondary/10 flex gap-2 p-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onSimulate(trap.endpoint)}
            disabled={isSimulating || trap.status === "disabled"}
          >
            Simulate
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            {trap.status === "disabled" ? "Enable" : "Disarm"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
