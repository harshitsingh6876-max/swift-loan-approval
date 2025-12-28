import { useEffect, useState } from "react";
import { Brain, Cpu, Database, GitBranch, Shield, Server, Activity, Lock } from "lucide-react";

const TechMetricsSection = () => {
  const [metrics, setMetrics] = useState({
    mlAccuracy: 99.2,
    apiLatency: 45,
    documentsProcessed: 15847,
    encryptionLevel: 256,
    aiModelsActive: 12,
    dailyTransactions: 2847,
  });

  const [processingData, setProcessingData] = useState<number[]>([65, 72, 58, 89, 76, 82, 68, 91, 85, 79]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        apiLatency: Math.max(30, Math.min(80, prev.apiLatency + (Math.random() - 0.5) * 10)),
        documentsProcessed: prev.documentsProcessed + Math.floor(Math.random() * 3),
        dailyTransactions: prev.dailyTransactions + Math.floor(Math.random() * 5),
      }));

      setProcessingData((prev) => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 40) + 60];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const techStack = [
    { icon: Brain, label: "ML Models", value: metrics.aiModelsActive, unit: "active", color: "text-primary" },
    { icon: Cpu, label: "API Latency", value: Math.round(metrics.apiLatency), unit: "ms", color: "text-success" },
    { icon: Database, label: "Documents", value: metrics.documentsProcessed.toLocaleString(), unit: "processed", color: "text-info" },
    { icon: Lock, label: "Encryption", value: metrics.encryptionLevel, unit: "bit AES", color: "text-warning" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary mb-4">
            <Cpu className="w-4 h-4" />
            <span className="text-sm font-medium">Technical Infrastructure</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Enterprise-Grade
            <span className="text-primary"> Technology Stack</span>
          </h2>
          <p className="text-background/60">
            Powered by cutting-edge infrastructure for reliability and speed
          </p>
        </div>

        {/* Tech Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {techStack.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm group hover:bg-background/10 transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                </span>
              </div>
              <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
              <div className="text-2xl lg:text-3xl font-bold font-mono mb-1">
                {item.value}
              </div>
              <div className="text-sm text-background/60">
                <span className="text-background/80">{item.label}</span> • {item.unit}
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Processing Graph */}
        <div className="p-6 lg:p-8 rounded-2xl bg-background/5 border border-background/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Real-time Processing Load</h3>
                <p className="text-sm text-background/60">ML inference engine activity</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              <span className="text-success font-medium">Healthy</span>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="flex items-end gap-1 h-24">
            {processingData.map((value, index) => (
              <div
                key={index}
                className="flex-1 bg-primary/60 rounded-t transition-all duration-500"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-background/10">
            {["TensorFlow", "PyTorch", "FastAPI", "PostgreSQL", "Redis", "Kubernetes", "AWS", "GraphQL"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-background/10 text-xs font-mono text-background/80"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Architecture Flow */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-background/5 border border-background/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-semibold">Microservices</h4>
            </div>
            <p className="text-sm text-background/60">
              Distributed architecture with auto-scaling capabilities and 99.99% uptime SLA
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-background/5 border border-background/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <h4 className="font-semibold">Bank-Grade Security</h4>
            </div>
            <p className="text-sm text-background/60">
              End-to-end encryption, SOC 2 compliant, and ISO 27001 certified infrastructure
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-background/5 border border-background/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center">
                <Server className="w-5 h-5 text-info" />
              </div>
              <h4 className="font-semibold">Multi-Region</h4>
            </div>
            <p className="text-sm text-background/60">
              Deployed across 3 AWS regions in India for low latency and disaster recovery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMetricsSection;