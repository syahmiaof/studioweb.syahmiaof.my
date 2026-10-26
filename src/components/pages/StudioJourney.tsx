import type { Locale } from "@/lib/types";
import { StudioPage } from "@/components/scene/StudioScene";
import { AboutView } from "@/components/pages/AboutView";
import { CoachingView } from "@/components/pages/CoachingView";
import { ContactView } from "@/components/pages/ContactView";
import { HomeView } from "@/components/pages/HomeView";
import { PortfolioView } from "@/components/pages/PortfolioView";
import { PricingView } from "@/components/pages/PricingView";
import { ServicesView } from "@/components/pages/ServicesView";
import { ChatbotWidget } from "@/components/assistant/ChatbotWidget";
import { StudioIntro } from "@/components/pages/StudioIntro";

export function StudioJourney({ locale }: { locale: Locale }) {
  return (
    <StudioIntro locale={locale}>
      <StudioPage locale={locale} motion={false}>
        <HomeView locale={locale} embedded />
        <AboutView locale={locale} embedded />
        <ServicesView locale={locale} embedded />
        <PortfolioView locale={locale} embedded />
        <PricingView locale={locale} embedded />
        <CoachingView locale={locale} embedded />
        <ContactView locale={locale} embedded />
        <ChatbotWidget locale={locale} />
      </StudioPage>
    </StudioIntro>
  );
}
