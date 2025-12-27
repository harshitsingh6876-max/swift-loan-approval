import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Zap, Clock } from "lucide-react";

const HeroSection = () => {
  const highlights = [
    { icon: Zap, text: "Instant Pre-Approval" },
    { icon: Clock, text: "7-Day Disbursement" },
    { icon: Shield, text: "RBI Compliant" },
  ];

  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Now serving 500+ cities across India
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-foreground">
                Unlock Your Property's
                <span className="block text-gradient">True Potential</span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
                Get up to ₹5 Crore loan against your property with AI-powered instant approval. 
                Lowest interest rates, minimal documentation.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group">
                Check Eligibility
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Calculate EMI
              </Button>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-6 pt-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main Card */}
              <div className="glass rounded-3xl p-8 shadow-elevated">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Loan Amount
                    </span>
                    <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold">
                      Pre-Approved
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="space-y-2">
                    <div className="text-4xl lg:text-5xl font-bold text-foreground">
                      ₹75,00,000
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full w-3/4 rounded-full gradient-primary animate-pulse-soft" />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground">Interest Rate</div>
                      <div className="text-xl font-bold text-foreground">8.5%</div>
                      <div className="text-xs text-success">Lowest in market</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground">Tenure</div>
                      <div className="text-xl font-bold text-foreground">15 Years</div>
                      <div className="text-xs text-muted-foreground">Flexible options</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground">Monthly EMI</div>
                      <div className="text-xl font-bold text-foreground">₹73,847</div>
                      <div className="text-xs text-muted-foreground">Fixed rate</div>
                    </div>
                    <div className="p-4 rounded-xl bg-secondary/50">
                      <div className="text-sm text-muted-foreground">Processing</div>
                      <div className="text-xl font-bold text-foreground">0.5%</div>
                      <div className="text-xs text-success">Limited offer</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    {[
                      "No prepayment charges",
                      "Digital documentation",
                      "Doorstep service available",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 p-4 rounded-2xl glass shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">50,000+</div>
                    <div className="text-xs text-muted-foreground">Happy Customers</div>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -bottom-4 -left-4 p-4 rounded-2xl glass shadow-card animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">₹5000 Cr+</div>
                    <div className="text-xs text-muted-foreground">Loans Disbursed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
