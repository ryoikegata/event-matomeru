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
