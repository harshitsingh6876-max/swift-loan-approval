import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type LoanApplication = Database["public"]["Tables"]["loan_applications"]["Row"];

const statusConfig = {
  pending: {
    label: "Pending Review",
    color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
    icon: Clock,
  },
  under_review: {
    label: "Under Review",
    color: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    icon: AlertCircle,
  },
  approved: {
    label: "Approved",
    color: "bg-green-500/20 text-green-600 border-green-500/30",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/20 text-red-600 border-red-500/30",
    icon: XCircle,
  },
};

const MyApplications = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    if (user) {
      fetchApplications();
      
      // Set up realtime subscription
      const channel = supabase
        .channel('loan-applications-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'loan_applications',
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setApplications((prev) => [payload.new as LoanApplication, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setApplications((prev) =>
                prev.map((app) =>
                  app.id === (payload.new as LoanApplication).id
                    ? (payload.new as LoanApplication)
                    : app
                )
              );
            } else if (payload.eventType === 'DELETE') {
              setApplications((prev) =>
                prev.filter((app) => app.id !== (payload.old as LoanApplication).id)
              );
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, authLoading, navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("loan_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
    setLoading(false);
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
              <p className="text-muted-foreground">Track your loan applications in real-time</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
              <span>Live Updates</span>
            </div>
            <Button variant="hero" onClick={() => navigate("/apply")}>
              New Application
            </Button>
          </div>
        </div>

        {applications.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No Applications Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start your property loan journey by submitting your first application
              </p>
              <Button variant="hero" onClick={() => navigate("/apply")}>
                Apply for a Loan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => {
              const status = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.pending;
              const StatusIcon = status.icon;

              return (
                <Card key={application.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          {application.application_number || "Processing..."}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Applied on {formatDate(application.created_at)}
                        </p>
                      </div>
                      <Badge className={`${status.color} border flex items-center gap-1`}>
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold text-foreground">
                          {formatCurrency(Number(application.loan_amount))}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Property Value</p>
                        <p className="font-semibold text-foreground">
                          {formatCurrency(Number(application.property_value))}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tenure</p>
                        <p className="font-semibold text-foreground">
                          {application.loan_tenure} Years
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <p className="font-semibold text-foreground capitalize">
                          {application.property_type.replace("-", " ")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Property Location</p>
                          <p className="text-foreground">
                            {application.property_city}, {application.property_state} - {application.property_pincode}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Updated</p>
                          <p className="text-foreground">
                            {formatDate(application.updated_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
