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
