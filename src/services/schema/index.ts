import { z } from "zod";

export const TenantSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const UserSchema = z.object({
  uuid: z.string(),
  email: z.string(),
  name: z.string(),
  tenant_id: z.number(),
  role_id: z.number(),
});

export const EventSchema = z.object({
  title: z.string().max(20, { message: "イベント名は20文字以内に収めてください" }),
  start_at: z.string(),
  end_at: z.string(),
  // start_at: z.string().datetime({ offset: true }),
  // end_at: z.string().datetime({ offset: true }),
  description: z.string().max(100, { message: "詳細は100文字以内に収めてください" }),
});
