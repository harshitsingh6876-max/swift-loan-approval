import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Home, Briefcase, IndianRupee, Clock, CheckCircle, Copy, FileText } from "lucide-react";

const applicationSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  property_type: z.string().min(1, "Please select property type"),
  property_address: z.string().min(5, "Address must be at least 5 characters").max(500),
  property_city: z.string().min(2, "City is required").max(100),
  property_state: z.string().min(2, "State is required").max(100),
  property_pincode: z.string().min(6, "Pincode must be 6 digits").max(6),
  property_value: z.number().min(100000, "Property value must be at least ₹1 Lakh"),
  loan_amount: z.number().min(100000, "Loan amount must be at least ₹1 Lakh"),
  loan_tenure: z.number().min(1, "Tenure must be at least 1 year").max(30, "Tenure cannot exceed 30 years"),
  employment_type: z.string().min(1, "Please select employment type"),
  monthly_income: z.number().min(10000, "Monthly income must be at least ₹10,000"),
  existing_loans: z.number().min(0, "Existing loans cannot be negative").optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const LoanApplication = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      existing_loans: 0,
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const { data: insertedData, error } = await supabase
        .from("loan_applications")
        .insert({
          user_id: user.id,
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          property_type: data.property_type,
          property_address: data.property_address,
          property_city: data.property_city,
          property_state: data.property_state,
          property_pincode: data.property_pincode,
          property_value: data.property_value,
          loan_amount: data.loan_amount,
          loan_tenure: data.loan_tenure,
          employment_type: data.employment_type,
          monthly_income: data.monthly_income,
          existing_loans: data.existing_loans || 0,
        })
        .select("application_number")
        .single();

      if (error) throw error;

      setApplicationNumber(insertedData?.application_number || null);
      setShowSuccessDialog(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyApplicationNumber = () => {
    if (applicationNumber) {
      navigator.clipboard.writeText(applicationNumber);
      toast({
        title: "Copied!",
        description: "Application number copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Loan Application
          </h1>
          <p className="text-muted-foreground mb-8">
            Fill out the form below to apply for a property loan
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Briefcase className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    {...register("full_name")}
                    placeholder="Enter your full name"
                  />
                  {errors.full_name && (
                    <p className="text-sm text-destructive">{errors.full_name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employment_type">Employment Type</Label>
                  <Select onValueChange={(value) => setValue("employment_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="self-employed">Self Employed</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employment_type && (
                    <p className="text-sm text-destructive">{errors.employment_type.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Home className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Property Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property_type">Property Type</Label>
                  <Select onValueChange={(value) => setValue("property_type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="independent-house">Independent House</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.property_type && (
                    <p className="text-sm text-destructive">{errors.property_type.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_value">Property Value (₹)</Label>
                  <Input
                    id="property_value"
                    type="number"
                    {...register("property_value", { valueAsNumber: true })}
                    placeholder="Enter property value"
                  />
                  {errors.property_value && (
                    <p className="text-sm text-destructive">{errors.property_value.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="property_address">Property Address</Label>
                  <Input
                    id="property_address"
                    {...register("property_address")}
                    placeholder="Enter complete property address"
                  />
                  {errors.property_address && (
                    <p className="text-sm text-destructive">{errors.property_address.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_city">City</Label>
                  <Input
                    id="property_city"
                    {...register("property_city")}
                    placeholder="Enter city"
                  />
                  {errors.property_city && (
                    <p className="text-sm text-destructive">{errors.property_city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_state">State</Label>
                  <Input
                    id="property_state"
                    {...register("property_state")}
                    placeholder="Enter state"
                  />
                  {errors.property_state && (
                    <p className="text-sm text-destructive">{errors.property_state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property_pincode">Pincode</Label>
                  <Input
                    id="property_pincode"
                    {...register("property_pincode")}
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                  />
                  {errors.property_pincode && (
                    <p className="text-sm text-destructive">{errors.property_pincode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <IndianRupee className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Loan Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loan_amount">Loan Amount (₹)</Label>
                  <Input
                    id="loan_amount"
                    type="number"
                    {...register("loan_amount", { valueAsNumber: true })}
                    placeholder="Enter loan amount required"
                  />
                  {errors.loan_amount && (
                    <p className="text-sm text-destructive">{errors.loan_amount.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan_tenure">Loan Tenure (Years)</Label>
                  <Input
                    id="loan_tenure"
                    type="number"
                    {...register("loan_tenure", { valueAsNumber: true })}
                    placeholder="Enter tenure in years"
                    min={1}
                    max={30}
                  />
                  {errors.loan_tenure && (
                    <p className="text-sm text-destructive">{errors.loan_tenure.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Clock className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Financial Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly_income">Monthly Income (₹)</Label>
                  <Input
                    id="monthly_income"
                    type="number"
                    {...register("monthly_income", { valueAsNumber: true })}
                    placeholder="Enter monthly income"
                  />
                  {errors.monthly_income && (
                    <p className="text-sm text-destructive">{errors.monthly_income.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="existing_loans">Existing EMIs (₹/month)</Label>
                  <Input
                    id="existing_loans"
                    type="number"
                    {...register("existing_loans", { valueAsNumber: true })}
                    placeholder="Enter existing monthly EMIs"
                  />
                  {errors.existing_loans && (
                    <p className="text-sm text-destructive">{errors.existing_loans.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl">Application Submitted!</DialogTitle>
            <DialogDescription className="text-center">
              Your loan application has been submitted successfully. Save your application number to track your application status.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground text-center mb-2">Your Application Number</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-primary font-mono">
                  {applicationNumber || "Generating..."}
                </span>
                {applicationNumber && (
                  <Button variant="ghost" size="icon" onClick={copyApplicationNumber}>
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              Use this number to track your application in the "Track Application" section
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <Button variant="hero" onClick={() => navigate("/my-applications")} className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              View My Applications
            </Button>
            <Button variant="outline" onClick={() => navigate("/#track")} className="w-full">
              Track Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanApplication;
