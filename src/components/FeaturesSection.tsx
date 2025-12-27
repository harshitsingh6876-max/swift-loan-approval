import {
  Brain,
  FileSearch,
  Shield,
  Smartphone,
  Clock,
  HeadphonesIcon,
  Fingerprint,
  Building2,
  TrendingDown,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Credit Scoring",
      description:
        "Advanced ML models analyze 100+ data points for accurate risk assessment and instant decisions",
      highlight: "99% accuracy",
    },
    {
      icon: FileSearch,
      title: "Smart Document OCR",
      description:
        "Automatic extraction and verification of property documents using AI-powered OCR technology",
      highlight: "Auto-verify",
    },
    {
      icon: Fingerprint,
      title: "Aadhaar E-Sign",
      description:
        "Legally binding digital signatures using Aadhaar OTP verification for instant agreement execution",
      highlight: "Paperless",
    },
    {
      icon: TrendingDown,
      title: "Lowest Interest Rates",
      description:
        "Starting from 8.5% p.a. with flexible tenure options from 5 to 20 years",
      highlight: "From 8.5%",
    },
    {
      icon: Building2,
      title: "All Property Types",
      description:
        "Residential, commercial, industrial properties - we accept all with proper documentation",
      highlight: "Flexible",
    },
    {
      icon: Clock,
      title: "Quick Disbursement",
      description:
        "Get funds in your account within 24 hours of final approval with minimal processing time",
      highlight: "24 hours",
    },
    {
      icon: Smartphone,
      title: "100% Digital Process",
      description:
        "Apply, track, and manage your loan entirely through our mobile app or web portal",
      highlight: "Zero visits",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "256-bit encryption, secure data storage, and RBI-compliant processes protect your information",
      highlight: "RBI Compliant",
    },
    {
      icon: HeadphonesIcon,
      title: "Dedicated Support",
      description:
        "Personal relationship manager assigned to guide you through every step of your loan journey",
      highlight: "24/7 Support",
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Built for Modern
            <span className="text-gradient"> India</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Combining cutting-edge technology with deep financial expertise to deliver the best loan experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {feature.highlight}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 p-8 rounded-2xl glass border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                50,000+
              </div>
              <div className="text-sm text-muted-foreground">
                Customers Served
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                ₹5,000 Cr+
              </div>
              <div className="text-sm text-muted-foreground">
                Loans Disbursed
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                500+
              </div>
              <div className="text-sm text-muted-foreground">
                Cities Covered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                4.8/5
              </div>
              <div className="text-sm text-muted-foreground">
                Customer Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
