import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  Banknote,
  CircleDot,
} from "lucide-react";

const ApplicationTracker = () => {
  const [applicationId, setApplicationId] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  // Demo tracking data
  const trackingData = {
    applicationId: "LAP-2024-78543",
    customerName: "Rajesh Kumar",
    loanAmount: "₹75,00,000",
    status: "Document Verification",
    statusCode: 3, // 1-5
    appliedDate: "15 Dec 2024",
    expectedDate: "22 Dec 2024",
    stages: [
      {
        id: 1,
        name: "Application Submitted",
        status: "completed",
        date: "15 Dec 2024",
        time: "10:30 AM",
      },
      {
        id: 2,
        name: "AI Pre-Approval",
        status: "completed",
        date: "15 Dec 2024",
        time: "10:35 AM",
      },
      {
        id: 3,
        name: "Document Verification",
        status: "current",
        date: "16 Dec 2024",
        time: "In Progress",
      },
      {
        id: 4,
        name: "Legal & Property Check",
        status: "pending",
        date: "Expected: 18 Dec",
        time: "",
      },
      {
        id: 5,
        name: "Final Approval & E-Sign",
        status: "pending",
        date: "Expected: 21 Dec",
        time: "",
      },
    ],
  };

  const handleTrack = () => {
    if (applicationId.trim()) {
      setIsTracking(true);
    }
  };

  const getStageIcon = (stage: (typeof trackingData.stages)[0]) => {
    switch (stage.status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "current":
        return <CircleDot className="w-6 h-6 text-primary animate-pulse" />;
      default:
        return <Clock className="w-6 h-6 text-muted-foreground" />;
    }
  };

  return (
    <section id="track" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-info/10 text-info text-sm font-medium mb-4">
              <Search className="w-4 h-4" />
              Track Application
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Real-Time
              <span className="text-gradient"> Status Updates</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Enter your application ID to track your loan progress in real-time
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-12">
            <Input
              placeholder="Enter Application ID (e.g., LAP-2024-78543)"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              className="h-12 text-base"
            />
            <Button
              variant="hero"
              size="lg"
              onClick={handleTrack}
              className="min-w-[140px]"
            >
              <Search className="w-4 h-4" />
              Track
            </Button>
          </div>

          {/* Demo Tracker */}
          <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border shadow-card">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Application ID
                </div>
                <div className="text-xl font-bold text-foreground">
                  {trackingData.applicationId}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center px-4 py-2 rounded-xl bg-primary/10">
                  <div className="text-sm text-muted-foreground">
                    Loan Amount
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {trackingData.loanAmount}
                  </div>
                </div>
                <div className="text-center px-4 py-2 rounded-xl bg-success/10">
                  <div className="text-sm text-muted-foreground">
                    Expected By
                  </div>
                  <div className="text-lg font-bold text-success">
                    {trackingData.expectedDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="mb-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">
                    Current Status
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {trackingData.status}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Progress</div>
                  <div className="text-lg font-bold text-primary">
                    {trackingData.statusCode}/5
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all duration-500"
                  style={{
                    width: `${(trackingData.statusCode / 5) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-4">
              {trackingData.stages.map((stage, index) => (
                <div
                  key={stage.id}
                  className={`relative flex items-start gap-4 p-4 rounded-xl transition-colors ${
                    stage.status === "current"
                      ? "bg-primary/5 border border-primary/20"
                      : stage.status === "completed"
                      ? "bg-success/5"
                      : "bg-secondary/50"
                  }`}
                >
                  {/* Connection Line */}
                  {index < trackingData.stages.length - 1 && (
                    <div
                      className={`absolute left-7 top-14 w-0.5 h-8 ${
                        stage.status === "completed"
                          ? "bg-success"
                          : "bg-border"
                      }`}
                    />
                  )}

                  {/* Icon */}
                  <div className="flex-shrink-0">{getStageIcon(stage)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${
                          stage.status === "current"
                            ? "text-primary"
                            : stage.status === "completed"
                            ? "text-success"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stage.name}
                      </span>
                      {stage.status === "current" && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          In Progress
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stage.date} {stage.time && `• ${stage.time}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border">
              <Button variant="outline" className="flex-1">
                <FileText className="w-4 h-4" />
                Download Summary
              </Button>
              <Button variant="hero" className="flex-1">
                <Shield className="w-4 h-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationTracker;
