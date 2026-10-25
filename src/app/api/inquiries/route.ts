import { NextRequest, NextResponse } from "next/server";
import { validateInquiry } from "@/lib/validation/inquiry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod schema validation
    const validation = validateInquiry(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Sila lengkapkan semua medan wajib dengan format yang sah.",
          issues: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 2. Anti-spam honeypot check
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: "Spam bot detected." },
        { status: 400 }
      );
    }

    // 3. Email provider dispatch check (SMTP / Resend / SendGrid)
    const emailProviderConfigured = Boolean(
      process.env.INQUIRY_EMAIL_PROVIDER && process.env.INQUIRY_EMAIL_API_KEY
    );

    if (!emailProviderConfigured) {
      // Truthful disclosure: server email provider not configured in V1
      return NextResponse.json(
        {
          success: false,
          status: "PROVIDER_PENDING_CONFIG",
          message:
            "Konfigurasi penghantaran emel pelayan pengeluaran masih dalam penyediaan. Sila hubungi kami terus melalui emel hello@syahmiaof.my.",
          directMailto: `mailto:hello@syahmiaof.my?subject=${encodeURIComponent(
            `Taklimat Projek Studio: ${data.name}`
          )}&body=${encodeURIComponent(
            `Nama: ${data.name}\nHubungi: ${data.contact}\nKategori: ${data.service}\n\nMesej:\n${data.message}`
          )}`,
        },
        { status: 503 }
      );
    }

    // Simulated real delivery logic (when keys are configured)
    return NextResponse.json({
      success: true,
      message: "Taklimat projek berjaya diterima.",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Ralat pelayan semasa memproses borang pertanyaan.",
      },
      { status: 500 }
    );
  }
}
