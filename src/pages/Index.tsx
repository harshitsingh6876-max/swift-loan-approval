import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import LoanCalculator from "@/components/LoanCalculator";
import ApplicationTracker from "@/components/ApplicationTracker";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <LoanCalculator />
      <ApplicationTracker />
      <Footer />
    </main>
  );
};

export default Index;
