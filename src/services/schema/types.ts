import { TenantSchema, UserSchema } from ".";

export type TenantType = Zod.infer<typeof TenantSchema>;
export type UserType = Zod.infer<typeof UserSchema>;
