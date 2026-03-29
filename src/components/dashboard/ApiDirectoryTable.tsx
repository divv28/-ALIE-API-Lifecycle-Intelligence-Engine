import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { API_STATUS_COLORS, METHOD_CLASSES } from "@/lib/constants";
import type { ApiEndpoint } from "@workspace/api-client-react/src/generated/api.schemas";

interface ApiDirectoryTableProps {
  apis: ApiEndpoint[] | undefined;
  isLoading: boolean;
  onNavigate: () => void;
}

export function ApiDirectoryTable({ apis, isLoading, onNavigate }: ApiDirectoryTableProps) {
  return (
    <Card className="border-border/50 overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Live API Directory</CardTitle>
            <CardDescription>Continuous endpoint discovery and monitoring</CardDescription>
          </div>
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/10"
            onClick={onNavigate}
          >
            View Full Reports <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading || !apis ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-secondary/40">
                <TableRow className="border-border/50 hover:bg-transparent">
                  {["Method", "Endpoint", "Status", "Risk", "Req/min", "Last Seen"].map((h) => (
                    <TableHead
                      key={h}
                      className={`font-mono text-[11px] uppercase tracking-wider ${["Risk", "Req/min", "Last Seen"].includes(h) ? "text-right" : ""}`}
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {apis.slice(0, 8).map((api) => {
                  const statusColor = API_STATUS_COLORS[api.status] ?? "#888";
                  const methodClass = METHOD_CLASSES[api.method] ?? "text-muted-foreground border-border";
                  return (
                    <TableRow
                      key={api.id}
                      className="border-border/50 hover:bg-secondary/30 transition-colors"
                    >
                      <TableCell>
                        <Badge variant="outline" className={`font-mono text-[10px] uppercase ${methodClass}`}>
                          {api.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-foreground">{api.path}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: statusColor, boxShadow: `0 0 6px ${statusColor}80` }}
                          />
                          <span className="text-xs text-muted-foreground capitalize">{api.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        <span
                          className={
                            api.riskScore > 75
                              ? "text-destructive font-bold"
                              : api.riskScore > 40
                              ? "text-amber-400"
                              : "text-muted-foreground"
                          }
                        >
                          {api.riskScore}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">
                        {api.requests.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs text-muted-foreground">
                        {api.lastSeen}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
