import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Calculator, IndianRupee } from "lucide-react";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [tenure, setTenure] = useState(15);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;

    // EMI Formula: [P x R x (1+R)^N] / [(1+R)^N-1]
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      principal: principal,
    };
  }, [loanAmount, tenure, interestRate]);

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <section id="calculator" className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              EMI Calculator
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Plan Your
              <span className="text-gradient"> Loan</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Calculate your monthly EMI and total payable amount instantly
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Sliders */}
            <div className="space-y-8 p-6 lg:p-8 rounded-2xl bg-card border border-border">
              {/* Loan Amount */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Loan Amount
                  </label>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold">
                    <IndianRupee className="w-4 h-4" />
                    {(loanAmount / 100000).toFixed(0)} Lakhs
                  </div>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={(value) => setLoanAmount(value[0])}
                  min={500000}
                  max={50000000}
                  step={100000}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹5 Lakhs</span>
                  <span>₹5 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Interest Rate
                  </label>
                  <div className="px-3 py-1.5 rounded-lg bg-success/10 text-success font-bold">
                    {interestRate}% p.a.
                  </div>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={8}
                  max={16}
                  step={0.1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8%</span>
                  <span>16%</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Loan Tenure
                  </label>
                  <div className="px-3 py-1.5 rounded-lg bg-info/10 text-info font-bold">
                    {tenure} Years
                  </div>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>20 Years</span>
                </div>
              </div>
            </div>

            {/* Right - Results */}
            <div className="space-y-6">
              {/* EMI Card */}
              <div className="p-6 lg:p-8 rounded-2xl gradient-primary text-primary-foreground shadow-elevated">
                <div className="text-sm opacity-80 mb-2">Monthly EMI</div>
                <div className="text-4xl lg:text-5xl font-bold mb-4">
                  {formatCurrency(calculations.emi)}
                </div>
                <div className="text-sm opacity-80">
                  For {tenure} years at {interestRate}% p.a.
                </div>
              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Principal Amount
                  </div>
                  <div className="text-xl font-bold text-foreground">
                    {formatCurrency(calculations.principal)}
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border">
                  <div className="text-sm text-muted-foreground mb-1">
                    Total Interest
                  </div>
                  <div className="text-xl font-bold text-warning">
                    {formatCurrency(calculations.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="p-5 rounded-xl bg-secondary border border-border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Amount Payable
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(calculations.totalPayment)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">
                      Over {tenure} years
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({tenure * 12} monthly EMIs)
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button variant="hero" size="xl" className="w-full group">
                Apply for This Loan
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                *This is an indicative calculation. Actual EMI may vary based on
                your eligibility and other factors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculator;
