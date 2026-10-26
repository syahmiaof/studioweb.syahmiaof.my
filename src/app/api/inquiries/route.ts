import { NextRequest, NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation/inquiry";
import {
  calculateFrontendEstimate,
  getPackageById,
  getSystemOfferById,
  getMaintenanceOptionById,
  normalizeFrontendAddonIds,
} from "@/lib/pricing/calculator";
import { COACHING_PACKAGES } from "@/content/coaching";
export async function POST(req: NextRequest) {
  try {
    // Bound the stream itself; Content-Length alone is not a trusted size limit.
    const reader = req.body?.getReader();
    if (!reader)
      return NextResponse.json(
        { success: false, error: "Empty request." },
        { status: 400 },
      );
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return NextResponse.json(
          { success: false, error: "Request too large." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    let body: unknown;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON." },
        { status: 400 },
      );
    }
    const validation = validateInquiry(body);
    if (!validation.success)
      return NextResponse.json(
        {
          success: false,
          error: "Please check your inquiry details.",
          issues: validation.error.flatten(),
        },
        { status: 400 },
      );
    const data = validation.data;
    const pkg = data.packageId ? getPackageById(data.packageId) : undefined;
    const systemOffer = data.packageId ? getSystemOfferById(data.packageId) : undefined;
    if (data.packageId && !pkg && !systemOffer)
      return NextResponse.json(
        { success: false, error: "Invalid package." },
        { status: 400 },
      );
    if ((pkg && data.service !== "website-ui") || (systemOffer && data.service !== "full-stack"))
      return NextResponse.json(
        { success: false, error: "Package does not match the selected service." },
        { status: 400 },
      );
    if (data.coachingPackageId && data.service !== "coaching")
      return NextResponse.json(
        { success: false, error: "Coaching package does not match the selected service." },
        { status: 400 },
      );
    const addons = pkg ? normalizeFrontendAddonIds(data.addons || []) : [];
    const quote = pkg ? calculateFrontendEstimate(pkg.id, addons) : undefined;
    const maintenance = data.maintenanceId
      ? getMaintenanceOptionById(data.maintenanceId)
      : undefined;
    const coachingPackage = data.coachingPackageId
      ? COACHING_PACKAGES.find((item) => item.id === data.coachingPackageId)
      : undefined;
    const context = [
      pkg ? pkg.name.ms + " — RM" + quote!.total : "",
      pkg && addons.length ? addons.join(", ") : "",
      systemOffer ? systemOffer.name.ms + " — " + systemOffer.priceDisplay : "",
      maintenance && maintenance.id !== "none"
        ? maintenance.name.ms + " — " + maintenance.priceDisplay.ms
        : "",
      coachingPackage
        ? coachingPackage.name.ms + " / " + coachingPackage.durationMinutes + " min — RM" + coachingPackage.price
        : data.coachingTopic
          ? data.coachingTopic + " / " + data.coachingDuration + " min"
          : "",
    ]
      .filter(Boolean)
      .join("\n");
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const toEmail = process.env.INQUIRY_TO_EMAIL || "hello@syahmiaof.my";
        const fromEmail =
          process.env.INQUIRY_FROM_EMAIL || "SYAHMIAOF Studio <onboarding@resend.dev>";
        const replyTo = data.contact.includes("@") ? data.contact : undefined;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: replyTo,
            subject: `[SYAHMIAOF Studio] Pertanyaan: ${data.name} (${data.service})`,
            text: [
              `Nama: ${data.name}`,
              `Hubungi: ${data.contact}`,
              `Servis: ${data.service}`,
              `Konteks:`,
              context || "Tiada",
              ``,
              `Mesej:`,
              data.message,
            ].join("\n"),
          }),
        });

        if (resendRes.ok) {
          const resendData = (await resendRes.json()) as { id?: string };
          return NextResponse.json(
            {
              success: true,
              status: "DELIVERED",
              id: resendData.id,
              message: "Pertanyaan anda telah berjaya dihantar.",
            },
            { status: 200, headers: { "Cache-Control": "no-store" } },
          );
        }
      } catch {
        // Fall through to honest 503 fallback if dispatch fails
      }
    }

    // Environment keys are not delivery confirmation. No adapter is configured in this project.
    // Never acknowledge delivery until a real provider dispatch has succeeded.
    return NextResponse.json(
      {
        success: false,
        status: "PROVIDER_PENDING_CONFIG",
        message:
          "Direct delivery is not enabled. Continue through your email app.",
        directMailto:
          "mailto:hello@syahmiaof.my?subject=" +
          encodeURIComponent("Studio Inquiry: " + data.name) +
          "&body=" +
          encodeURIComponent(
            "Name: " +
              data.name +
              "\nContact: " +
              data.contact +
              "\nService: " +
              data.service +
              "\n" +
              context +
              "\n\n" +
              data.message,
          ),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to process the inquiry." },
      { status: 500 },
    );
  }
}
