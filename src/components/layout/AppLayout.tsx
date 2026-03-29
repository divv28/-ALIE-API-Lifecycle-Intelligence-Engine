"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ShieldAlert, Target, BrainCircuit, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/", label: "Command Center", icon: Activity },
  { href: "/reports", label: "Reports & Analytics", icon: ShieldAlert },
  { href: "/zombie-traps", label: "Zombie Traps", icon: Target },
  { href: "/ai-recommendations", label: "AI Recommendations", icon: BrainCircuit },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/30 selection:text-primary-foreground">
      {/* Mobile Nav Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-card border-r border-border/50 shadow-2xl transition-transform duration-300 ease-out
        lg:translate-x-0 flex flex-col
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Branding */}
        <div className="h-20 flex items-center px-6 border-b border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 neon-border">
              <BrainCircuit className="text-primary w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-2xl font-bold tracking-wider text-foreground leading-none">
                ALIE<span className="text-primary">.</span>
              </h1>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
                API Security Engine
              </span>
            </div>
          </div>
          <button 
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="px-3 mb-2 text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Modules
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"} transition-colors`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status footer */}
        <div className="p-4 border-t border-border/50">
          <div className="bg-secondary/50 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">System Status</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            </div>
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>Latency</span>
              <span className="text-primary font-mono">0ms</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 lg:pl-72 transition-all duration-300">
        <header className="h-20 border-b border-border/50 glass-panel sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground hidden sm:block neon-text">
              {NAV_ITEMS.find(i => i.href === location)?.label || "Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-sm">
              <div className="w-2 h-2 rounded-full bg-primary mr-2 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              <span className="text-muted-foreground">Intercept: </span>
              <span className="text-foreground font-medium ml-1">Active</span>
            </div>
            
            <Button variant="outline" size="icon" className="relative rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full border border-card" />
            </Button>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/80 to-accent/80 border-2 border-background shadow-lg flex items-center justify-center text-background font-bold text-sm">
              OP
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
