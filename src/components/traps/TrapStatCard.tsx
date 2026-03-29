import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TrapStatCardProps {
  label: string;
  value: string | number;
  Icon: LucideIcon;
  iconClass?: string;
  iconBg?: string;
}

export function TrapStatCard({
  label,
  value,
  Icon,
  iconClass = "text-primary",
  iconBg = "bg-primary/10 border-primary/20",
}: TrapStatCardProps) {
  return (
    <Card className="bg-secondary/20 border-border/50">
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconClass}`} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold font-display">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
