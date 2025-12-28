import { useEffect, useState } from "react";
import { CheckCircle2, FileText, CreditCard, Clock, MapPin, Building } from "lucide-react";

interface ActivityItem {
  id: number;
  type: "application" | "approval" | "disbursement" | "verification";
  city: string;
  amount: string;
  time: string;
}

const RealTimeActivity = () => {
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"];
  const amounts = ["₹25L", "₹50L", "₹75L", "₹1Cr", "₹1.5Cr", "₹2Cr", "₹35L", "₹85L"];

  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, type: "application", city: "Mumbai", amount: "₹75L", time: "just now" },
    { id: 2, type: "approval", city: "Delhi", amount: "₹1.2Cr", time: "2m ago" },
    { id: 3, type: "disbursement", city: "Bangalore", amount: "₹50L", time: "5m ago" },
    { id: 4, type: "verification", city: "Chennai", amount: "₹85L", time: "8m ago" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const types: ActivityItem["type"][] = ["application", "approval", "disbursement", "verification"];
      const newActivity: ActivityItem = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        time: "just now",
      };

      setActivities((prev) => {
        const updated = prev.map((a, i) => ({
          ...a,
          time: i === 0 ? "1m ago" : i === 1 ? "3m ago" : i === 2 ? "6m ago" : "10m ago",
        }));
        return [newActivity, ...updated.slice(0, 3)];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "application":
        return <FileText className="w-4 h-4 text-info" />;
      case "approval":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "disbursement":
        return <CreditCard className="w-4 h-4 text-warning" />;
      case "verification":
        return <Clock className="w-4 h-4 text-primary" />;
    }
  };

  const getActivityText = (type: ActivityItem["type"]) => {
    switch (type) {
      case "application":
        return "New application submitted";
      case "approval":
        return "Loan approved";
      case "disbursement":
        return "Funds disbursed";
      case "verification":
        return "Document verified";
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Real-Time Activity
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              See What's Happening
              <span className="text-gradient"> Right Now</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Watch live as thousands of customers across India unlock their property's potential with instant loan approvals.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-secondary">
                <div className="text-3xl font-bold text-foreground">89+</div>
                <div className="text-sm text-muted-foreground">Applications today</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <div className="text-3xl font-bold text-success">23</div>
                <div className="text-sm text-muted-foreground">Approved this hour</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <div className="text-3xl font-bold text-foreground">₹12.5Cr</div>
                <div className="text-sm text-muted-foreground">Disbursed today</div>
              </div>
              <div className="p-4 rounded-xl bg-secondary">
                <div className="text-3xl font-bold text-info">4.2 min</div>
                <div className="text-sm text-muted-foreground">Avg. pre-approval</div>
              </div>
            </div>
          </div>

          {/* Right Content - Activity Feed */}
          <div className="relative">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"></div>
            
            <div className="relative p-6 lg:p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Live Activity Feed
                </h3>
                <span className="text-xs text-muted-foreground font-mono">Auto-refresh: 5s</span>
              </div>

              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-card transition-all duration-500 ${
                      index === 0 ? "animate-slide-in-right ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground truncate">
                        {getActivityText(activity.type)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{activity.city}</span>
                        <span>•</span>
                        <span className="font-semibold text-foreground">{activity.amount}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Typing Indicator */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
                <span className="text-sm text-muted-foreground">Processing new applications...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeActivity;