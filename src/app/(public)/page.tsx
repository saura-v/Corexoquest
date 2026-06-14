import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Corexoquest | Your Quest for Digital Excellence Starts Here",
  description:
    "Corexoquest is Nepal's leading digital agency offering web development, SEO, PPC, social media, branding, mobile apps, and more. Serving global clients with world-class results.",
};

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
