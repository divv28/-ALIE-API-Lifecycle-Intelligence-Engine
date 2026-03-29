import { useState } from "react";
import { TerminalSquare, Radar, Search, AlertOctagon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useBlockThreat } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetTrapsQueryKey } from "@workspace/api-client-react";

export function OperatorConsole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const blockMutation = useBlockThreat();

  const [ipToBlock, setIpToBlock] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const handleBlockIp = () => {
    if (!ipToBlock) return;
    blockMutation.mutate(
      { data: { ip: ipToBlock, reason: blockReason } },
      {
        onSuccess: () => {
          toast({ title: "IP Blocked", description: `${ipToBlock} has been added to the blocklist.` });
          setIpToBlock("");
          setBlockReason("");
          queryClient.invalidateQueries({ queryKey: getGetTrapsQueryKey() });
        },
        onError: () =>
          toast({ title: "Error", description: "Failed to block IP", variant: "destructive" }),
      }
    );
  };

  return (
    <Card className="border-primary/30 bg-card/80 backdrop-blur-md shadow-lg shadow-primary/5">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TerminalSquare className="w-5 h-5 text-primary" />
          Manual Operator Console
        </CardTitle>
        <CardDescription>Direct intervention tools for active threats</CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IP Block form */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Targeted IP Block
          </h3>
          <div className="space-y-3">
            <Input
              placeholder="Enter IP Address (e.g. 192.168.1.100)"
              className="bg-secondary/50 font-mono"
              value={ipToBlock}
              onChange={(e) => setIpToBlock(e.target.value)}
            />
            <Textarea
              placeholder="Reason for block (optional)"
              className="bg-secondary/50 min-h-[80px]"
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
            />
            <Button
              className="w-full bg-destructive hover:bg-destructive/90 text-white"
              onClick={handleBlockIp}
              disabled={!ipToBlock || blockMutation.isPending}
            >
              {blockMutation.isPending ? "Executing…" : "Execute Immediate Block"}
            </Button>
          </div>
        </div>

        {/* System actions */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            System Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <Radar className="w-6 h-6" />
              Deploy New Trap
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-orange-400/30 hover:bg-orange-400/10 hover:text-orange-400"
            >
              <Search className="w-6 h-6" />
              Scan for Zombies
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-destructive/30 hover:bg-destructive/10 hover:text-destructive sm:col-span-2 text-destructive"
            >
              <AlertOctagon className="w-6 h-6" />
              <span className="font-bold tracking-widest">EMERGENCY LOCKDOWN</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
