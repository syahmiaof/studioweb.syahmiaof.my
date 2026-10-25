import React from "react";
import Link from "next/link";
import { Locale } from "@/lib/types";
import { getTranslations } from "@/i18n";
import { Mail, ArrowUpRight, Terminal } from "lucide-react";

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const t = getTranslations(locale);

  const links = [
    { href: locale === "en" ? "/en" : "/", label: t.nav.home },
    { href: locale === "en" ? "/en/servis" : "/servis", label: t.nav.services },
    { href: locale === "en" ? "/en/portfolio" : "/portfolio", label: t.nav.portfolio },
    { href: locale === "en" ? "/en/harga" : "/harga", label: t.nav.pricing },
    { href: locale === "en" ? "/en/coaching" : "/coaching", label: t.nav.coaching },
    { href: locale === "en" ? "/en/tentang" : "/tentang", label: t.nav.about },
    { href: locale === "en" ? "/en/hubungi" : "/hubungi", label: t.nav.contact },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-ink pt-16 pb-12 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href={locale === "en" ? "/en" : "/"}
              className="inline-flex items-center gap-2 group"
            >
              <span className="w-3.5 h-3.5 bg-acid group-hover:rotate-45 transition-transform" />
              <span className="font-display font-black text-2xl tracking-tight text-white uppercase">
                SYAHMIAOF<span className="text-acid">.STUDIO</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {t.footer.brandDesc}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-zinc-500">
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-acid" />
                BESUT, MY // 05.83° N, 102.55° E
              </span>
              <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-acid font-bold">
                Q4 2026 INTAKE
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-acid transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-acid" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@syahmiaof.my"
                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-acid transition-colors group p-3 border border-zinc-800 bg-surface hover:border-acid"
              >
                <Mail className="w-4 h-4 text-acid group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs sm:text-sm">hello@syahmiaof.my</span>
              </a>
              <p className="text-xs text-zinc-500 leading-normal">
                Sedia menerima pertanyaan projek web, sistem khas & sesi coaching 1:1.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} SYAHMIAOF STUDIO. {t.footer.rights}
          </div>
          <div>{t.footer.builtWith}</div>
        </div>
      </div>
    </footer>
  );
};
