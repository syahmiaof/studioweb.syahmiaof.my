import { createHmac, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PROJECTS } from "@/content/projects";
import type { ProjectItem, ProjectStatus } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const COOKIE_NAME = "studio_project_admin";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const statuses = ["completed", "in-progress", "on-hold"] as const satisfies readonly ProjectStatus[];

const newProjectSchema = z.object({
  action: z.literal("create"),
  title: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(100),
  status: z.enum(statuses),
  liveUrl: z.union([z.literal(""), z.string().url().max(500)]),
}).strict();

const updateProjectSchema = z.object({
  action: z.literal("update"),
  id: z.string().trim().min(1).max(90),
  title: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(100),
  status: z.enum(statuses),
  liveUrl: z.union([z.literal(""), z.string().url().max(500)]),
}).strict();

const attempts = new Map<string, { count: number; resetAt: number }>();

type PortfolioProjectRow = {
  id: string;
  slug: string;
  title: string;
  category_ms: string;
  category_en: string;
  category_zh: string;
  status: ProjectStatus;
  live_url: string | null;
  sort_order: number;
};

function sessionSecret() {
  return process.env.PORTFOLIO_ADMIN_PASSWORD || "Syahanim_19";
}

function writeTokenSecret() {
  return process.env.SUPABASE_PROJECT_WRITE_TOKEN || "U7wRQ9iQn7xP6yePimiHRjcxvgmUI4ftu2Kn5SJblGc";
}

function supabaseConfig() {
  const url = (process.env.SUPABASE_URL || "https://fgslccypirnktvimjtpa.supabase.co").replace(/\/$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_B0G8L1LBwgFkKavknLzmmQ_tZOGC7gy";
  return url && key ? { url, key } : null;
}

function toProject(row: PortfolioProjectRow): ProjectItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: { ms: row.category_ms, en: row.category_en, "zh-Hans": row.category_zh },
    status: row.status,
    ...(row.live_url ? { liveUrl: row.live_url } : {}),
  };
}

async function fetchDatabaseProjects() {
  const config = supabaseConfig();
  if (!config) return null;
  const endpoint = new URL(`${config.url}/rest/v1/portfolio_projects`);
  endpoint.searchParams.set("select", "id,slug,title,category_ms,category_en,category_zh,status,live_url,sort_order");
  endpoint.searchParams.set("order", "sort_order.asc,created_at.asc,id.asc");
  const response = await fetch(endpoint, {
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Portfolio database read failed.");
  const rows = await response.json() as PortfolioProjectRow[];
  return rows.map(toProject);
}

function localProjectPathAvailable() {
  return process.env.VERCEL !== "1";
}

function storagePath() {
  return path.resolve(process.env.PORTFOLIO_PROJECTS_FILE || path.join(process.cwd(), "data", "projects.local.json"));
}

async function readProjects(): Promise<ProjectItem[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(storagePath(), "utf8"));
    if (!Array.isArray(parsed)) throw new Error("Fail data projek bukan array.");
    return parsed as ProjectItem[];
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

function passwordMatches(input: unknown, expected: string): input is string {
  if (typeof input !== "string") return false;
  const candidate = createHmac("sha256", "studio-admin-password-compare").update(input).digest();
  const secret = createHmac("sha256", "studio-admin-password-compare").update(expected).digest();
  return timingSafeEqual(candidate, secret);
}

function signSession(timestamp: string) {
  return createHmac("sha256", sessionSecret()).update(timestamp).digest("base64url");
}

function validSession(request: NextRequest) {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  if (!value || !sessionSecret()) return false;
  const [timestamp, signature, extra] = value.split(".");
  if (!timestamp || !signature || extra !== undefined || !/^\d+$/.test(timestamp)) return false;
  const issuedAt = Number(timestamp);
  const now = Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(issuedAt) || issuedAt > now || now - issuedAt > SESSION_TTL_SECONDS) return false;
  const expected = Buffer.from(signSession(timestamp));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function tooManyAttempts(key: string) {
  const now = Date.now();
  if (attempts.size > 2048) {
    attempts.forEach((attempt, address) => {
      if (attempt.resetAt <= now) attempts.delete(address);
    });
  }
  const record = attempts.get(key);
  if (!record || record.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  record.count += 1;
  return record.count > 5;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const requestHost = request.headers.get("host");
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const requestProtocol = forwardedProtocol || request.nextUrl.protocol.replace(/:$/, "");
    return Boolean(requestHost)
      && originUrl.host.toLowerCase() === requestHost!.toLowerCase()
      && originUrl.protocol === `${requestProtocol}:`;
  } catch {
    return false;
  }
}

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
}

export async function GET() {
  try {
    const databaseProjects = await fetchDatabaseProjects().catch(() => null);
    const localProjects = localProjectPathAvailable() ? await readProjects().catch(() => []) : [];
    const dynamicList = [...(databaseProjects || []), ...localProjects];

    if (dynamicList.length > 0) {
      const dynamicIds = new Set(dynamicList.map((project) => project.id));
      const combined = [...dynamicList, ...PROJECTS.filter((project) => !dynamicIds.has(project.id))];
      return NextResponse.json(
        { projects: combined, source: databaseProjects ? "supabase" : "local" },
        { headers: { "Cache-Control": "no-store, max-age=0" } },
      );
    }

    return NextResponse.json(
      { projects: PROJECTS, source: "static" },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json(
      { projects: PROJECTS, source: "fallback" },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ message: "Origin tidak dibenarkan." }, { status: 403 });
  if (!sessionSecret()) return NextResponse.json({ message: "PORTFOLIO_ADMIN_PASSWORD belum dikonfigurasi dalam environment server." }, { status: 503 });

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 8192) return NextResponse.json({ message: "Request terlalu besar." }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Format request tak sah." }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "action" in body && body.action === "unlock") {
    const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (tooManyAttempts(key)) return NextResponse.json({ message: "Terlalu banyak cubaan. Cuba lagi selepas 15 minit." }, { status: 429 });
    if (!passwordMatches((body as { password?: unknown }).password, sessionSecret())) {
      return NextResponse.json({ message: "HAHAHAHA password kau salah 🤣" }, { status: 401 });
    }
    const timestamp = String(Math.floor(Date.now() / 1000));
    const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    response.cookies.set(COOKIE_NAME, `${timestamp}.${signSession(timestamp)}`, {
      httpOnly: true,
      secure: forwardedProtocol === "https" || request.nextUrl.protocol === "https:",
      sameSite: "strict",
      path: "/api/projects",
      maxAge: SESSION_TTL_SECONDS,
    });
    attempts.delete(key);
    return response;
  }

  if (!validSession(request)) return NextResponse.json({ message: "Sesi admin tamat. Masukkan kata laluan semula." }, { status: 401 });

  // Handle Edit / Update project
  if (typeof body === "object" && body !== null && "action" in body && body.action === "update") {
    const parsed = updateProjectSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ message: "ID, nama, kategori, status atau URL projek tak sah." }, { status: 400 });

    const value = parsed.data;
    const liveUrl = value.liveUrl.trim();
    if (liveUrl) {
      const parsedUrl = new URL(liveUrl);
      if (!/^https?:$/.test(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password) {
        return NextResponse.json({ message: "URL perlu guna HTTP/HTTPS dan tak boleh mengandungi maklumat log masuk." }, { status: 400 });
      }
    }

    const config = supabaseConfig();
    const writeToken = writeTokenSecret();
    if (config && writeToken) {
      try {
        const updatePayload = {
          title: value.title,
          category_ms: value.category,
          category_en: value.category,
          category_zh: value.category,
          status: value.status,
          live_url: liveUrl ? new URL(liveUrl).toString() : null,
          updated_at: new Date().toISOString(),
        };
        const updateResponse = await fetch(`${config.url}/rest/v1/portfolio_projects?id=eq.${encodeURIComponent(value.id)}`, {
          method: "PATCH",
          headers: {
            apikey: config.key,
            Authorization: `Bearer ${config.key}`,
            "Content-Type": "application/json",
            "x-portfolio-write-token": writeToken,
            Prefer: "return=representation",
          },
          body: JSON.stringify(updatePayload),
        });

        if (updateResponse.ok) {
          const updatedRows = await updateResponse.json() as PortfolioProjectRow[];
          if (updatedRows && updatedRows.length > 0) {
            return NextResponse.json({ success: true, project: toProject(updatedRows[0]) }, { status: 200, headers: { "Cache-Control": "no-store" } });
          }
        }
      } catch {
        // Fallback to local
      }
    }

    const staticProject = PROJECTS.find((p) => p.id === value.id);
    const updatedProject: ProjectItem = {
      id: value.id,
      slug: staticProject?.slug || value.id,
      title: value.title,
      category: { ms: value.category, en: value.category, "zh-Hans": value.category },
      status: value.status,
      ...(liveUrl ? { liveUrl: new URL(liveUrl).toString() } : {}),
    };

    if (localProjectPathAvailable()) {
      const localProjects = await readProjects().catch(() => []);
      const index = localProjects.findIndex((p) => p.id === value.id);
      let updatedList: ProjectItem[];
      if (index >= 0) {
        updatedList = [...localProjects];
        updatedList[index] = updatedProject;
      } else {
        updatedList = [...localProjects, updatedProject];
      }
      const file = storagePath();
      await mkdir(path.dirname(file), { recursive: true });
      const temporaryFile = `${file}.${process.pid}.tmp`;
      await writeFile(temporaryFile, `${JSON.stringify(updatedList, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
      await rename(temporaryFile, file);
    }

    return NextResponse.json({ success: true, project: updatedProject }, { status: 200, headers: { "Cache-Control": "no-store" } });
  }

  // Handle Create new project
  const parsed = newProjectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ message: "Nama, kategori, status atau URL projek tak sah." }, { status: 400 });

  const value = parsed.data;
  const liveUrl = value.liveUrl.trim();
  if (liveUrl) {
    const parsedUrl = new URL(liveUrl);
    if (!/^https?:$/.test(parsedUrl.protocol) || parsedUrl.username || parsedUrl.password) {
      return NextResponse.json({ message: "URL perlu guna HTTP/HTTPS dan tak boleh mengandungi maklumat log masuk." }, { status: 400 });
    }
  }
  const databaseProjects = await fetchDatabaseProjects().catch(() => null);
  const current = databaseProjects || await readProjects();
  const localProjects = await readProjects();
  if (current.length >= 100) return NextResponse.json({ message: "Had 100 projek tambahan telah dicapai." }, { status: 409 });

  const baseSlug = slugify(value.title);
  if (!baseSlug) return NextResponse.json({ message: "Nama projek tak boleh dijadikan slug URL." }, { status: 400 });
  const usedSlugs = new Set([...PROJECTS, ...current, ...localProjects].map((item) => item.slug));
  const slug = usedSlugs.has(baseSlug) ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;
  const projectId = `custom-${slug}`;
  if ([...current, ...localProjects].some((item) => item.id === projectId)) {
    return NextResponse.json({ message: "Projek dengan ID itu sudah wujud." }, { status: 409 });
  }
  const project: ProjectItem = {
    id: projectId,
    slug,
    title: value.title,
    category: { ms: value.category, en: value.category, "zh-Hans": value.category },
    status: value.status,
    ...(liveUrl ? { liveUrl: new URL(liveUrl).toString() } : {}),
  };

  const config = supabaseConfig();
  const writeToken = writeTokenSecret();
  if (config && writeToken) {
    try {
      const latestResponse = await fetch(`${config.url}/rest/v1/portfolio_projects?select=sort_order&order=sort_order.desc&limit=1`, {
        headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
        cache: "no-store",
      });
      if (!latestResponse.ok) throw new Error("Unable to read project ordering.");
      const latestRows = await latestResponse.json() as Array<{ sort_order: number }>;
      const payload = {
        id: project.id,
        slug: project.slug,
        title: project.title,
        category_ms: project.category.ms,
        category_en: project.category.en,
        category_zh: project.category["zh-Hans"] || project.category.en,
        status: project.status,
        live_url: liveUrl ? new URL(liveUrl).toString() : null,
        sort_order: (latestRows[0]?.sort_order ?? -1) + 1,
      };
      const insertResponse = await fetch(`${config.url}/rest/v1/portfolio_projects`, {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          "x-portfolio-write-token": writeToken,
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });
      if (insertResponse.status === 409) return NextResponse.json({ message: "Slug projek sudah digunakan." }, { status: 409 });
      if (!insertResponse.ok) throw new Error("Unable to save project to Supabase.");
      const inserted = await insertResponse.json() as PortfolioProjectRow[];
      const savedProject = inserted[0] ? toProject(inserted[0]) : project;
      return NextResponse.json({ success: true, project: savedProject }, { status: 201, headers: { "Cache-Control": "no-store" } });
    } catch {
      return NextResponse.json({ message: "Projek tak dapat disimpan dalam database. Semak konfigurasi akses database." }, { status: 502 });
    }
  }

  if (config && !writeToken) {
    return NextResponse.json({ message: "SUPABASE_PROJECT_WRITE_TOKEN belum dikonfigurasi dalam environment server." }, { status: 503 });
  }
  if (!localProjectPathAvailable()) {
    return NextResponse.json({ message: "Konfigurasi Supabase portfolio belum lengkap pada hosting." }, { status: 503 });
  }
  const file = storagePath();
  await mkdir(path.dirname(file), { recursive: true });
  const temporaryFile = `${file}.${process.pid}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify([...localProjects, project], null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
  await rename(temporaryFile, file);
  return NextResponse.json({ success: true, project }, { status: 201, headers: { "Cache-Control": "no-store" } });
}
