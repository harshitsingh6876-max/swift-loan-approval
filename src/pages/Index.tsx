import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import LoanCalculator from "@/components/LoanCalculator";
import ApplicationTracker from "@/components/ApplicationTracker";
import Footer from "@/components/Footer";
import LiveStatusBar from "@/components/LiveStatusBar";
import TechMetricsSection from "@/components/TechMetricsSection";
import RealTimeActivity from "@/components/RealTimeActivity";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <LiveStatusBar />
      <Navbar />
      <HeroSection />
      <RealTimeActivity />
      <HowItWorks />
      <FeaturesSection />
      <TechMetricsSection />
      <LoanCalculator />
      <ApplicationTracker />
      <Footer />
    </main>
  );
};

export default Index;
