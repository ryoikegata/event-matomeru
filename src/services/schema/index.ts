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

export const CreateTenantFormSchema = z.object({
  name: z.string().min(1, "テナント名は必須です"),
  email: z.string().min(1, "メールアドレスは必須です"),
  role_id: z.number(),
});

export const EventSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .max(20, { message: "イベント名は20文字以内に収めてください" }),
  start_at: z.string(),
  end_at: z.string(),
  // start_at: z.string().datetime({ offset: true }),
  // end_at: z.string().datetime({ offset: true }),
  exp_at: z.string(),
  description: z
    .string()
    .max(100, { message: "詳細は100文字以内に収めてください" }),
});

export const CategorySchema = z.object({
  id: z.number(),
  tenant_id: z.number(),
  name: z.string(),
});
