import { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Threat } from "@workspace/api-client-react/src/generated/api.schemas";

const SEVERITY_CLASSES: Record<string, string> = {
  critical: "text-destructive border-destructive/50 bg-destructive/10",
  high: "text-orange-400 border-orange-400/50 bg-orange-400/10",
  medium: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  low: "text-primary border-primary/50 bg-primary/10",
};

interface ThreatLogsTableProps {
  logs: Threat[] | undefined;
  isLoading: boolean;
}

export function ThreatLogsTable({ logs, isLoading }: ThreatLogsTableProps) {
  const [search, setSearch] = useState("");

  const filtered = logs?.filter(
    (l) =>
      l.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      l.type.toLowerCase().includes(search.toLowerCase()) ||
      l.ip.includes(search)
  );

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4">
        <CardTitle>Recent Threat Logs</CardTitle>
        <div className="flex items-center w-64 relative">
          <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
          <Input
            placeholder="Search logs…"
            className="pl-9 bg-secondary/30 border-border/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading || !logs ? (
          <div className="p-6">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-secondary/20">
              <TableRow className="border-border/50">
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="font-mono">Endpoint</TableHead>
                <TableHead className="font-mono">Source IP</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filtered ?? []).map((log) => (
                <TableRow key={log.id} className="border-border/50 hover:bg-secondary/30">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize border-opacity-50 ${SEVERITY_CLASSES[log.severity] ?? ""}`}
                    >
                      {log.severity === "critical" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{log.type}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.endpoint}</TableCell>
                  <TableCell className="font-mono text-xs text-foreground">{log.ip}</TableCell>
                  <TableCell className="text-right">
                    {log.blocked ? (
                      <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">
                        Blocked
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Monitored
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
