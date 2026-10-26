import { z } from "zod";

// Phone number regex allowing international and Malaysian standard formats
const PHONE_REGEX = /^(\+?60|0)[0-9]{8,11}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const InquirySchema = z.object({
  service: z.enum(["website-ui", "full-stack", "coaching"], {
    errorMap: () => ({ message: "Sila pilih kategori perkhidmatan yang sah." }),
  }),
  name: z
    .string()
    .trim()
    .min(2, { message: "Nama mestilah sekurang-kurangnya 2 aksara." })
    .max(100, { message: "Nama tidak boleh melebihi 100 aksara." }),
  contact: z
    .string()
    .trim()
    .refine(
      (val) => {
        const clean = val.replace(/[\s-]/g, "");
        return EMAIL_REGEX.test(val) || PHONE_REGEX.test(clean);
      },
      {
        message: "Sila masukkan alamat emel yang sah atau nombor WhatsApp yang tepat.",
      }
    ),
  message: z
    .string()
    .trim()
    .min(10, { message: "Sila berikan butiran taklimat projek sekurang-kurangnya 10 aksara." })
    .max(2000, { message: "Mesej terlalu panjang (had maksimum 2000 aksara)." }),
  packageId: z.string().optional(),
  packageName: z.string().optional(),
  addons: z.array(z.string()).optional(),
  estimatedTotal: z.number().optional(),
  coachingTopic: z.string().optional(),
  coachingDuration: z.enum(["60", "90", "120"]).optional(),
  coachingPackageId: z.enum([
    "basic-frontend",
    "advanced-frontend",
    "full-stack-system",
  ]).optional(),
  maintenanceId: z.enum([
    "pay-per-task",
    "website-care",
    "system-care",
  ]).optional(),
  honeypot: z.string().max(0, { message: "Aktiviti bot dikesan." }).optional(),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export function validateInquiry(data: unknown) {
  return InquirySchema.safeParse(data);
}
