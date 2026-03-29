import { NextResponse } from 'next/server';

const MOCK_APIS = [
  { id: "1", path: "/api/v1/payments", method: "POST", status: "verified", riskScore: 12, lastSeen: "2m ago", requests: 4820 },
  { id: "2", path: "/api/v1/users", method: "GET", status: "verified", riskScore: 8, lastSeen: "1m ago", requests: 12340 },
  { id: "3", path: "/api/legacy/auth", method: "POST", status: "shadow", riskScore: 78, lastSeen: "4h ago", requests: 230 },
  { id: "4", path: "/api/deprecated/users", method: "GET", status: "zombie", riskScore: 91, lastSeen: "3d ago", requests: 12 },
  { id: "5", path: "/api/v1/transactions", method: "GET", status: "verified", riskScore: 15, lastSeen: "30s ago", requests: 8910 },
  { id: "6", path: "/api/internal/admin", method: "POST", status: "shadow", riskScore: 85, lastSeen: "6h ago", requests: 45 },
  { id: "7", path: "/api/v2/accounts", method: "GET", status: "monitoring", riskScore: 34, lastSeen: "5m ago", requests: 3201 },
  { id: "8", path: "/api/v1/kyc", method: "POST", status: "verified", riskScore: 22, lastSeen: "8m ago", requests: 1893 },
  { id: "9", path: "/api/zombie/payments", method: "DELETE", status: "zombie", riskScore: 96, lastSeen: "14d ago", requests: 3 }
];

const MOCK_RECOMMENDATIONS = [
  {
    id: "r1", title: "Enable Rate Limiting on Payment Endpoints",
    description: "Configure rate limiting to prevent abuse.",
    priority: "high", impact: "High", endpoints: ["/api/v1/payments/*"],
    confidencePercent: 92, estimatedTimeMin: 15, riskReductionPercent: 35, applied: false
  },
  {
    id: "r2", title: "Decommission Zombie APIs",
    description: "Remove deprecated endpoints receiving zero traffic.",
    priority: "critical", impact: "Severe", endpoints: ["/api/legacy/*"],
    confidencePercent: 99, estimatedTimeMin: 120, riskReductionPercent: 65, applied: false
  }
];

const MOCK_TRAPS = [
  { id: "t1", endpoint: "/api/v1/admin/hidden", status: "armed", hits: 0, uniqueIps: 0, avgLatencyMs: 0, lastTriggered: "Never", description: "Admin panel honeypot" },
  { id: "t2", endpoint: "/api/legacy/auth", status: "triggered", hits: 142, uniqueIps: 3, avgLatencyMs: 450, lastTriggered: "2m ago", description: "Old auth exploit trap" }
];

const MOCK_THREATS = [
  { id: "th1", ip: "192.168.1.45", endpoint: "/api/legacy/auth", type: "SQL Injection", severity: "high", timestamp: "5m ago", blocked: true },
  { id: "th2", ip: "10.0.0.21", endpoint: "/api/v1/payments", type: "Rate Limit Exceeded", severity: "medium", timestamp: "12m ago", blocked: false }
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/healthz') {
    return NextResponse.json({ status: "ok" });
  }

  if (path === '/api/dashboard/stats') {
    return NextResponse.json({
      riskIndex: 42, riskLevel: "LOW", shadowApis: 7, zombieApis: 3,
      threatsBlocked: 1284, totalApis: 247, verifiedApis: 218, monitoringApis: 19,
      coveragePercent: 94.3, alertsToday: 7, avgRiskScore: 42, lastScan: "2 hrs ago",
      autoBlockEnabled: true, realtimeInterception: true, autoKillMode: false, responseTimeMs: 0.3
    });
  }

  if (path === '/api/dashboard/traffic') {
    const data = Array.from({ length: 30 }, (_, i) => ({
      time: `${Math.floor(i / 2)}:${(i % 2) * 30}`,
      requests: Math.floor(Math.random() * 100),
      threats: Math.floor(Math.random() * 5)
    }));
    return NextResponse.json({ data });
  }

  if (path === '/api/apis') {
    return NextResponse.json({ apis: MOCK_APIS });
  }

  if (path === '/api/recommendations') {
    return NextResponse.json({ recommendations: MOCK_RECOMMENDATIONS });
  }

  if (path === '/api/traps') {
    return NextResponse.json({
      traps: MOCK_TRAPS,
      stats: { activeTraps: 2, ipBans: 10, threatsCaught: 45, avgResponseMs: 12 }
    });
  }

  if (path === '/api/threats') {
    return NextResponse.json({ threats: MOCK_THREATS });
  }

  if (path === '/api/reports') {
    return NextResponse.json({
      summary: { totalScans: 15, threatsNeutralized: 1500, apisDiscovered: 247, uptime: 99.9, period: "last 30 days" },
      historical: [
        { date: "2026-03-24", threats: 12, shadowApis: 4, zombieApis: 2, blockedRequests: 300 },
        { date: "2026-03-25", threats: 8, shadowApis: 5, zombieApis: 2, blockedRequests: 210 },
        { date: "2026-03-26", threats: 15, shadowApis: 7, zombieApis: 3, blockedRequests: 450 },
        { date: "2026-03-27", threats: 6, shadowApis: 7, zombieApis: 3, blockedRequests: 180 },
        { date: "2026-03-28", threats: 20, shadowApis: 7, zombieApis: 3, blockedRequests: 590 },
        { date: "2026-03-29", threats: 14, shadowApis: 7, zombieApis: 3, blockedRequests: 320 }
      ],
      recentLogs: MOCK_THREATS
    });
  }

  return NextResponse.json({ error: "Not Found" }, { status: 404 });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  return NextResponse.json({ success: true, message: "Action successful" });
}
