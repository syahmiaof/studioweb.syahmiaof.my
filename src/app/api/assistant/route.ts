import { NextRequest, NextResponse } from "next/server";
import { getLlmConfig, isPriceSensitive, requestGroundedLlmReply, type AssistantMessage } from "@/lib/assistant/llm";
import { answerFaq } from "@/lib/assistant/faq";
import { answerUnmatchedPriceQuestion } from "@/lib/assistant/pricing";
import type { Locale } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const WINDOW_MS = 60_000;
const MAX_REQUEST_BYTES = 12_288;
const requests = new Map<string, number[]>();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store, max-age=0" } });
}

function allowRequest(key: string): boolean {
  const now = Date.now();
  const recent = (requests.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= 12) {
    requests.set(key, recent);
    return false;
  }
  recent.push(now);
  requests.set(key, recent);
  if (requests.size > 5000) {
    requests.forEach((timestamps, entry) => {
      if (!timestamps.some((time: number) => now - time < WINDOW_MS)) requests.delete(entry);
    });
  }
  return true;
}

export async function GET() {
  const config = getLlmConfig();
  return json({ enabled: config.enabled, mode: config.enabled ? "grounded-llm-fallback" : "faq-only" });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!allowRequest(ip)) return json({ enabled: true, error: "rate_limited" }, 429);

  const reader = request.body?.getReader();
  if (!reader) return json({ enabled: true, error: "empty_request" }, 400);
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_REQUEST_BYTES) {
      await reader.cancel();
      return json({ enabled: true, error: "request_too_large" }, 413);
    }
    chunks.push(value);
  }

  let body: unknown;
  try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { return json({ enabled: true, error: "invalid_json" }, 400); }
  if (!body || typeof body !== "object") return json({ enabled: true, error: "invalid_payload" }, 400);
  const payload = body as { locale?: unknown; consent?: unknown; messages?: unknown };
  if (payload.locale !== "ms" && payload.locale !== "en" && payload.locale !== "zh-Hans") return json({ enabled: true, error: "invalid_locale" }, 400);
  if (payload.consent !== true) return json({ enabled: true, error: "consent_required" }, 428);
  if (!Array.isArray(payload.messages) || payload.messages.length < 1 || payload.messages.length > 8) return json({ enabled: true, error: "invalid_messages" }, 400);
  const messages: AssistantMessage[] = [];
  for (const entry of payload.messages) {
    if (!entry || typeof entry !== "object") return json({ enabled: true, error: "invalid_message" }, 400);
    const item = entry as { role?: unknown; content?: unknown };
    if ((item.role !== "user" && item.role !== "assistant") || typeof item.content !== "string" || item.content.trim().length < 1 || item.content.length > 1200) return json({ enabled: true, error: "invalid_message" }, 400);
    messages.push({ role: item.role, content: item.content.trim() });
  }
  const latestUserMessage = [...messages].reverse().find((item) => item.role === "user")?.content;
  if (!latestUserMessage) return json({ enabled: true, error: "missing_user_message" }, 400);
  const locale = payload.locale as Locale;
  const faq = answerFaq(latestUserMessage, locale);
  if (faq) return json({ enabled: true, mode: "faq", answer: faq.answer });
  if (isPriceSensitive(latestUserMessage)) {
    const previousQuestions = messages.slice(0, -1).filter((item) => item.role === "user").map((item) => item.content);
    return json({ enabled: true, mode: "deterministic-price", answer: answerUnmatchedPriceQuestion(latestUserMessage, locale, previousQuestions) });
  }
  const config = getLlmConfig();
  if (!config.enabled || !config.apiKey || !config.model) return json({ enabled: false, mode: "faq-only", error: "provider_unavailable" }, 503);

  try {
    const answer = await requestGroundedLlmReply({
      provider: config.provider,
      endpoint: config.endpoint,
      apiKey: config.apiKey,
      model: config.model,
      locale,
      messages,
    });
    return answer ? json({ enabled: true, mode: "grounded-llm-fallback", answer }) : json({ enabled: true, error: "provider_unavailable" }, 503);
  } catch {
    return json({ enabled: true, error: "provider_unavailable" }, 503);
  }
}
