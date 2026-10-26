"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { PROJECTS, PROJECT_STATUS_LABELS } from "@/content/projects";
import { ProjectPreview } from "@/components/pages/ProjectPreview";
import type { Locale, ProjectItem, ProjectStatus } from "@/lib/types";
import { localized } from "@/lib/localized";
import {
  StudioPage,
  DisplayTitle,
  SceneLabel,
  ActionLink,
  Architecture,
  copy,
  sectionPath,
} from "@/components/scene/StudioScene";

const FEATURED_PROJECTS = [
  { id: "symi-yogurt", image: "symi", caption: "SYMI" },
  { id: "lamborghini", image: "lamborghini", caption: "LAMBORGHINI" },
  { id: "uber-pokmi", image: "uberpokmi", caption: "UBERPOKMI" },
] as const;
const STATUSES: ProjectStatus[] = ["completed", "in-progress", "on-hold"];

type NewProject = {
  title: string;
  category: string;
  status: ProjectStatus;
  liveUrl: string;
};

type EditProject = {
  id: string;
  title: string;
  category: string;
  status: ProjectStatus;
  liveUrl: string;
};

export function PortfolioView({ locale, embedded = false }: { locale: Locale; embedded?: boolean }) {
  const [active, setActive] = useState(0);
  const [projects, setProjects] = useState<ProjectItem[]>(PROJECTS);
  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<ProjectStatus | "all">("all");
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminMode, setAdminMode] = useState<"create" | "edit">("create");
  const [password, setPassword] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const adminTriggerRef = useRef<HTMLButtonElement>(null);
  const adminDialogRef = useRef<HTMLElement>(null);
  const [newProject, setNewProject] = useState<NewProject>({
    title: "",
    category: "",
    status: "completed",
    liveUrl: "",
  });
  const [editProject, setEditProject] = useState<EditProject>({
    id: "",
    title: "",
    category: "",
    status: "completed",
    liveUrl: "",
  });

  const isChinese = locale === "zh-Hans";
  const c = (ms: string, en: string, zh?: string) => copy(locale, ms, en, zh);
  const featured = FEATURED_PROJECTS.map((item) => PROJECTS.find((project) => project.id === item.id)).filter(
    (project): project is ProjectItem => Boolean(project),
  );
  const project = featured[Math.min(active, featured.length - 1)];
  const allProjects = projects;
  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return allProjects.filter((item) => {
      const matchesStatus = activeStatus === "all" || item.status === activeStatus;
      const matchesQuery = !normalizedQuery || `${item.title} ${localized(item.category, locale)}`.toLocaleLowerCase().includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [activeStatus, allProjects, locale, query]);
  const statusLabels = {
    completed: locale === "ms" ? "Selesai" : isChinese ? "已完成" : "Completed",
    "in-progress": locale === "ms" ? "Sedang dibina" : isChinese ? "进行中" : "In progress",
    "on-hold": locale === "ms" ? "Ditangguhkan" : isChinese ? "暂缓" : "On hold",
  } satisfies Record<ProjectStatus, string>;

  function handleSelectProjectForEdit(id: string) {
    const target = projects.find((p) => p.id === id);
    if (target) {
      setEditProject({
        id: target.id,
        title: target.title,
        category: localized(target.category, locale),
        status: target.status,
        liveUrl: target.liveUrl || "",
      });
    }
  }

  useEffect(() => {
    const selectFromHash = () => {
      const index = FEATURED_PROJECTS.findIndex((item) => `#${PROJECTS.find((entry) => entry.id === item.id)?.slug}` === window.location.hash);
      if (index >= 0) setActive(index);
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  useEffect(() => {
    if (!adminOpen) return;
    const dialog = adminDialogRef.current;
    const trigger = adminTriggerRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>("button:not(:disabled),input:not(:disabled),select:not(:disabled),a[href]") || []);
    focusable()[1]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAdminOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const controls = focusable();
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (trigger?.isConnected) trigger.focus();
      else previousFocus?.focus();
    };
  }, [adminOpen]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { projects?: ProjectItem[] } | null) => {
        if (!cancelled && data && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  async function handleAdminSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAdminMessage("");
    setIsSaving(true);
    try {
      if (!adminUnlocked) {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "unlock", password }),
        });
        const data = await response.json() as { message?: string };
        if (!response.ok) throw new Error(data.message || c("Kata laluan tak sah.", "Password is incorrect."));
        setAdminUnlocked(true);
        setPassword("");
        setAdminMessage(c("Akses admin dibuka untuk 8 jam pada browser ini.", "Admin access is open for 8 hours in this browser."));
        if (!editProject.id && projects[0]) {
          handleSelectProjectForEdit(projects[0].id);
        }
        return;
      }

      if (adminMode === "create") {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "create", ...newProject }),
        });
        const data = await response.json() as { project?: ProjectItem; message?: string };
        if (response.status === 401) {
          setAdminUnlocked(false);
          setAdminMessage(data.message || c("Sesi tamat. Masukkan kata laluan semula.", "Session expired. Enter the password again."));
          return;
        }
        if (!response.ok || !data.project) throw new Error(data.message || c("Projek tak dapat disimpan.", "Project could not be saved."));
        setProjects((items) => [...items, data.project!]);
        setNewProject({ title: "", category: "", status: "completed", liveUrl: "" });
        setAdminMessage(c("Projek berjaya ditambah ke showcase!", "Project added to showcase successfully!", "项目已成功添加到展示列表！"));
        return;
      }

      if (adminMode === "edit") {
        if (!editProject.id) throw new Error(c("Sila pilih projek untuk diedit.", "Please select a project to edit."));
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", ...editProject }),
        });
        const data = await response.json() as { project?: ProjectItem; message?: string };
        if (response.status === 401) {
          setAdminUnlocked(false);
          setAdminMessage(data.message || c("Sesi tamat. Masukkan kata laluan semula.", "Session expired. Enter the password again."));
          return;
        }
        if (!response.ok || !data.project) throw new Error(data.message || c("Kemaskini gagal disimpan.", "Update could not be saved."));
        setProjects((items) => items.map((item) => (item.id === data.project!.id ? data.project! : item)));
        setAdminMessage(c("Projek berjaya dikemaskini!", "Project updated successfully!", "项目已成功更新！"));
        return;
      }
    } catch (error) {
      setAdminMessage(error instanceof Error ? error.message : c("Ralat tak dijangka.", "Unexpected error."));
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <StudioPage locale={locale} embedded={embedded}>
      <section className="studio-scene portfolio-scene" id="portfolio">
        <Architecture variant="portfolio" priority={!embedded} />
        <div className="portfolio-copy">
          <SceneLabel number="04">PORTFOLIO</SceneLabel>
          <DisplayTitle level={2} lines={locale === "ms" ? ["IDEA JADI", "REALITI."] : ["IDEAS MADE", "REAL."]} />
          <p className="scene-intro">
            {c(
              "Eksperimen, konsep dan projek pilihan — setiap satunya ada cerita.",
              "Experiments, concepts and selected projects — each with a story.",
            )}
          </p>
          <div className="scene-actions">
            <ActionLink href="#project-details">{c("Lihat Semua Projek", "Explore the Projects")}</ActionLink>
          </div>
        </div>
        <div className="perspective-gallery" aria-label={c("Galeri konsep projek", "Project concept gallery")}>
          {FEATURED_PROJECTS.map((item, index) => {
            const entry = PROJECTS.find((candidate) => candidate.id === item.id);
            if (!entry) return null;
            return (
              <button
                type="button"
                key={item.id}
                id={entry.slug}
                className={`project-plane project-plane-${index}${active === index ? " is-selected" : ""}`}
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                aria-label={c("Pilih ", "Select ") + entry.title}
              >
                <div className="project-caption">
                  <strong><em>0{index + 1} /</em> {item.caption}</strong>
                  <span>{c("CONCEPT DEMO", "CONCEPT DEMO")}</span>
                </div>
                <div className="project-image">
                  <Image
                    src={`/assets/astra-v21/project-${item.image}.webp`}
                    alt={c("Visual konsep ", "Concept preview ") + entry.title}
                    fill
                    quality={95}
                    sizes="(max-width: 1023px) 90vw, 1px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <div className="gallery-controls">
        <span aria-live="polite">0{active + 1} / 03 — {project?.title}</span>
        <div className="gallery-progress"><span style={{ transform: `scaleX(${(active + 1) / 3})` }} /></div>
        <button onClick={() => setActive((active + 2) % 3)} aria-label={c("Projek sebelumnya", "Previous project")}><ArrowLeft /></button>
        <button onClick={() => setActive((active + 1) % 3)} aria-label={c("Projek seterusnya", "Next project")}><ArrowRight /></button>
      </div>

      <section className="project-details project-showcase" id="project-details">
        <div className="project-showcase-heading">
          <span className="chapter-line">{c("SHOWCASE PROJEK", "PROJECT SHOWCASE", "项目展示")}</span>
          <h2>{c("Semua projek.", "Every project.", "全部项目。")}</h2>
          <p>{c("Rekod projek daripada Nemo, dikumpulkan di sini untuk senang diteroka.", "Projects from Nemo, collected here so they are easy to explore.", "Nemo 中的项目记录汇集于此，方便浏览。")}</p>
        </div>

        <div className="project-index" id="project-gallery">
          <div className="project-index-tools">
            <label className="project-search">
              <Search aria-hidden="true" size={18} />
              <span className="sr-only">{c("Cari projek", "Search projects", "搜索项目")}</span>
              <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={c("Cari nama atau kategori…", "Search projects or category…", "搜索项目名称或类别……")} />
            </label>
            <p className="project-result-count" aria-live="polite">
              {locale === "ms" ? `${visibleProjects.length} projek` : isChinese ? `${visibleProjects.length} 个项目` : `${visibleProjects.length} projects`}
            </p>
            <button
              ref={adminTriggerRef}
              className="project-admin-trigger"
              type="button"
              onClick={() => {
                setAdminOpen(true);
                setAdminMessage("");
                if (adminUnlocked && !editProject.id && projects[0]) {
                  handleSelectProjectForEdit(projects[0].id);
                }
              }}
            >
              <span aria-hidden="true">＋</span>{c("Urus projek", "Manage projects", "管理项目")}
            </button>
          </div>

          <div className="project-filters" role="group" aria-label={c("Tapis ikut status", "Filter by status", "按状态筛选")}>
            <button type="button" aria-pressed={activeStatus === "all"} onClick={() => setActiveStatus("all")}>{c("Semua", "All", "全部")} <span>{allProjects.length}</span></button>
            {STATUSES.map((status) => (
              <button key={status} type="button" aria-pressed={activeStatus === status} onClick={() => setActiveStatus(status)}>
                {statusLabels[status]} <span>{allProjects.filter((item) => item.status === status).length}</span>
              </button>
            ))}
          </div>

          {visibleProjects.length > 0 ? (
            <div className="project-grid">
              {visibleProjects.map((item, index) => (
                <article className="project-card" key={item.id}>
                  {item.liveUrl ? (
                    <a className="project-card-preview-link" href={item.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c("Buka projek", "Open project", "打开项目")}: ${item.title}`}>
                      <ProjectPreview project={item} locale={locale} />
                    </a>
                  ) : (
                    <ProjectPreview project={item} locale={locale} />
                  )}
                  <div className="project-card-info">
                    <div className="project-card-heading">
                      <span className={`project-status project-status--${item.status}`}>
                        <i aria-hidden="true" />{PROJECT_STATUS_LABELS[locale][item.status]}
                      </span>
                      <div className="project-card-meta">
                        {adminUnlocked && (
                          <button
                            type="button"
                            className="project-card-edit-button"
                            title={c("Edit projek ini", "Edit this project", "编辑此项目")}
                            onClick={() => {
                              handleSelectProjectForEdit(item.id);
                              setAdminMode("edit");
                              setAdminMessage("");
                              setAdminOpen(true);
                            }}
                          >
                            ✏️ {c("Edit", "Edit", "编辑")}
                          </button>
                        )}
                        <span className="project-card-number">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{localized(item.category, locale)}</p>
                    {item.liveUrl ? (
                      <a className="project-card-domain" href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                        {new URL(item.liveUrl).hostname}<span aria-hidden="true"> ↗</span>
                      </a>
                    ) : (
                      <span className="project-card-domain project-card-domain-muted">
                        {c("Pautan akan ditambah", "Live link not listed", "暂未提供线上链接")}
                      </span>
                    )}
                    <a className="project-card-inquiry" href={sectionPath(locale, "hubungi", new URLSearchParams({ service: "website-ui", project: item.slug }))}>
                      {c("Bincang projek ini", "Discuss this project", "讨论这个项目")} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="project-empty-state">{c("Tiada projek sepadan. Cuba kata carian lain.", "No matching projects. Try another search.", "没有找到匹配项目，请换个关键词。")}</p>
          )}
        </div>
      </section>

      {adminOpen && (
        <div className="project-admin-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setAdminOpen(false); }}>
          <section ref={adminDialogRef} className="project-admin-dialog" role="dialog" aria-modal="true" aria-labelledby="project-admin-title">
            <button className="project-admin-close" type="button" aria-label={c("Tutup", "Close", "关闭")} onClick={() => setAdminOpen(false)}>×</button>
            <span className="chapter-line">{adminUnlocked ? c("AKSES ADMIN", "ADMIN ACCESS", "管理员权限") : c("KAWASAN PEMILIK", "OWNER AREA", "所有者区域")}</span>
            <h2 id="project-admin-title">
              {!adminUnlocked
                ? c("Masukkan kata laluan", "Enter password", "输入密码")
                : adminMode === "edit"
                ? c("Edit projek", "Edit project", "编辑项目")
                : c("Tambah projek", "Add a project", "添加项目")}
            </h2>

            {adminUnlocked && (
              <div className="project-admin-tabs" role="tablist">
                <button
                  type="button"
                  className={`project-admin-tab ${adminMode === "create" ? "is-active" : ""}`}
                  onClick={() => {
                    setAdminMode("create");
                    setAdminMessage("");
                  }}
                >
                  ＋ {c("Tambah Baru", "Add New", "添加新项目")}
                </button>
                <button
                  type="button"
                  className={`project-admin-tab ${adminMode === "edit" ? "is-active" : ""}`}
                  onClick={() => {
                    setAdminMode("edit");
                    setAdminMessage("");
                    if (!editProject.id && projects[0]) {
                      handleSelectProjectForEdit(projects[0].id);
                    }
                  }}
                >
                  ✏️ {c("Edit Projek Sedia Ada", "Edit Existing Project", "编辑现有项目")}
                </button>
              </div>
            )}

            <form onSubmit={handleAdminSubmit}>
              {!adminUnlocked ? (
                <label>
                  {c("Kata laluan", "Password", "密码")}
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </label>
              ) : adminMode === "create" ? (
                <>
                  <label>
                    {c("Nama projek", "Project name", "项目名称")}
                    <input
                      value={newProject.title}
                      onChange={(event) => setNewProject({ ...newProject, title: event.target.value })}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label>
                    {c("Kategori", "Category", "类别")}
                    <input
                      value={newProject.category}
                      onChange={(event) => setNewProject({ ...newProject, category: event.target.value })}
                      maxLength={100}
                      required
                    />
                  </label>
                  <label>
                    {c("Status", "Status", "状态")}
                    <select
                      value={newProject.status}
                      onChange={(event) => setNewProject({ ...newProject, status: event.target.value as ProjectStatus })}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>{statusLabels[status]}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {c("Pautan live (jika ada)", "Live URL (optional)", "线上链接（可选）")}
                    <input
                      type="url"
                      inputMode="url"
                      placeholder="https://example.com"
                      value={newProject.liveUrl}
                      onChange={(event) => setNewProject({ ...newProject, liveUrl: event.target.value })}
                    />
                  </label>
                </>
              ) : (
                <>
                  <label>
                    {c("Pilih projek untuk diedit", "Select project to edit", "选择要编辑的项目")}
                    <select
                      value={editProject.id}
                      onChange={(event) => handleSelectProjectForEdit(event.target.value)}
                      required
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} ({statusLabels[p.status]})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {c("Nama projek", "Project name", "项目名称")}
                    <input
                      value={editProject.title}
                      onChange={(event) => setEditProject({ ...editProject, title: event.target.value })}
                      maxLength={80}
                      required
                    />
                  </label>
                  <label>
                    {c("Kategori", "Category", "类别")}
                    <input
                      value={editProject.category}
                      onChange={(event) => setEditProject({ ...editProject, category: event.target.value })}
                      maxLength={100}
                      required
                    />
                  </label>
                  <label>
                    {c("Status", "Status", "状态")}
                    <select
                      value={editProject.status}
                      onChange={(event) => setEditProject({ ...editProject, status: event.target.value as ProjectStatus })}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>{statusLabels[status]}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    {c("Pautan live (jika ada)", "Live URL (optional)", "线上链接（可选）")}
                    <input
                      type="url"
                      inputMode="url"
                      placeholder="https://example.com"
                      value={editProject.liveUrl}
                      onChange={(event) => setEditProject({ ...editProject, liveUrl: event.target.value })}
                    />
                  </label>
                </>
              )}

              <button className="studio-button" type="submit" disabled={isSaving}>
                {isSaving
                  ? c("Sedang simpan…", "Saving…", "正在保存…")
                  : !adminUnlocked
                  ? c("Buka akses", "Unlock", "解锁")
                  : adminMode === "edit"
                  ? c("Kemaskini projek", "Update project", "更新项目")
                  : c("Simpan projek", "Save project", "保存项目")}
              </button>

              <p
                className={`project-admin-message ${adminMessage.includes("HAHAHAHA") ? "is-error" : ""}`}
                aria-live="polite"
              >
                {adminMessage}
              </p>
            </form>
          </section>
        </div>
      )}
    </StudioPage>
  );
}
