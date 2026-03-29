export const COLORS = {
  teal: "#00f0c0",
  amber: "#f59e0b",
  red: "#ef4444",
  blue: "#38bdf8",
} as const;

export const API_STATUS_COLORS: Record<string, string> = {
  verified: COLORS.teal,
  shadow: COLORS.amber,
  zombie: COLORS.red,
  monitoring: COLORS.blue,
};

export const SEVERITY_CLASSES: Record<string, string> = {
  critical: "text-destructive border-destructive/40 bg-destructive/10",
  high: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  medium: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  low: "text-primary border-primary/40 bg-primary/10",
};

export const METHOD_CLASSES: Record<string, string> = {
  GET: "text-blue-400 border-blue-400/50 bg-blue-400/10",
  POST: "text-emerald-400 border-emerald-400/50 bg-emerald-400/10",
  DELETE: "text-destructive border-destructive/50 bg-destructive/10",
  PUT: "text-yellow-400 border-yellow-400/50 bg-yellow-400/10",
  PATCH: "text-orange-400 border-orange-400/50 bg-orange-400/10",
};
