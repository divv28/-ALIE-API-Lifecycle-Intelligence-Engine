import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
  iconClass?: string;
  iconBg?: string;
  valueClass?: string;
}

export function StatCard({
  label,
  value,
  Icon,
  iconClass = "text-primary",
  iconBg = "bg-primary/10 border-primary/20",
  valueClass = "text-foreground",
}: StatCardProps) {
  return (
    <Card className="bg-gradient-to-br from-secondary/50 to-transparent border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className={`text-3xl font-display font-bold ${valueClass}`}>{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
