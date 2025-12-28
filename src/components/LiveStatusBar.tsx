import { useEffect, useState } from "react";
import { Activity, Users, TrendingUp, Zap, Wifi, Server, Database } from "lucide-react";

const LiveStatusBar = () => {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    applicationsToday: 89,
    avgProcessingTime: 4.2,
    systemUptime: 99.97,
  });

  const [serverStatus, setServerStatus] = useState({
    api: "operational",
    database: "operational",
    ml: "operational",
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        applicationsToday: prev.applicationsToday + (Math.random() > 0.7 ? 1 : 0),
        avgProcessingTime: Math.max(3.5, Math.min(5.5, prev.avgProcessingTime + (Math.random() - 0.5) * 0.2)),
        systemUptime: 99.97,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-foreground/95 text-background py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
          {/* Live Indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="font-medium hidden sm:inline">LIVE</span>
          </div>

          {/* Scrolling Stats */}
          <div className="flex items-center gap-6 overflow-hidden">
            <div className="flex items-center gap-2 animate-pulse">
              <Users className="w-3.5 h-3.5 text-info" />
              <span className="font-mono">{stats.activeUsers.toLocaleString()}</span>
              <span className="text-background/60 hidden sm:inline">online</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-success" />
              <span className="font-mono">{stats.applicationsToday}</span>
              <span className="text-background/60">applications today</span>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-warning" />
              <span className="font-mono">{stats.avgProcessingTime.toFixed(1)}min</span>
              <span className="text-background/60">avg. processing</span>
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono">{stats.systemUptime}%</span>
              <span className="text-background/60">uptime</span>
            </div>
          </div>

          {/* Server Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title="API Status">
              <Server className="w-3 h-3" />
              <span className={`w-1.5 h-1.5 rounded-full ${serverStatus.api === "operational" ? "bg-success" : "bg-destructive"}`} />
            </div>
            <div className="flex items-center gap-1" title="Database Status">
              <Database className="w-3 h-3" />
              <span className={`w-1.5 h-1.5 rounded-full ${serverStatus.database === "operational" ? "bg-success" : "bg-destructive"}`} />
            </div>
            <div className="flex items-center gap-1" title="ML Engine Status">
              <Wifi className="w-3 h-3" />
              <span className={`w-1.5 h-1.5 rounded-full ${serverStatus.ml === "operational" ? "bg-success" : "bg-destructive"}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatusBar;