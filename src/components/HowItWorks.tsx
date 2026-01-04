import { FileText, Brain, FileCheck, Pen, Banknote } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Apply Online",
      description: "Fill a simple form with your details and property information in just 15 minutes",
      time: "15 mins",
      color: "primary",
    },
    {
      icon: Brain,
      title: "AI Pre-Approval",
      description: "Our AI instantly analyzes your profile and provides pre-approval decision",
      time: "Instant",
      color: "accent",
    },
    {
      icon: FileCheck,
      title: "Document Verification",
      description: "Upload documents digitally. Our OCR technology verifies them automatically",
      time: "2-3 days",
      color: "info",
    },
    {
      icon: Pen,
      title: "E-Sign Agreement",
      description: "Digitally sign your loan agreement using Aadhaar-based e-Sign",
      time: "10 mins",
      color: "success",
    },
    {
      icon: Banknote,
      title: "Disbursement",
      description: "Receive funds directly in your bank account within 24 hours of approval",
      time: "24 hours",
      color: "warning",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; ring: string }> = {
      primary: {
        bg: "bg-primary/10",
        icon: "text-primary",
        ring: "ring-primary/20",
      },
      accent: {
        bg: "bg-accent/10",
        icon: "text-accent",
        ring: "ring-accent/20",
      },
      info: {
        bg: "bg-info/10",
        icon: "text-info",
        ring: "ring-info/20",
      },
      success: {
        bg: "bg-success/10",
        icon: "text-success",
        ring: "ring-success/20",
      },
      warning: {
        bg: "bg-warning/10",
        icon: "text-warning",
        ring: "ring-warning/20",
      },
    };
    return colors[color] || colors.primary;
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            From Application to Disbursement in
            <span className="text-gradient"> 7 Days</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our streamlined digital process makes getting a loan against property faster than ever
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const colorClasses = getColorClasses(step.color);
              return (
                <div
                  key={index}
                  className="relative group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center z-20">
                      {index + 1}
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`w-16 h-16 rounded-2xl ${colorClasses.bg} ring-4 ${colorClasses.ring} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className={`w-7 h-7 ${colorClasses.icon}`} />
                    </div>

                    {/* Time Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full ${colorClasses.bg} ${colorClasses.icon} text-xs font-semibold mb-3`}>
                      {step.time}
                    </span>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <div className="mt-16 p-6 lg:p-8 rounded-2xl glass border border-primary/10 max-w-3xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold text-foreground mb-1">
                Total Timeline: 5-7 Days
              </h4>
              <p className="text-muted-foreground">
                From application to money in your account
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 rounded-xl bg-success/10">
                <div className="text-2xl font-bold text-success">95%</div>
                <div className="text-xs text-muted-foreground">Approval Rate</div>
              </div>
              <div className="text-center px-4 py-2 rounded-xl bg-primary/10">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-xs text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
