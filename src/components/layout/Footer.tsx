import Link from "next/link";
import type { Locale } from "@/lib/types";
export function Footer({ locale }: { locale: Locale }) {
  const p = locale === "en" ? "/en" : "";
  return (
    <footer className="studio-footer">
      <span>© 2026 SYAHMIAOF</span>
      <nav aria-label="Footer">
        <Link href={`${p}#tentang`}>
          {locale === "ms" ? "Tentang" : "About"}
        </Link>
        <Link href={`${p}#hubungi`}>
          {locale === "ms" ? "Hubungi" : "Contact"}
        </Link>
        <a href="mailto:hello@syahmiaof.my">hello@syahmiaof.my</a>
      </nav>
      <span>
        {locale === "ms"
          ? "Dibina dengan idea, kod & kopi."
          : "Built with ideas, code & coffee."}
      </span>
    </footer>
  );
}
