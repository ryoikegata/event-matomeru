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

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  tenant_id: z.number(),
  start_at: z.string(),
  end_at: z.string(),
  exp_at: z.string(),
  description: z.string(),
  event_category: z.object({
    0: z.object({
      category: CategorySchema
      })
      }),
});

