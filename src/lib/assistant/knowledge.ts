import { PROJECTS } from "../../content/projects";
import { SERVICES_DATA } from "../../content/services";
import { localized } from "../localized";
import type { Locale } from "../types";

export function getApprovedStudioKnowledge(locale: Locale): string {
  const services = SERVICES_DATA.map((service) =>
    `${localized(service.title, locale)}: ${localized(service.tagline, locale)}`,
  ).join("\n");
  const projectExamples = PROJECTS.map((project) =>
    `${project.title} (${localized(project.category, locale)})`,
  ).join("; ");

  return [
    "Studio identity: Syahmi AOF is the web developer behind SYAHMIAOF Studio and an IT (Cloud Computing) student at TVETMARA Besut.",
    "The techwear person in the visual artwork is a fictional brand character, not a real photograph of Syahmi.",
    "Services offered:\n" + services,
    "The studio also offers 1:1 web development coaching. Session availability is confirmed manually after an enquiry.",
    "The Contact form prepares a WhatsApp draft containing the visitor's own details. It is not sent until the visitor presses Send in WhatsApp. The site also shows a direct email link.",
    "Main page sections: About (#tentang), Services (#servis), Portfolio (#portfolio), Pricing (#harga), Coaching (#coaching), Contact (#hubungi).",
    "Examples from the initial portfolio catalogue (the live Portfolio section is authoritative for current visibility and status): " + projectExamples,
    "Portfolio records include concepts and personal projects. Their presence does not prove a paid client engagement or a live production deployment.",
  ].join("\n\n");
}
