import Link from "next/link";
import type { Locale } from "@/lib/types";
export function Footer({ locale }: { locale: Locale }) {
  const p = locale === "en" ? "/en" : locale === "zh-Hans" ? "/zh" : "";
  return (
    <footer className="studio-footer">
      <span>© 2026 SYAHMIAOF</span>
      <nav aria-label={locale === "zh-Hans" ? "页脚导航" : "Footer"}>
        <Link href={`${p}#tentang`}>
          {locale === "ms" ? "Tentang" : locale === "zh-Hans" ? "关于" : "About"}
        </Link>
        <Link href={`${p}#hubungi`}>
          {locale === "ms" ? "Hubungi" : locale === "zh-Hans" ? "联系" : "Contact"}
        </Link>
        <a href="mailto:hello@syahmiaof.my">hello@syahmiaof.my</a>
      </nav>
      <span>
        {locale === "ms" ? "Dibina dengan idea, kod & kopi." : locale === "zh-Hans" ? "以创意、代码与咖啡构建。" : "Built with ideas, code & coffee."}
      </span>
    </footer>
  );
}
