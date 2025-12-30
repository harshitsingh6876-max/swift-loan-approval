import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Shield,
  CircleDot,
  Download,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type LoanApplication = Database["public"]["Tables"]["loan_applications"]["Row"];

const statusStages = {
  pending: { stage: 1, label: "Application Submitted" },
  under_review: { stage: 2, label: "Under Review" },
  approved: { stage: 4, label: "Approved" },
  rejected: { stage: 4, label: "Rejected" },
};

const ApplicationTracker = () => {
  const [applicationId, setApplicationId] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [application, setApplication] = useState<LoanApplication | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to realtime updates when tracking an application
  useEffect(() => {
    if (!application) return;

    const channel = supabase
      .channel('track-application')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'loan_applications',
          filter: `id=eq.${application.id}`,
        },
        (payload) => {
          setApplication(payload.new as LoanApplication);
          toast({
            title: "Status Updated!",
            description: "Your application status has been updated.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [application?.id]);

  const handleTrack = async () => {
    if (!applicationId.trim()) {
      toast({
        title: "Error",
        description: "Please enter an application ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const { data, error: fetchError } = await supabase
      .from("loan_applications")
      .select("*")
      .eq("application_number", applicationId.trim().toUpperCase())
      .maybeSingle();

    setIsLoading(false);

    if (fetchError) {
      setError("Failed to fetch application. Please try again.");
      setApplication(null);
      setIsTracking(false);
      return;
    }

    if (!data) {
      setError("No application found with this ID. Please check and try again.");
      setApplication(null);
      setIsTracking(false);
      return;
    }

    setApplication(data);
    setIsTracking(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStages = () => {
    const status = application?.status || "pending";
    const currentStage = statusStages[status as keyof typeof statusStages]?.stage || 1;
    
    return [
      {
        id: 1,
        name: "Application Submitted",
        status: currentStage >= 1 ? "completed" : "pending",
        date: application?.created_at ? formatDate(application.created_at) : "",
      },
      {
        id: 2,
        name: "Under Review",
        status: status === "under_review" ? "current" : currentStage > 1 ? "completed" : "pending",
        date: currentStage >= 2 ? "In Progress" : "Pending",
      },
      {
        id: 3,
        name: "Document Verification",
        status: currentStage >= 3 ? "completed" : currentStage === 2 ? "current" : "pending",
        date: currentStage >= 3 ? "Completed" : "Pending",
      },
      {
        id: 4,
        name: status === "rejected" ? "Application Rejected" : "Final Approval",
        status: status === "approved" || status === "rejected" ? "completed" : "pending",
        date: status === "approved" || status === "rejected" ? formatDate(application?.updated_at || "") : "Pending",
      },
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      case "under_review":
        return "text-blue-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "under_review":
        return "Under Review";
      default:
        return "Pending Review";
    }
  };

  const handleDownloadSummary = () => {
    if (!application) return;

    const currentDate = new Date().toLocaleString("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const stages = getStages();

    const summaryContent = `
════════════════════════════════════════════════════════════════
                    LOAN APPLICATION STATUS SUMMARY
════════════════════════════════════════════════════════════════

Generated On: ${currentDate}

────────────────────────────────────────────────────────────────
                        APPLICATION DETAILS
────────────────────────────────────────────────────────────────

Application ID     : ${application.application_number}
Applicant Name     : ${application.full_name}
Email              : ${application.email}
Phone              : ${application.phone}
Loan Amount        : ${formatCurrency(Number(application.loan_amount))}
Property Value     : ${formatCurrency(Number(application.property_value))}
Loan Tenure        : ${application.loan_tenure} Years
Applied Date       : ${formatDate(application.created_at)}

────────────────────────────────────────────────────────────────
                        CURRENT STATUS
────────────────────────────────────────────────────────────────

Status: ${getStatusLabel(application.status)}
Last Updated: ${formatDate(application.updated_at)}

────────────────────────────────────────────────────────────────
                        PROPERTY DETAILS
────────────────────────────────────────────────────────────────

Type: ${application.property_type}
Address: ${application.property_address}
City: ${application.property_city}
State: ${application.property_state}
Pincode: ${application.property_pincode}

────────────────────────────────────────────────────────────────
                        STAGE-WISE PROGRESS
────────────────────────────────────────────────────────────────

${stages.map((stage, index) => {
  const statusIcon = stage.status === "completed" ? "✓" : stage.status === "current" ? "●" : "○";
  const statusLabel = stage.status === "completed" ? "[COMPLETED]" : stage.status === "current" ? "[IN PROGRESS]" : "[PENDING]";
  return `${index + 1}. ${statusIcon} ${stage.name}
   ${statusLabel}
   ${stage.date}
`;
}).join("\n")}

────────────────────────────────────────────────────────────────

For any queries, contact our support team:
Email: support@propertyloan.in
Phone: 1800-123-4567

════════════════════════════════════════════════════════════════
                    Thank you for choosing PropertyLoan
════════════════════════════════════════════════════════════════
`.trim();

    const blob = new Blob([summaryContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Loan_Status_${application.application_number}_${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Summary Downloaded",
      description: "Your application status summary has been downloaded successfully.",
    });
  };

  const getStageIcon = (status: string, stageName: string) => {
    if (stageName.includes("Rejected")) {
      return <XCircle className="w-6 h-6 text-red-500" />;
    }
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "current":
        return <CircleDot className="w-6 h-6 text-primary animate-pulse" />;
      default:
        return <Clock className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const stages = getStages();
  const currentStageIndex = stages.findIndex(s => s.status === "current");
  const completedStages = stages.filter(s => s.status === "completed").length;

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
              placeholder="Enter Application ID (e.g., PL20241230-12345)"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value.toUpperCase())}
              className="h-12 text-base font-mono"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button
              variant="hero"
              size="lg"
              onClick={handleTrack}
              disabled={isLoading}
              className="min-w-[140px]"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Track
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-xl mx-auto mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Tracker Display */}
          {isTracking && application && (
            <div className="p-6 lg:p-8 rounded-2xl bg-card border border-border shadow-card animate-fade-in">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Application ID
                  </div>
                  <div className="text-xl font-bold text-foreground font-mono">
                    {application.application_number}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="text-center px-4 py-2 rounded-xl bg-primary/10">
                    <div className="text-sm text-muted-foreground">
                      Loan Amount
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {formatCurrency(Number(application.loan_amount))}
                    </div>
                  </div>
                  <div className="text-center px-4 py-2 rounded-xl bg-secondary">
                    <div className="text-sm text-muted-foreground">
                      Applied On
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {formatDate(application.created_at)}
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
                    <div className={`text-lg font-bold ${getStatusColor(application.status)}`}>
                      {getStatusLabel(application.status)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Progress</div>
                    <div className="text-lg font-bold text-primary">
                      {completedStages}/{stages.length}
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
                      width: `${(completedStages / stages.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stages Timeline */}
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div
                    key={stage.id}
                    className={`relative flex items-start gap-4 p-4 rounded-xl transition-colors ${
                      stage.status === "current"
                        ? "bg-primary/5 border border-primary/20"
                        : stage.status === "completed"
                        ? "bg-green-500/5"
                        : "bg-secondary/50"
                    }`}
                  >
                    {/* Connection Line */}
                    {index < stages.length - 1 && (
                      <div
                        className={`absolute left-7 top-14 w-0.5 h-8 ${
                          stage.status === "completed"
                            ? "bg-green-500"
                            : "bg-border"
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div className="flex-shrink-0">{getStageIcon(stage.status, stage.name)}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            stage.status === "current"
                              ? "text-primary"
                              : stage.status === "completed"
                              ? "text-green-500"
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
                        {stage.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-border">
                <Button variant="outline" className="flex-1" onClick={handleDownloadSummary}>
                  <Download className="w-4 h-4" />
                  Download Summary
                </Button>
                <Button variant="hero" className="flex-1">
                  <Shield className="w-4 h-4" />
                  Contact Support
                </Button>
              </div>
            </div>
          )}

          {/* Initial State - Show placeholder */}
          {!isTracking && !error && (
            <div className="p-8 rounded-2xl bg-card border border-border shadow-card text-center">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Track Your Application
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter your application ID above to see real-time updates on your loan application status
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ApplicationTracker;
