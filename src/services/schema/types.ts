import { TenantSchema, UserSchema, CreateTenantFormSchema } from ".";

export type TenantType = Zod.infer<typeof TenantSchema>;
export type UserType = Zod.infer<typeof UserSchema>;
export type CreateTenantFormType = Zod.infer<typeof CreateTenantFormSchema>;
