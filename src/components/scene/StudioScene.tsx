"use client";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsapSetup";
import { responsiveMotion } from "@/lib/motion/responsiveMotion";
import type { Locale } from "@/lib/types";

export const localPath = (locale: Locale, path: string) =>
  locale === "en" ? `/en${path === "/" ? "" : path}` : locale === "zh-Hans" ? `/zh${path === "/" ? "" : path}` : path;
export const sectionPath = (
  locale: Locale,
  section: string,
  query?: URLSearchParams,
) => {
  const prefix = locale === "en" ? "/en" : locale === "zh-Hans" ? "/zh" : "";
  const search = query?.toString();
  return `${prefix}${search ? `?${search}` : ""}#${section}`;
};
const ZH_COPY: Record<string, string> = {
  "ABOUT ME": "关于我",
  "I’M": "我是",
  "AI Automation": "AI 自动化",
  "View Portfolio": "查看作品",
  "Discuss a Project": "讨论项目",
  "FICTIONAL BRAND": "虚构品牌",
  "CHARACTER": "角色",
  "1 hour": "1 小时",
  "2 hours": "2 小时",
  "LEARN.": "学习。",
  "BUILD.": "实作。",
  "DEPLOY.": "发布。",
  "CHOOSE A COACHING PACKAGE": "选择辅导配套",
  "SESSION LENGTH": "课程时长",
  "Ask About a Coaching Slot": "咨询辅导时段",
  "Malay": "马来语",
  "ABOUT THIS PACKAGE": "配套介绍",
  "Choose a session duration that suits your goals and experience.": "选择符合目标与经验的课程时长。",
  "Tanya Slot Coaching": "咨询辅导时段",
  "Web Developer & IT Student (Cloud Computing)": "网页开发者与云计算专业 IT 学生",
  "I design and build distinctive, responsive websites for businesses and individuals.": "我为企业与个人设计并开发独特、响应式的网站。",
  "Web Development": "网页开发",
  "Cloud & Deployment": "云与部署",
  "Cloud Computing": "云计算",
  "Design · Build · Deploy": "设计 · 构建 · 发布",
  "AI Digital Marketing": "AI 数字营销",
  "Explore the Projects": "浏览作品",
  "Project concept gallery": "项目概念图库",
  "Select ": "选择",
  "Concept preview ": "概念预览",
  "Previous project": "上一个项目",
  "Next project": "下一个项目",
  "Discuss a Similar Project": "讨论类似项目",
  "All projects are clearly labeled as concept demos or real client work.": "所有作品均清楚标注为概念演示或真实客户项目。",
  "PRICING": "价格",
  "PRICE YOUR": "估算",
  "CHOOSE A PACKAGE": "选择配套",
  "ADD WEBSITE FEATURES": "添加网站功能",
  "Included in every package: ": "每个配套均包含：",
  "Additional deliverables are quoted separately.": "额外交付内容另行报价。",
  "Free": "免费",
  "ONE-TIME ESTIMATE": "一次性费用估算",
  "Request a Quote": "索取报价",
  "Initial estimate. Domain, hosting and out-of-scope work are separate.": "初步估价。域名、托管及范围外工作另计。",
  "BUSINESS SYSTEMS · BASIC BOOKING": "商业系统 · 基础预约",
  "View System Options": "查看系统选项",
  "Optional maintenance — billed separately": "可选维护服务 — 单独收费",
  "Maintenance is not included in the one-time total. Select one option to include in your enquiry; extra work requires approval and monthly minutes do not roll over.": "维护服务不计入一次性总额。可在咨询中选择一项；额外工作需先获批准，每月分钟数不会结转。",
  "MAINTENANCE OPTIONS": "维护选项",
  "Separate option: ": "另选服务：",
  "Excludes:": "不包含：",
  "Business systems and starting prices": "商业系统与起价",
  "Contact for a Quote": "联系获取报价",
  "Payment, revisions and bug-fix warranty": "付款、修改与错误修复保障",
  "50% deposit before development; remaining 50% before final handover.": "开发前支付 50% 订金；最终交付前支付剩余 50%。",
  "Two consolidated revision rounds. Out-of-scope revisions are chargeable; fixing an agreed-scope defect does not use a revision round.": "包含两轮集中修改。范围外修改需收费；修复约定范围内的问题不占修改轮次。",
  "A 14-day bug-fix warranty after handover for reproducible defects in agreed deliverables.": "交付后 14 天内，可修复已约定交付内容中可复现的问题。",
  "The warranty excludes new features, redesigns, external outages or client-made changes.": "保障不包含新功能、重新设计、外部服务中断或客户自行修改造成的问题。",
  "Final deliverables are defined in a written quote. Extra work requires prior approval. Domain, hosting and third-party subscriptions are separate.": "最终交付内容以书面报价为准。额外工作须事先批准。域名、托管与第三方订阅另计。",
  "SERVICES": "服务",
  "BOOKING REQUEST": "预约申请",
  "Price": "价格",
  "From": "起价",
  "One service · manual confirmation": "一项服务 · 人工确认",
  "Landing · business · premium websites": "着陆页 · 商业网站 · 高级网站",
  "View Packages": "查看配套",
  "What you receive": "交付内容",
  "Scope & boundaries": "范围与限制",
  "System options and prices": "系统选项与价格",
  "Optional maintenance plans": "可选维护方案",
  "Ask About Maintenance": "咨询维护服务",
  "Payment & handover": "付款与交付",
  "50% deposit before development starts; remaining 50% before final handover.": "开发开始前支付 50% 订金；最终交付前支付剩余 50%。",
  "Two consolidated revision rounds. Extra out-of-scope revisions are chargeable. Fixing an agreed-scope defect does not use a revision round.": "包含两轮集中修改。范围外修改需收费；修复约定范围内的问题不占修改轮次。",
  "The 14-day post-handover bug-fix warranty covers reproducible defects in agreed deliverables. It excludes new features, redesigns, external outages or client changes.": "交付后 14 天错误修复保障适用于已约定交付内容中的可复现问题，不包含新功能、重新设计、外部服务中断或客户修改。",
  "Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita.": "精选实验、概念与项目，每个作品都有自己的故事。",
  "Experiments, concepts and selected projects — each with a story.": "精选实验、概念与项目，每个作品都有自己的故事。",
  "Lihat Semua Projek": "浏览全部作品",
  "PROJECT CONCEPT GALLERY": "项目概念图库",
  "Imej ialah visual daripada mockup diluluskan, bukan tangkapan laman live. Pautan live belum disahkan untuk penerbitan studio ini.": "图片来自已批准的设计稿，并非线上网站截图。目前尚未确认可用于发布的线上链接。",
  "Images are visuals from the approved mockup, not live website screenshots. Live links have not been verified for publication in this studio.": "图片来自已批准的设计稿，并非线上网站截图。目前尚未确认可用于发布的线上链接。",
  "(one-time)": "（一次性）",
  " hours — RM": " 小时 — RM",
  "Project reference: ": "项目参考：",
  "Name: ": "姓名：",
  "Contact: ": "联系方式：",
  "Service: ": "服务：",
  "SYAHMIAOF Studio enquiry": "SYAHMIAOF Studio 咨询",
  "I would like to ask about availability and next steps.": "我想咨询时段与后续步骤。",
  "Studio Inquiry: ": "工作室咨询：",
  "Inquiry delivered.": "咨询已送达。",
  "CONTACT": "联系",
  "START": "开始",
  "YOUR PROJECT": "你的项目",
  "One-time estimate: ": "一次性估价：",
  "Recurring monthly charge; separate from the one-time total.": "每月重复收费，与一次性总额分开。",
  "Per-task charge; separate from the one-time total.": "按任务收费，与一次性总额分开。",
  "Project reference": "项目参考",
  "SERVICE REQUIRED": "所需服务",
  "Full-Stack": "全栈",
  "NAME": "姓名",
  "Your full name": "你的姓名",
  "EMAIL / WHATSAPP": "电子邮件 / WHATSAPP",
  "TELL ME YOUR IDEA": "告诉我你的想法",
  "Checking…": "正在检查……",
  "Prepare Inquiry": "准备咨询内容",
  "Open Email to Send": "打开邮件发送",
  "Website Development / Frontend UI": "网站开发 / 前端界面",
  "Custom Full-Stack System": "全栈定制系统",
  "1:1 Coaching Session": "一对一辅导",
  "Full Name": "姓名",
  "Your name or organization": "个人或公司名称",
  "Email or WhatsApp Number": "电子邮件或 WhatsApp 号码",
  "Project Brief / Inquiries": "项目简介 / 咨询",
  "Send Project Brief": "提交项目简介",
  "Loading form…": "正在加载表格……",
  "Buka menu navigasi": "打开导航菜单",
  "Main navigation": "主导航",
  "Skip to content": "跳至正文",
  "FAQ mode · No chat history is saved.": "FAQ 模式 · 不会保存聊天记录。",
  "Your question": "你的问题",
  "Choose a package or skip this step.": "选择配套或跳过此步骤。",
  "Project needs (optional)": "项目需求（选填）",
  "Timeline (optional)": "期望时间（选填）",
  "Budget range (optional)": "预算范围（选填）",
  "Maintenance (optional)": "维护服务（选填）",
  "No selection": "不选择",
  "Review summary": "检查摘要",
  "EDIT OR REMOVE ANY LINE": "可编辑或删除任意内容",
  "Nothing is sent until you review and press send in WhatsApp.": "你检查并在 WhatsApp 按下发送前，不会发送任何内容。",
  "Edit project details": "编辑项目资料",
  "Website": "网站",
  "Full-Stack system": "全栈系统",
  "1:1 coaching": "一对一辅导",
  "Not sure yet / custom quote": "尚未确定 / 定制报价",
  "Business, page count or essential features": "业务、页面数量或必要功能",
  "English": "英语",
  "Chinese": "中文",
  "简体中文": "简体中文",
  "hours — RM": "小时 — RM",
  "Pertanyaan SYAHMIAOF Studio": "SYAHMIAOF Studio 咨询",
  "Pertanyaan berjaya dihantar.": "咨询已成功提交。",
  "Your inquiry has not been sent. Open your email app to send it to us.": "咨询尚未发送。请打开邮件应用继续发送。",
  "Sambungan gagal. Anda masih boleh teruskan melalui emel.": "连接失败。你仍可通过电子邮件继续。",
  "Ceritakan projek anda. Saya bantu jadikan ia realiti.": "告诉我你的项目想法，我会协助你实现。",
  "Tell me about your project. Let’s bring it to life.": "告诉我你的项目想法，我会协助你实现。",
  "Chat WhatsApp": "WhatsApp 咨询",
  "Nombor belum ditetapkan. Hubungi melalui emel.": "号码尚未设置，请通过电子邮件联系。",
  "Number not configured. Please use email.": "号码尚未设置，请通过电子邮件联系。",
  "Butiran ini digunakan untuk memahami dan membalas pertanyaan anda. Jangan sertakan kata laluan atau maklumat sulit.": "这些资料用于了解并回复你的咨询。请勿填写密码或敏感信息。",
  "These details help us understand and respond to your enquiry. Do not include passwords or sensitive information.": "这些资料用于了解并回复你的咨询。请勿填写密码或敏感信息。",
  "Website UI": "网站界面",
  "Coaching 1:1": "一对一辅导",
  "Contoh: Ali bin Ahmad": "例如：张先生",
  "What would you like to build? Share your goals and project scope.": "你想开发什么？请说明目标与项目范围。",
  "Apa yang anda nak bina? Ceritakan matlamat dan skop projek.": "你想开发什么？请说明目标与项目范围。",
  "Penghantaran terus belum diaktifkan. Semak butiran dan teruskan melalui aplikasi emel anda.": "直接发送功能尚未启用。请检查资料并通过邮件应用继续。",
  "Direct delivery is not enabled. Check your details and continue through your email app.": "直接发送功能尚未启用。请检查资料并通过邮件应用继续。",
  "Buka Emel untuk Hantar": "打开邮件发送"
};
Object.assign(ZH_COPY, {
  "View Services": "查看服务", "Start a Project": "开始项目", "FREELANCE": "自由接案", "WEB SERVICES.": "网站服务。", "WEB SERVICES": "网站服务", "WEBSITE": "网站",
  "FREELANCE WEB DEV": "自由职业网页开发", "Web Development": "网页开发", "UI/UX": "界面与体验设计", "Cloud & Deployment": "云与部署", "AI Automation": "AI 自动化", "Design · Build · Deploy": "设计 · 开发 · 部署", "Cloud Computing": "云计算", "AI Digital Marketing": "AI 数字营销",
  "Build the idea. Launch the web.": "构思创意，发布网站。", "BUILD THE IDEA. LAUNCH THE WEB.": "构思创意，发布网站。", "Estimate a Website": "估算网站费用", "Discuss a System": "咨询定制系统", "Website estimate": "网站费用估算", "Website Pricing": "网站价格",
  "OUR IDEA. WE BUILD IT.": "你的想法，我们来实现。", "YOUR IDEA.": "你的想法。", "LET’S BUILD.": "我们来实现。", "Tell me about your project. Let’s bring it to life.": "告诉我你的项目想法，我会协助你实现。",
  "Business": "商业", "Payment & handover": "付款与交付", "Price your": "费用估算", "Price Your": "费用估算", "PRICE YOUR": "估算",
  "BUILD IDEAS.": "构思创意。", "LAUNCH WEB.": "发布网站。", "WEBSITE FRONTEND": "网站前端",
  "From landing pages to complete systems — built around your needs.": "从着陆页到完整系统，按你的需求打造。",
  "Choose a website package, add features and see a one-time estimate.": "选择网站配套与功能，即可查看一次性费用估算。",
  "Choose one animation tier for the same sequence. 3D work, extra assets or sequences need a separate quote.": "同一动画序列只能选择一个等级。3D 制作、额外素材或序列需另行报价。",
  "Included free: ": "免费包含：", ". SEO does not guarantee Google rankings.": "。SEO 不保证 Google 排名。",
  "Choose a 1:1 session for frontend fundamentals, React/Next.js or full-stack systems.": "选择一对一课程，学习前端基础、React/Next.js 或全栈系统。",
  "Online · 1:1 · ": "线上 · 一对一 · ",
  "Package prices are shown. Slots are confirmed after enquiry; no automatic booking or payment.": "课程价格已列明。时段会在咨询后人工确认；不提供自动预约或付款。",
  "COACHING 1:1": "一对一辅导",
  "Monthly": "每月", "Monthly maintenance": "每月维护",
});
export const copy = (locale: Locale, ms: string, en: string, zh?: string) =>
  locale === "ms" ? ms : locale === "zh-Hans" ? zh ?? ZH_COPY[en] ?? ZH_COPY[ms] ?? en : en;

export function StudioPage({
  locale,
  children,
  embedded = false,
  motion = true,
}: {
  locale: Locale;
  children: ReactNode;
  embedded?: boolean;
  motion?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  useGSAP(
    () => {
      if (!motion) return;
      const disposeEntrance = responsiveMotion(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const select = gsap.utils.selector(root);
          const section = select(".studio-scene")[0] as HTMLElement | undefined;
          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.8 },
            ...(embedded && section
              ? {
                  scrollTrigger: {
                    trigger: section,
                    start: "top 82%",
                    toggleActions: "play none none reverse",
                  },
                }
              : {}),
          });
          const art = select(".scene-art"),
            lines = select(".display-line"),
            foreground = select(".scene-character"),
            controls = select(".scene-intro, .scene-actions, .console");
          if (art.length) tl.from(art, { opacity: 0.82 }, 0);
          if (lines.length)
            tl.from(
              lines,
              { yPercent: 35, clipPath: "inset(0 0 100% 0)", stagger: 0.085 },
              0.05,
            );
          if (foreground.length)
            tl.from(foreground, { y: 28, opacity: 0, duration: 1 }, 0.12);
          if (controls.length)
            tl.from(
              controls,
              { y: 16, opacity: 0, stagger: 0.07, duration: 0.65 },
              0.26,
            );
          select("[data-reveal]").forEach((section: HTMLElement) => {
            gsap.from(section, {
              y: 36,
              opacity: 0.25,
              duration: 0.85,
              scrollTrigger: {
                trigger: section,
                start: "top 94%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
      );
      const disposeDepth = responsiveMotion(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.current
            ?.querySelectorAll<HTMLElement>("[data-depth]")
            .forEach((el) => {
              gsap.to(el, {
                y: Number(el.dataset.depth),
                ease: "none",
                scrollTrigger: {
                  trigger: el.closest(".studio-scene"),
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.5,
                },
              });
            });
        },
      );
      return () => {
        disposeEntrance();
        disposeDepth();
      };
    },
    { scope: root, dependencies: [locale, embedded, motion], revertOnUpdate: true },
  );
  useEffect(() => {
    if (embedded) return;
    let active = true;
    let frame = 0;
    const refresh = () => {
      if (!active) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const images = Array.from(document.querySelectorAll<HTMLImageElement>("main img"));
    images.forEach((image) => {
      if (!image.complete) {
        image.addEventListener("load", refresh);
        image.addEventListener("error", refresh);
      }
    });
    void document.fonts.ready.then(refresh);
    refresh();
    return () => {
      active = false;
      cancelAnimationFrame(frame);
      images.forEach((image) => {
        image.removeEventListener("load", refresh);
        image.removeEventListener("error", refresh);
      });
    };
  }, [embedded]);
  if (embedded) {
    return (
      <div className="studio-page-fragment" data-locale={locale} ref={root}>
        {children}
      </div>
    );
  }
  return (
    <div className="studio-page" data-locale={locale} ref={root}>
      <Header locale={locale} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
export function DisplayTitle({
  lines,
  accent = 1,
  level = 1,
}: {
  lines: string[];
  accent?: number;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <Heading className="display-title">
      {lines.map((line, i) => (
        <span
          key={line}
          className={`display-line ${i === accent ? "accent-line" : ""}`}
        >
          {line}
        </span>
      ))}
    </Heading>
  );
}
export function SceneLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="scene-label">
      <span>[</span> {number} / {children} <span>]</span>
    </div>
  );
}
export function ActionLink({
  href,
  children,
  secondary = false,
  blue = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  blue?: boolean;
}) {
  const className = `studio-button ${secondary ? "button-secondary" : ""} ${blue ? "button-blue" : ""}`;
  const content = <>{children}<ArrowRight size={22} aria-hidden="true" /></>;
  const navigateWithContext = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname) return;
    event.preventDefault();
    window.history.pushState(null, "", destination.pathname + destination.search + destination.hash);
    const target = document.getElementById(decodeURIComponent(destination.hash.slice(1)));
    target?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };
  if (href.includes("?")) {
    return <a href={href} className={className} onClick={navigateWithContext}>{content}</a>;
  }
  return (
    <Link
      href={href}
      className={className}
    >
      {content}
    </Link>
  );
}
const assets = {
  hero: ["07_hero_seated_character", 1031, 1299],
  builder: ["02_character_builder_laptop", 731, 1473],
  creator: ["03_character_creator_laptop", 908, 1408],
  consultant: ["04_character_consultant_laptop", 487, 1475],
  pointing: ["05_character_pointing_throw", 1100, 1301],
  laptop: ["06_laptop_closed_floating", 839, 831],
} as const;
export function Character({
  kind,
  className = "",
  priority = true,
}: {
  kind: keyof typeof assets;
  className?: string;
  priority?: boolean;
}) {
  const [file, width, height] = assets[kind];
  return (
    <div className={`character character-${kind} ${className}`}>
      <Image
        src={`/assets/optimized/${file}.webp`}
        alt=""
        width={width}
        height={height}
        sizes="(max-width: 767px) 95vw, (max-width: 1023px) 60vw, 58vw"
        priority={priority}
        className="character-image"
      />
    </div>
  );
}
export function Architecture({
  variant,
  priority = true,
}: {
  variant: "home" | "services" | "portfolio" | "pricing" | "coaching" | "about" | "contact";
  word?: string;
  priority?: boolean;
}) {
  const plates = {
    home: ["01-home", 712, 982, 712],
    services: ["02-services", 864, 672, 864],
    portfolio: ["03-portfolio", 778, 0, 0],
    pricing: ["04-pricing", 864, 780, 451],
    coaching: ["05-coaching", 864, 912, 864],
    about: ["06-about", 864, 962, 864],
    contact: ["07-contact", 807, 903, 807],
  } as const;
  const [name, , mobileWidth, mobileHeight] = plates[variant];
  return (
    <div className={`reference-artwork artwork-${variant}`} aria-hidden="true">
      <div className="reference-plate scene-art">
        <Image src={`/assets/astra-v21/${name}-plate.webp?v=21-final`} alt="" fill
          priority={priority} quality={95} sizes="(min-width: 1024px) 100vw, 1px"
          style={{objectFit:"contain",objectPosition:"top"}} />
      </div>
      {mobileWidth > 0 && (
        <div className="mobile-artwork">
          <Image src={`/assets/astra-v21/${name}-mobile.webp?v=21-final`} alt=""
            width={mobileWidth} height={mobileHeight} quality={95}
            sizes="(max-width: 1023px) 100vw, 1px" />
        </div>
      )}
    </div>
  );
}
