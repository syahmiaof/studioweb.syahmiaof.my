import type { Locale } from "@/lib/types";
import { StudioPage } from "@/components/scene/StudioScene";
import { AboutView } from "@/components/pages/AboutView";
import { CoachingView } from "@/components/pages/CoachingView";
import { ContactView } from "@/components/pages/ContactView";
import { HomeView } from "@/components/pages/HomeView";
import { PortfolioView } from "@/components/pages/PortfolioView";
import { PricingView } from "@/components/pages/PricingView";
import { ServicesView } from "@/components/pages/ServicesView";

export function StudioJourney({ locale }: { locale: Locale }) {
  return (
    <StudioPage locale={locale} motion={false}>
      <HomeView locale={locale} embedded />
      <ServicesView locale={locale} embedded />
      <PortfolioView locale={locale} embedded />
      <PricingView locale={locale} embedded />
      <CoachingView locale={locale} embedded />
      <AboutView locale={locale} embedded />
      <ContactView locale={locale} embedded />
    </StudioPage>
  );
}
